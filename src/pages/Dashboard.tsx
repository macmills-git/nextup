import DashboardSidebar from "@/components/DashboardSidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Calendar, DollarSign, Users, TrendingUp, MoreHorizontal, Bell, Search, Sparkles, CheckCircle, Clock, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import EventsPage from "./dashboard/EventsPage";
import EventDetailPage from "./dashboard/EventDetailPage";
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

const DashboardHome = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(stat => (
          <div key={stat.label} className="bg-card rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
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
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Event Trends</h2>
            <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-5 w-5" /></button>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip />
              <Bar dataKey="events" fill="hsl(225, 90%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Your Budget Insights</h2>
          <div className="flex items-center justify-center py-6">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(220, 13%, 91%)" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="hsl(225, 90%, 60%)" strokeWidth="3" strokeDasharray="75, 100" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">75%</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">$9,340 of $12,453 spent</p>
          <Button className="w-full mt-4" variant="outline">Full Breakdown</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
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
                  <tr key={v.name} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
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

        <div className="bg-card rounded-xl border border-border p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Monthly Spend</h2>
          <div className="space-y-3">
            {["Venue", "Catering", "Decor", "Photo", "Audio"].map((cat, i) => (
              <div key={cat}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="text-foreground font-medium">{[35, 25, 20, 12, 8][i]}%</span>
                </div>
                <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${[35, 25, 20, 12, 8][i]}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5 shadow-card">
          <h2 className="font-semibold text-foreground mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                {task.done ? <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" /> : <Clock className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />}
                <span className={`text-sm ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{task.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary rounded-xl p-5 text-primary-foreground shadow-elevated cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigate('/dashboard/ai')}>
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

  return (
    <div className="flex min-h-screen bg-secondary">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-foreground">Dashboard</h1>
            <span className="text-sm text-muted-foreground">All Plans</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events, vendors..." className="pl-9 w-64 bg-secondary" />
            </div>
            <button
              className="relative p-2 rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
              onClick={() => navigate('/dashboard/notifications')}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </button>
            <button
              className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center hover:opacity-90 transition-opacity"
              onClick={() => navigate('/dashboard/settings')}
            >
              <span className="text-primary-foreground text-xs font-bold">JD</span>
            </button>
          </div>
        </header>

        <main className="p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="events" element={<EventsPage />} />
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
