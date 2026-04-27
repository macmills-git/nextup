import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  MessageSquare,
  Settings,
  Bell,
  Sparkles,
  Calendar,
  Users,
  Ticket,
  BarChart3,
  Megaphone,
  MapPin,
  ClipboardList,
  UserRound,
  Layers,
  Brain,
  UserCog,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useAuth } from "@/contexts/AuthContext";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  desc?: string;
};

const primaryItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Analytics", path: "/dashboard" },
  { icon: Store, label: "Vendors", path: "/dashboard/vendors" },
  { icon: Layers, label: "Templates", path: "/dashboard/templates" },
  { icon: Calendar, label: "Events", path: "/dashboard/events" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Brain, label: "AI Assistant", path: "/dashboard/ai" },
  { icon: BarChart3, label: "Reports", path: "/dashboard/reports" },
  { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing" },
  { icon: Megaphone, label: "Marketing", path: "/dashboard/marketing" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const sectionTabs: Record<string, { title: string; items: NavItem[] }> = {
  analytics: {
    title: "Analytics",
    items: [
      { icon: LayoutDashboard, label: "Overview", path: "/dashboard", desc: "Performance snapshot" },
      { icon: Calendar, label: "Events", path: "/dashboard/events", desc: "Create and publish events" },
      { icon: MapPin, label: "Nearby events", path: "/dashboard/events/nearby", desc: "Events by location" },
      { icon: Sparkles, label: "AI Assistant", path: "/dashboard/ai", desc: "Create events with AI" },
      { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing", desc: "Tickets and check-ins" },
      { icon: BarChart3, label: "Reports", path: "/dashboard/reports", desc: "Event analytics and trends" },
      { icon: Megaphone, label: "Marketing", path: "/dashboard/marketing", desc: "Bulk email campaigns" },
    ],
  },
  vendors: {
    title: "Vendors",
    items: [
      { icon: Store, label: "Marketplace", path: "/dashboard/vendors", desc: "Browse and discover vendors" },
      { icon: UserRound, label: "Vendor dashboard", path: "/dashboard/vendor-dashboard", desc: "Events, bookings and contacts" },
      { icon: ClipboardList, label: "Onboarding", path: "/dashboard/vendor-onboarding", desc: "Set up and edit storefront" },
      { icon: MessageSquare, label: "Vendor messages", path: "/dashboard/messages", desc: "Contact organisers and teams" },
    ],
  },
  templates: {
    title: "Templates",
    items: [
      { icon: Layers, label: "All templates", path: "/dashboard/templates", desc: "Browse all event templates" },
      { icon: Sparkles, label: "Featured picks", path: "/dashboard/templates", desc: "Hand-picked starter layouts" },
      { icon: UserCog, label: "My drafts", path: "/dashboard/templates", desc: "Saved and remixed templates" },
    ],
  },
  events: {
    title: "Events",
    items: [
      { icon: Calendar, label: "All events", path: "/dashboard/events", desc: "Track all event workflows" },
      { icon: ClipboardList, label: "Publish event", path: "/dashboard/events/publish", desc: "Simple publish form" },
      { icon: MapPin, label: "Events near you", path: "/dashboard/events/nearby", desc: "Location + category filters" },
    ],
  },
  team: {
    title: "Team",
    items: [
      { icon: Users, label: "Team board", path: "/dashboard/team", desc: "Members and role assignments" },
      { icon: MessageSquare, label: "Team chat", path: "/dashboard/messages", desc: "Group collaboration threads" },
      { icon: BarChart3, label: "Productivity", path: "/dashboard/reports", desc: "Execution and delivery stats" },
    ],
  },
  ai: {
    title: "AI Assistant",
    items: [
      { icon: Brain, label: "Assistant home", path: "/dashboard/ai", desc: "Prompt and planning workspace" },
      { icon: Sparkles, label: "Create event by AI", path: "/dashboard/ai", desc: "Generate event plan quickly" },
      { icon: Calendar, label: "Publish from AI", path: "/dashboard/events/publish", desc: "Push AI draft to event" },
    ],
  },
  reports: {
    title: "Reports",
    items: [
      { icon: BarChart3, label: "Overview reports", path: "/dashboard/reports", desc: "Performance and KPI trends" },
      { icon: Ticket, label: "Ticketing reports", path: "/dashboard/ticketing", desc: "Sales and check-in metrics" },
      { icon: Megaphone, label: "Campaign reports", path: "/dashboard/marketing", desc: "Email reach and opens" },
    ],
  },
  ticketing: {
    title: "Ticketing",
    items: [
      { icon: Ticket, label: "Ticket tiers", path: "/dashboard/ticketing", desc: "Create and manage tiers" },
      { icon: Users, label: "Attendees", path: "/dashboard/ticketing", desc: "Track sold and expected guests" },
      { icon: BarChart3, label: "Ticket analytics", path: "/dashboard/ticketing", desc: "Revenue and conversion data" },
    ],
  },
  marketing: {
    title: "Marketing",
    items: [
      { icon: Megaphone, label: "Campaign builder", path: "/dashboard/marketing", desc: "Send to invitees or buyers" },
      { icon: MessageSquare, label: "Audience messages", path: "/dashboard/messages", desc: "Follow-up conversations" },
      { icon: BarChart3, label: "Delivery stats", path: "/dashboard/marketing", desc: "Opens and engagement" },
    ],
  },
  messages: {
    title: "Messages",
    items: [
      { icon: MessageSquare, label: "Inbox", path: "/dashboard/messages", desc: "Chats, teams and vendors" },
      { icon: Users, label: "Team", path: "/dashboard/team", desc: "Collaboration workspace" },
      { icon: Megaphone, label: "Marketing", path: "/dashboard/marketing", desc: "Bulk email announcements" },
    ],
  },
  notifications: {
    title: "Notifications",
    items: [
      { icon: Bell, label: "All notifications", path: "/dashboard/notifications", desc: "Alerts and updates" },
      { icon: Calendar, label: "Events", path: "/dashboard/events", desc: "Event reminders and status" },
      { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing", desc: "Sales and attendance alerts" },
    ],
  },
  settings: {
    title: "Settings",
    items: [
      { icon: Settings, label: "General settings", path: "/dashboard/settings", desc: "Workspace preferences" },
      { icon: Users, label: "Team", path: "/dashboard/team", desc: "Members and permissions" },
      { icon: UserRound, label: "Vendor profile", path: "/dashboard/vendor-onboarding", desc: "Business and contact details" },
    ],
  },
};

interface Props {
  open?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ open = false, onClose }: Props) => {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));

  const getSectionKey = () => {
    if (location.pathname.startsWith("/dashboard/templates")) return "templates";
    if (location.pathname.startsWith("/dashboard/events")) return "events";
    if (location.pathname.startsWith("/dashboard/team")) return "team";
    if (location.pathname.startsWith("/dashboard/ai")) return "ai";
    if (location.pathname.startsWith("/dashboard/reports")) return "reports";
    if (location.pathname.startsWith("/dashboard/ticketing")) return "ticketing";
    if (location.pathname.startsWith("/dashboard/marketing")) return "marketing";
    if (location.pathname.startsWith("/dashboard/vendors") || location.pathname.startsWith("/dashboard/vendor")) return "vendors";
    if (location.pathname.startsWith("/dashboard/messages")) return "messages";
    if (location.pathname.startsWith("/dashboard/notifications")) return "notifications";
    if (location.pathname.startsWith("/dashboard/settings")) return "settings";
    return "analytics";
  };

  const activeSectionKey = getSectionKey();
  const activeSection = sectionTabs[activeSectionKey];

  const Rail = (
    <div className="w-[60px] h-full bg-card border-r border-border flex flex-col items-center py-3">
      <Link to="/" className="mb-3" aria-label="Home">
        <AnimatedLogo size={22} />
      </Link>
      <nav className="flex-1 flex flex-col items-center gap-1 mt-2">
        {primaryItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              title={item.label}
              className={cn(
                "group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-foreground text-background text-[11px] font-medium opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition whitespace-nowrap z-50 shadow-lg">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {user?.role === "vendor" && !user?.vendorOnboarded && (
        <Link
          to="/dashboard/vendor-onboarding"
          title="Complete vendor profile"
          className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/15 text-primary hover:bg-primary/25 transition-colors mt-2"
        >
          <Sparkles className="h-4 w-4" />
        </Link>
      )}
    </div>
  );

  const Panel = (
    <div className="h-full bg-card border-r border-border w-[250px]">
      <div className="h-full flex flex-col">
        <div className="px-5 pt-4 pb-3 border-b border-border">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Navigation</p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">{activeSection.title}</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
          {activeSection.items.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-start gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all",
                  active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium leading-none">{item.label}</p>
                  {item.desc && (
                    <p className={cn("text-[11px] mt-1 leading-tight", active ? "text-background/70" : "text-muted-foreground")}>
                      {item.desc}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );

  const MobileDrawer = (
    <>
      <div
        className={cn("fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity", open ? "opacity-100" : "opacity-0 pointer-events-none")}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-[300px] bg-card border-r border-border md:hidden transition-transform duration-300 ease-out flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-14 px-4 border-b border-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <AnimatedLogo size={22} />
            <span className="font-semibold text-sm tracking-tight">Nested</span>
          </Link>
          <button onClick={onClose} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
          <div>
            <p className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">Main</p>
            {primaryItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all",
                    active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
          </div>
          <div>
            <p className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">{activeSection.title}</p>
            {activeSection.items.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all",
                    active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" /> {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );

  return (
    <>
      <div className="hidden md:flex h-screen sticky top-0">
        {Rail}
        {Panel}
      </div>
      {MobileDrawer}
    </>
  );
};

export default DashboardSidebar;
