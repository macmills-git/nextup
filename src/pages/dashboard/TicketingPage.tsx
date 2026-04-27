import { useMemo, useState } from "react";
import { Ticket, Plus, QrCode, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const TicketingPage = () => {
  const [tiers, setTiers] = useState([
    { id: 1, name: "General", price: 35, qty: 300, sold: 164 },
    { id: 2, name: "VIP", price: 120, qty: 80, sold: 41 },
    { id: 3, name: "Early Bird", price: 24, qty: 120, sold: 120 },
  ]);
  const [newTier, setNewTier] = useState({ name: "", price: "", qty: "" });

  const stats = useMemo(() => {
    const totalSold = tiers.reduce((sum, t) => sum + t.sold, 0);
    const totalCapacity = tiers.reduce((sum, t) => sum + t.qty, 0);
    const revenue = tiers.reduce((sum, t) => sum + t.sold * t.price, 0);
    return { totalSold, totalCapacity, revenue };
  }, [tiers]);

  const addTier = () => {
    if (!newTier.name.trim() || !newTier.price || !newTier.qty) return;
    setTiers((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newTier.name,
        price: Number(newTier.price),
        qty: Number(newTier.qty),
        sold: 0,
      },
    ]);
    setNewTier({ name: "", price: "", qty: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Ticketing</h1>
        <p className="text-sm text-muted-foreground">Create ticket tiers, track sales and manage check-ins.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Tickets sold</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.totalSold}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Capacity</p>
          <p className="text-2xl font-bold text-foreground mt-1">{stats.totalCapacity}</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Revenue</p>
          <p className="text-2xl font-bold text-foreground mt-1">${stats.revenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input value={newTier.name} onChange={(e) => setNewTier((prev) => ({ ...prev, name: e.target.value }))} placeholder="Tier name" className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          <input value={newTier.price} onChange={(e) => setNewTier((prev) => ({ ...prev, price: e.target.value.replace(/[^0-9]/g, "") }))} placeholder="Price" className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          <input value={newTier.qty} onChange={(e) => setNewTier((prev) => ({ ...prev, qty: e.target.value.replace(/[^0-9]/g, "") }))} placeholder="Quantity" className="h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          <Button onClick={addTier} className="rounded-lg">
            <Plus className="h-4 w-4 mr-1.5" /> Add tier
          </Button>
        </div>
        <div className="space-y-2">
          {tiers.map((tier) => {
            const percentage = Math.min(100, (tier.sold / tier.qty) * 100);
            return (
              <div key={tier.id} className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-medium text-foreground flex items-center gap-1.5">
                    <Ticket className="h-3.5 w-3.5 text-primary" /> {tier.name}
                  </p>
                  <p className="text-muted-foreground">${tier.price} each</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1.5">
                  <span>{tier.sold}/{tier.qty} sold</span>
                  <span>{percentage.toFixed(0)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted mt-2 overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <QrCode className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">QR Check-in</p>
            <p className="text-xs text-muted-foreground">Ready for event day scanning</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Attendees</p>
            <p className="text-xs text-muted-foreground">{stats.totalSold} expected attendees</p>
          </div>
        </div>
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Gross sales</p>
            <p className="text-xs text-muted-foreground">${stats.revenue.toLocaleString()} total revenue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketingPage;
