import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, ClipboardCheck, MessageSquare, Eye } from "lucide-react";

const VendorDashboardPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"events" | "bookings" | "contacts">("events");
  const publishedEvents = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
    } catch {
      return [];
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Vendor dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage your events, bookings and organiser contacts in one place.</p>
      </div>

      <div className="flex gap-1 bg-muted rounded-lg p-1 w-fit">
        {[
          { id: "events", label: "Events", icon: Calendar },
          { id: "bookings", label: "Bookings", icon: ClipboardCheck },
          { id: "contacts", label: "Contacts", icon: MessageSquare },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as any)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              tab === item.id ? "bg-card border border-border text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className="h-3.5 w-3.5" /> {item.label}
          </button>
        ))}
      </div>

      {tab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(publishedEvents.length > 0 ? publishedEvents.slice(0, 6).map((event: any) => ({
            title: event.title,
            date: event.date,
            status: "Open for vendors",
          })) : [
            { title: "Downtown Tech Expo", date: "2026-05-21", status: "Applied" },
            { title: "Autumn Wedding Fair", date: "2026-06-11", status: "Invited" },
          ]).map((event: any) => (
            <div key={event.title} className="bg-card rounded-xl border border-border p-4">
              <p className="font-medium text-foreground">{event.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
              <span className="inline-flex mt-3 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{event.status}</span>
              <button
                className="mt-3 block text-xs text-primary hover:underline"
                onClick={() => navigate("/dashboard/messages")}
              >
                Contact organiser
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "bookings" && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          {[
            { name: "Akolo Studio Package A", value: "$1,200", state: "Confirmed" },
            { name: "Event Bloom Decor Bundle", value: "$2,900", state: "Pending" },
          ].map((booking) => (
            <div key={booking.name} className="flex items-center justify-between border border-border rounded-lg px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-foreground">{booking.name}</p>
                <p className="text-xs text-muted-foreground">{booking.value}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-muted text-foreground">{booking.state}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "contacts" && (
        <div className="bg-card rounded-xl border border-border p-4 space-y-2">
          {[
            { person: "Jane Doe", event: "Downtown Tech Expo", msg: "Looking for full-day photo coverage" },
            { person: "Michael Chen", event: "Autumn Wedding Fair", msg: "Can you share updated package rates?" },
          ].map((contact) => (
            <div key={contact.person} className="border border-border rounded-lg p-3">
              <p className="text-sm font-medium text-foreground">{contact.person}</p>
              <p className="text-xs text-muted-foreground">{contact.event}</p>
              <p className="text-xs text-foreground mt-2">{contact.msg}</p>
              <button className="mt-2 text-xs text-primary inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Open thread
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VendorDashboardPage;
