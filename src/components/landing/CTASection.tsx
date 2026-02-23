import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import eventPlanningImg from "@/assets/event-planning.jpg";
import eventVenueImg from "@/assets/event-venue.jpg";

const CTASection = () => {
  return (
    <>
      {/* Say goodbye section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Your Planning Saviour is Events Built on Time</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Say goodbye to planning headaches
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              EventNest brings smart automation to event planning. Let AI handle the heavy lifting while you focus on creating memorable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={eventPlanningImg} alt="Team collaborating on event planning" className="w-full h-64 md:h-80 object-cover" />
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-xl p-5 border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-2">AI-Powered Planning</h3>
                <p className="text-sm text-muted-foreground">Generate complete event timelines, budgets, and vendor lists with a few clicks.</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border shadow-card">
                <h3 className="font-semibold text-foreground mb-2">Smart Budget Tracking</h3>
                <p className="text-sm text-muted-foreground">Real-time expense tracking with alerts before budget overruns happen.</p>
              </div>
              <Button asChild>
                <Link to="/signup">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Editing tools section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Interactive AI Assistant</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Review AI results with our advanced editing tools
            </h2>
          </div>
          <div className="max-w-4xl mx-auto bg-card rounded-2xl shadow-elevated border border-border overflow-hidden">
            <img src={eventVenueImg} alt="Event venue setup" className="w-full h-64 md:h-96 object-cover" />
          </div>
        </div>
      </section>

      {/* Centralized planning */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">All Plans Access: Multiple</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
              Centralized planning and management
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Gain your full picture view, live status, collaborative edits and event team visualization to focus on what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="space-y-4">
              <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                <span className="text-xs text-muted-foreground">All events in one place</span>
                <div className="mt-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium">event+config/access</div>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                <span className="text-xs text-muted-foreground">Unified notifications</span>
              </div>
              <div className="bg-card rounded-xl p-4 border border-border shadow-card">
                <span className="text-xs text-muted-foreground">All in one full timeline</span>
              </div>
              <div className="flex gap-3">
                <div className="bg-accent text-accent-foreground rounded-lg px-3 py-1.5 text-xs font-medium">all+integrations</div>
                <div className="bg-accent text-accent-foreground rounded-lg px-3 py-1.5 text-xs font-medium">team members</div>
              </div>
              <Button asChild>
                <Link to="/signup">Start Now</Link>
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elevated">
              <img src={eventVenueImg} alt="Beautiful event venue" className="w-full h-64 md:h-80 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CTASection;
