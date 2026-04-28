import { Wallet, ArrowDownToLine, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const earningsData = [
  { m: "Jan", amount: 2100 }, { m: "Feb", amount: 2700 }, { m: "Mar", amount: 3300 },
  { m: "Apr", amount: 4100 }, { m: "May", amount: 3850 }, { m: "Jun", amount: 4820 },
];

const payouts = [
  { id: 1, date: "2026-03-24", event: "Spring Wedding · Jane Doe", amount: "$1,800", status: "Paid" },
  { id: 2, date: "2026-03-15", event: "Birthday Coverage · Sarah W.", amount: "$650", status: "Paid" },
  { id: 3, date: "2026-03-08", event: "Corporate Headshots · David K.", amount: "$900", status: "Paid" },
  { id: 4, date: "2026-04-02", event: "Tech Summit Photo · Michael C.", amount: "$2,400", status: "Pending" },
];

const VendorEarningsPage = () => {
  const total = earningsData.reduce((s, d) => s + d.amount, 0);
  const pending = 2400;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Earnings</h1>
        <p className="text-sm text-muted-foreground">Track payouts and revenue performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-5">
          <Wallet className="h-4 w-4 text-muted-foreground mb-2" />
          <p className="text-xs text-muted-foreground">Total earned (YTD)</p>
          <p className="text-2xl font-bold text-foreground mt-1">${total.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <TrendingUp className="h-4 w-4 text-emerald-500 mb-2" />
          <p className="text-xs text-muted-foreground">Pending payout</p>
          <p className="text-2xl font-bold text-foreground mt-1">${pending.toLocaleString()}</p>
        </div>
        <div className="bg-foreground rounded-xl p-5 text-background flex flex-col justify-between">
          <p className="text-xs opacity-80">Withdraw available balance</p>
          <Button variant="secondary" size="sm" className="rounded-lg mt-3 w-fit">
            <ArrowDownToLine className="h-3.5 w-3.5 mr-1.5" /> Request payout
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <h2 className="font-semibold text-foreground mb-4">Earnings trend</h2>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={earningsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
            <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm">Recent payouts</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr>
              {["Date", "Event", "Amount", "Status"].map((h) => (
                <th key={h} className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="py-3 px-4 text-muted-foreground">{p.date}</td>
                <td className="py-3 px-4 text-foreground">{p.event}</td>
                <td className="py-3 px-4 font-medium text-foreground">{p.amount}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.status === "Paid" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorEarningsPage;
