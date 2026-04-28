import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const VendorFindEventsPage = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [city, setCity] = useState("All");

  const events = useMemo(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
      const seed = [
        { id: "s1", title: "Auckland Tech Summit 2026", date: "2026-05-21", city: "Auckland", location: "Sky Tower Convention", guests: 600, category: "Conference" },
        { id: "s2", title: "Spring Wedding Festival", date: "2026-06-11", city: "Wellington", location: "Botanic Gardens", guests: 250, category: "Wedding" },
        { id: "s3", title: "Founders Mixer", date: "2026-04-18", city: "Auckland", location: "City Lounge", guests: 120, category: "Corporate" },
        { id: "s4", title: "Music in the Park", date: "2026-07-02", city: "Christchurch", location: "Hagley Park", guests: 1200, category: "Social" },
      ];
      return [...stored, ...seed];
    } catch {
      return [];
    }
  }, []);

  const cities = ["All", ...Array.from(new Set(events.map((e: any) => e.city).filter(Boolean)))];
  const visible = events.filter((e: any) =>
    (city === "All" || e.city === city) &&
    (q === "" || e.title?.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Find events</h1>
        <p className="text-sm text-muted-foreground">Discover events looking for vendors and pitch your services.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-background text-sm outline-none" />
        </div>
        <select value={city} onChange={(e) => setCity(e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none sm:w-48">
          {cities.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((e: any) => (
          <div key={e.id} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-foreground truncate">{e.title}</h3>
                {e.category && <span className="text-[11px] inline-flex mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary">{e.category}</span>}
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{e.date}</p>
              <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{e.location} • {e.city}</p>
              {e.guests && <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{e.guests} expected guests</p>}
            </div>
            <Button size="sm" className="rounded-lg mt-4 w-full" onClick={() => navigate("/vendor/messages")}>
              <Send className="h-3.5 w-3.5 mr-1.5" /> Pitch organiser
            </Button>
          </div>
        ))}
        {visible.length === 0 && (
          <div className="col-span-full text-center py-10 text-sm text-muted-foreground">No matching events.</div>
        )}
      </div>
    </div>
  );
};

export default VendorFindEventsPage;
