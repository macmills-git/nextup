import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { BookOpen, Calendar, Store, Users, MessageSquare, Sparkles, DollarSign, Settings, Play, ChevronRight, AtSign, Code, Image as ImageIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    group: "GETTING STARTED", icon: BookOpen, title: "Introduction",
    content: [
      { type: "text", value: "Welcome to EventNest! Follow these steps to get up and running in minutes. This documentation covers everything you need to know." },
      { type: "video", label: "Gemini 3 changes everything for EventNest", duration: "12:34" },
      { type: "features", items: [
        { icon: Sparkles, title: "Advanced AI Models", desc: "Leverage cutting-edge AI to automate event planning tasks." },
        { icon: Code, title: "Multi-Page Sites", desc: "Create comprehensive event microsites with multiple pages." },
        { icon: ImageIcon, title: "Asset Management", desc: "Upload and manage images, documents, and media files." },
        { icon: AtSign, title: "@ Context Mentions", desc: "Reference events, vendors, and team members inline." },
      ]},
      { type: "reference", title: "What You Can Reference", items: ["Events – Link to any event in your workspace", "Vendors – Reference vendor profiles and portfolios", "Team Members – Mention teammates for assignments", "Budgets – Pull in budget data for analysis", "Tasks – Reference task lists and milestones"] },
      { type: "steps", items: [
        { title: "Create an account", desc: "Sign up for free at eventnest.com/signup with your email or Google account." },
        { title: "Set up your profile", desc: "Add your name, photo, and organization details in Settings." },
        { title: "Create your first event", desc: "Head to Dashboard → Events → Create Event to get started." },
        { title: "Invite your team", desc: "Add collaborators from the Team page and assign roles." },
      ]},
    ]
  },
  {
    group: "GETTING STARTED", icon: Calendar, title: "Events",
    content: [
      { type: "text", value: "Events are the core of EventNest. Each event is a complete workspace for planning with tasks, timelines, budgets, and team assignments." },
      { type: "video", label: "Creating Events Guide", duration: "5:12" },
      { type: "features", items: [
        { icon: Calendar, title: "Event Details", desc: "Set name, date, time, location, guest count, and category." },
        { icon: DollarSign, title: "Budget Tracking", desc: "Set and track budgets by category with real-time alerts." },
      ]},
      { type: "screenshot", label: "Event Detail View", desc: "The event detail page shows all information in organized tabs." },
    ]
  },
  { group: "VIDEOS", icon: Store, title: "Vendor Marketplace", content: [
    { type: "text", value: "Our vendor marketplace connects you with verified professionals across all event categories." },
    { type: "video", label: "Finding the Perfect Vendor", duration: "4:08" },
    { type: "features", items: [
      { icon: Store, title: "Search & Filter", desc: "Find vendors by category, location, price range, and rating." },
      { icon: Users, title: "Vendor Profiles", desc: "View portfolios, reviews, ratings, and availability." },
    ]},
  ]},
  { group: "VIDEOS", icon: Users, title: "Team Management", content: [
    { type: "text", value: "Collaborate effectively with your team across all your events." },
    { type: "video", label: "Managing Your Team", duration: "3:45" },
    { type: "features", items: [
      { icon: Users, title: "Roles & Permissions", desc: "Admin, Editor, and Viewer access levels." },
      { icon: MessageSquare, title: "Communication", desc: "Direct messaging with team members." },
    ]},
  ]},
  { group: "VIDEOS", icon: MessageSquare, title: "Messaging", content: [
    { type: "text", value: "Stay connected with everyone involved in your events." },
    { type: "video", label: "Messaging Features", duration: "2:45" },
  ]},
  { group: "VIDEOS", icon: Sparkles, title: "AI Assistant", content: [
    { type: "text", value: "Your intelligent event planning companion powered by AI." },
    { type: "video", label: "AI Assistant Deep Dive", duration: "6:30" },
    { type: "screenshot", label: "AI in Action", desc: "The AI generates complete plans from a single prompt." },
  ]},
  { group: "VIDEOS", icon: DollarSign, title: "Budget & Billing", content: [
    { type: "text", value: "Manage finances with precision across all your events." },
    { type: "features", items: [
      { icon: DollarSign, title: "Budget Allocation", desc: "Set budgets per event and per category." },
      { icon: Settings, title: "Reports", desc: "Export detailed financial reports." },
    ]},
  ]},
  { group: "VIDEOS", icon: Settings, title: "Settings", content: [
    { type: "text", value: "Customize your EventNest experience." },
  ]},
];

const DocsPage = () => {
  const [active, setActive] = useState(0);
  const section = sections[active];
  const contentRef = useRef<HTMLDivElement>(null);

  // Build TOC from content
  const tocItems = section.content.map((block, i) => {
    if (block.type === 'text') return { label: 'Overview', id: `block-${i}` };
    if (block.type === 'video') return { label: block.label || 'Video', id: `block-${i}` };
    if (block.type === 'features') return { label: 'Features', id: `block-${i}` };
    if (block.type === 'reference') return { label: block.title || 'Reference', id: `block-${i}` };
    if (block.type === 'steps') return { label: 'Steps', id: `block-${i}` };
    if (block.type === 'screenshot') return { label: block.label || 'Screenshot', id: `block-${i}` };
    return { label: 'Section', id: `block-${i}` };
  });

  // Group sidebar items
  let lastGroup = '';

  return (
    <div className="min-h-screen bg-background relative z-[1]">
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-56 flex-shrink-0 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-lg font-bold text-foreground mb-6">Documentation</h2>
            <nav className="space-y-0.5">
              {sections.map((s, i) => {
                const showGroup = s.group !== lastGroup;
                lastGroup = s.group;
                return (
                  <div key={i}>
                    {showGroup && <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-4 mb-2 px-3">{s.group}</p>}
                    <button
                      onClick={() => setActive(i)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active === i ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      <s.icon className="h-4 w-4 flex-shrink-0" />
                      {s.title}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0" ref={contentRef}>
            <div className="bg-card rounded-2xl border border-border p-8 md:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h1>
              </div>

              <div className="space-y-8">
                {section.content.map((block, i) => {
                  if (block.type === 'text') {
                    return <p key={i} id={`block-${i}`} className="text-sm leading-relaxed text-muted-foreground">{block.value}</p>;
                  }
                  if (block.type === 'video') {
                    return (
                      <div key={i} id={`block-${i}`} className="rounded-xl overflow-hidden cursor-pointer group bg-foreground/5 dark:bg-card border border-border">
                        <div className="aspect-video bg-secondary flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
                          <div className="w-16 h-16 rounded-full flex items-center justify-center bg-card/80 backdrop-blur-sm shadow-elevated group-hover:scale-110 transition-transform z-10">
                            <Play className="w-6 h-6 text-foreground ml-1" />
                          </div>
                          <p className="absolute bottom-4 left-4 text-sm font-semibold text-white z-10">{block.label}</p>
                          <span className="absolute bottom-4 right-4 text-xs text-white/70 z-10">{block.duration}</span>
                        </div>
                      </div>
                    );
                  }
                  if (block.type === 'features') {
                    return (
                      <div key={i} id={`block-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.items?.map((feat, j) => (
                          <div key={j} className="rounded-xl p-4 transition-colors hover:bg-secondary bg-card border border-border">
                            <div className="flex items-center gap-2 mb-2">
                              {feat.icon && <feat.icon className="w-4 h-4 text-primary" />}
                              <p className="text-sm font-semibold text-foreground">{feat.title}</p>
                            </div>
                            <p className="text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (block.type === 'reference') {
                    return (
                      <div key={i} id={`block-${i}`} className="rounded-xl p-5 bg-secondary border border-border">
                        <h3 className="text-sm font-semibold text-foreground mb-3">{block.title}</h3>
                        <ul className="space-y-2">
                          {block.items?.map((item, j) => (
                            <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (block.type === 'steps') {
                    return (
                      <div key={i} id={`block-${i}`} className="space-y-4">
                        {block.items?.map((step, j) => (
                          <div key={j} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold bg-primary text-primary-foreground">
                              {j + 1}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-foreground">{step.title}</p>
                              <p className="text-xs mt-0.5 text-muted-foreground">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  }
                  if (block.type === 'screenshot') {
                    return (
                      <div key={i} id={`block-${i}`} className="rounded-xl border border-border overflow-hidden">
                        <div className="bg-secondary h-48 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto rounded-xl mb-2 flex items-center justify-center bg-primary/10">
                              <BookOpen className="w-6 h-6 text-primary/50" />
                            </div>
                            <p className="text-xs text-muted-foreground">Screenshot Preview</p>
                          </div>
                        </div>
                        <div className="p-4 bg-primary/5 border-t border-primary/20">
                          <p className="text-sm font-medium text-foreground">{block.label}</p>
                          <p className="text-xs mt-1 text-muted-foreground">{block.desc}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          {/* Right TOC */}
          <div className="hidden xl:block w-48 flex-shrink-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
            <nav className="space-y-1">
              {tocItems.map((item, i) => (
                <a
                  key={i}
                  href={`#${item.id}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1 pl-3 border-l-2 border-border hover:border-primary"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <SaasFooter />
    </div>
  );
};

export default DocsPage;
