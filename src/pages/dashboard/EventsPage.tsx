import { useState } from "react";
import { Calendar, Plus, Search, Filter, MapPin, Clock, Users, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const events = [
  { id: 1, title: "Annual Corporate Gala", date: "Mar 15, 2026", time: "6:00 PM", location: "Grand Ballroom, Downtown", guests: 250, status: "upcoming", budget: "$45,000" },
  { id: 2, title: "Product Launch Party", date: "Mar 22, 2026", time: "7:00 PM", location: "Tech Hub, Silicon Ave", guests: 150, status: "upcoming", budget: "$28,000" },
  { id: 3, title: "Team Building Retreat", date: "Apr 5, 2026", time: "9:00 AM", location: "Mountain Lodge Resort", guests: 80, status: "planning", budget: "$15,000" },
  { id: 4, title: "Charity Fundraiser", date: "Apr 18, 2026", time: "5:00 PM", location: "City Art Museum", guests: 300, status: "planning", budget: "$52,000" },
  { id: 5, title: "Summer Music Festival", date: "Jun 10, 2026", time: "12:00 PM", location: "Central Park Amphitheater", guests: 500, status: "draft", budget: "$75,000" },
  { id: 6, title: "Wedding Reception — Smith", date: "Feb 14, 2026", time: "4:00 PM", location: "Rose Garden Estate", guests: 120, status: "completed", budget: "$35,000" },
];

const statusColors: Record<string, string> = {
  upcoming: "bg-primary/10 text-primary",
  planning: "bg-warning/10 text-warning",
  draft: "bg-muted text-muted-foreground",
  completed: "bg-success/10 text-success",
};

const EventsPage = () => {
  const [search, setSearch] = useState("");

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your events</p>
        </div>
        <Button className="gradient-primary text-primary-foreground gap-2">
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(event => (
              <div key={event.id} className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={statusColors[event.status]}>{event.status}</Badge>
                  <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{event.date}</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{event.time}</div>
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</div>
                  <div className="flex items-center gap-2"><Users className="h-4 w-4" />{event.guests} guests</div>
                </div>
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{event.budget}</span>
                  <Button variant="ghost" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {["upcoming", "planning", "completed"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.filter(e => e.status === tab).map(event => (
                <div key={event.id} className="bg-card rounded-xl border border-border p-5 shadow-card hover:shadow-elevated transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={statusColors[event.status]}>{event.status}</Badge>
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{event.date}</div>
                    <div className="flex items-center gap-2"><Clock className="h-4 w-4" />{event.time}</div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" />{event.guests} guests</div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{event.budget}</span>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EventsPage;
