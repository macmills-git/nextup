import { useParams, useNavigate, useLocation, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { useEventStore } from "@/contexts/EventStore";
import {
  LayoutDashboard, CalendarRange, ListChecks, Wallet, Store, Users, UserCog,
  FileText, MessageSquare, Radio, BarChart3, ArrowLeft, Share2, Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Overview from "./tabs/Overview";
import Timeline from "./tabs/Timeline";
import Tasks from "./tabs/Tasks";
import Budget from "./tabs/Budget";
import Vendors from "./tabs/Vendors";
import Guests from "./tabs/Guests";
import Team from "./tabs/Team";
import Documents from "./tabs/Documents";
import Communications from "./tabs/Communications";
import EventDay from "./tabs/EventDay";
import Reports from "./tabs/Reports";

const TABS = [
  { key: "overview", label: "Overview", Icon: LayoutDashboard },
  { key: "timeline", label: "Timeline", Icon: CalendarRange },
  { key: "tasks", label: "Tasks", Icon: ListChecks },
  { key: "budget", label: "Budget", Icon: Wallet },
  { key: "vendors", label: "Vendors", Icon: Store },
  { key: "guests", label: "Guests", Icon: Users },
  { key: "team", label: "Team", Icon: UserCog },
  { key: "documents", label: "Documents", Icon: FileText },
  { key: "communications", label: "Comms", Icon: MessageSquare },
  { key: "event-day", label: "Event Day", Icon: Radio },
  { key: "reports", label: "Reports", Icon: BarChart3 },
];

const daysUntil = (date?: string) => {
  if (!date) return null;
  const d = new Date(date).getTime();
  if (Number.isNaN(d)) return null;
  return Math.ceil((d - Date.now()) / 86400000);
};

const EventWorkspace = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { getEvent } = useEventStore();
  const event = eventId ? getEvent(eventId) : undefined;

  if (!event) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-muted-foreground">Event not found.</p>
        <Button variant="ghost" onClick={() => navigate("/dashboard/events")} className="mt-4">
          <ArrowLeft className="h-4 w-4 mr-1" />Back to events
        </Button>
      </div>
    );
  }

  const countdown = daysUntil(event.date);
  const basePath = `/dashboard/events/${event.id}`;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-card border border-border rounded-2xl p-5 sticky top-14 z-10 backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate("/dashboard/events")} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-semibold text-foreground truncate">{event.title}</h1>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  event.status === "launched" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                  event.status === "archived" ? "bg-muted text-muted-foreground" :
                  "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}>{event.status}</span>
                {countdown !== null && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-primary/15 text-primary">
                    {countdown > 0 ? `T-${countdown}d` : countdown === 0 ? "TODAY" : `+${-countdown}d post`}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {event.metadata?.eventType} · {event.location || "No location"} · {event.guests || 0} guests
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Workspace link copied"); }}>
              <Share2 className="h-3.5 w-3.5" />Share
            </Button>
            <Button size="sm" variant="ghost"><Settings className="h-3.5 w-3.5" /></Button>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex gap-1 overflow-x-auto -mx-1 px-1 pb-0.5 scrollbar-hide">
          {TABS.map(({ key, label, Icon }) => (
            <NavLink key={key} to={`${basePath}/${key}`}
              className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                isActive ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}>
              <Icon className="h-3.5 w-3.5" />{label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <Routes>
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<Overview event={event} />} />
        <Route path="timeline" element={<Timeline event={event} />} />
        <Route path="tasks" element={<Tasks event={event} />} />
        <Route path="budget" element={<Budget event={event} />} />
        <Route path="vendors" element={<Vendors event={event} />} />
        <Route path="guests" element={<Guests event={event} />} />
        <Route path="team" element={<Team event={event} />} />
        <Route path="documents" element={<Documents event={event} />} />
        <Route path="communications" element={<Communications event={event} />} />
        <Route path="event-day" element={<EventDay event={event} />} />
        <Route path="reports" element={<Reports event={event} />} />
      </Routes>
    </div>
  );
};

export default EventWorkspace;
