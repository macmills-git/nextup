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
  { name: "Akolo Studio", category: "Photography", status: "Running", latency: "8.2s", lastRun: "14 min ago" },
  { name: "Bake It Right", category: "Catering", status: "Paused", latency: "11.4s", lastRun: "32 min ago" },
  { name: "Prime Audio", category: "Audio/Visual", status: "Running", latency: "6.7s", lastRun: "1h ago" },
  { name: "Event Bloom", category: "Decoration", status: "Running", latency: "4.2s", lastRun: "2h ago" },
];

const tasks = [
  { title: "Finalize Venue Contract — Hotel Grand, Downtown", done: false },
  { title: "Confirm Catering Menu Selection — Deadline this Friday", done: false },
  { title: "Photography Briefing", done: true },
  { title: "Send Invitations", done: false },
];

const statCards = [
  { icon: Calendar, label: "Active Events", value: "52", change: "+12%", up: true },
  { icon: TrendingUp, label: "Task success rate", value: "96.7%", change: "4%", up: true },
  { icon: Clock, label: "Average execution time", value: "12.4s", change: "27%", up: false },
  { icon: Sparkles, label: "Most used model", value: "GPT-4o", change: "", up: true },
];

const budgetCategories = [
  { name: "Venue & Space", amount: 6730, share: "32.1%", color: "hsl(0, 70%, 65%)" },
  { name: "Catering & Food", amount: 4120, share: "19.6%", color: "hsl(20, 80%, 70%)" },
  { name: "Decoration", amount: 3920, share: "18.6%", color: "hsl(40, 70%, 75%)" },
  { name: "Photography", amount: 3210, share: "15.3%", color: "hsl(0, 60%, 80%)" },
  { name: "Entertainment", amount: 3010, share: "14.3%", color: "hsl(0, 0%, 85%)" },
];

/* Profile Dropdown */
const ProfileDropdown = ({ onClose, onNavigate }: { onClose: () => void; onNavigate: (path: string) => void }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-6" onClick={onClose}>
    <div className="w-[380px] bg-card rounded-2xl border border-border shadow-elevated p-6 animate-scale-in" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</span>
        <button onClick={onClose} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center text-background font-semibold text-sm">K</div>
        <div>
          <p className="font-semibold text-foreground text-sm">Kusi Boateng Mills</p>
          <p className="text-xs text-muted-foreground">kusi@eventnest.com</p>
        </div>
      </div>
      <div className="space-y-4 mb-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-foreground">Daily prompts</span>
            <span className="text-xs text-muted-foreground">0/3</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-muted-foreground/30 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-foreground">Monthly prompts</span>
            <span className="text-xs text-muted-foreground">3/10</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary/40 rounded-full" style={{ width: '30%' }} />
          </div>
        </div>
      </div>
      <div className="border-t border-border my-4" />
      <div className="space-y-0.5">
        {[
          { icon: User, label: "Profile", path: "/dashboard/settings" },
          { icon: Settings, label: "Settings", path: "/dashboard/settings" },
          { icon: Users, label: "Team", path: "/dashboard/team" },
          { icon: LogOut, label: "Log out", path: "/" },
        ].map(item => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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
    { name: "Jane Doe", amount: 5710, share: "27.2%", color: "hsl(0, 70%, 65%)" },
    { name: "Michael Chen", amount: 4940, share: "23.5%", color: "hsl(20, 80%, 70%)" },
    { name: "Sarah Williams", amount: 4523, share: "21.5%", color: "hsl(40, 70%, 75%)" },
    { name: "David Kim", amount: 3240, share: "15.4%", color: "hsl(0, 60%, 80%)" },
    { name: "Emily Brown", amount: 2577, share: "12.3%", color: "hsl(0, 0%, 85%)" },
  ];

  const activeBudgetData = budgetTab === "category" ? budgetCategories : budgetByEmployee;
  const totalBudget = activeBudgetData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}
              {stat.change && (
                <span className={`text-xs font-medium ml-2 ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.change} {stat.up ? '↗' : '↘'}
                </span>
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Workflow Monitor Table */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Workflow monitor</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Vendor name</th>
                <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Category</th>
                <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Status</th>
                <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Latency</th>
                <th className="text-left py-3 px-3 text-xs text-muted-foreground font-medium">Last run</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map(v => (
                <tr key={v.name} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-3 font-medium text-foreground">{v.name}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-foreground">
                      {v.category}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className={`w-2 h-2 rounded-full ${v.status === 'Running' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {v.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground">{v.latency}</td>
                  <td className="py-3 px-3 text-muted-foreground">{v.lastRun}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Donut */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Agents by status</h2>
            <div className="flex gap-1 bg-muted rounded-lg p-0.5">
              {(["category", "employee"] as const).map(tab => (
                <button key={tab} onClick={() => setBudgetTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${budgetTab === tab ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  By {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative w-36 h-36">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {activeBudgetData.map((item, i) => {
                  const percentage = (item.amount / totalBudget) * 100;
                  const offset = activeBudgetData.slice(0, i).reduce((sum, d) => sum + (d.amount / totalBudget) * 100, 0);
                  return (
                    <circle key={i} cx="18" cy="18" r="14" fill="none"
                      stroke={item.color}
                      strokeWidth="3.5"
                      strokeDasharray={`${percentage * 0.88} ${88 - percentage * 0.88}`}
                      strokeDashoffset={`${-offset * 0.88}`}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{Math.round(totalBudget / 1000 * 4.15)}</span>
                <span className="text-[10px] text-muted-foreground">Total</span>
              </div>
            </div>
            <div className="space-y-2 flex-1">
              {activeBudgetData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.share}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tasks breakdown chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Tasks breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
              <Bar dataKey="events" fill="hsl(0, 70%, 75%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Tasks + AI Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Upcoming Tasks</h2>
          <div className="space-y-1">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                {task.done
                  ? <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                  : <div className="w-4 h-4 rounded-full border-2 border-border flex-shrink-0" />
                }
                <span className={`text-sm ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-foreground rounded-xl p-5 text-background cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigate('/dashboard/ai')}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5" />
            <h2 className="font-semibold">AI Assistant</h2>
          </div>
          <p className="text-sm opacity-80 mb-3">Quick planning tips based on your data:</p>
          <ul className="text-sm opacity-70 space-y-2 mb-4">
            <li>• Consider booking caterer early for Q4</li>
            <li>• Budget is on track — 25% remaining</li>
            <li>• 3 vendor responses pending</li>
          </ul>
          <Button variant="secondary" size="sm" className="w-full rounded-lg">
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
        <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2.5">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input placeholder="Search for anything..." className="pl-9 w-56 h-8 rounded-lg bg-muted text-xs text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-1 focus:ring-primary/20" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">⌘K</span>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
              onClick={() => setShowProfile(true)}>
              <span className="text-background text-xs font-semibold">JD</span>
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
