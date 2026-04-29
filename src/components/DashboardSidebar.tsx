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
  Layers,
  Brain,
  Briefcase,
  ImageIcon,
  Wallet,
  CalendarRange,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
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
  { icon: Brain, label: "AI Assistant", path: "/dashboard/ai" },
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
      { icon: BarChart3, label: "Reports", path: "/dashboard/reports", desc: "Detailed event reports" },
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
    ],
  },
  ai: {
    title: "AI Assistant",
    items: [
      { icon: Sparkles, label: "Create event by AI", path: "/dashboard/ai", desc: "Generate event plan quickly" },
      { icon: ClipboardList, label: "Publish from AI", path: "/dashboard/events/publish", desc: "Push AI draft to event" },
    ],
  },
  ticketing: {
    title: "Ticketing",
    items: [
      { icon: Ticket, label: "Ticket tiers", path: "/dashboard/ticketing", desc: "Create, sell and track tickets" },
    ],
  },
  marketing: {
    title: "Marketing",
    items: [
      { icon: Megaphone, label: "Campaign builder", path: "/dashboard/marketing", desc: "Send to invitees or buyers" },
      { icon: BarChart3, label: "Delivery stats", path: "/dashboard/marketing", desc: "Opens and engagement" },
    ],
  },
  messages: {
    title: "Messages",
    items: [
      { icon: MessageSquare, label: "Inbox", path: "/dashboard/messages", desc: "Vendors, team and clients" },
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
    ],
  },
};

// Sections rendered as a single-item shortcut (no panel needed but kept for API consistency)
const plannerSingleTabs = new Set(["events", "marketing-single"]);

// === VENDOR NAV ===
const vendorPrimary: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/vendor" },
  { icon: MapPin, label: "Find events", path: "/vendor/find-events" },
  { icon: MessageSquare, label: "Messages", path: "/vendor/messages" },
  { icon: Bell, label: "Notifications", path: "/vendor/notifications" },
  { icon: Settings, label: "Settings", path: "/vendor/settings" },
];

const vendorSections: Record<string, { title: string; items: NavItem[] }> = {
  home: {
    title: "Overview",
    items: [
      { icon: LayoutDashboard, label: "Dashboard", path: "/vendor", desc: "Bookings and recent activity" },
      { icon: Briefcase, label: "My business", path: "/vendor/business", desc: "Profile, services and pricing" },
      { icon: BarChart3, label: "Insights", path: "/vendor/insights", desc: "Views, leads and conversions" },
      { icon: ImageIcon, label: "Portfolio", path: "/vendor/portfolio", desc: "Showcase your work" },
      { icon: CalendarRange, label: "Bookings", path: "/vendor/bookings", desc: "Confirmed and pending" },
      { icon: Wallet, label: "Earnings", path: "/vendor/earnings", desc: "Track payouts and revenue" },
    ],
  },
  "find-events": {
    title: "Find events",
    items: [
      { icon: MapPin, label: "Open events", path: "/vendor/find-events", desc: "Events looking for vendors" },
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
  const [panelOpen, setPanelOpen] = useState(true);

  const primaryItems = isVendor ? vendorPrimary : plannerPrimary;
  const sectionTabs = isVendor ? vendorSections : plannerSections;

  const isActive = (path: string) => {
    if (path === "/dashboard" || path === "/vendor") return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const getSectionKey = (): string | null => {
    const p = location.pathname;
    if (isVendor) {
      if (p.startsWith("/vendor/find-events")) return "find-events";
      if (p.startsWith("/vendor/messages")) return "messages";
      if (p.startsWith("/vendor/notifications")) return "notifications";
      if (p.startsWith("/vendor/settings")) return "settings";
      // Overview group covers /vendor, /vendor/business, /vendor/portfolio, /vendor/bookings, /vendor/insights, /vendor/earnings
      return "home";
    }
    if (p.startsWith("/dashboard/events")) return null; // single tab
    if (p.startsWith("/dashboard/marketing")) return "marketing";
    if (p.startsWith("/dashboard/templates")) return "templates";
    if (p.startsWith("/dashboard/ai")) return "ai";
    if (p.startsWith("/dashboard/ticketing")) return "ticketing";
    if (p.startsWith("/dashboard/vendors")) return "vendors";
    if (p.startsWith("/dashboard/messages")) return "messages";
    if (p.startsWith("/dashboard/notifications")) return "notifications";
    if (p.startsWith("/dashboard/settings")) return "settings";
    if (p.startsWith("/dashboard/reports")) return "analytics";
    return "analytics";
  };

  const activeKey = getSectionKey();
  const activeSection = activeKey ? sectionTabs[activeKey] : null;
  const showPanel = panelOpen && !!activeSection;

  const Rail = (
    <div className="w-[60px] h-full bg-card border-r border-border flex flex-col items-center py-3">
      <button
        onClick={() => setPanelOpen((v) => !v)}
        title={panelOpen ? "Close panel" : "Open panel"}
        aria-label="Toggle sidebar panel"
        className="mb-3 w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        {panelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
      </button>
      <nav className="flex-1 flex flex-col items-center gap-1 mt-1">
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

  const Panel = activeSection && (
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
          <span className="font-semibold text-sm tracking-tight text-foreground">
            {isVendor ? "Vendor" : "Planner"} workspace
          </span>
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
          {activeSection && (
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
          )}
        </nav>
      </aside>
    </>
  );

  return (
    <>
      <div className="hidden md:flex h-screen sticky top-0">
        {Rail}
        {showPanel && Panel}
      </div>
      {MobileDrawer}
    </>
  );
};

export default DashboardSidebar;
