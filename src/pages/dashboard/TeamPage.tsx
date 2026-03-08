import { useState } from "react";
import { Search, Plus, Mail, Phone, MoreHorizontal, Shield, UserCheck, MessageSquare, Eye, Edit, Trash2, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type TeamMember = {
  id: number; name: string; role: string; email: string; phone: string;
  status: string; avatar: string; events: string[]; permission: string;
};

type InvitedMember = {
  id: number; name: string; email: string; initials: string;
};

const teamMembers: TeamMember[] = [
  { id: 1, name: "Jane Doe", role: "Project Manager", email: "jane@eventnest.com", phone: "+1 555-0201", status: "online", avatar: "JD", events: ["Annual Corporate Gala", "Product Launch Party"], permission: "Admin" },
  { id: 2, name: "Michael Chen", role: "Event Coordinator", email: "michael@eventnest.com", phone: "+1 555-0202", status: "online", avatar: "MC", events: ["Annual Corporate Gala", "Team Building Retreat"], permission: "Editor" },
  { id: 3, name: "Sarah Williams", role: "Vendor Relations", email: "sarah@eventnest.com", phone: "+1 555-0203", status: "away", avatar: "SW", events: ["Charity Fundraiser", "Summer Music Festival", "Product Launch Party"], permission: "Editor" },
  { id: 4, name: "David Kim", role: "Budget Analyst", email: "david@eventnest.com", phone: "+1 555-0204", status: "offline", avatar: "DK", events: ["Annual Corporate Gala"], permission: "Viewer" },
  { id: 5, name: "Emily Brown", role: "Marketing Lead", email: "emily@eventnest.com", phone: "+1 555-0205", status: "online", avatar: "EB", events: ["Product Launch Party", "Summer Music Festival"], permission: "Editor" },
  { id: 6, name: "Alex Johnson", role: "Logistics", email: "alex@eventnest.com", phone: "+1 555-0206", status: "away", avatar: "AJ", events: ["Team Building Retreat", "Charity Fundraiser"], permission: "Viewer" },
];

const initialInvited: InvitedMember[] = [
  { id: 1, name: "Tom Crown", email: "tom@company.com", initials: "TC" },
  { id: 2, name: "John Doe", email: "john@company.com", initials: "JD" },
  { id: 3, name: "Michael Crombie", email: "michael@company.com", initials: "MC" },
];

const statusDot: Record<string, string> = { online: "bg-success", away: "bg-warning", offline: "bg-muted-foreground" };
const permissionColors: Record<string, string> = { Admin: "bg-destructive/10 text-destructive", Editor: "bg-primary/10 text-primary", Viewer: "bg-muted text-muted-foreground" };

const allEvents = [...new Set(teamMembers.flatMap(m => m.events))];

const TeamPage = () => {
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [permissionModal, setPermissionModal] = useState<number | null>(null);
  const [members, setMembers] = useState(teamMembers);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Guest");
  const [invitedMembers, setInvitedMembers] = useState(initialInvited);
  const navigate = useNavigate();

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchEvent = eventFilter === "All" || m.events.includes(eventFilter);
    return matchSearch && matchEvent;
  });

  const updatePermission = (id: number, perm: string) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, permission: perm } : m));
    setPermissionModal(null);
  };

  const removeMember = (id: number) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    setMenuOpen(null);
  };

  const handleInvite = () => {
    if (!inviteEmail.trim()) return;
    const initials = inviteEmail.split('@')[0].slice(0, 2).toUpperCase();
    setInvitedMembers(prev => [...prev, { id: Date.now(), name: inviteEmail.split('@')[0], email: inviteEmail, initials }]);
    setInviteEmail("");
  };

  const removeInvited = (id: number) => {
    setInvitedMembers(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and roles</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2" onClick={() => setShowInvite(true)}>
          <Plus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      {/* Invite Members Panel */}
      {showInvite && (
        <div className="bg-card rounded-xl border-2 border-border p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Invite members</h2>
              <p className="text-sm text-muted-foreground mt-1">Add new team members to your workspace. Please consider your organization's policies when adding external people.</p>
            </div>
            <button onClick={() => setShowInvite(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            <select value={inviteRole} onChange={e => setInviteRole(e.target.value)}
              className="h-9 rounded-lg border border-border bg-secondary dark:bg-accent text-sm text-foreground px-3 outline-none">
              <option value="Guest">Guest</option>
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <Input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="name@company.com" className="flex-1 min-w-[200px]"
              onKeyDown={e => { if (e.key === 'Enter') handleInvite(); }} />
            <Button onClick={handleInvite} className="gap-1.5 gradient-primary text-white">
              <UserPlus className="h-4 w-4" /> Invite
            </Button>
          </div>

          {/* Existing members */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">People with existing access</h3>
            <div className="space-y-2">
              {members.slice(0, 3).map(member => (
                <div key={member.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 dark:hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-xs">{member.avatar}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{member.name}</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-secondary dark:bg-accent text-muted-foreground">member</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending invitations */}
          {invitedMembers.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Pending invitations</h3>
              <div className="space-y-2">
                {invitedMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-secondary/50 dark:hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground font-bold text-xs">{member.initials}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-warning">Pending invitation</span>
                      <button onClick={() => removeInvited(member.id)} className="text-destructive/60 hover:text-destructive transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search team members..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant={eventFilter === "All" ? "default" : "outline"} size="sm" onClick={() => setEventFilter("All")}>All Events</Button>
          {allEvents.map(ev => (
            <Button key={ev} variant={eventFilter === ev ? "default" : "outline"} size="sm" onClick={() => setEventFilter(ev)} className="text-xs">
              {ev.length > 20 ? ev.slice(0, 20) + '...' : ev}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(member => (
          <div key={member.id} className="bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-all relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-sm">{member.avatar}</span>
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card ${statusDot[member.status]}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <div className="relative">
                <button className="text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(menuOpen === member.id ? null : member.id)}>
                  <MoreHorizontal className="h-4 w-4" />
                </button>
                {menuOpen === member.id && (
                  <div className="absolute right-0 top-6 bg-card border border-border rounded-lg shadow-elevated z-20 py-1 min-w-[150px]">
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => { navigate('/dashboard/messages'); setMenuOpen(null); }}>
                      <MessageSquare className="h-3.5 w-3.5" /> Message
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary" onClick={() => { setPermissionModal(member.id); setMenuOpen(null); }}>
                      <Shield className="h-3.5 w-3.5" /> Permissions
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-secondary" onClick={() => removeMember(member.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Badge className={`${permissionColors[member.permission]} mb-3`}>{member.permission}</Badge>

            <div className="space-y-2 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{member.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{member.phone}</div>
            </div>

            <div className="mb-4">
              <p className="text-xs text-muted-foreground mb-1.5">Assigned Events:</p>
              <div className="flex flex-wrap gap-1">
                {member.events.map(ev => (
                  <Badge key={ev} variant="outline" className="text-xs">{ev.length > 18 ? ev.slice(0, 18) + '...' : ev}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate('/dashboard/messages')}>Message</Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => setPermissionModal(member.id)}>
                <Shield className="h-3.5 w-3.5" /> Permissions
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Permission Modal */}
      {permissionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setPermissionModal(null)}>
          <div className="bg-card rounded-2xl border border-border p-6 w-full max-w-sm shadow-elevated" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-foreground mb-4">Set Permissions</h2>
            <p className="text-sm text-muted-foreground mb-4">
              {members.find(m => m.id === permissionModal)?.name}
            </p>
            <div className="space-y-2">
              {["Admin", "Editor", "Viewer"].map(perm => (
                <button
                  key={perm}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                  onClick={() => updatePermission(permissionModal, perm)}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{perm}</p>
                    <p className="text-xs text-muted-foreground">
                      {perm === "Admin" ? "Full access to all features" : perm === "Editor" ? "Can edit events and vendors" : "View-only access"}
                    </p>
                  </div>
                  {members.find(m => m.id === permissionModal)?.permission === perm && (
                    <div className="w-4 h-4 rounded-full bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamPage;
