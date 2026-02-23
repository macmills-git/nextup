import { useState } from "react";
import { Search, Plus, Mail, Phone, MoreHorizontal, Shield, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const teamMembers = [
  { id: 1, name: "Jane Doe", role: "Project Manager", email: "jane@eventnest.com", phone: "+1 555-0201", status: "online", avatar: "JD", events: 12 },
  { id: 2, name: "Michael Chen", role: "Event Coordinator", email: "michael@eventnest.com", phone: "+1 555-0202", status: "online", avatar: "MC", events: 8 },
  { id: 3, name: "Sarah Williams", role: "Vendor Relations", email: "sarah@eventnest.com", phone: "+1 555-0203", status: "away", avatar: "SW", events: 15 },
  { id: 4, name: "David Kim", role: "Budget Analyst", email: "david@eventnest.com", phone: "+1 555-0204", status: "offline", avatar: "DK", events: 6 },
  { id: 5, name: "Emily Brown", role: "Marketing Lead", email: "emily@eventnest.com", phone: "+1 555-0205", status: "online", avatar: "EB", events: 10 },
  { id: 6, name: "Alex Johnson", role: "Logistics", email: "alex@eventnest.com", phone: "+1 555-0206", status: "away", avatar: "AJ", events: 9 },
];

const statusDot: Record<string, string> = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

const TeamPage = () => {
  const [search, setSearch] = useState("");
  const filtered = teamMembers.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Team</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and roles</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Invite Member
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search team members..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(member => (
          <div key={member.id} className="bg-card rounded-xl border border-border p-5 shadow-card">
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
              <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
            </div>

            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{member.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{member.phone}</div>
              <div className="flex items-center gap-2"><UserCheck className="h-3.5 w-3.5" />{member.events} events assigned</div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Message</Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1"><Shield className="h-3.5 w-3.5" /> Permissions</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
