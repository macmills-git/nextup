import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Store,
  PlusCircle,
  Heart,
  Settings,
  ShieldAlert,
  ArrowLeft,
  X,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "@/components/Logo";

type NavItem = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  desc?: string;
};

interface Props {
  open?: boolean;
  onClose?: () => void;
}

const DashboardSidebar = ({ open = false, onClose }: Props) => {
  const location = useLocation();
  const { user } = useAuth();

  const primaryItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Overview", path: "/dashboard", desc: "Account summary" },
    { icon: Calendar, label: "My Events", path: "/dashboard/events", desc: "Drafts and published events" },
    { icon: PlusCircle, label: "Publish Event", path: "/create/event", desc: "Create new event listing" },
    { icon: Store, label: "Vendor Profile", path: "/dashboard/vendors", desc: "Manage business storefront" },
    { icon: Heart, label: "Saved Events", path: "/dashboard/saved", desc: "Bookmarked events" },
    { icon: Settings, label: "Account Settings", path: "/dashboard/settings", desc: "Preferences and profile" },
  ];

  if (user?.role === "admin") {
    primaryItems.push({
      icon: ShieldAlert,
      label: "Admin Moderation",
      path: "/admin",
      desc: "Moderation console",
    });
  }

  const isActive = (path: string) => {
    if (path === "/dashboard") return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Desktop Single Expanded Sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0 w-64 bg-card border-r border-border flex-col justify-between p-4 z-20">
        <div className="space-y-6">
          {/* Brand Header */}
          <div className="px-2 pt-2 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Logo variant="dark" size="sm" />
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-100 border text-stone-600">
                Activity
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {primaryItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    active
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:bg-stone-100 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: User Profile Card & Return Link */}
        <div className="pt-4 border-t border-border space-y-3">
          <Link
            to="/events"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:text-foreground hover:bg-stone-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Discover Events
          </Link>

          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon size={14} />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">{user?.name || "Account"}</p>
              <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-card border-r border-border md:hidden transition-transform duration-300 flex flex-col justify-between p-4 shadow-2xl",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <Link to="/" onClick={onClose} className="font-bold text-base text-foreground">
              NextUp<span className="text-primary font-black">.</span> Activity
            </Link>
            <button onClick={onClose} className="p-1 rounded-lg text-muted-foreground hover:bg-muted">
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="space-y-1">
            {primaryItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all",
                    active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <Link
            to="/events"
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Discover Events
          </Link>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
