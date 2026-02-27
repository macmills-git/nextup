import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, DollarSign, Users, Sparkles, MessageSquare, Clock, Store, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const features = [
  { icon: Calendar, title: "Event Creation", desc: "Create events with dates, locations, guest counts and budgets in seconds. Manage everything from a single dashboard." },
  { icon: Store, title: "Vendor Marketplace", desc: "Discover and compare verified vendors with portfolios, reviews, and pricing. Filter by category and location." },
  { icon: DollarSign, title: "Budget Management", desc: "Allocate budgets, track expenses in real-time, and get alerts before budget overruns happen." },
  { icon: Clock, title: "Timeline Planning", desc: "Automated timelines with tasks, milestones and deadline tracking. Never miss a critical planning step." },
  { icon: Sparkles, title: "AI Assistant", desc: "Get AI-generated event plans, budgets and vendor recommendations tailored to your specific needs." },
  { icon: MessageSquare, title: "Communication Hub", desc: "Centralized messaging with vendors, teams and collaborators. Keep everything in one place." },
  { icon: Users, title: "Team Collaboration", desc: "Invite team members, assign roles and coordinate effortlessly across all your events." },
  { icon: CheckCircle, title: "Task Management", desc: "Assign tasks, set milestones and track progress in real-time with smart notifications." },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-background grid-bg">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Features</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6 text-foreground tracking-tight">
            Everything you need to plan perfect events
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Powerful tools that work together to streamline your entire event planning workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 group bg-card border border-border shadow-card hover:shadow-elevated">
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium border-none text-white" style={{
            background: 'linear-gradient(135deg, hsl(225, 90%, 60%), hsl(225, 80%, 65%))',
            boxShadow: '0 4px 20px hsl(225, 90%, 60%, 0.35)',
          }}>
            <Link to="/signup">Get Started Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
