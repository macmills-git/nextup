import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Store,
  Plus,
  Heart,
  Settings,
  ShieldAlert,
  Edit3,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useEventStore } from "@/contexts/EventStore";
import { useMemo } from "react";
import SettingsPage from "./dashboard/SettingsPage";

// 1. Dashboard Overview Component
const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, vendors, savedEventIds } = useEventStore();

  const myEvents = useMemo(() => {
    return events.filter((e) => e.ownerId === user?.id || e.ownerId === "current-user");
  }, [events, user]);

  const myVendorProfile = useMemo(() => {
    return vendors.find((v) => v.ownerId === user?.id || v.ownerId === "current-user");
  }, [vendors, user]);

  const publishedCount = myEvents.filter((e) => e.status === "published").length;
  const draftCount = myEvents.filter((e) => e.status === "draft").length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border border-stone-200/80 bg-card p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
            Account Overview
          </span>
          <h2 className="mt-3 text-2xl md:text-3xl font-normal text-foreground">
            Welcome back, {user?.name || user?.email?.split("@")[0] || "Organizer"}
          </h2>
          <p className="mt-1.5 max-w-xl text-xs md:text-sm text-muted-foreground leading-relaxed">
            Manage your published events, draft listings, vendor service storefront, and saved bookmarks all from your activity dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button onClick={() => navigate("/create/event")} className="rounded-xl font-bold gap-2 bg-primary text-primary-foreground shadow-sm">
            <Plus className="h-4 w-4" /> Create Event
          </Button>
          <Button variant="outline" onClick={() => navigate("/create/vendor")} className="rounded-xl font-semibold gap-2 border-stone-300">
            <Store className="h-4 w-4" /> {myVendorProfile ? "Edit Vendor Profile" : "List as Vendor"}
          </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground uppercase">Published Events</p>
            <Calendar className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{publishedCount}</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground uppercase">Draft Listings</p>
            <Calendar className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{draftCount}</p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-muted-foreground uppercase">Saved Bookmarks</p>
            <Heart className="h-4 w-4 text-red-500" />
          </div>
          <p className="mt-3 text-3xl font-black text-foreground">{savedEventIds.length}</p>
        </div>
      </div>

      {/* My Events Preview */}
      <div className="rounded-3xl border border-stone-200 bg-card p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-normal text-foreground">Your Event Listings</h3>
            <p className="text-xs text-muted-foreground">Manage your published and draft events.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/dashboard/events")} className="rounded-xl text-xs font-semibold">
            View All ({myEvents.length})
          </Button>
        </div>

        {myEvents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 p-8 text-center bg-stone-50/50">
            <p className="text-xs text-muted-foreground">You haven't created any event listings yet.</p>
            <Button onClick={() => navigate("/create/event")} className="mt-4 rounded-xl text-xs font-semibold">
              Publish Your First Event
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {myEvents.slice(0, 4).map((e) => (
              <div key={e.id} className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={e.coverImage} alt={e.title} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-normal text-foreground">{e.title}</h4>
                      <Badge variant={e.status === "published" ? "default" : "secondary"} className="text-[10px]">
                        {e.status}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{e.venue} · {e.city}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => navigate(`/events/${e.id}/edit`)} className="rounded-xl text-xs gap-1 font-semibold">
                    <Edit3 className="w-3.5 h-3.5 text-primary" /> Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/events/${e.id}`)} className="rounded-xl text-xs gap-1">
                    View Live <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Manage My Events Component
const MyEventsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { events, deleteEvent, updateEventStatus } = useEventStore();

  const myEvents = useMemo(() => {
    return events.filter((e) => e.ownerId === user?.id || e.ownerId === "current-user");
  }, [events, user]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-normal text-foreground">Manage Your Events</h2>
          <p className="text-xs text-muted-foreground">Draft, publish, edit, or remove your event listings.</p>
        </div>
        <Button onClick={() => navigate("/create/event")} className="rounded-xl text-xs font-bold gap-1 bg-primary text-primary-foreground">
          <Plus className="w-4 h-4" /> New Event
        </Button>
      </div>

      <div className="space-y-3">
        {myEvents.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-stone-300 bg-card p-6">
            <Calendar className="w-8 h-8 text-stone-300 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No events found in your account.</p>
            <Button onClick={() => navigate("/create/event")} className="mt-4 rounded-xl text-xs font-semibold">
              Create an Event
            </Button>
          </div>
        ) : (
          myEvents.map((e) => (
            <div key={e.id} className="p-4 rounded-2xl border border-stone-200 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={e.coverImage} alt={e.title} className="w-16 h-14 rounded-xl object-cover" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-normal text-foreground">{e.title}</h3>
                    <Badge variant={e.status === "published" ? "default" : "secondary"} className="text-[10px]">
                      {e.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{e.venue}, {e.city} · Category: {e.category}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => navigate(`/events/${e.id}/edit`)} className="rounded-xl text-xs gap-1 font-semibold">
                  <Edit3 className="w-3.5 h-3.5 text-primary" /> Edit Event
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate(`/events/${e.id}`)} className="rounded-xl text-xs">
                  View
                </Button>
                {e.status === "draft" && (
                  <Button size="sm" onClick={() => updateEventStatus(e.id, "published")} className="rounded-xl text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                    Publish Live
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => deleteEvent(e.id)} className="rounded-xl text-xs text-red-500 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 3. Saved Events Component
const SavedEventsPage = () => {
  const navigate = useNavigate();
  const { events, savedEventIds, toggleSaveEvent } = useEventStore();

  const savedList = useMemo(() => {
    return events.filter((e) => savedEventIds.includes(e.id));
  }, [events, savedEventIds]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-normal text-foreground">Saved Events</h2>
        <p className="text-xs text-muted-foreground">Bookmarked events you are interested in attending.</p>
      </div>

      {savedList.length === 0 ? (
        <div className="text-center py-16 rounded-2xl border border-dashed border-stone-300 bg-card p-6">
          <Heart className="w-8 h-8 text-stone-300 mx-auto mb-2" />
          <h3 className="text-base font-normal text-foreground">No saved events</h3>
          <p className="text-xs text-muted-foreground mt-1">Browse events and click the heart icon to save them here.</p>
          <Button onClick={() => navigate("/events")} className="mt-4 rounded-xl text-xs font-semibold">
            Explore Events
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedList.map((e) => (
            <div key={e.id} className="p-4 rounded-2xl border border-stone-200 bg-card flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img src={e.coverImage} alt={e.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="min-w-0">
                  <h3 className="text-xs font-normal text-foreground truncate">{e.title}</h3>
                  <p className="text-[11px] text-muted-foreground truncate">{e.venue}, {e.city}</p>
                </div>
              </div>

              <div className="flex gap-1.5 flex-shrink-0">
                <Button size="sm" variant="outline" onClick={() => navigate(`/events/${e.id}`)} className="rounded-xl text-xs">
                  View
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toggleSaveEvent(e.id)} className="rounded-xl text-xs text-red-500">
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 4. Vendor Storefront Redirect Component
const CreateVendorPageRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { vendors } = useEventStore();

  const myVendor = useMemo(() => {
    return vendors.find((v) => v.ownerId === user?.id || v.ownerId === "current-user");
  }, [vendors, user]);

  return (
    <div className="p-8 bg-card border border-stone-200/80 rounded-3xl text-center space-y-4 max-w-2xl mx-auto">
      <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
        <Store className="w-7 h-7" />
      </div>
      <h2 className="text-2xl font-normal text-foreground">Vendor Services Storefront</h2>
      <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
        {myVendor
          ? `Your vendor storefront "${myVendor.name}" is currently active on the directory.`
          : "List your event services (DJ, Catering, MC, Security, Sound, Decor) on NextUp to get booked by event organizers."}
      </p>
      <Button onClick={() => navigate("/create/vendor")} className="rounded-xl text-xs font-bold px-6 bg-primary text-primary-foreground">
        {myVendor ? "Edit Vendor Profile" : "Create Vendor Profile"}
      </Button>
    </div>
  );
};

// MAIN REDESIGNED DASHBOARD / ACTIVITY PAGE
export const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const tabs = [
    { label: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { label: "My Events", path: "/dashboard/events", icon: Calendar },
    { label: "Vendor Profile", path: "/dashboard/vendors", icon: Store },
    { label: "Saved Events", path: "/dashboard/saved", icon: Heart },
    { label: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  if (user?.role === "admin") {
    tabs.push({ label: "Admin Console", path: "/admin", icon: ShieldAlert });
  }

  const isTabActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />

      <main className="pt-28 pb-20 container mx-auto px-4 lg:px-8 max-w-7xl flex-1">
        {/* Page Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">
              NextUp Activity
            </span>
            <h1 className="text-3xl md:text-4xl font-normal text-foreground mt-2">
              Activity & Account Hub
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Manage your event listings, vendor storefront, saved items, and settings.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/create/event")} className="rounded-xl text-xs font-bold gap-1.5 bg-primary text-primary-foreground shadow-sm">
              <Plus className="w-4 h-4" /> Create Event
            </Button>
          </div>
        </div>

        {/* Sub-Navigation Pill Bar */}
        <div className="flex items-center gap-2 border-b border-stone-200 pb-4 mb-8 overflow-x-auto">
          {tabs.map((t) => {
            const active = isTabActive(t.path);
            const IconComponent = t.icon;
            return (
              <button
                key={t.path}
                onClick={() => navigate(t.path)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "bg-foreground text-background shadow-xs"
                    : "bg-stone-100/80 text-stone-700 hover:bg-stone-200/80 hover:text-black"
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Section */}
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="events" element={<MyEventsPage />} />
          <Route path="vendors" element={<CreateVendorPageRedirect />} />
          <Route path="saved" element={<SavedEventsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
