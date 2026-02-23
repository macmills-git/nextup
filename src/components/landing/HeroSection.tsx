import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, DollarSign, Star, MapPin } from "lucide-react";
import heroImage from "@/assets/event-planning.jpg";

const HeroSection = () => {
  return (
    <section className="gradient-hero pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Plan all your events in one place, find vendors, manage teams and budgets.
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use our AI-powered platform to manage small to medium event types. Budget, plan, vendor, 
            and let AI do the heavy lifting for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Hero mockup card */}
        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="bg-card rounded-2xl shadow-elevated border border-border p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Left: Event card */}
              <div className="flex-1 bg-secondary rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">Upcoming Event</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">Inspiring by Design</h3>
                <p className="text-xs text-muted-foreground mb-3">01/01/2025 - 12/01/2025</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Tokyo</span>
                  <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> $4,500.00</span>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-card -ml-1 first:ml-0" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-2">100+ Reviews</span>
                </div>
              </div>

              {/* Right: Stats */}
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-accent rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-primary">8</p>
                    <p className="text-xs text-muted-foreground">Total Events</p>
                  </div>
                  <div className="bg-accent rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-primary">24</p>
                    <p className="text-xs text-muted-foreground">Vendors</p>
                  </div>
                </div>
                <div className="bg-accent rounded-xl p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">Budget Tracker</span>
                    <span className="text-xs text-primary font-semibold">75%</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
