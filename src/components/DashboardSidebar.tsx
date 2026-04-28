import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  MessageSquare,
  Settings,
  Bell,
  Sparkles,
  FolderKanban,
  Users,
  Ticket,
  BarChart3,
  Megaphone,
  MapPin,
  ClipboardList,
  UserRound,
  Layers,
  Brain,
  Briefcase,
  ImageIcon,
  Wallet,
  CalendarRange,
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

// === PLANNER NAV ===
const plannerPrimary: NavItem[] = [
  { icon: LayoutDashboard, label: "Analytics", path: "/dashboard" },
  { icon: FolderKanban, label: "Projects", path: "/dashboard/events" },
  { icon: Store, label: "Vendors", path: "/dashboard/vendors" },
  { icon: Layers, label: "Templates", path: "/dashboard/templates" },
  { icon: Users, label: "Team", path: "/dashboard/team" },
  { icon: Brain, label: "AI Assistant", path: "/dashboard/ai" },
  { icon: BarChart3, label: "Reports", path: "/dashboard/reports" },
  { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing" },
  { icon: Megaphone, label: "Marketing", path: "/dashboard/marketing" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard/messages" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

const plannerSections: Record<string, { title: string; items: NavItem[] }> = {
  analytics: {
    title: "Analytics",
    items: [
      { icon: LayoutDashboard, label: "Overview", path: "/dashboard", desc: "Performance snapshot" },
      { icon: FolderKanban, label: "Projects", path: "/dashboard/events", desc: "Plan and track event projects" },
      { icon: BarChart3, label: "Reports", path: "/dashboard/reports", desc: "Detailed event reports" },
      { icon: Megaphone, label: "Marketing", path: "/dashboard/marketing", desc: "Email campaign metrics" },
    ],
  },
  events: {
    title: "Projects",
    items: [
      { icon: FolderKanban, label: "All projects", path: "/dashboard/events", desc: "Track every event you plan" },
      { icon: ClipboardList, label: "Publish event", path: "/dashboard/events/publish", desc: "Build a public event page" },
      { icon: Sparkles, label: "Create with AI", path: "/dashboard/ai", desc: "Generate a plan from a prompt" },
    ],
  },
  vendors: {
    title: "Vendors",
    items: [
      { icon: Store, label: "Marketplace", path: "/dashboard/vendors", desc: "Browse and book vendors" },
      { icon: MessageSquare, label: "Vendor chat", path: "/dashboard/messages", desc: "Negotiate and confirm" },
    ],
  },
  templates: {
    title: "Templates",
    items: [
      { icon: Layers, label: "All templates", path: "/dashboard/templates", desc: "Browse all event templates" },
      { icon: Sparkles, label: "Featured picks", path: "/dashboard/templates", desc: "Hand-picked starter layouts" },
    ],
  },
  team: {
    title: "Team",
    items: [
      { icon: Users, label: "Team board", path: "/dashboard/team", desc: "Members and role assignments" },
      { icon: MessageSquare, label: "Team chat", path: "/dashboard/messages", desc: "Group collaboration threads" },
    ],
  },
  ai: {
    title: "AI Assistant",
    items: [
      { icon: Brain, label: "Assistant home", path: "/dashboard/ai", desc: "Prompt and planning workspace" },
      { icon: Sparkles, label: "Create event by AI", path: "/dashboard/ai", desc: "Generate event plan quickly" },
      { icon: ClipboardList, label: "Publish from AI", path: "/dashboard/events/publish", desc: "Push AI draft to event" },
    ],
  },
  reports: {
    title: "Reports",
    items: [
      { icon: BarChart3, label: "Project reports", path: "/dashboard/reports", desc: "Per-project KPIs" },
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
      { icon: MessageSquare, label: "Inbox", path: "/dashboard/messages", desc: "Vendors, team and clients" },
      { icon: Users, label: "Team chat", path: "/dashboard/team", desc: "Collaboration workspace" },
      { icon: Store, label: "Vendor chat", path: "/dashboard/vendors", desc: "Connect to vendors" },
    ],
  },
  notifications: {
    title: "Notifications",
    items: [
      { icon: Bell, label: "All alerts", path: "/dashboard/notifications", desc: "Latest updates" },
      { icon: FolderKanban, label: "Project alerts", path: "/dashboard/events", desc: "Project status changes" },
      { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing", desc: "Sales and attendance alerts" },
    ],
  },
  settings: {
    title: "Settings",
    items: [
      { icon: Settings, label: "General", path: "/dashboard/settings", desc: "Workspace preferences" },
      { icon: Users, label: "Team", path: "/dashboard/team", desc: "Members and permissions" },
    ],
  },
};

// === VENDOR NAV ===
const vendorPrimary: NavItem[] = [
  { icon: LayoutDashboard, label: "Vendor home", path: "/vendor" },
  { icon: Briefcase, label: "My business", path: "/vendor/business" },
  { icon: ImageIcon, label: "Portfolio", path: "/vendor/portfolio" },
  { icon: CalendarRange, label: "Bookings", path: "/vendor/bookings" },
  { icon: MapPin, label: "Find events", path: "/vendor/find-events" },
  { icon: BarChart3, label: "Insights", path: "/vendor/insights" },
  { icon: Wallet, label: "Earnings", path: "/vendor/earnings" },
  { icon: MessageSquare, label: "Messages", path: "/vendor/messages" },
  { icon: Bell, label: "Notifications", path: "/vendor/notifications" },
  { icon: Settings, label: "Settings", path: "/vendor/settings" },
];

const vendorSections: Record<string, { title: string; items: NavItem[] }> = {
  home: {
    title: "Vendor home",
    items: [
      { icon: LayoutDashboard, label: "Overview", path: "/vendor", desc: "Bookings and recent activity" },
      { icon: Briefcase, label: "My business", path: "/vendor/business", desc: "Profile, services and pricing" },
      { icon: BarChart3, label: "Insights", path: "/vendor/insights", desc: "Views, leads and conversions" },
    ],
  },
  business: {
    title: "My business",
    items: [
      { icon: Briefcase, label: "Storefront", path: "/vendor/business", desc: "Public profile details" },
      { icon: ImageIcon, label: "Portfolio", path: "/vendor/portfolio", desc: "Showcase your work" },
      { icon: ClipboardList, label: "Onboarding", path: "/vendor/business/onboarding", desc: "Update business info" },
    ],
  },
  portfolio: {
    title: "Portfolio",
    items: [
      { icon: ImageIcon, label: "Gallery", path: "/vendor/portfolio", desc: "Add photos of past work" },
      { icon: Layers, label: "Packages", path: "/vendor/business", desc: "Edit service packages" },
    ],
  },
  bookings: {
    title: "Bookings",
    items: [
      { icon: CalendarRange, label: "All bookings", path: "/vendor/bookings", desc: "Confirmed and pending" },
      { icon: Wallet, label: "Earnings", path: "/vendor/earnings", desc: "Track payouts and revenue" },
    ],
  },
  "find-events": {
    title: "Find events",
    items: [
      { icon: MapPin, label: "Open events", path: "/vendor/find-events", desc: "Events looking for vendors" },
      { icon: MessageSquare, label: "Pitch organisers", path: "/vendor/messages", desc: "Reach out to planners" },
    ],
  },
  insights: {
    title: "Insights",
    items: [
      { icon: BarChart3, label: "Profile views", path: "/vendor/insights", desc: "Views and engagement" },
      { icon: Wallet, label: "Revenue trends", path: "/vendor/earnings", desc: "Earnings analytics" },
    ],
  },
  earnings: {
    title: "Earnings",
    items: [
      { icon: Wallet, label: "All payouts", path: "/vendor/earnings", desc: "History and pending" },
      { icon: BarChart3, label: "Trends", path: "/vendor/insights", desc: "Revenue performance" },
    ],
  },
  messages: {
    title: "Messages",
    items: [
      { icon: MessageSquare, label: "Inbox", path: "/vendor/messages", desc: "Planners and other vendors" },
      { icon: Users, label: "Vendor network", path: "/vendor/messages", desc: "Connect with other vendors" },
    ],
  },
  notifications: {
    title: "Notifications",
    items: [
      { icon: Bell, label: "All alerts", path: "/vendor/notifications", desc: "Bookings, leads and reviews" },
    ],
  },
  settings: {
    title: "Settings",
    items: [
      { icon: Settings, label: "Account", path: "/vendor/settings", desc: "Personal preferences" },
      { icon: Briefcase, label: "Business profile", path: "/vendor/business", desc: "Edit storefront" },
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
  const isVendor = user?.role === "vendor";

  const primaryItems = isVendor ? vendorPrimary : plannerPrimary;
  const sectionTabs = isVendor ? vendorSections : plannerSections;

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/vendor") return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const getSectionKey = (): string => {
    const p = location.pathname;
    if (isVendor) {
      if (p.startsWith("/vendor/business")) return "business";
      if (p.startsWith("/vendor/portfolio")) return "portfolio";
      if (p.startsWith("/vendor/bookings")) return "bookings";
      if (p.startsWith("/vendor/find-events")) return "find-events";
      if (p.startsWith("/vendor/insights")) return "insights";
      if (p.startsWith("/vendor/earnings")) return "earnings";
      if (p.startsWith("/vendor/messages")) return "messages";
      if (p.startsWith("/vendor/notifications")) return "notifications";
      if (p.startsWith("/vendor/settings")) return "settings";
      return "home";
    }
    if (p.startsWith("/dashboard/templates")) return "templates";
    if (p.startsWith("/dashboard/events")) return "events";
    if (p.startsWith("/dashboard/team")) return "team";
    if (p.startsWith("/dashboard/ai")) return "ai";
    if (p.startsWith("/dashboard/reports")) return "reports";
    if (p.startsWith("/dashboard/ticketing")) return "ticketing";
    if (p.startsWith("/dashboard/marketing")) return "marketing";
    if (p.startsWith("/dashboard/vendors")) return "vendors";
    if (p.startsWith("/dashboard/messages")) return "messages";
    if (p.startsWith("/dashboard/notifications")) return "notifications";
    if (p.startsWith("/dashboard/settings")) return "settings";
    return "analytics";
  };

  const activeSection = sectionTabs[getSectionKey()] || sectionTabs[Object.keys(sectionTabs)[0]];

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

      {isVendor && !user?.vendorOnboarded && (
        <Link
          to="/vendor/business/onboarding"
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
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            {isVendor ? "Vendor workspace" : "Planner workspace"}
          </p>
          <h3 className="text-sm font-semibold text-foreground mt-0.5">{activeSection.title}</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
          {activeSection.items.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path + item.label}
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
            <p className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">
              {isVendor ? "Vendor" : "Main"}
            </p>
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
                  key={item.path + item.label}
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
