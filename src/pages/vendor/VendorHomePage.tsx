import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Eye, MessageSquare, Wallet, Star, TrendingUp, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const VendorHomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const publishedEvents = useMemo(() => {
    try {
      return JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
    } catch {
      return [];
    }
  }, []);

  const stats = [
    { icon: Eye, label: "Profile views", value: "1,284", trend: "+18%" },
    { icon: MessageSquare, label: "New leads", value: "27", trend: "+9" },
    { icon: Calendar, label: "Confirmed bookings", value: "12", trend: "+3" },
    { icon: Wallet, label: "Earnings (mo)", value: "$4,820", trend: "+12%" },
  ];

  return (
    <div className="space-y-6">
      {!user?.vendorOnboarded && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Finish setting up your storefront</p>
            <p className="text-xs text-muted-foreground mt-1">Add your services, pricing and photos to start receiving bookings.</p>
          </div>
          <Button size="sm" className="rounded-lg" onClick={() => navigate("/vendor/business/onboarding")}>
            Continue setup <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-5">
            <s.icon className="h-4 w-4 text-muted-foreground mb-3" />
            <p className="text-2xl font-bold text-foreground tracking-tight">
              {s.value}
              <span className="text-xs font-medium ml-2 text-emerald-500">{s.trend}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Open events you can pitch to</h2>
            <Button variant="outline" size="sm" onClick={() => navigate("/vendor/find-events")}>Browse all</Button>
          </div>
          <div className="space-y-2">
            {publishedEvents.length === 0 && (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No public events yet. Planners will appear here once they publish.
              </p>
            )}
            {publishedEvents.slice(0, 5).map((e: any) => (
              <div key={e.id} className="border border-border rounded-lg p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{e.title}</p>
                  <p className="text-xs text-muted-foreground">{e.date} • {e.city || e.location}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => navigate("/vendor/messages")}>
                  Pitch
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-foreground rounded-xl p-5 text-background">
          <Star className="h-5 w-5 mb-3" />
          <h3 className="font-semibold mb-2">Boost your visibility</h3>
          <p className="text-sm opacity-80 mb-4">Vendors with portfolios get 4× more bookings. Add your best work today.</p>
          <Button variant="secondary" size="sm" className="w-full rounded-lg" onClick={() => navigate("/vendor/portfolio")}>
            Add to portfolio
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Recent activity</h2>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {[
            { who: "Jane Doe", what: "viewed your profile", when: "2m ago" },
            { who: "Michael Chen", what: "messaged you about Spring Wedding", when: "1h ago" },
            { who: "EventNest", what: "approved your latest portfolio item", when: "3h ago" },
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <p className="text-foreground"><span className="font-medium">{a.who}</span> <span className="text-muted-foreground">{a.what}</span></p>
              <span className="text-xs text-muted-foreground">{a.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
