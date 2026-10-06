import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEventStore, EventModel, VendorProfileModel, ReportModel, DynamicCategory, LocationNode, AdminUserRecord } from "@/contexts/EventStore";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ShieldAlert, Eye, EyeOff, BadgeCheck, Check, AlertTriangle, Calendar, Store, Lock, KeyRound, Loader2, LogOut,
  Users, BarChart3, TrendingUp, Search, Plus, Trash2, Edit, MapPin, Share2, Bookmark, FolderTree, CheckCircle2,
  XCircle, UserX, UserCheck, ShieldCheck, Mail, Phone, ExternalLink, RefreshCw, Layers
} from "lucide-react";
import { toast } from "sonner";

export const AdminPage = () => {
  const { user, signOut } = useAuth();
  const {
    events, vendors, reports, categories, locations, usersList, searchLogs,
    toggleHideItem, toggleVendorVerification, approveVendorVerification, rejectVendorVerification,
    updateReportStatus, toggleUserStatus, addCategory, updateCategory, deleteCategory,
    addLocation, updateLocation, deleteLocation, updateEventStatus
  } = useEventStore();

  // Active Admin Navigation Tab
  const [activeTab, setActiveTab] = useState<
    "verification" | "users" | "events" | "vendors" | "categories" | "reports" | "locations" | "search"
  >("verification");

  // Filters & Search State
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userStatusFilter, setUserStatusFilter] = useState("all");

  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("all");
  const [eventStatusFilter, setEventStatusFilter] = useState("all");

  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState("all");
  const [vendorVerificationFilter, setVendorVerificationFilter] = useState("all");

  const [reportStatusFilter, setReportStatusFilter] = useState("all");

  // Modals & Inspection State
  const [selectedUser, setSelectedUser] = useState<AdminUserRecord | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventModel | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<VendorProfileModel | null>(null);

  // New Category Form Modal State
  const [showAddCatModal, setShowAddCatModal] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatOrder, setNewCatOrder] = useState(1);

  // New Location Form Modal State
  const [showAddLocModal, setShowAddLocModal] = useState(false);
  const [newLocCountry, setNewLocCountry] = useState("Ghana");
  const [newLocRegion, setNewLocRegion] = useState("Greater Accra");
  const [newLocCity, setNewLocCity] = useState("Accra");
  const [newLocArea, setNewLocArea] = useState("");

  // Stats Calculations
  const totalUsers = usersList.length;
  const totalEvents = events.length;
  const totalVendors = vendors.length;
  const pendingVendors = vendors.filter(v => !v.verified);
  const pendingReports = reports.filter(r => r.status === 'pending');

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return toast.error("Category name required");
    const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-');
    addCategory({ name: newCatName, slug, enabled: true, order: Number(newCatOrder) || 1 });
    toast.success(`Category "${newCatName}" created!`);
    setNewCatName("");
    setNewCatSlug("");
    setShowAddCatModal(false);
  };

  const handleAddLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLocArea) return toast.error("Area / Neighborhood required");
    addLocation({
      country: newLocCountry,
      region: newLocRegion,
      city: newLocCity,
      area: newLocArea,
      venuesCount: 0,
      enabled: true,
    });
    toast.success(`Location "${newLocArea}, ${newLocCity}" added!`);
    setNewLocArea("");
    setShowAddLocModal(false);
  };

  // Filtered Users List
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRoleFilter === 'all' || u.role === userRoleFilter;
    const matchesStatus = userStatusFilter === 'all' || u.status === userStatusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Filtered Events List
  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(eventSearch.toLowerCase()) || e.venue.toLowerCase().includes(eventSearch.toLowerCase());
    const matchesCategory = eventCategoryFilter === 'all' || e.category === eventCategoryFilter;
    const matchesStatus = eventStatusFilter === 'all' || e.status === eventStatusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Filtered Vendors List
  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(vendorSearch.toLowerCase()) || v.city.toLowerCase().includes(vendorSearch.toLowerCase());
    const matchesCategory = vendorCategoryFilter === 'all' || v.categories.includes(vendorCategoryFilter as any);
    const matchesVerification =
      vendorVerificationFilter === 'all' ||
      (vendorVerificationFilter === 'verified' && v.verified) ||
      (vendorVerificationFilter === 'pending' && !v.verified);
    return matchesSearch && matchesCategory && matchesVerification;
  });

  // Filtered Reports List
  const filteredReports = reports.filter(r => {
    return reportStatusFilter === 'all' || r.status === reportStatusFilter;
  });

  // Strict Access Control: Only admin role can access the console. Regular users are redirected to Activity (/dashboard)
  if (user?.role !== "admin") {
    return <Navigate to={user ? "/dashboard" : "/signin"} replace />;
  }

  // Full Moderation Console View
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <div className="pt-8 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Top Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-7 h-7 text-red-600" />
              <h1 className="text-3xl font-normal text-foreground">Admin Moderation Console</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Comprehensive platform administration, verification queue, category manager, and trust safety hub.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-red-600 text-white border-none px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold rounded-xl">
              <ShieldCheck className="w-4 h-4" /> Authenticated Administrator
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                signOut();
                toast.info("Admin session ended.");
              }}
              className="rounded-xl text-xs gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Log Out
            </Button>
          </div>
        </div>

        {/* Main Tab Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-stone-200">
          {[
            { id: "verification" as const, label: "Verification Queue", icon: BadgeCheck, badge: pendingVendors.length },
            { id: "users" as const, label: "Users", icon: Users, count: totalUsers },
            { id: "events" as const, label: "Events", icon: Calendar, count: totalEvents },
            { id: "vendors" as const, label: "Vendors", icon: Store, count: totalVendors },
            { id: "categories" as const, label: "Dynamic Categories", icon: Layers, count: categories.length },
            { id: "reports" as const, label: "Reports & Safety", icon: AlertTriangle, badge: pendingReports.length },
            { id: "locations" as const, label: "Locations", icon: MapPin, count: locations.length },
            { id: "search" as const, label: "Search Insights", icon: Search },
          ].map(tab => {
            const active = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  active
                    ? "bg-foreground text-background shadow-sm"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? "text-primary-foreground" : ""}`} />
                {tab.label}
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-bold">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && (
                  <span className="text-[10px] text-stone-400 font-mono">({tab.count})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* SECTION 1: VENDOR VERIFICATION QUEUE */}
        {activeTab === "verification" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/60 border border-emerald-100 p-5 rounded-2xl">
              <div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-normal text-emerald-950">Verification Queue — Trust Center</h3>
                </div>
                <p className="text-xs text-emerald-800 mt-1">
                  Verified vendors earn the official <span className="font-semibold text-emerald-900">✓ Verified</span> badge across public discovery & search.
                </p>
              </div>
              <Badge className="bg-emerald-600 text-white text-xs px-3 py-1 font-semibold rounded-xl">
                {pendingVendors.length} Awaiting Verification
              </Badge>
            </div>

            {pendingVendors.length === 0 ? (
              <div className="text-center py-16 bg-card border border-stone-200 rounded-2xl p-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-base font-normal text-foreground">Verification Queue Clear</h3>
                <p className="text-xs text-muted-foreground mt-1">All vendor service listings are currently verified.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingVendors.map((ven) => (
                  <div key={ven.id} className="bg-card border border-stone-200 rounded-2xl p-6 space-y-4 shadow-xs">
                    <div className="flex items-start gap-4">
                      <img src={ven.logo} alt={ven.name} className="w-14 h-14 rounded-2xl object-cover border border-stone-200 flex-shrink-0" />
                      <div className="space-y-1">
                        <h4 className="text-base font-normal text-foreground">{ven.name}</h4>
                        <p className="text-xs text-muted-foreground">{ven.city} · {ven.location}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {ven.categories.map(c => (
                            <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-xs text-stone-600">
                      <p><span className="font-medium text-stone-900">Contact:</span> {ven.contact.phone || ven.contact.email || "N/A"}</p>
                      <p><span className="font-medium text-stone-900">Service Area:</span> {ven.serviceArea}</p>
                      <p className="line-clamp-2 text-stone-500 mt-1">{ven.description}</p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          approveVendorVerification(ven.id);
                          toast.success(`Approved verification for ${ven.name}`);
                        }}
                        className="flex-1 rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Grant Verification
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          rejectVendorVerification(ven.id);
                          toast.info(`Rejected verification request for ${ven.name}`);
                        }}
                        className="rounded-xl text-xs text-stone-600 gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SECTION 3: USER MANAGEMENT */}
        {activeTab === "users" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Search user name or email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="pl-9 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={userRoleFilter}
                  onChange={e => setUserRoleFilter(e.target.value)}
                  className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
                >
                  <option value="all">All Roles</option>
                  <option value="organizer">Organizer</option>
                  <option value="vendor">Vendor</option>
                  <option value="user">User</option>
                </select>

                <select
                  value={userStatusFilter}
                  onChange={e => setUserStatusFilter(e.target.value)}
                  className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="bg-card border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-medium">
                    <tr>
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Registered</th>
                      <th className="py-3 px-4">Events</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50/50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-normal text-stone-900">{u.name}</p>
                            <p className="text-[11px] text-stone-400">{u.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="capitalize text-[10px]">{u.role}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={`text-[10px] capitalize ${
                              u.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            }`}
                          >
                            {u.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-stone-500">
                          {new Date(u.registeredAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-stone-700">
                          {u.eventsCreatedCount}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedUser(u)}
                            className="h-8 px-2.5 text-xs text-stone-600 hover:text-stone-900 rounded-lg"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" /> View Profile
                          </Button>
                          <Button
                            size="sm"
                            variant={u.status === 'active' ? 'destructive' : 'outline'}
                            onClick={() => {
                              toggleUserStatus(u.id);
                              toast.success(u.status === 'active' ? `Suspended ${u.name}` : `Restored ${u.name}`);
                            }}
                            className="h-8 px-2.5 text-xs rounded-lg gap-1"
                          >
                            {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                            {u.status === 'active' ? 'Suspend' : 'Restore'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: EVENTS MODERATION */}
        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Search event title or venue..."
                  value={eventSearch}
                  onChange={e => setEventSearch(e.target.value)}
                  className="pl-9 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={eventCategoryFilter}
                  onChange={e => setEventCategoryFilter(e.target.value)}
                  className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={eventStatusFilter}
                  onChange={e => setEventStatusFilter(e.target.value)}
                  className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredEvents.map((evt) => (
                <div
                  key={evt.id}
                  className="bg-card border border-stone-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex items-center gap-4">
                    <img src={evt.coverImage} alt={evt.title} className="w-20 h-14 rounded-xl object-cover border border-stone-200" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-normal text-foreground">{evt.title}</h4>
                        <Badge variant={evt.status === 'published' ? 'default' : 'secondary'} className="text-[10px]">
                          {evt.status}
                        </Badge>
                        {evt.hidden && <Badge variant="destructive" className="text-[10px]">Hidden</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {evt.venue} · {evt.city} · <span className="text-stone-700">By {evt.organizer.name}</span>
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-stone-400 mt-1">
                        <span>Category: <strong className="text-stone-600">{evt.category}</strong></span>
                        <span>Start: <strong className="text-stone-600">{new Date(evt.startAt).toLocaleDateString()}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedEvent(evt)}
                      className="rounded-xl text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> Inspect
                    </Button>

                    <Button
                      size="sm"
                      variant={evt.status === 'published' ? 'secondary' : 'default'}
                      onClick={() => {
                        const newStatus = evt.status === 'published' ? 'draft' : 'published';
                        updateEventStatus(evt.id, newStatus);
                        toast.success(`Event status changed to ${newStatus}`);
                      }}
                      className="rounded-xl text-xs"
                    >
                      {evt.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>

                    <Button
                      size="sm"
                      variant={evt.hidden ? "default" : "destructive"}
                      onClick={() => {
                        toggleHideItem("event", evt.id);
                        toast.success(evt.hidden ? "Event unhidden" : "Event hidden from public view");
                      }}
                      className="rounded-xl text-xs gap-1"
                    >
                      {evt.hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {evt.hidden ? "Unhide" : "Hide"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: VENDORS MANAGEMENT */}
        {activeTab === "vendors" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <Input
                  placeholder="Search vendor name or city..."
                  value={vendorSearch}
                  onChange={e => setVendorSearch(e.target.value)}
                  className="pl-9 rounded-xl text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={vendorVerificationFilter}
                  onChange={e => setVendorVerificationFilter(e.target.value)}
                  className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending Verification</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredVendors.map((ven) => (
                <div key={ven.id} className="bg-card border border-stone-200 rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={ven.logo} alt={ven.name} className="w-12 h-12 rounded-xl object-cover border border-stone-200" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-normal text-foreground">{ven.name}</h4>
                          {ven.verified && <BadgeCheck className="w-4 h-4 text-emerald-500" title="Verified Vendor" />}
                          {ven.hidden && <Badge variant="destructive" className="text-[10px]">Hidden</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground">{ven.city} · {ven.location}</p>
                      </div>
                    </div>

                    <Button size="sm" variant="ghost" onClick={() => setSelectedVendor(ven)} className="h-8 px-2 text-xs">
                      Inspect
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {ven.categories.map(c => <Badge key={c} variant="secondary" className="text-[10px]">{c}</Badge>)}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
                    <span className="text-stone-500">Service Area: {ven.serviceArea}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant={ven.verified ? "secondary" : "outline"}
                        onClick={() => {
                          toggleVendorVerification(ven.id);
                          toast.success(ven.verified ? "Verification removed" : "Marked vendor as Verified!");
                        }}
                        className="h-8 rounded-lg text-xs gap-1"
                      >
                        <BadgeCheck className="w-3.5 h-3.5" /> {ven.verified ? "Verified" : "Verify"}
                      </Button>
                      <Button
                        size="sm"
                        variant={ven.hidden ? "default" : "destructive"}
                        onClick={() => {
                          toggleHideItem("vendor", ven.id);
                          toast.success(ven.hidden ? "Vendor unhidden" : "Vendor hidden");
                        }}
                        className="h-8 rounded-lg text-xs gap-1"
                      >
                        {ven.hidden ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 6: DYNAMIC CATEGORIES MANAGEMENT */}
        {activeTab === "categories" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-normal text-foreground">Dynamic Event Categories</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage platform category tags dynamically without hardcoding values in code.
                </p>
              </div>

              <Button
                onClick={() => setShowAddCatModal(true)}
                className="rounded-xl text-xs bg-foreground text-background hover:bg-foreground/90 gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Category
              </Button>
            </div>

            <div className="bg-card border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-medium">
                  <tr>
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Category Name</th>
                    <th className="py-3 px-4">URL Slug</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {categories.sort((a, b) => a.order - b.order).map((cat) => (
                    <tr key={cat.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 font-mono font-medium text-stone-500">#{cat.order}</td>
                      <td className="py-3 px-4 font-normal text-stone-900">{cat.name}</td>
                      <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">{cat.slug}</td>
                      <td className="py-3 px-4">
                        <Badge variant={cat.enabled ? "default" : "secondary"} className="text-[10px]">
                          {cat.enabled ? "Active" : "Disabled"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            updateCategory(cat.id, { enabled: !cat.enabled });
                            toast.success(`Category ${cat.name} ${!cat.enabled ? 'enabled' : 'disabled'}`);
                          }}
                          className="h-8 px-2.5 text-xs rounded-lg"
                        >
                          {cat.enabled ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            deleteCategory(cat.id);
                            toast.success(`Category ${cat.name} removed`);
                          }}
                          className="h-8 px-2 text-xs text-red-600 hover:text-red-700 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 7: REPORTS & MODERATION HUB */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-normal text-foreground">Safety & Moderation Center</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Review user-submitted reports regarding fake events, spam, or misleading vendor profiles.
                </p>
              </div>

              <select
                value={reportStatusFilter}
                onChange={e => setReportStatusFilter(e.target.value)}
                className="h-9 px-3 text-xs bg-card border border-stone-200 rounded-xl text-stone-700 outline-none"
              >
                <option value="all">All Report Statuses</option>
                <option value="pending">Pending</option>
                <option value="reviewing">Reviewing</option>
                <option value="resolved">Resolved</option>
                <option value="dismissed">Dismissed</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredReports.map((rep) => (
                <div key={rep.id} className="bg-card border border-stone-200 rounded-2xl p-5 space-y-3 shadow-xs">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant={rep.targetType === "event" ? "default" : "secondary"} className="uppercase text-[10px]">
                          {rep.targetType}
                        </Badge>
                        <h4 className="text-sm font-normal text-foreground">{rep.targetTitle}</h4>
                        <Badge className={`capitalize text-[10px] ${rep.status === 'pending' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-stone-100 text-stone-700'}`}>
                          {rep.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-red-600 font-semibold mt-1">Reason: {rep.reason}</p>
                      {rep.details && <p className="text-xs text-stone-600 mt-1 font-mono">{rep.details}</p>}
                      <p className="text-[10px] text-stone-400 mt-2">
                        Reported by: <span className="text-stone-700 font-medium">{rep.reporterName || "Anonymous User"}</span> · {new Date(rep.createdAt).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          toggleHideItem(rep.targetType as any, rep.targetId);
                          updateReportStatus(rep.id, "resolved");
                          toast.success(`Hiding ${rep.targetTitle} and marking resolved.`);
                        }}
                        className="rounded-xl text-xs gap-1"
                      >
                        <EyeOff className="w-3.5 h-3.5" /> Hide Listing
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          updateReportStatus(rep.id, "dismissed");
                          toast.info("Report dismissed.");
                        }}
                        className="rounded-xl text-xs"
                      >
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 8: LOCATION HIERARCHY */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-normal text-foreground">Location Hierarchy Management</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Manage multi-level location trees (Country → Region → City → Campus / Area).
                </p>
              </div>

              <Button
                onClick={() => setShowAddLocModal(true)}
                className="rounded-xl text-xs bg-foreground text-background hover:bg-foreground/90 gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Location Area
              </Button>
            </div>

            <div className="bg-card border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-medium">
                  <tr>
                    <th className="py-3 px-4">Country</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Area / Campus</th>
                    <th className="py-3 px-4">Venues</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {locations.map((loc) => (
                    <tr key={loc.id} className="hover:bg-stone-50/50">
                      <td className="py-3 px-4 font-medium text-stone-900">{loc.country}</td>
                      <td className="py-3 px-4 text-stone-600">{loc.region}</td>
                      <td className="py-3 px-4 text-stone-700 font-medium">{loc.city}</td>
                      <td className="py-3 px-4 text-primary font-medium">{loc.area}</td>
                      <td className="py-3 px-4 text-stone-500 font-mono">{loc.venuesCount || 0} venues</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            deleteLocation(loc.id);
                            toast.success(`Removed ${loc.area}`);
                          }}
                          className="h-8 px-2 text-xs text-red-600 hover:text-red-700 rounded-lg"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 9: SEARCH INSIGHTS */}
        {activeTab === "search" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-normal text-foreground">Search Insights & Monitoring</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Understand what users are searching for, popular terms, and failed searches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-stone-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h4 className="text-sm font-normal text-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" /> Popular & Trending Searches
                </h4>
                <div className="space-y-2">
                  {searchLogs.filter(s => s.status !== 'failed').map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-xl text-xs">
                      <div>
                        <p className="font-medium text-stone-900">"{s.query}"</p>
                        <p className="text-[10px] text-stone-400">{s.category} · {s.location}</p>
                      </div>
                      <span className="font-mono text-stone-600 font-medium">{s.count} searches</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card border border-stone-200 rounded-2xl p-5 space-y-4 shadow-xs">
                <h4 className="text-sm font-normal text-foreground flex items-center gap-2 text-amber-700">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Failed Searches (Zero Results)
                </h4>
                <div className="space-y-2">
                  {searchLogs.filter(s => s.status === 'failed').map(s => (
                    <div key={s.id} className="flex items-center justify-between p-3 bg-amber-50/60 border border-amber-100 rounded-xl text-xs">
                      <div>
                        <p className="font-medium text-amber-950">"{s.query}"</p>
                        <p className="text-[10px] text-amber-700">{s.category} · {s.location}</p>
                      </div>
                      <span className="font-mono text-amber-800 font-medium">{s.count} queries</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL 1: ADD CATEGORY */}
      <Dialog open={showAddCatModal} onOpenChange={setShowAddCatModal}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-normal text-lg">Add New Category</DialogTitle>
            <DialogDescription className="text-xs">Create a new dynamic category tag for events.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddCategorySubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-stone-600">Category Name</label>
              <Input placeholder="e.g. Hackathons & Tech" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600">URL Slug (optional)</label>
              <Input placeholder="e.g. hackathons-tech" value={newCatSlug} onChange={e => setNewCatSlug(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600">Display Order</label>
              <Input type="number" value={newCatOrder} onChange={e => setNewCatOrder(Number(e.target.value))} className="mt-1 rounded-xl text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAddCatModal(false)} className="rounded-xl text-xs">Cancel</Button>
              <Button type="submit" className="rounded-xl text-xs bg-foreground text-background">Create Category</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: ADD LOCATION */}
      <Dialog open={showAddLocModal} onOpenChange={setShowAddLocModal}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-normal text-lg">Add Location Area</DialogTitle>
            <DialogDescription className="text-xs">Add a new geographical area or campus node.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddLocationSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-stone-600">Country</label>
              <Input value={newLocCountry} onChange={e => setNewLocCountry(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600">Region</label>
              <Input value={newLocRegion} onChange={e => setNewLocRegion(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600">City</label>
              <Input value={newLocCity} onChange={e => setNewLocCity(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600">Area / Neighborhood / Campus</label>
              <Input placeholder="e.g. Legon Hall Lawn" value={newLocArea} onChange={e => setNewLocArea(e.target.value)} className="mt-1 rounded-xl text-xs" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setShowAddLocModal(false)} className="rounded-xl text-xs">Cancel</Button>
              <Button type="submit" className="rounded-xl text-xs bg-foreground text-background">Save Location</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: INSPECT USER PROFILE */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="font-normal text-lg">User Profile Inspection</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 text-xs pt-2">
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                <p className="font-normal text-sm text-stone-900">{selectedUser.name}</p>
                <p className="text-stone-500">{selectedUser.email}</p>
                <div className="flex gap-2 pt-2">
                  <Badge variant="outline" className="capitalize text-[10px]">{selectedUser.role}</Badge>
                  <Badge className={`capitalize text-[10px] ${selectedUser.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-stone-600">
                <div className="p-3 bg-card border border-stone-200 rounded-xl">
                  <p className="text-[10px] text-stone-400">Events Created</p>
                  <p className="text-base font-semibold text-stone-900 mt-0.5">{selectedUser.eventsCreatedCount}</p>
                </div>
                <div className="p-3 bg-card border border-stone-200 rounded-xl">
                  <p className="text-[10px] text-stone-400">Saved Events</p>
                  <p className="text-base font-semibold text-stone-900 mt-0.5">{selectedUser.savedEventsCount}</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant={selectedUser.status === 'active' ? 'destructive' : 'default'}
                  onClick={() => {
                    toggleUserStatus(selectedUser.id);
                    setSelectedUser(null);
                    toast.success("User status updated");
                  }}
                  className="rounded-xl text-xs"
                >
                  {selectedUser.status === 'active' ? 'Suspend User' : 'Unsuspend User'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 4: INSPECT EVENT DETAILS */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-normal text-lg">Event Detail Inspection</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-4 text-xs pt-2">
              <img src={selectedEvent.coverImage} alt={selectedEvent.title} className="w-full h-40 object-cover rounded-2xl" />
              <div>
                <h4 className="text-base font-normal text-stone-900">{selectedEvent.title}</h4>
                <p className="text-stone-500 mt-1">{selectedEvent.venue} · {selectedEvent.city}</p>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                <p><strong className="text-stone-900">Organizer:</strong> {selectedEvent.organizer.name}</p>
                <p><strong className="text-stone-900">Category:</strong> {selectedEvent.category}</p>
                <p><strong className="text-stone-900">Price:</strong> {selectedEvent.price}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* MODAL 5: INSPECT VENDOR DETAILS */}
      <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
        <DialogContent className="rounded-3xl max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-normal text-lg">Vendor Profile Inspection</DialogTitle>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-center gap-3">
                <img src={selectedVendor.logo} alt={selectedVendor.name} className="w-14 h-14 rounded-2xl object-cover border" />
                <div>
                  <h4 className="text-base font-normal text-stone-900">{selectedVendor.name}</h4>
                  <p className="text-stone-500">{selectedVendor.city} · {selectedVendor.location}</p>
                </div>
              </div>
              <p className="text-stone-600">{selectedVendor.description}</p>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1">
                <p><strong className="text-stone-900">Phone:</strong> {selectedVendor.contact.phone || "N/A"}</p>
                <p><strong className="text-stone-900">Email:</strong> {selectedVendor.contact.email || "N/A"}</p>
                <p><strong className="text-stone-900">Service Area:</strong> {selectedVendor.serviceArea}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AdminPage;
