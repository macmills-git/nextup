import { useState } from "react";
import { CalendarRange, Check, X, Clock } from "lucide-react";

const seed = [
  { id: 1, client: "Jane Doe", event: "Spring Wedding", date: "2026-05-12", value: "$1,800", status: "confirmed" },
  { id: 2, client: "Michael Chen", event: "Tech Summit Photo", date: "2026-06-03", value: "$2,400", status: "pending" },
  { id: 3, client: "Sarah Williams", event: "Birthday Coverage", date: "2026-04-22", value: "$650", status: "confirmed" },
  { id: 4, client: "Launch Co.", event: "Product Launch", date: "2026-07-09", value: "$3,200", status: "pending" },
  { id: 5, client: "David Kim", event: "Corporate Headshots", date: "2026-03-30", value: "$900", status: "completed" },
];

const statusStyle: Record<string, string> = {
  confirmed: "bg-emerald-500/10 text-emerald-600",
  pending: "bg-amber-500/10 text-amber-600",
  completed: "bg-muted text-foreground",
};

const VendorBookingsPage = () => {
  const [tab, setTab] = useState<"all" | "pending" | "confirmed" | "completed">("all");
  const filtered = tab === "all" ? seed : seed.filter((b) => b.status === tab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Bookings</h1>
        <p className="text-sm text-muted-foreground">Track every event you've been booked for.</p>
      </div>

      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {(["all", "pending", "confirmed", "completed"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
              tab === t ? "bg-card border border-border text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {["Client", "Event", "Date", "Value", "Status"].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr key={b.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{b.client}</td>
                <td className="py-3 px-4 text-muted-foreground">{b.event}</td>
                <td className="py-3 px-4 text-muted-foreground">{b.date}</td>
                <td className="py-3 px-4 text-foreground">{b.value}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full capitalize ${statusStyle[b.status]}`}>
                    {b.status === "pending" ? <Clock className="h-3 w-3" /> : b.status === "confirmed" ? <Check className="h-3 w-3" /> : <CalendarRange className="h-3 w-3" />}
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorBookingsPage;
