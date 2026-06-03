import Navbar from "@/components/Navbar";
import SaasFooter from "@/components/landing/saas/SaasFooter";
import { BookOpen, Calendar, Store, Users, MessageSquare, Sparkles, DollarSign, Settings, Play, Code2 as Code, ImageIcon, AtSign, CheckCircle, Zap, Shield, BarChart3, Ticket, ArrowRight, Layers, Globe, Rocket, Map, Bell, CreditCard, FileText, LineChart, Plug } from "@/lib/fa-icons";
import { useState } from "react";

const sections = [
  {
    group: "GETTING STARTED", icon: BookOpen, title: "Introduction",
    content: [
      { type: "text", value: "Welcome to Nested — your AI-powered event planning command center. This guide walks you through everything from creating your first event to leveraging advanced features like AI budgeting, vendor marketplace, and real-time team collaboration." },
      { type: "video", label: "Getting Started with Nested", duration: "12:34" },
      { type: "features", items: [
        { icon: Sparkles, title: "AI-Powered Planning", desc: "Generate complete event timelines, vendor recommendations, and budget breakdowns from a simple text prompt." },
        { icon: Layers, title: "Event Workspaces", desc: "Dedicated workspaces for each event with tabs for overview, timeline, tasks, vendors, budget, and guests." },
        { icon: Globe, title: "Vendor Marketplace", desc: "Browse 500+ verified vendors with ratings, portfolios, and instant booking capabilities." },
        { icon: AtSign, title: "Smart Mentions", desc: "Reference events, vendors, team members, and budgets inline across messages and AI conversations." },
      ]},
      { type: "reference", title: "Key Concepts", items: [
        "Events — The core unit of planning. Each event is a complete workspace with tabs for every aspect of event management.",
        "Vendors — Verified professionals you can browse, compare, book, and communicate with directly.",
        "Team — Collaborators with role-based access. Assign tasks and share event workspaces seamlessly.",
        "Templates — Pre-built event blueprints that you can customize and deploy in seconds.",
        "AI Assistant — Your intelligent co-planner that generates timelines, optimizes budgets, and suggests vendors.",
      ] },
      { type: "steps", items: [
        { title: "Create your account", desc: "Sign up for free at nested.com/signup with your email or Google account. No credit card required." },
        { title: "Set up your workspace", desc: "Add your organization name, upload a logo, and invite your team members from Settings → Team." },
        { title: "Create your first event", desc: "Navigate to Dashboard → Events → Create Event. Use a template or start from scratch with our guided wizard." },
        { title: "Invite vendors & guests", desc: "Browse the Vendor Marketplace, send booking requests, and manage your guest list with RSVP tracking." },
      ]},
    ]
  },
  { group: "GETTING STARTED", icon: Calendar, title: "Events",
    content: [
      { type: "text", value: "Events are the heart of Nested. Each event creates a dedicated workspace where you manage every detail — from initial planning to post-event analytics. Our guided creation flow ensures you never miss a critical step." },
      { type: "video", label: "Creating Your First Event", duration: "5:12" },
      { type: "features", items: [
        { icon: Calendar, title: "Smart Scheduling", desc: "Set dates, times, and durations with automatic conflict detection across your event calendar." },
        { icon: DollarSign, title: "Budget Intelligence", desc: "AI-powered budget allocation that learns from your past events and suggests optimal spending." },
        { icon: CheckCircle, title: "Task Management", desc: "Create, assign, and track tasks with priorities, deadlines, and automatic notifications." },
        { icon: Users, title: "Guest Management", desc: "Import guest lists, send invitations, track RSVPs, and manage seating arrangements." },
      ]},
      { type: "reference", title: "Event Workspace Tabs", items: [
        "Overview — Event name, date, location, description, and key details at a glance.",
        "Timeline — Visual milestones with status indicators (completed, in-progress, pending).",
        "Tasks — Actionable to-do lists with priority levels and assignees.",
        "Vendors — Linked vendor profiles with status tracking and communication.",
        "Budget — Category-wise allocation with spending progress bars and alerts.",
        "Guests — Full guest list management with RSVP status and invitation tracking.",
      ] },
      { type: "steps", items: [
        { title: "Choose a template or start blank", desc: "Templates come pre-loaded with tasks, milestones, vendor suggestions, and budget allocations." },
        { title: "Fill in event details", desc: "Name, date, time, venue, expected guest count, and a detailed description." },
        { title: "Build your timeline", desc: "Add milestones with dates and track progress as each one is completed." },
        { title: "Assign tasks to your team", desc: "Break down the work into tasks, set priorities, and assign team members." },
      ]},
    ]
  },
  { group: "GUIDES", icon: Store, title: "Vendor Marketplace", content: [
    { type: "text", value: "The Nested Vendor Marketplace connects you with 500+ verified professionals across photography, catering, audio/visual, decoration, entertainment, and equipment categories. Browse portfolios, compare packages, read reviews, and book directly." },
    { type: "video", label: "Navigating the Vendor Marketplace", duration: "4:08" },
    { type: "features", items: [
      { icon: Shield, title: "Verified Vendors", desc: "Every vendor goes through our verification process ensuring quality, reliability, and professionalism." },
      { icon: Store, title: "Service Packages", desc: "Compare Basic, Premium, and Luxury tiers across vendors with transparent pricing." },
      { icon: MessageSquare, title: "Direct Messaging", desc: "Chat with vendors directly from their profile. Share event details and get instant quotes." },
      { icon: BarChart3, title: "Performance Metrics", desc: "View response times, completion rates, and satisfaction scores before booking." },
    ]},
    { type: "steps", items: [
      { title: "Browse by category", desc: "Filter vendors by Photography, Catering, Audio/Visual, Decoration, Entertainment, or Equipment." },
      { title: "Compare packages", desc: "Each vendor offers 3 tiers. The 'Most Popular' tag highlights the best value option." },
      { title: "Read reviews", desc: "See ratings, written reviews, and satisfaction percentages from past clients." },
      { title: "Book & communicate", desc: "Select a package, send a booking request, and manage all communication in Messages." },
    ]},
  ]},
  { group: "GUIDES", icon: Users, title: "Team Management", content: [
    { type: "text", value: "Nested makes team collaboration effortless. Invite members, assign roles, delegate tasks, and keep everyone aligned with real-time updates and notifications." },
    { type: "video", label: "Building Your Event Team", duration: "3:45" },
    { type: "features", items: [
      { icon: Users, title: "Role-Based Access", desc: "Assign roles like Project Manager, Event Coordinator, or Vendor Relations with appropriate permissions." },
      { icon: CheckCircle, title: "Task Delegation", desc: "Assign tasks to specific team members and track progress in real time." },
    ]},
    { type: "reference", title: "Team Roles", items: [
      "Admin — Full access to all events, settings, billing, and team management.",
      "Project Manager — Can create, edit, and manage events. Can assign tasks and manage vendors.",
      "Event Coordinator — Can view and update assigned events. Limited to their event workspaces.",
      "Viewer — Read-only access to events they've been invited to.",
    ] },
  ]},
  { group: "GUIDES", icon: MessageSquare, title: "Messaging", content: [
    { type: "text", value: "Stay connected with your team, vendors, and collaborators through Nested's integrated messaging system. Conversations are categorized into individual chats, event-based team threads, and vendor messages." },
    { type: "features", items: [
      { icon: MessageSquare, title: "Smart Categories", desc: "Messages are automatically organized into Chats, Teams, and Vendors for easy navigation." },
      { icon: CheckCircle, title: "Status Indicators", desc: "Track message delivery with sent, delivered, and seen indicators — just like modern messaging apps." },
      { icon: Zap, title: "File Sharing", desc: "Attach images, documents, and files directly in conversations. Preview images inline." },
      { icon: AtSign, title: "Team Threads", desc: "Event-specific group conversations where all team members can collaborate in context." },
    ]},
  ]},
  { group: "GUIDES", icon: Sparkles, title: "AI Assistant", content: [
    { type: "text", value: "Your AI co-planner that understands event management. Generate complete event plans from text prompts, optimize budgets, find vendors, and get intelligent recommendations based on your data." },
    { type: "video", label: "AI Assistant Deep Dive", duration: "6:30" },
    { type: "features", items: [
      { icon: Sparkles, title: "Natural Language Planning", desc: "Describe your event in plain text and get a complete plan with timeline, budget, and vendor recommendations." },
      { icon: Layers, title: "Prompt Builder", desc: "Use structured prompts to get precise outputs — from budget breakdowns to vendor comparison matrices." },
    ]},
    { type: "steps", items: [
      { title: "Describe your event", desc: "Type a natural language description: 'Help me plan a corporate event for 200 guests with a $50K budget.'" },
      { title: "Review the AI plan", desc: "The assistant generates a complete plan with timeline, budget allocation, and vendor suggestions." },
      { title: "Refine and iterate", desc: "Ask follow-up questions, adjust parameters, and fine-tune the plan to your needs." },
      { title: "Apply to your event", desc: "Convert the AI-generated plan into an actual event workspace with one click." },
    ]},
  ]},
  { group: "GUIDES", icon: BarChart3, title: "Reports", content: [
    { type: "text", value: "Gain actionable insights into your event operations with detailed reports and analytics. Track revenue, guest satisfaction, budget utilization, and vendor performance across all your events." },
    { type: "features", items: [
      { icon: BarChart3, title: "Event Analytics", desc: "Track events over time, revenue trends, and guest satisfaction scores with interactive charts." },
      { icon: DollarSign, title: "Budget Reports", desc: "Compare allocated vs. spent budgets across categories and events with trend analysis." },
      { icon: Store, title: "Vendor Performance", desc: "Evaluate vendor reliability, response times, and client satisfaction ratings." },
      { icon: Calendar, title: "Exportable Data", desc: "Export reports as CSV or PDF for stakeholder presentations and record-keeping." },
    ]},
  ]},
  { group: "GUIDES", icon: DollarSign, title: "Budget & Billing", content: [
    { type: "text", value: "Nested provides granular budget tracking at the event level and account billing management for your subscription. Set budget limits, track spending by category, and get alerts when you're approaching limits." },
    { type: "features", items: [
      { icon: DollarSign, title: "Category Tracking", desc: "Break budgets into categories: venue, catering, decoration, photography, entertainment, and more." },
      { icon: Zap, title: "Smart Alerts", desc: "Receive notifications when spending exceeds 80% of any budget category allocation." },
    ]},
  ]},
  { group: "GUIDES", icon: Settings, title: "Settings", content: [
    { type: "text", value: "Customize every aspect of your Nested experience. Manage your profile, security settings, team access, billing information, notification preferences, and more." },
    { type: "reference", title: "Settings Sections", items: [
      "My Details — Update your name, email, phone, bio, and profile photo.",
      "Password — Change password, enable two-factor authentication for enhanced security.",
      "Notifications — Control email, push, and marketing notification preferences.",
      "Billings — Manage payment methods, view billing history, and download invoices.",
      "Plan — View current subscription, upgrade or downgrade plans.",
      "Team — Invite members, assign roles, and manage team access.",
    ] },
  ]},
  { group: "EVENT LIFECYCLE", icon: Rocket, title: "Event Workspace", content: [
    { type: "text", value: "Every event in Nested lives inside a dedicated Event Workspace — a command center that follows the lifecycle from idea → planning → execution → post-event analysis. All sub-systems (timeline, tasks, budget, vendors, guests, team, docs) are linked: booking a vendor automatically creates a budget line, a task, and a timeline entry." },
    { type: "callout", tone: "info", title: "Lifecycle phases", value: "Initiation → Planning → Execution → Event Day → Wrap-up. Each workspace knows what phase you're in and surfaces the right tools." },
    { type: "diagram", items: ["Overview", "Timeline", "Tasks", "Budget", "Vendors", "Guests", "Team", "Documents", "Communications", "Event Day", "Reports"] },
    { type: "features", items: [
      { icon: Layers, title: "Linked sub-systems", desc: "Vendors, budget lines, tasks and timeline entries are cross-referenced — change one, the others update." },
      { icon: Bell, title: "Mission Control alerts", desc: "Heuristic detection for budget overruns, schedule overlaps, and stalled vendor responses." },
      { icon: Sparkles, title: "AI seeding", desc: "Pick your event structure and the workspace pre-populates tasks, vendor pipeline, and budget categories." },
    ]},
  ]},
  { group: "EVENT LIFECYCLE", icon: Sparkles, title: "Create an Event (Wizard)", content: [
    { type: "text", value: "The 3-step Create Event Wizard turns a rough idea into a fully scaffolded workspace in under 2 minutes." },
    { type: "steps", items: [
      { title: "Basics", desc: "Name, type, modality, theme, guest count, goal, budget, date and location." },
      { title: "Structure", desc: "Pick the components you need (catering, stage, security, ticketing). Each one seeds vendors, budget lines, tasks and timeline blocks." },
      { title: "Planning Mode", desc: "DIY, with team, hire a planner, or let AI co-plan. Sets defaults for collaboration and automation." },
    ]},
    { type: "callout", tone: "tip", title: "Templates", value: "Start from a template to skip the wizard with curated structure presets (Corporate Gala, Wedding, Launch, Conference, Birthday)." },
  ]},
  { group: "EVENT LIFECYCLE", icon: Calendar, title: "Timeline & Tasks", content: [
    { type: "text", value: "Timeline is built in 4 layers: Planning, Run Sheet, Vendor commitments, and Team milestones. Tasks live in a hierarchical tree with dependencies and assignees." },
    { type: "comparison", left: { title: "Planning timeline", items: ["Weeks/months view", "Vendor deadlines", "Payment milestones", "Marketing pushes"] }, right: { title: "Run sheet", items: ["Minute-by-minute", "Speaker slots", "Vendor arrivals", "Live ops"] } },
    { type: "features", items: [
      { icon: CheckCircle, title: "Dependency badges", desc: "Tasks flag when prerequisites aren't met. Heuristic overlap detection warns of double-booked windows." },
      { icon: Zap, title: "Quick actions", desc: "Convert any task into a vendor request, calendar event, or document with one click." },
    ]},
  ]},
  { group: "EVENT LIFECYCLE", icon: DollarSign, title: "Budget Engine", content: [
    { type: "text", value: "Budgets are a matrix of categories (venue, F&B, AV, decor…) × layers (estimated, committed, paid, actual). Booking a vendor fills committed; uploading an invoice fills actual." },
    { type: "callout", tone: "warning", title: "Overrun alerts", value: "When any category exceeds 80% you'll get a soft warning. 100% triggers a hard alert in Mission Control." },
    { type: "code", lang: "formula", value: "Variance = Actual − Estimated\nHealth = 1 − max(Variance, 0) / Estimated" },
  ]},
  { group: "EVENT LIFECYCLE", icon: Store, title: "Vendor Pipeline", content: [
    { type: "text", value: "Vendors flow through a kanban: Shortlist → Requested → Quoted → Negotiating → Booked → Delivered. Every move triggers downstream updates." },
    { type: "diagram", items: ["Shortlist", "Requested", "Quoted", "Negotiating", "Booked", "Delivered"] },
    { type: "features", items: [
      { icon: Plug, title: "Auto-linking", desc: "Booking creates a budget line, a task with due date, and a timeline entry tied to the vendor." },
      { icon: MessageSquare, title: "Inline messaging", desc: "All vendor threads roll up to Communications, scoped to the event." },
    ]},
  ]},
  { group: "EVENT LIFECYCLE", icon: Users, title: "Guests", content: [
    { type: "text", value: "Manage guests end-to-end: import, segment, send invitations, track RSVPs, build seating maps, and check guests in on event day." },
    { type: "features", items: [
      { icon: Users, title: "Segments", desc: "Group guests by VIP, plus-one status, dietary needs, or table assignment." },
      { icon: Ticket, title: "QR check-in", desc: "Each confirmed guest gets a QR pass. Scan at the door for live attendance stats." },
    ]},
  ]},
  { group: "EVENT LIFECYCLE", icon: FileText, title: "Documents", content: [
    { type: "text", value: "Upload contracts, permits, invoices, moodboards, floorplans, runsheets and quotes. AI extracts key fields (amount, date, terms) from contracts and invoices automatically." },
    { type: "callout", tone: "info", title: "AI extraction", value: "Heuristic field extraction is on for contracts and invoices. Extracted values feed the Budget engine when you confirm." },
  ]},
  { group: "EVENT LIFECYCLE", icon: Zap, title: "Event Day Mode", content: [
    { type: "text", value: "On the day, switch to Event Day Mode for a live operations dashboard: pulsing run sheet, vendor check-ins, real-time issue board, and AI nudges." },
    { type: "features", items: [
      { icon: Bell, title: "Live issues", desc: "Anyone on the team can log an issue with severity. Auto-routes to the right owner." },
      { icon: Sparkles, title: "AI suggestions", desc: "Surfaces likely next steps based on the run sheet position and outstanding tasks." },
    ]},
  ]},
  { group: "EVENT LIFECYCLE", icon: LineChart, title: "Reports", content: [
    { type: "text", value: "Post-event analytics covering financial variance, attendance, vendor performance, and team contribution. Export to CSV/PDF for stakeholders." },
    { type: "features", items: [
      { icon: BarChart3, title: "Financial variance", desc: "Estimated vs. actual broken down by category, with biggest drivers highlighted." },
      { icon: Users, title: "Attendance", desc: "Invited, RSVP'd, checked-in, no-show — plus peak attendance windows." },
      { icon: Store, title: "Vendor performance", desc: "Response time, on-time delivery, and post-event ratings feed the marketplace." },
    ]},
  ]},
  { group: "FOR VENDORS", icon: Store, title: "Vendor Onboarding", content: [
    { type: "text", value: "If you sell services, sign up as a vendor. The onboarding wizard captures your business, services, pricing tiers, portfolio and availability." },
    { type: "steps", items: [
      { title: "Business profile", desc: "Name, category, service area, team size." },
      { title: "Packages", desc: "Define Basic / Premium / Luxury tiers with transparent pricing." },
      { title: "Portfolio", desc: "Upload photos and past events to showcase your work." },
      { title: "Go live", desc: "Once verified your profile appears in the Vendor Marketplace." },
    ]},
  ]},
  { group: "FOR VENDORS", icon: Map, title: "Find Events", content: [
    { type: "text", value: "Vendors can browse open events that match their category, location and budget — then submit proposals directly." },
    { type: "features", items: [
      { icon: Map, title: "Location matching", desc: "See only events in your service radius." },
      { icon: CheckCircle, title: "Proposal tracking", desc: "Track which proposals are open, won, or lost from your Bookings tab." },
    ]},
  ]},
  { group: "API & INTEGRATIONS", icon: Plug, title: "Integrations", content: [
    { type: "text", value: "Connect Nested to the tools you already use — calendars, payments, messaging, and storage." },
    { type: "features", items: [
      { icon: Calendar, title: "Google Calendar", desc: "Two-way sync for event dates, milestones and run sheets." },
      { icon: CreditCard, title: "Stripe", desc: "Sell tickets, accept vendor deposits, and reconcile payments." },
      { icon: MessageSquare, title: "Slack", desc: "Push notifications, alerts and AI digests into your team channels." },
    ]},
  ]},
  { group: "API & INTEGRATIONS", icon: Code, title: "API & Webhooks", content: [
    { type: "text", value: "Programmatic access via REST. Use webhooks to react to events.created, vendor.booked, budget.overrun, guest.checked_in and more." },
    { type: "code", lang: "bash", value: "curl -X POST https://api.nested.app/v1/events \\\n  -H 'Authorization: Bearer <token>' \\\n  -d '{ \"name\": \"Launch Gala\", \"date\": \"2026-09-12\" }'" },
    { type: "callout", tone: "info", title: "Authentication", value: "All requests need a Bearer token. Generate keys in Settings → Developer." },
  ]},
];

const DocsPage = () => {
  const [active, setActive] = useState(0);
  const section = sections[active];

  const tocItems = section.content.map((block, i) => {
    if (block.type === 'text') return { label: 'Overview', id: `block-${i}` };
    if (block.type === 'video') return { label: block.label || 'Video', id: `block-${i}` };
    if (block.type === 'features') return { label: 'Features', id: `block-${i}` };
    if (block.type === 'reference') return { label: block.title || 'Reference', id: `block-${i}` };
    if (block.type === 'steps') return { label: 'Steps', id: `block-${i}` };
    return { label: 'Section', id: `block-${i}` };
  });

  let lastGroup = '';

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-28 pb-20 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-56 flex-shrink-0 lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-lg font-bold text-foreground mb-6">Documentation</h2>
            <nav className="space-y-0.5">
              {sections.map((s, i) => {
                const showGroup = s.group !== lastGroup;
                lastGroup = s.group;
                return (
                  <div key={i}>
                    {showGroup && <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-5 mb-2 px-3">{s.group}</p>}
                    <button onClick={() => setActive(i)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        active === i ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}>
                      <s.icon className="h-4 w-4 flex-shrink-0" />
                      {s.title}
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-card rounded-2xl border border-border p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{section.title}</h1>
              </div>

              <div className="space-y-8">
                {section.content.map((block, i) => {
                  if (block.type === 'text') return <p key={i} id={`block-${i}`} className="text-sm leading-relaxed text-muted-foreground">{block.value}</p>;
                  if (block.type === 'video') return (
                    <div key={i} id={`block-${i}`} className="rounded-xl overflow-hidden cursor-pointer group bg-secondary border border-border">
                      <div className="aspect-video flex items-center justify-center relative">
                        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-card border border-border shadow-elevated group-hover:scale-110 transition-transform z-10">
                          <Play className="w-5 h-5 text-foreground ml-0.5" />
                        </div>
                        <p className="absolute bottom-4 left-4 text-sm font-medium text-foreground z-10">{block.label}</p>
                        <span className="absolute bottom-4 right-4 text-xs text-muted-foreground z-10">{block.duration}</span>
                      </div>
                    </div>
                  );
                  if (block.type === 'features') return (
                    <div key={i} id={`block-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.items?.map((feat, j) => (
                        <div key={j} className="rounded-xl p-4 bg-secondary border border-border hover:bg-accent transition-colors group">
                          <div className="flex items-center gap-2 mb-2">
                            {feat.icon && <feat.icon className="w-4 h-4 text-primary" />}
                            <p className="text-sm font-semibold text-foreground">{feat.title}</p>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
                        </div>
                      ))}
                    </div>
                  );
                  if (block.type === 'reference') return (
                    <div key={i} id={`block-${i}`} className="rounded-xl p-5 bg-secondary border border-border">
                      <h3 className="text-sm font-semibold text-foreground mb-3">{block.title}</h3>
                      <ul className="space-y-2">
                        {block.items?.map((item, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                  if (block.type === 'steps') return (
                    <div key={i} id={`block-${i}`} className="space-y-4">
                      {block.items?.map((step, j) => (
                        <div key={j} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold bg-primary text-white">{j + 1}</div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{step.title}</p>
                            <p className="text-xs mt-0.5 text-muted-foreground">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                  if (block.type === 'callout') {
                    const tones: any = {
                      info: 'border-info/30 bg-info/5 text-info',
                      tip: 'border-success/30 bg-success/5 text-success',
                      warning: 'border-warning/30 bg-warning/5 text-warning',
                    };
                    return (
                      <div key={i} id={`block-${i}`} className={`rounded-xl border p-5 ${tones[block.tone || 'info']}`}>
                        <p className="text-xs font-bold uppercase tracking-wider mb-2">{block.title}</p>
                        <p className="text-sm text-foreground/90 leading-relaxed">{block.value}</p>
                      </div>
                    );
                  }
                  if (block.type === 'diagram') return (
                    <div key={i} id={`block-${i}`} className="rounded-xl border border-border bg-secondary p-6">
                      <div className="flex flex-wrap items-center gap-2">
                        {block.items?.map((step: string, j: number) => (
                          <div key={j} className="flex items-center gap-2">
                            <span className="px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-semibold text-foreground">{step}</span>
                            {j < (block.items?.length ?? 0) - 1 && <span className="text-muted-foreground text-xs">→</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                  if (block.type === 'comparison') return (
                    <div key={i} id={`block-${i}`} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[block.left, block.right].map((col: any, j: number) => (
                        <div key={j} className={`rounded-xl border border-border p-5 ${j === 0 ? 'bg-secondary' : 'bg-card'}`}>
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{col.title}</p>
                          <ul className="space-y-1.5">
                            {col.items?.map((it: string, k: number) => (
                              <li key={k} className="text-sm text-foreground flex items-start gap-2">
                                <CheckCircle className="w-3 h-3 text-primary mt-1" />{it}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                  if (block.type === 'code') return (
                    <div key={i} id={`block-${i}`} className="rounded-xl border border-border bg-foreground text-background overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-background/10">
                        <span className="text-[10px] uppercase tracking-widest text-background/60">{block.lang}</span>
                        <Code className="w-3.5 h-3.5 text-background/60" />
                      </div>
                      <pre className="px-4 py-4 text-xs leading-relaxed overflow-x-auto"><code>{block.value}</code></pre>
                    </div>
                  );
                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="hidden xl:block w-48 flex-shrink-0 lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
            <nav className="space-y-1">
              {tocItems.map((item, i) => (
                <a key={i} href={`#${item.id}`}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 pl-3 border-l-2 border-border hover:border-primary">
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
