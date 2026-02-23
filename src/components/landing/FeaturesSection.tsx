import { Calendar, DollarSign, Users, Sparkles, BarChart3, MessageSquare, Clock, CheckCircle } from "lucide-react";

const features = [
  { icon: Calendar, title: "Event Creation", desc: "Create events with dates, locations, guest counts and budgets in seconds." },
  { icon: Users, title: "Vendor Marketplace", desc: "Discover and compare verified vendors with portfolios and reviews." },
  { icon: DollarSign, title: "Budget Management", desc: "Allocate budgets, track expenses, and get alerts before overruns." },
  { icon: BarChart3, title: "Timeline Planning", desc: "Automated timelines with tasks, milestones and deadline tracking." },
  { icon: Sparkles, title: "AI Assistant", desc: "Get AI-generated event plans, budgets and vendor recommendations." },
  { icon: MessageSquare, title: "Communication Hub", desc: "Centralized messaging with vendors, teams and collaborators." },
  { icon: Clock, title: "Task Management", desc: "Assign tasks, set milestones and track progress in real-time." },
  { icon: CheckCircle, title: "Team Collaboration", desc: "Invite team members, assign roles and coordinate effortlessly." },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Facts & Colors</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Give your planning a makeover
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Lorem est dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Professional event planning tools at your fingertips.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground">8 Total Events</button>
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">Vendors</button>
          <button className="px-4 py-2 text-sm font-medium rounded-full bg-secondary text-secondary-foreground">Customers</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-elevated transition-shadow duration-300 group"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <feature.icon className="h-5 w-5 text-accent-foreground group-hover:text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
