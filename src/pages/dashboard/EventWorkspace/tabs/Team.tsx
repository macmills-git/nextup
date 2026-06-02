import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore, type EventModel, type TeamMember } from "@/contexts/EventStore";

const ROLES: { key: TeamMember["role"]; label: string; perm: string }[] = [
  { key: "owner", label: "Owner", perm: "Full control" },
  { key: "planner", label: "Planner", perm: "Operations" },
  { key: "finance", label: "Finance Manager", perm: "Budget approvals" },
  { key: "vendor_coord", label: "Vendor Coordinator", perm: "Vendor comms" },
  { key: "guest_mgr", label: "Guest Manager", perm: "RSVP & seating" },
  { key: "logistics", label: "Logistics Lead", perm: "Transport / setup" },
];

const Team = ({ event }: { event: EventModel }) => {
  const { addTeamMember } = useEventStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<TeamMember["role"]>("planner");

  const team = event.team || [];

  const add = () => {
    if (!name.trim()) return;
    addTeamMember(event.id, { name, email, role });
    setName(""); setEmail("");
  };

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-2">
        <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="flex-1" />
        <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="sm:w-56" />
        <select value={role} onChange={e => setRole(e.target.value as any)} className="px-3 rounded-md border border-border bg-background text-foreground text-sm">
          {ROLES.map(r => <option key={r.key} value={r.key}>{r.label}</option>)}
        </select>
        <Button onClick={add} className="bg-foreground text-background"><Plus className="h-4 w-4 mr-1" />Invite</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Members</h3>
          <div className="space-y-3">
            {team.map(m => {
              const r = ROLES.find(r => r.key === m.role);
              return (
                <div key={m.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <div className="w-9 h-9 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-sm">{m.name[0]?.toUpperCase()}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-primary/10 text-primary">{r?.label}</span>
                </div>
              );
            })}
            {!team.length && <p className="text-xs text-muted-foreground">No members yet.</p>}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Role permissions</h3>
          <div className="space-y-2">
            {ROLES.map(r => (
              <div key={r.key} className="flex items-center justify-between py-2 border-b border-border last:border-0 text-xs">
                <span className="font-medium text-foreground">{r.label}</span>
                <span className="text-muted-foreground">{r.perm}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
