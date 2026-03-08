import DashboardSidebar from "@/components/DashboardSidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Calendar, DollarSign, Users, TrendingUp, MoreHorizontal, Bell, Search, Sparkles, CheckCircle, Clock, ArrowRight, Sun, Moon,
  User, Settings, LogOut, X, PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import EventsPage from "./dashboard/EventsPage";
import EventDetailPage from "./dashboard/EventDetailPage";
import EventWorkspacePage from "./dashboard/EventWorkspacePage";
import VendorsPage from "./dashboard/VendorsPage";
import VendorProfilePage from "./dashboard/VendorProfilePage";
import TeamPage from "./dashboard/TeamPage";
import MessagesPage from "./dashboard/MessagesPage";
import AIAssistantPage from "./dashboard/AIAssistantPage";
import SettingsPage from "./dashboard/SettingsPage";
import NotificationsPage from "./dashboard/NotificationsPage";

const chartData = [
  { name: "Jan", events: 4 }, { name: "Feb", events: 3 }, { name: "Mar", events: 5 }, { name: "Apr", events: 7 },
  { name: "May", events: 6 }, { name: "Jun", events: 8 }, { name: "Jul", events: 4 }, { name: "Aug", events: 9 },
  { name: "Sep", events: 6 }, { name: "Oct", events: 5 }, { name: "Nov", events: 7 }, { name: "Dec", events: 3 },
];

const vendors = [
  { name: "Akolo Studio", category: "Photography", rating: "Active", amount: "$8,200" },
  { name: "Bake It Right", category: "Catering", rating: "Active", amount: "$4,100" },
  { name: "Prime Audio", category: "Audio/Visual", rating: "Active", amount: "$3,500" },
  { name: "Event Bloom", category: "Decoration", rating: "Active", amount: "$6,900" },
];

const tasks = [
  { title: "Finalize Venue Contract — Hotel Grand, Downtown", done: false },
  { title: "Confirm Catering Menu Selection — Deadline this Friday", done: false },
  { title: "Photography Briefing", done: true },
  { title: "Send Invitations", done: false },
];

const statCards = [
  { icon: Calendar, label: "Total Events", value: "52", change: "+12%", color: "text-primary" },
  { icon: DollarSign, label: "Total Revenue", value: "$12,453.00", change: "+8%", color: "text-success" },
  { icon: Users, label: "Vendors", value: "100", change: "+5%", color: "text-warning" },
  { icon: TrendingUp, label: "Budget Spent", value: "78%", change: "-3%", color: "text-destructive" },
];

const budgetCategories = [
  { name: "Venue & Space", amount: 6730, share: "32.1%", color: "bg-primary" },
  { name: "Catering & Food", amount: 4120, share: "19.6%", color: "bg-[hsl(200,80%,50%)]" },
  { name: "Decoration", amount: 3920, share: "18.6%", color: "bg-[hsl(260,60%,55%)]" },
  { name: "Photography", amount: 3210, share: "15.3%", color: "bg-[hsl(280,60%,55%)]" },
  { name: "Entertainment", amount: 3010, share: "14.3%", color: "bg-[hsl(320,60%,55%)]" },
];

/* Profile Dropdown */
const ProfileDropdown = ({ onClose, onNavigate }: { onClose: () => void; onNavigate: (path: string) => void }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6" onClick={onClose}>
    <div className="w-[420px] bg-card rounded-3xl border border-border shadow-elevated p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Welcome Back</span>
        <button onClick={onClose} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: 'hsl(340, 60%, 45%)' }}>K</div>
        <div>
          <p className="font-semibold text-foreground">Kusi Boateng Mills</p>
          <p className="text-xs text-muted-foreground">No bio yet</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-foreground">Subscription</span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary dark:bg-accent text-muted-foreground">Free</span>
      </div>
      <div className="space-y-4 mb-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-foreground flex items-center gap-1">Daily prompts <span className="text-muted-foreground text-xs cursor-help">ⓘ</span></span>
            <span className="text-sm text-muted-foreground">0/3</span>
          </div>
          <div className="w-full h-1.5 bg-secondary dark:bg-accent rounded-full overflow-hidden">
            <div className="h-full bg-border rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-foreground flex items-center gap-1">Monthly prompts <span className="text-muted-foreground text-xs cursor-help">ⓘ</span></span>
            <span className="text-sm text-muted-foreground">3/10</span>
          </div>
          <div className="w-full h-1.5 bg-secondary dark:bg-accent rounded-full overflow-hidden">
            <div className="h-full bg-primary/40 rounded-full" style={{ width: '30%' }} />
          </div>
        </div>
      </div>
      <div className="bg-secondary dark:bg-accent rounded-xl p-4 mb-5">
        <p className="text-sm font-medium text-foreground">Usage Reset</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">Next Monthly Reset:</span>
          <span className="text-xs text-muted-foreground">23/03/2026</span>
        </div>
      </div>
      <div className="border-t border-border my-4" />
      <div className="space-y-1">
        {[
          { icon: User, label: "Profile", path: "/dashboard/settings" },
          { icon: Settings, label: "Settings", path: "/dashboard/settings" },
          { icon: Users, label: "Team", path: "/dashboard/team" },
          { icon: LogOut, label: "Log out", path: "/" },
        ].map(item => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-accent transition-colors"
            onClick={() => { onNavigate(item.path); onClose(); }}>
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const DashboardHome = () => {
  const navigate = useNavigate();
  const [budgetTab, setBudgetTab] = useState<"category" | "employee">("category");

  const budgetByEmployee = [
    { name: "Jane Doe", amount: 5710, share: "27.2%", color: "bg-primary" },
    { name: "Michael Chen", amount: 4940, share: "23.5%", color: "bg-[hsl(200,80%,50%)]" },
    { name: "Sarah Williams", amount: 4523, share: "21.5%", color: "bg-[hsl(260,60%,55%)]" },
    { name: "David Kim", amount: 3240, share: "15.4%", color: "bg-[hsl(280,60%,55%)]" },
    { name: "Emily Brown", amount: 2577, share: "12.3%", color: "bg-[hsl(320,60%,55%)]" },
  ];

  const activeBudgetData = budgetTab === "category" ? budgetCategories : budgetByEmployee;
  const totalBudget = activeBudgetData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <div key={stat.label} className="bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary dark:bg-accent border border-border flex items-center justify-center">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-medium text-success">{stat.change}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Event Trends</h2>
            <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }} />
              <Bar dataKey="events" fill="hsl(225, 90%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Budget Tracking Donut */}
        <div className="bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
          <h2 className="font-semibold text-foreground mb-1">Expenses Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-4">Track your budget allocation</p>
          
          <div className="flex gap-1 bg-secondary dark:bg-accent rounded-lg p-0.5 mb-4">
            {(["category", "employee"] as const).map(tab => (
              <button key={tab} onClick={() => setBudgetTab(tab)}
                className={`flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${budgetTab === tab ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                By {tab}
              </button>
            ))}
          </div>

          {/* Donut chart */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {activeBudgetData.map((item, i) => {
                  const percentage = (item.amount / totalBudget) * 100;
                  const offset = activeBudgetData.slice(0, i).reduce((sum, d) => sum + (d.amount / totalBudget) * 100, 0);
                  return (
                    <circle key={i} cx="18" cy="18" r="14" fill="none"
                      stroke={`hsl(${[225, 200, 260, 280, 320][i]}, ${[90, 80, 60, 60, 60][i]}%, ${[60, 50, 55, 55, 55][i]}%)`}
                      strokeWidth="3"
                      strokeDasharray={`${percentage * 0.88} ${88 - percentage * 0.88}`}
                      strokeDashoffset={`${-offset * 0.88}`}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">${(totalBudget / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {activeBudgetData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                  <span className="text-xs text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">${item.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground">{item.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
          <h2 className="font-semibold text-foreground mb-4">Top Vendors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Vendor</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Category</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map(v => (
                  <tr key={v.name} className="border-b border-border last:border-0 hover:bg-secondary/50 dark:hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{v.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{v.category}</td>
                    <td className="py-3 px-2"><span className="px-2 py-0.5 rounded-full bg-success/10 text-success text-xs font-medium">{v.rating}</span></td>
                    <td className="py-3 px-2 text-right font-medium text-foreground">{v.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
          <h2 className="font-semibold text-foreground mb-4">Monthly Spend</h2>
          <div className="space-y-3">
            {["Venue", "Catering", "Decor", "Photo", "Audio"].map((cat, i) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="text-foreground font-medium">{[35, 25, 20, 12, 8][i]}%</span>
                </div>
                <div className="w-full h-2 bg-secondary dark:bg-accent rounded-full overflow-hidden border border-border">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${[35, 25, 20, 12, 8][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border-2 border-border p-5 hover:border-primary/30 transition-colors">
          <h2 className="font-semibold text-foreground mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 dark:hover:bg-accent/50 transition-colors">
                {task.done ? <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" /> : <Clock className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />}
                <span className={`text-sm ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-xl border-2 border-primary p-5 text-white cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigate('/dashboard/ai')}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <p className="text-sm opacity-90 mb-2">Quick planning tips based on your data:</p>
          <ul className="text-sm opacity-80 space-y-2 mb-4">
            <li>• Consider booking caterer early for Q4</li>
            <li>• Budget is on track — 25% remaining</li>
            <li>• 3 vendor responses pending</li>
          </ul>
          <Button variant="secondary" size="sm" className="w-full">
            Chat with AI <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="flex min-h-screen bg-background relative z-[1]">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <header className="h-16 bg-card border-b-2 border-border flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
            <span className="text-sm text-muted-foreground">All Plans</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input placeholder="Search events, vendors..." className="pl-9 w-64 h-9 rounded-lg bg-secondary dark:bg-accent border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary dark:hover:bg-accent border border-border transition-colors">
              {theme === 'dark' ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-secondary dark:hover:bg-accent border border-border transition-colors"
              onClick={() => navigate('/dashboard/notifications')}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center hover:opacity-90 transition-opacity"
              onClick={() => setShowProfile(true)}>
              <span className="text-white text-xs font-bold">JD</span>
            </button>
          </div>
        </header>

        {showProfile && <ProfileDropdown onClose={() => setShowProfile(false)} onNavigate={navigate} />}

        <main className="p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/new" element={<EventWorkspacePage />} />
            <Route path="events/:eventId" element={<EventDetailPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="vendors/:vendorId" element={<VendorProfilePage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="ai" element={<AIAssistantPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
