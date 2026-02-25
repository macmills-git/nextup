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
    <div className="min-h-screen" style={{ background: '#0B0B0F' }}>
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Features</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-6" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>
            Everything you need to plan perfect events
          </h1>
          <p className="text-sm md:text-base" style={{ color: '#9CA3AF' }}>
            Powerful tools that work together to streamline your entire event planning workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div key={i} className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 group" style={{
              background: 'linear-gradient(135deg, #16161D 0%, #121218 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
            }}>
              <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                <f.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Button size="lg" asChild className="rounded-full px-8 py-3 text-sm font-medium" style={{
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', boxShadow: '0 0 30px rgba(255,255,255,0.05)'
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
