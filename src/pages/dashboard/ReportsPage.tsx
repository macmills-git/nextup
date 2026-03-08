import { useState } from "react";
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, Download, Filter, PieChart, ArrowUp, ArrowDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, LineChart, Line } from "recharts";

const monthlyData = [
  { name: "Jan", events: 4, revenue: 12000 }, { name: "Feb", events: 3, revenue: 9500 },
  { name: "Mar", events: 5, revenue: 18000 }, { name: "Apr", events: 7, revenue: 24000 },
  { name: "May", events: 6, revenue: 21000 }, { name: "Jun", events: 8, revenue: 32000 },
];

const categoryData = [
  { name: "Corporate", value: 35, color: "hsl(12, 76%, 61%)" },
  { name: "Weddings", value: 25, color: "hsl(20, 80%, 70%)" },
  { name: "Conferences", value: 20, color: "hsl(40, 70%, 65%)" },
  { name: "Social", value: 15, color: "hsl(142, 71%, 45%)" },
  { name: "Other", value: 5, color: "hsl(0, 0%, 75%)" },
];

const budgetTrend = [
  { name: "Jan", allocated: 45000, spent: 38000 }, { name: "Feb", allocated: 32000, spent: 29000 },
  { name: "Mar", allocated: 55000, spent: 48000 }, { name: "Apr", allocated: 68000, spent: 52000 },
  { name: "May", allocated: 42000, spent: 41000 }, { name: "Jun", allocated: 75000, spent: 62000 },
];

const topEvents = [
  { name: "Annual Corporate Gala", revenue: "$45,000", guests: 250, satisfaction: "98%", status: "Completed" },
  { name: "Tech Conference 2026", revenue: "$120,000", guests: 1000, satisfaction: "96%", status: "Upcoming" },
  { name: "Charity Fundraiser", revenue: "$52,000", guests: 300, satisfaction: "99%", status: "Planning" },
  { name: "Product Launch Party", revenue: "$28,000", guests: 150, satisfaction: "94%", status: "Upcoming" },
  { name: "Summer Music Festival", revenue: "$75,000", guests: 500, satisfaction: "97%", status: "Draft" },
];

const ReportsPage = () => {
  const [period, setPeriod] = useState("6months");

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground">Detailed analytics and insights for your events</p>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-1 bg-muted rounded-lg p-0.5">
            {[{ label: "6 Months", val: "6months" }, { label: "1 Year", val: "1year" }, { label: "All Time", val: "all" }].map(p => (
              <button key={p.val} onClick={() => setPeriod(p.val)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${period === p.val ? 'bg-card border border-border shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {p.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: "Total Events", value: "33", change: "+18%", up: true },
          { icon: DollarSign, label: "Total Revenue", value: "$116.5K", change: "+24%", up: true },
          { icon: Users, label: "Total Guests", value: "2,530", change: "+12%", up: true },
          { icon: TrendingUp, label: "Avg. Satisfaction", value: "96.8%", change: "+2.1%", up: true },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-5 hover:shadow-elevated transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className="h-4 w-4 text-muted-foreground" />
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events & Revenue Chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Events & Revenue</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
              <Bar dataKey="events" fill="hsl(12, 76%, 61%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Event Categories</h2>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={160} height={160}>
              <RPieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </RPieChart>
            </ResponsiveContainer>
            <div className="space-y-2 flex-1">
              {categoryData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-xs text-foreground">{item.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Trend */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Budget Trend</h2>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={budgetTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--border))" />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
            <Line type="monotone" dataKey="allocated" stroke="hsl(12, 76%, 61%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="spent" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-6 mt-3 justify-center">
          <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded bg-primary" /><span className="text-xs text-muted-foreground">Allocated</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-0.5 rounded bg-success" /><span className="text-xs text-muted-foreground">Spent</span></div>
        </div>
      </div>

      {/* Top Events Table */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Top Events</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Event</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Revenue</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Guests</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Satisfaction</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {topEvents.map((event, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{event.name}</td>
                  <td className="py-3 px-4 text-foreground">{event.revenue}</td>
                  <td className="py-3 px-4 text-muted-foreground">{event.guests}</td>
                  <td className="py-3 px-4 text-foreground">{event.satisfaction}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      event.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                      event.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                      event.status === 'Planning' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                      'bg-muted text-muted-foreground'
                    }`}>{event.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
