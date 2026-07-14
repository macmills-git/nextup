import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Sun, Moon, Menu, Search, X, User, Settings, LogOut, Briefcase } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";

import VendorHomePage from "./vendor/VendorHomePage";
import VendorBusinessPage from "./vendor/VendorBusinessPage";
import VendorPortfolioPage from "./vendor/VendorPortfolioPage";
import VendorBookingsPage from "./vendor/VendorBookingsPage";
import VendorFindEventsPage from "./vendor/VendorFindEventsPage";
import VendorInsightsPage from "./vendor/VendorInsightsPage";
import VendorEarningsPage from "./vendor/VendorEarningsPage";
import MessagesPage from "./dashboard/MessagesPage";
import NotificationsPage from "./dashboard/NotificationsPage";
import SettingsPage from "./dashboard/SettingsPage";
import VendorOnboardingPage from "./dashboard/VendorOnboardingPage";

const titleMap: Record<string, string> = {
  "/vendor": "Vendor home",
  "/vendor/business": "My business",
  "/vendor/business/onboarding": "Vendor onboarding",
  "/vendor/portfolio": "Portfolio",
  "/vendor/bookings": "Bookings",
  "/vendor/find-events": "Find events",
  "/vendor/insights": "Insights",
  "/vendor/earnings": "Earnings",
  "/vendor/messages": "Messages",
  "/vendor/notifications": "Notifications",
  "/vendor/settings": "Settings",
};

const ProfileDropdown = ({ onClose, onSignOut, userEmail, userName, onNavigate }: any) => (
  <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-6" onClick={onClose}>
    <div className="w-[92vw] max-w-[360px] bg-card rounded-2xl border border-border shadow-elevated p-5 animate-scale-in" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Vendor account</span>
        <button onClick={onClose} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center text-background font-semibold text-sm">
          {(userName || userEmail).charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">{userName || userEmail.split("@")[0]}</p>
          <p className="text-xs text-muted-foreground truncate">{userEmail}</p>
        </div>
      </div>
      <div className="space-y-0.5">
        {[
          { icon: Briefcase, label: "My business", path: "/vendor/business" },
          { icon: User, label: "Portfolio", path: "/vendor/portfolio" },
          { icon: Settings, label: "Settings", path: "/vendor/settings" },
          { icon: LogOut, label: "Log out", path: "/signin", isLogout: true },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => { if ((item as any).isLogout) onSignOut(); onNavigate(item.path); onClose(); }}>
            <item.icon className="w-4 h-4" />{item.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const VendorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user, signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const initials = (user?.name || user?.email || "V").charAt(0).toUpperCase();
  const title = titleMap[location.pathname] || "Vendor";

  const handleSignOut = () => { signOut(); navigate("/signin"); };

  return (
    <div className="flex min-h-screen bg-background relative z-[1]">
      <DashboardSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="flex-1 overflow-auto min-w-0">
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={() => setMobileNavOpen(true)} className="md:hidden p-2 -ml-2 rounded-lg text-foreground hover:bg-muted">
              <Menu className="h-4 w-4" />
            </button>
            <h1 className="text-sm font-semibold text-foreground truncate">{title}</h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium ml-2">Vendor</span>
          </div>
          <div className="flex items-center gap-2 md:gap-2.5">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search bookings, events..." className="pl-9 w-56 h-8 rounded-lg bg-muted text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-1 focus:ring-primary/20" />
            </div>
            <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-90" onClick={() => setShowProfile(true)}>
              <span className="text-background text-xs font-semibold">{initials}</span>
            </button>
          </div>
        </header>

        {showProfile && (
          <ProfileDropdown
            onClose={() => setShowProfile(false)}
            onSignOut={handleSignOut}
            onNavigate={navigate}
            userEmail={user?.email || ""}
            userName={user?.name}
          />
        )}

        <main className="p-4 md:p-6">
          <Routes>
            <Route index element={<VendorHomePage />} />
            <Route path="business" element={<VendorBusinessPage />} />
            <Route path="business/onboarding" element={<VendorOnboardingPage />} />
            <Route path="portfolio" element={<VendorPortfolioPage />} />
            <Route path="bookings" element={<VendorBookingsPage />} />
            <Route path="find-events" element={<VendorFindEventsPage />} />
            <Route path="insights" element={<VendorInsightsPage />} />
            <Route path="earnings" element={<VendorEarningsPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
