import { useState } from "react";
import { Calendar, Plus, Search, MapPin, Clock, Users, MoreHorizontal, X, Trash2, Edit, Eye, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Event = {
  id: number; title: string; date: string; time: string; location: string;
  guests: number; status: string; budget: string; category: string;
};

const initialEvents: Event[] = [
  { id: 1, title: "Annual Corporate Gala", date: "Mar 15, 2026", time: "6:00 PM", location: "Grand Ballroom, Downtown", guests: 250, status: "upcoming", budget: "$45,000", category: "Corporate" },
  { id: 2, title: "Product Launch Party", date: "Mar 22, 2026", time: "7:00 PM", location: "Tech Hub, Silicon Ave", guests: 150, status: "upcoming", budget: "$28,000", category: "Corporate" },
  { id: 3, title: "Team Building Retreat", date: "Apr 5, 2026", time: "9:00 AM", location: "Mountain Lodge Resort", guests: 80, status: "planning", budget: "$15,000", category: "Corporate" },
  { id: 4, title: "Charity Fundraiser", date: "Apr 18, 2026", time: "5:00 PM", location: "City Art Museum", guests: 300, status: "planning", budget: "$52,000", category: "Social" },
  { id: 5, title: "Summer Music Festival", date: "Jun 10, 2026", time: "12:00 PM", location: "Central Park Amphitheater", guests: 500, status: "draft", budget: "$75,000", category: "Social" },
  { id: 6, title: "Wedding Reception — Smith", date: "Feb 14, 2026", time: "4:00 PM", location: "Rose Garden Estate", guests: 120, status: "completed", budget: "$35,000", category: "Wedding" },
  { id: 7, title: "Tech Conference 2026", date: "May 20, 2026", time: "8:00 AM", location: "Convention Center", guests: 1000, status: "planning", budget: "$120,000", category: "Conference" },
];

const categories = ["All", "Wedding", "Corporate", "Conference", "Social"];

const statusColors: Record<string, string> = {
  upcoming: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  planning: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  draft: "bg-muted text-muted-foreground",
  completed: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
};

const EventsPage = () => {
  const [events, setEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const navigate = useNavigate();

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    setMenuOpen(null);
  };

  const renderCards = (list: Event[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {list.map(event => (
        <div key={event.id} className="bg-card rounded-xl border border-border p-5 hover:shadow-elevated transition-all relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge className={statusColors[event.status]}>{event.status}</Badge>
              <Badge variant="outline" className="text-xs">{event.category}</Badge>
            </div>
            <div className="relative">
              <button className="text-muted-foreground hover:text-foreground" onClick={() => setMenuOpen(menuOpen === event.id ? null : event.id)}>
                <MoreHorizontal className="h-4 w-4" />
              </button>
              {menuOpen === event.id && (
                <div className="absolute right-0 top-6 bg-card border border-border rounded-lg shadow-elevated z-20 py-1 min-w-[140px]">
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted" onClick={() => { navigate(`/dashboard/events/${event.id}`); setMenuOpen(null); }}>
                    <Eye className="h-3.5 w-3.5" /> View Details
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted" onClick={() => { navigate(`/dashboard/events/${event.id}`); setMenuOpen(null); }}>
                    <Edit className="h-3.5 w-3.5" /> Edit Event
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-muted" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-3">{event.title}</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{event.date}</div>
            <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{event.time}</div>
            <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.location}</div>
            <div className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{event.guests} guests</div>
          </div>
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">{event.budget}</span>
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate(`/dashboard/events/${event.id}`)}>View Details</Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Events</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your events</p>
        </div>
        <Button className="bg-foreground text-background hover:bg-foreground/90 gap-2 rounded-lg" onClick={() => navigate('/dashboard/events/new')}>
          <Plus className="h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${categoryFilter === cat ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground border border-border'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">{renderCards(filtered)}</TabsContent>
        {["upcoming", "planning", "completed"].map(tab => (
          <TabsContent key={tab} value={tab} className="mt-4">
            {renderCards(filtered.filter(e => e.status === tab))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default EventsPage;
