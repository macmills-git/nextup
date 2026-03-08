import { Ticket, Sparkles } from "lucide-react";

const TicketingPage = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div className="text-center space-y-6 max-w-md animate-fade-in">
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="relative w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Ticket className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Ticketing</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 animate-pulse" />
            Coming Soon
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Sell tickets, manage registrations, and track attendance — all within Nested. 
            Create custom ticket tiers, early-bird pricing, and VIP packages for your events.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4">
          {["Ticket Tiers", "QR Check-in", "Analytics"].map((feature, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-3 text-center" style={{ animationDelay: `${i * 0.2}s` }}>
              <p className="text-xs font-medium text-foreground">{feature}</p>
              <div className="w-full h-1 bg-muted rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-primary/40 rounded-full animate-pulse" style={{ width: `${60 + i * 15}%`, animationDelay: `${i * 0.3}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketingPage;
