import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Calendar, Store, Users, MessageSquare, Sparkles, DollarSign, Settings, Play, ChevronRight } from "lucide-react";
import { useState } from "react";

const sections = [
  {
    icon: BookOpen, title: "Getting Started",
    content: [
      { type: "text", value: "Welcome to EventNest! Follow these steps to get up and running in minutes." },
      { type: "video", label: "Quick Start Tutorial", duration: "3:24" },
      { type: "steps", items: [
        { title: "Create an account", desc: "Sign up for free at eventnest.com/signup with your email or Google account." },
        { title: "Set up your profile", desc: "Add your name, photo, and organization details in Settings." },
        { title: "Create your first event", desc: "Head to Dashboard → Events → Create Event to get started." },
        { title: "Invite your team", desc: "Add collaborators from the Team page and assign roles." },
        { title: "Explore vendors", desc: "Browse our marketplace to find the perfect vendors for your event." },
      ]},
      { type: "screenshot", label: "Dashboard Overview", desc: "Your main dashboard shows all events, tasks, and team activity at a glance." },
    ]
  },
  {
    icon: Calendar, title: "Events",
    content: [
      { type: "text", value: "Events are the core of EventNest. Each event is a complete workspace for planning." },
      { type: "video", label: "Creating Events Guide", duration: "5:12" },
      { type: "features", items: [
        { title: "Event Details", desc: "Set name, date, time, location, guest count, and category." },
        { title: "Categories", desc: "Wedding, Corporate, Conference, Social, Birthday, Workshop and more." },
        { title: "Budget Tracking", desc: "Set and track budgets by category with real-time alerts." },
        { title: "Timeline & Milestones", desc: "Create milestones and track progress with visual timelines." },
        { title: "Tasks", desc: "Create, assign, and track tasks for your event team." },
        { title: "Vendor Linking", desc: "Link vendors to specific events and manage contracts." },
      ]},
      { type: "screenshot", label: "Event Detail View", desc: "The event detail page shows all information in organized tabs." },
    ]
  },
  {
    icon: Store, title: "Vendor Marketplace",
    content: [
      { type: "text", value: "Our vendor marketplace connects you with verified professionals across all event categories." },
      { type: "video", label: "Finding Vendors", duration: "4:08" },
      { type: "features", items: [
        { title: "Search & Filter", desc: "Find vendors by category, location, price range, and rating." },
        { title: "Vendor Profiles", desc: "View portfolios, reviews, ratings, and availability." },
        { title: "Direct Contact", desc: "Message vendors directly through the platform." },
        { title: "Favorites", desc: "Save vendors to your favorites for quick access." },
        { title: "Booking & Quotes", desc: "Request quotes and manage contracts in one place." },
      ]},
    ]
  },
  {
    icon: Users, title: "Team Management",
    content: [
      { type: "text", value: "Collaborate effectively with your team across all your events." },
      { type: "features", items: [
        { title: "Invite Members", desc: "Send email invitations to join your team." },
        { title: "Roles & Permissions", desc: "Admin, Editor, and Viewer access levels for granular control." },
        { title: "Event Assignment", desc: "Assign team members to specific events." },
        { title: "Communication", desc: "Direct messaging with team members." },
        { title: "Activity Tracking", desc: "See who did what and when across all events." },
      ]},
      { type: "screenshot", label: "Team Management", desc: "Manage all team members, their roles, and event assignments." },
    ]
  },
  {
    icon: MessageSquare, title: "Messaging",
    content: [
      { type: "text", value: "Stay connected with everyone involved in your events." },
      { type: "video", label: "Messaging Features", duration: "2:45" },
      { type: "features", items: [
        { title: "Direct Messages", desc: "One-on-one conversations with team and vendors." },
        { title: "Team Chats", desc: "Group discussions organized per event." },
        { title: "Status Indicators", desc: "Sent ✓, delivered ✓✓, and read ✓✓ receipts." },
        { title: "Attachments", desc: "Share files, images, and documents seamlessly." },
      ]},
    ]
  },
  {
    icon: Sparkles, title: "AI Assistant",
    content: [
      { type: "text", value: "Your intelligent event planning companion powered by AI." },
      { type: "video", label: "AI Assistant Demo", duration: "6:30" },
      { type: "features", items: [
        { title: "Event Planning", desc: "Generate complete event plans with timelines and budgets." },
        { title: "Budget Optimization", desc: "Get AI suggestions to maximize your budget." },
        { title: "Vendor Recommendations", desc: "AI-curated vendor suggestions based on your needs." },
        { title: "Task Generation", desc: "Auto-create comprehensive task lists for your events." },
        { title: "Analytics", desc: "Gain insights from your event data and history." },
      ]},
    ]
  },
  {
    icon: DollarSign, title: "Budget & Billing",
    content: [
      { type: "text", value: "Manage finances with precision across all your events." },
      { type: "features", items: [
        { title: "Budget Allocation", desc: "Set budgets per event and per category." },
        { title: "Expense Tracking", desc: "Log expenses in real-time with receipts." },
        { title: "Alerts", desc: "Get notified before budget overruns occur." },
        { title: "Reports", desc: "Export detailed financial reports." },
      ]},
    ]
  },
  {
    icon: Settings, title: "Settings",
    content: [
      { type: "text", value: "Customize your EventNest experience to match your workflow." },
      { type: "features", items: [
        { title: "Profile Settings", desc: "Update your personal and organization information." },
        { title: "Notifications", desc: "Choose how and when you want to be notified." },
        { title: "Security", desc: "Password management and two-factor authentication." },
        { title: "Integrations", desc: "Connect with external tools and services." },
      ]},
    ]
  },
];

const DocsPage = () => {
  const [active, setActive] = useState(0);
  const section = sections[active];

  return (
    <div className="min-h-screen" style={{ background: '#0B0B0F' }}>
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <h2 className="text-lg font-bold text-white mb-6">Documentation</h2>
            <nav className="space-y-1">
              {sections.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active === i ? 'text-white' : 'text-white/40 hover:text-white/70'
                  }`}
                  style={active === i ? { background: 'rgba(59,130,246,0.15)' } : {}}
                >
                  <s.icon className="h-4 w-4 flex-shrink-0" />
                  {s.title}
                  {active === i && <ChevronRight className="h-3 w-3 ml-auto" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl p-8 md:p-10" style={{
              background: 'linear-gradient(135deg, #16161D 0%, #121218 100%)',
              border: '1px solid rgba(255,255,255,0.06)'
            }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <section.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">{section.title}</h1>
              </div>

              <div className="space-y-8">
                {section.content.map((block, i) => {
                  if (block.type === 'text') {
                    return <p key={i} className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{block.value}</p>;
                  }
                  if (block.type === 'video') {
                    return (
                      <div key={i} className="rounded-xl overflow-hidden cursor-pointer group" style={{
                        background: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.15)',
                      }}>
                        <div className="flex items-center gap-4 p-5">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{
                            background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)',
                          }}>
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{block.label}</p>
                            <p className="text-xs" style={{ color: '#9CA3AF' }}>Video Tutorial • {block.duration}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'screenshot') {
                    return (
                      <div key={i} className="rounded-xl p-5" style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <div className="rounded-lg h-48 mb-3 flex items-center justify-center" style={{
                          background: 'linear-gradient(135deg, #1a1a22 0%, #0e0e14 100%)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}>
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-xl mb-2 flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.1)' }}>
                              <BookOpen className="w-6 h-6 text-blue-400/50" />
                            </div>
                            <p className="text-xs text-white/30">Screenshot Preview</p>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-white">{block.label}</p>
                        <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{block.desc}</p>
                      </div>
                    );
                  }
                  if (block.type === 'steps') {
                    return (
                      <div key={i} className="space-y-4">
                        {block.items?.map((step, j) => (
                          <div key={j} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style={{
                              background: 'linear-gradient(135deg, #4F7CF7, #5B8DFB)', color: 'white'
                            }}>
                              {j + 1}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{step.title}</p>
                              <p className="text-xs mt-0.5" style={{ color: '#9CA3AF' }}>{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (block.type === 'features') {
                    return (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((feat, j) => (
                          <div key={j} className="rounded-xl p-4 transition-colors hover:bg-white/[0.04]" style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                          }}>
                            <p className="text-sm font-semibold text-white mb-1">{feat.title}</p>
                            <p className="text-xs leading-relaxed" style={{ color: '#9CA3AF' }}>{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocsPage;
