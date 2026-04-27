import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Users, Store, MessageSquare, Settings, Sparkles, Bell, BarChart3, Ticket, X, ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "@/components/AnimatedLogo";
import { useAuth } from "@/contexts/AuthContext";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  desc?: string;
};

// Primary rail: kept slim. Analytics renamed from Dashboard.
const primaryItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Analytics", path: "/dashboard", desc: "Overview, KPIs and activity" },
  { icon: Store, label: "Vendors", path: "/dashboard/vendors", desc: "Discover & manage vendors" },
  { icon: MessageSquare, label: "Messages", path: "/dashboard/messages", desc: "Conversations & threads" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications", desc: "Alerts and updates" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings", desc: "Account & workspace" },
];

// Secondary panel: revealed when "More" is clicked
const secondaryItems: NavItem[] = [
  { icon: Calendar, label: "Events", path: "/dashboard/events", desc: "All your events" },
  { icon: Users, label: "Team", path: "/dashboard/team", desc: "Members & permissions" },
  { icon: Sparkles, label: "AI Assistant", path: "/dashboard/ai", desc: "Plan with AI" },
  { icon: BarChart3, label: "Reports", path: "/dashboard/reports", desc: "Detailed event reports" },
  { icon: Ticket, label: "Ticketing", path: "/dashboard/ticketing", desc: "Sell & manage tickets" },
];

interface Props {
  // for mobile slide-in
  open?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ open = false, onClose }: Props) => {
  const location = useLocation();
  const { user } = useAuth();
  const [showPanel, setShowPanel] = useState(false);
  const [activeSection, setActiveSection] = useState<"primary" | "secondary">("primary");

  // Auto-close panel on nav change
  useEffect(() => {
    setShowPanel(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || (path !== "/dashboard" && location.pathname.startsWith(path));

  const renderRailButton = (item: NavItem, onClick?: () => void) => {
    const active = isActive(item.path);
    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={onClick}
        title={item.label}
        className={cn(
          "group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
          active
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
      >
        <item.icon className="h-4 w-4" />
        {/* Tooltip */}
        <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-foreground text-background text-[11px] font-medium opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition whitespace-nowrap z-50 shadow-lg">
          {item.label}
        </span>
      </Link>
    );
  };

  const Rail = (
    <div className="w-[60px] h-full bg-card border-r border-border flex flex-col items-center py-3">
      <Link to="/" className="mb-3" aria-label="Home">
        <AnimatedLogo size={22} />
      </Link>

      <nav className="flex-1 flex flex-col items-center gap-1 mt-2">
        {primaryItems.map((item) => renderRailButton(item, () => { setActiveSection("primary"); setShowPanel(false); }))}

        <div className="w-6 h-px bg-border my-2" />

        {/* "More" toggles the secondary panel */}
        <button
          onClick={() => { setActiveSection("secondary"); setShowPanel(s => !s); }}
          title="More"
          className={cn(
            "group relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
            showPanel && activeSection === "secondary"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <ChevronRight className={cn("h-4 w-4 transition-transform", showPanel && "rotate-90")} />
          <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-foreground text-background text-[11px] font-medium opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition whitespace-nowrap z-50 shadow-lg">
            More tools
          </span>
        </button>
      </nav>

      {/* Vendor onboarding hint at bottom */}
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
    <div
      className={cn(
        "h-full bg-card border-r border-border overflow-hidden transition-[width] duration-300 ease-out",
        showPanel ? "w-[240px]" : "w-0"
      )}
    >
      <div className="w-[240px] h-full flex flex-col">
        <div className="px-5 pt-4 pb-3 border-b border-border flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Workspace</p>
            <h3 className="text-sm font-semibold text-foreground mt-0.5">More tools</h3>
          </div>
          <button onClick={() => setShowPanel(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
          {secondaryItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-start gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all",
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
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

  // Mobile: full slide-in drawer with both rail and full labels combined
  const MobileDrawer = (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-card border-r border-border md:hidden transition-transform duration-300 ease-out flex flex-col",
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
            {primaryItems.map(item => {
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
            <p className="px-3 text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1.5">More tools</p>
            {secondaryItems.map(item => {
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
          {user?.role === "vendor" && !user?.vendorOnboarded && (
            <Link
              to="/dashboard/vendor-onboarding"
              onClick={onClose}
              className="flex items-center gap-2 mx-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-[12px] font-medium"
            >
              <Sparkles className="h-3.5 w-3.5" /> Complete vendor profile
            </Link>
          )}
        </nav>
      </aside>
    </>
  );

  return (
    <>
      {/* Desktop: rail + expandable panel */}
      <div className="hidden md:flex h-screen sticky top-0">
        {Rail}
        {Panel}
      </div>
      {/* Mobile: full drawer */}
      {MobileDrawer}
    </>
  );
};

export default DashboardSidebar;
