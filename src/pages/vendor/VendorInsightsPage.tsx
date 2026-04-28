import { Eye, MessageSquare, TrendingUp, Star, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const viewsData = [
  { name: "Mon", views: 42 }, { name: "Tue", views: 65 }, { name: "Wed", views: 51 },
  { name: "Thu", views: 88 }, { name: "Fri", views: 102 }, { name: "Sat", views: 134 }, { name: "Sun", views: 96 },
];

const conversionData = [
  { name: "Jan", leads: 8, bookings: 3 }, { name: "Feb", leads: 12, bookings: 5 },
  { name: "Mar", leads: 18, bookings: 9 }, { name: "Apr", leads: 22, bookings: 11 },
  { name: "May", leads: 27, bookings: 14 }, { name: "Jun", leads: 34, bookings: 19 },
];

const VendorInsightsPage = () => {
  const cards = [
    { icon: Eye, label: "Profile views (7d)", value: "578", trend: "+24%" },
    { icon: MessageSquare, label: "Inquiries (7d)", value: "42", trend: "+11%" },
    { icon: Star, label: "Average rating", value: "4.8", trend: "+0.2" },
    { icon: TrendingUp, label: "Conversion rate", value: "32%", trend: "+4%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Insights</h1>
        <p className="text-sm text-muted-foreground">Understand how planners are finding and engaging with your business.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-xl border border-border p-5">
            <c.icon className="h-4 w-4 text-muted-foreground mb-3" />
            <p className="text-2xl font-bold text-foreground">{c.value} <span className="text-xs text-emerald-500 font-medium">{c.trend}</span></p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Profile views this week</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={viewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Leads vs bookings</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Line type="monotone" dataKey="leads" stroke="hsl(var(--muted-foreground))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="bookings" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Top traffic sources</h2>
          <Users className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {[
            { src: "Marketplace browse", pct: 48 },
            { src: "Direct event match", pct: 26 },
            { src: "Search results", pct: 17 },
            { src: "Recommendations", pct: 9 },
          ].map((s) => (
            <div key={s.src}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground font-medium">{s.src}</span>
                <span className="text-muted-foreground">{s.pct}%</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorInsightsPage;
