import { useMemo, useState } from "react";
import { MapPin, Calendar, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const seedEvents = [
  { id: 1, title: "Downtown Startup Mixer", date: "2026-05-12", city: "Auckland", venue: "City Hub", guests: 220, distanceKm: 1.3, category: "Corporate" },
  { id: 2, title: "Waterfront Wedding Expo", date: "2026-06-03", city: "Auckland", venue: "Harbour Hall", guests: 480, distanceKm: 2.8, category: "Wedding" },
  { id: 3, title: "North Shore Product Launch", date: "2026-06-18", city: "Auckland", venue: "North Shore Arena", guests: 300, distanceKm: 7.1, category: "Corporate" },
  { id: 4, title: "Wellington Creative Summit", date: "2026-07-10", city: "Wellington", venue: "Te Aro Centre", guests: 540, distanceKm: 640, category: "Conference" },
  { id: 5, title: "Community Culture Festival", date: "2026-07-28", city: "Auckland", venue: "Harbour Park", guests: 1400, distanceKm: 4.9, category: "Social" },
  { id: 6, title: "Design Workshop Weekend", date: "2026-08-09", city: "Auckland", venue: "Creative Loft", guests: 120, distanceKm: 3.6, category: "Workshop" },
];

const NearbyEventsPage = () => {
  const [city, setCity] = useState("Auckland");
  const [category, setCategory] = useState("All");
  const [radiusKm, setRadiusKm] = useState("25");

  const visible = useMemo(
    () =>
      seedEvents.filter(
        (event) =>
          event.city.toLowerCase().includes(city.toLowerCase()) &&
          (category === "All" || event.category === category) &&
          event.distanceKm <= Number(radiusKm || 0)
      ),
    [city, category, radiusKm]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Events at your location</h1>
        <p className="text-sm text-muted-foreground">Discover and track events happening around your city.</p>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Filter className="h-3.5 w-3.5" /> Adjust your location and category
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city..."
          className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none sm:w-72"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none sm:w-52"
        >
          {["All", "Wedding", "Corporate", "Conference", "Social", "Workshop"].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
        <input
          value={radiusKm}
          onChange={(e) => setRadiusKm(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="Radius km"
          className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none sm:w-40"
        />
        <Button variant="outline" className="rounded-lg sm:w-auto w-full">Use current location</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visible.map((event) => (
          <div key={event.id} className="bg-card rounded-xl border border-border p-5">
            <h3 className="font-semibold text-foreground">{event.title}</h3>
            <div className="space-y-1.5 mt-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><Calendar className="h-3.5 w-3.5" />{event.date}</p>
              <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.venue} • {event.distanceKm} km</p>
              <p className="flex items-center gap-2"><Users className="h-3.5 w-3.5" />{event.guests} guests</p>
              <p className="text-xs inline-flex px-2 py-1 rounded-full bg-primary/10 text-primary w-fit">{event.category}</p>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <div className="bg-card rounded-xl border border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">No nearby events found for this location yet.</p>
        </div>
      )}
    </div>
  );
};

export default NearbyEventsPage;
