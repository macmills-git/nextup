import { useState } from "react";
import { 
  Download, FileText, Users, CheckCircle2, Clock, 
  AlertTriangle, TrendingUp, ChevronDown, ChevronRight, 
  Building2, ListTodo, MessageSquare, Star, Milestone,
  MapPin, Phone, Mail, Shield, Target, Zap, BarChart3
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const events = [
  {
    id: 1,
    name: "Annual Corporate Gala",
    type: "Corporate",
    date: "Mar 15, 2026",
    location: "Grand Ballroom, Hilton Downtown",
    status: "In Progress",
    completion: 72,
    priority: "High",
    budget: { allocated: 45000, spent: 32400 },
    tasks: { total: 28, completed: 20, overdue: 2, inProgress: 6 },
    milestones: [
      { name: "Venue Secured", date: "Jan 10", status: "Done" },
      { name: "Vendor Contracts Signed", date: "Feb 1", status: "Done" },
      { name: "Guest List Finalized", date: "Feb 20", status: "Done" },
      { name: "Seating Chart Complete", date: "Mar 1", status: "Overdue" },
      { name: "Final Walkthrough", date: "Mar 12", status: "Upcoming" },
      { name: "Event Day", date: "Mar 15", status: "Upcoming" },
    ],
    team: [
      { name: "Sarah K.", role: "Lead Planner", contributions: 34, tasksAssigned: 12, tasksCompleted: 10, lastActive: "2h ago", email: "sarah.k@nested.io" },
      { name: "James L.", role: "Logistics Coordinator", contributions: 22, tasksAssigned: 8, tasksCompleted: 6, lastActive: "30m ago", email: "james.l@nested.io" },
      { name: "Priya M.", role: "Creative Designer", contributions: 18, tasksAssigned: 8, tasksCompleted: 4, lastActive: "1h ago", email: "priya.m@nested.io" },
    ],
    vendors: [
      { name: "Grand Ballroom Venues", category: "Venue", status: "Confirmed", amount: "$12,000", contact: "John D.", rating: 4.8, paymentStatus: "50% Paid", deliverables: "Ballroom + AV setup" },
      { name: "Gourmet Catering Co.", category: "Catering", status: "Confirmed", amount: "$8,500", contact: "Maria F.", rating: 4.9, paymentStatus: "Deposit Paid", deliverables: "3-course dinner, 250 guests" },
      { name: "Lumina Decor", category: "Decor", status: "Pending", amount: "$4,200", contact: "Leo T.", rating: 4.5, paymentStatus: "Unpaid", deliverables: "Floral arrangements, lighting" },
      { name: "DJ Harmony", category: "Entertainment", status: "Confirmed", amount: "$2,800", contact: "Alex R.", rating: 4.7, paymentStatus: "Deposit Paid", deliverables: "4hr set, sound system" },
    ],
    guests: { invited: 250, confirmed: 198, declined: 22, pending: 30, vip: 35, dietaryRequests: 18 },
    communications: [
      { type: "Email", subject: "Save the Date sent to all guests", date: "Jan 15", recipients: 250 },
      { type: "Email", subject: "Formal invitation with RSVP link", date: "Feb 5", recipients: 250 },
      { type: "Email", subject: "Menu preference survey", date: "Feb 18", recipients: 198 },
      { type: "SMS", subject: "RSVP reminder to pending guests", date: "Mar 1", recipients: 52 },
    ],
    risks: [
      { issue: "Seating chart behind schedule", severity: "Medium", mitigation: "Assigned additional team member" },
      { issue: "AV equipment not yet booked", severity: "High", mitigation: "Backup vendor identified, booking today" },
    ],
    recentActivity: [
      { action: "Venue contract signed and first payment processed", by: "Sarah K.", time: "2h ago" },
      { action: "Final menu options confirmed with dietary accommodations", by: "James L.", time: "5h ago" },
      { action: "Sent 50 RSVP reminder invitations via email and SMS", by: "Priya M.", time: "1d ago" },
      { action: "Updated event timeline with revised milestone dates", by: "Sarah K.", time: "1d ago" },
      { action: "Coordinated AV requirements with venue manager", by: "James L.", time: "2d ago" },
    ],
    summary: "Event planning is on track with 72% completion. Venue and catering are confirmed. Decor vendor awaiting final approval. 2 overdue tasks need attention — seating chart and AV equipment booking. Guest response rate is strong at 88%. 35 VIP guests confirmed. Budget utilization at 72% with $12,600 remaining. Entertainment and catering deposits are paid. Risk: AV equipment booking is critical and must be resolved within 48 hours."
  },
  {
    id: 2,
    name: "Tech Conference 2026",
    type: "Conference",
    date: "Jun 20, 2026",
    location: "Convention Center Downtown",
    status: "Planning",
    completion: 35,
    priority: "Critical",
    budget: { allocated: 120000, spent: 42000 },
    tasks: { total: 52, completed: 18, overdue: 0, inProgress: 12 },
    milestones: [
      { name: "Theme & Agenda Set", date: "Feb 15", status: "Done" },
      { name: "Venue Booked", date: "Mar 1", status: "Done" },
      { name: "Speaker Lineup Finalized", date: "Apr 1", status: "In Progress" },
      { name: "Sponsor Packages Sold", date: "Apr 15", status: "Upcoming" },
      { name: "Registration Opens", date: "May 1", status: "Upcoming" },
      { name: "Conference Day 1", date: "Jun 20", status: "Upcoming" },
    ],
    team: [
      { name: "David R.", role: "Conference Director", contributions: 41, tasksAssigned: 18, tasksCompleted: 10, lastActive: "15m ago", email: "david.r@nested.io" },
      { name: "Emily C.", role: "Logistics Manager", contributions: 28, tasksAssigned: 14, tasksCompleted: 5, lastActive: "1h ago", email: "emily.c@nested.io" },
      { name: "Mike T.", role: "Marketing Lead", contributions: 19, tasksAssigned: 10, tasksCompleted: 2, lastActive: "3h ago", email: "mike.t@nested.io" },
      { name: "Ana S.", role: "Speaker Coordinator", contributions: 15, tasksAssigned: 10, tasksCompleted: 1, lastActive: "45m ago", email: "ana.s@nested.io" },
    ],
    vendors: [
      { name: "Convention Center Downtown", category: "Venue", status: "Confirmed", amount: "$35,000", contact: "Robert M.", rating: 4.6, paymentStatus: "30% Paid", deliverables: "Main hall, 4 breakout rooms, lobby" },
      { name: "TechStage Productions", category: "AV & Stage", status: "Confirmed", amount: "$18,000", contact: "Nina W.", rating: 4.8, paymentStatus: "Deposit Paid", deliverables: "Main stage, LED screens, livestream" },
      { name: "ByteBite Catering", category: "Catering", status: "In Review", amount: "$15,000", contact: "Chef Marco", rating: 4.4, paymentStatus: "Unpaid", deliverables: "Lunch buffet, coffee stations, VIP dinner" },
      { name: "PrintPro Badges", category: "Print", status: "Pending", amount: "$2,800", contact: "Linda K.", rating: 4.3, paymentStatus: "Unpaid", deliverables: "1000 badges, lanyards, programs" },
    ],
    guests: { invited: 1000, confirmed: 412, declined: 58, pending: 530, vip: 80, dietaryRequests: 45 },
    communications: [
      { type: "Email", subject: "Conference announcement & early-bird pricing", date: "Feb 20", recipients: 5000 },
      { type: "Email", subject: "Speaker announcement — keynotes revealed", date: "Mar 10", recipients: 5000 },
      { type: "Social", subject: "LinkedIn campaign launch", date: "Mar 15", recipients: 12000 },
    ],
    risks: [
      { issue: "Catering vendor hasn't confirmed final menu", severity: "Medium", mitigation: "Deadline set for Mar 20, backup vendor on standby" },
      { issue: "Only 60% of speaker slots filled", severity: "Low", mitigation: "Active outreach to 15 additional speakers" },
    ],
    recentActivity: [
      { action: "Added 3 keynote speakers to the lineup with bios", by: "Ana S.", time: "45m ago" },
      { action: "Updated venue floor plan with breakout room assignments", by: "Emily C.", time: "3h ago" },
      { action: "Launched early-bird registration campaign on 3 platforms", by: "Mike T.", time: "1d ago" },
      { action: "Reviewed AV requirements and approved stage design", by: "David R.", time: "1d ago" },
      { action: "Sent sponsorship decks to 12 potential sponsors", by: "Mike T.", time: "2d ago" },
      { action: "Booked hotel block for out-of-town speakers", by: "Emily C.", time: "3d ago" },
    ],
    summary: "Conference is in early planning at 35% completion. Venue and AV secured. Catering proposals under review with a decision deadline of Mar 20. Speaker lineup is 60% confirmed with 3 new keynotes added this week. Marketing campaign launched with early-bird pricing driving 412 registrations. No overdue tasks. Budget is 35% utilized with $78,000 remaining. Key focus: finalize speaker lineup and secure sponsors before Apr 15."
  },
  {
    id: 3,
    name: "Charity Fundraiser Gala",
    type: "Charity",
    date: "Feb 28, 2026",
    location: "Riverside Gardens",
    status: "Completed",
    completion: 100,
    priority: "Medium",
    budget: { allocated: 52000, spent: 48700 },
    tasks: { total: 35, completed: 35, overdue: 0, inProgress: 0 },
    milestones: [
      { name: "Sponsorship Drive", date: "Dec 15", status: "Done" },
      { name: "Venue & Entertainment Booked", date: "Jan 5", status: "Done" },
      { name: "Invitations Sent", date: "Jan 20", status: "Done" },
      { name: "Auction Items Collected", date: "Feb 10", status: "Done" },
      { name: "Rehearsal & Setup", date: "Feb 27", status: "Done" },
      { name: "Event Night", date: "Feb 28", status: "Done" },
    ],
    team: [
      { name: "Lisa W.", role: "Event Director", contributions: 48, tasksAssigned: 20, tasksCompleted: 20, lastActive: "Completed", email: "lisa.w@nested.io" },
      { name: "Carlos D.", role: "Volunteer Coordinator", contributions: 32, tasksAssigned: 15, tasksCompleted: 15, lastActive: "Completed", email: "carlos.d@nested.io" },
    ],
    vendors: [
      { name: "Riverside Gardens", category: "Venue", status: "Completed", amount: "$9,500", contact: "Grace P.", rating: 4.9, paymentStatus: "Fully Paid", deliverables: "Garden terrace, indoor reception" },
      { name: "Harmony Band", category: "Entertainment", status: "Completed", amount: "$6,000", contact: "Marcus J.", rating: 5.0, paymentStatus: "Fully Paid", deliverables: "Live jazz band, 3hr set" },
      { name: "Elegant Bites", category: "Catering", status: "Completed", amount: "$11,200", contact: "Chef Rosa", rating: 4.8, paymentStatus: "Fully Paid", deliverables: "Cocktail reception + seated dinner" },
    ],
    guests: { invited: 300, confirmed: 278, declined: 22, pending: 0, vip: 42, dietaryRequests: 25 },
    communications: [
      { type: "Email", subject: "Save the date — Charity Gala", date: "Dec 20", recipients: 300 },
      { type: "Email", subject: "Formal invitation with auction preview", date: "Jan 20", recipients: 300 },
      { type: "Email", subject: "Thank you & donation receipt", date: "Mar 2", recipients: 278 },
    ],
    risks: [],
    recentActivity: [
      { action: "Final event report generated and shared with board", by: "Lisa W.", time: "1w ago" },
      { action: "All vendor payments completed and receipts filed", by: "Carlos D.", time: "1w ago" },
      { action: "Thank you emails sent to all attendees with photos", by: "Lisa W.", time: "1w ago" },
    ],
    summary: "Event completed successfully. Raised $52,000 for charity through ticket sales and silent auction. All 35 tasks completed on time with zero overdue items. Budget came in 6.3% under allocation ($3,300 saved). Guest satisfaction rated 4.9/5 from post-event survey. All vendor payments settled. 42 VIP donors recognized. 25 dietary requests accommodated. Post-event report shared with the board of directors."
  },
  {
    id: 4,
    name: "Product Launch Party",
    type: "Corporate",
    date: "Apr 10, 2026",
    location: "TBD — Shortlisting venues",
    status: "Draft",
    completion: 12,
    priority: "Medium",
    budget: { allocated: 28000, spent: 3200 },
    tasks: { total: 20, completed: 2, overdue: 1, inProgress: 2 },
    milestones: [
      { name: "Event Brief Finalized", date: "Mar 5", status: "Overdue" },
      { name: "Venue Confirmed", date: "Mar 15", status: "Upcoming" },
      { name: "Invitations Sent", date: "Mar 25", status: "Upcoming" },
      { name: "Launch Night", date: "Apr 10", status: "Upcoming" },
    ],
    team: [
      { name: "Tom H.", role: "Project Lead", contributions: 8, tasksAssigned: 12, tasksCompleted: 2, lastActive: "2d ago", email: "tom.h@nested.io" },
    ],
    vendors: [
      { name: "Urban Loft Space", category: "Venue", status: "Shortlisted", amount: "$5,500", contact: "Dana L.", rating: 4.2, paymentStatus: "Unpaid", deliverables: "Industrial loft, rooftop access" },
    ],
    guests: { invited: 150, confirmed: 0, declined: 0, pending: 150, vip: 20, dietaryRequests: 0 },
    communications: [],
    risks: [
      { issue: "Event brief not finalized — blocking all downstream tasks", severity: "High", mitigation: "Escalated to project lead, deadline extended to Mar 8" },
      { issue: "Only 1 team member assigned", severity: "Medium", mitigation: "Request submitted for 2 additional team members" },
    ],
    recentActivity: [
      { action: "Created event draft with initial requirements", by: "Tom H.", time: "2d ago" },
      { action: "Added Urban Loft Space to venue shortlist", by: "Tom H.", time: "2d ago" },
    ],
    summary: "Event is in draft stage with only 12% completion and needs urgent attention. Only 1 team member assigned — additional resources requested. Venue shortlisted but not confirmed. 1 overdue task: finalize event brief (blocking venue booking and invitations). No communications sent yet. Budget is 11% utilized. Risk: without immediate action on the event brief, the Apr 10 launch date is at risk."
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Completed": return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
    case "In Progress": return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
    case "Planning": return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
    case "Draft": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const milestoneStatusIcon = (status: string) => {
  switch (status) {
    case "Done": return <CheckCircle2 className="w-3 h-3 text-emerald-500" />;
    case "In Progress": return <Clock className="w-3 h-3 text-blue-500" />;
    case "Overdue": return <AlertTriangle className="w-3 h-3 text-amber-500" />;
    default: return <div className="w-3 h-3 rounded-full border border-muted-foreground/30" />;
  }
};

const vendorStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed": case "Completed": return "text-emerald-600 dark:text-emerald-400";
    case "Pending": case "In Review": case "Shortlisted": return "text-amber-600 dark:text-amber-400";
    default: return "text-muted-foreground";
  }
};

const severityColor = (severity: string) => {
  switch (severity) {
    case "High": return "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400";
    case "Medium": return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
    default: return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
  }
};

const ReportsPage = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(1);
  const [exportingId, setExportingId] = useState<number | null>(null);

  const handleExportSingle = (event: typeof events[0]) => {
    setExportingId(event.id);
    const teamDetails = event.team.map(t => `  - ${t.name} (${t.role}): ${t.contributions} contributions, ${t.tasksCompleted}/${t.tasksAssigned} tasks done`).join("\n");
    const vendorDetails = event.vendors.map(v => `  - ${v.name} [${v.category}]: ${v.amount} — ${v.status} — Payment: ${v.paymentStatus} — Rating: ${v.rating}/5`).join("\n");
    const activityLog = event.recentActivity.map(a => `  - ${a.action} by ${a.by} (${a.time})`).join("\n");
    const milestoneLog = event.milestones.map(m => `  - [${m.status}] ${m.name} — ${m.date}`).join("\n");
    const commsLog = event.communications.map(c => `  - [${c.type}] ${c.subject} — ${c.date} (${c.recipients} recipients)`).join("\n");
    const riskLog = event.risks.map(r => `  - [${r.severity}] ${r.issue} → ${r.mitigation}`).join("\n");

    const content = `══════════════════════════════════════
EVENT REPORT: ${event.name}
══════════════════════════════════════
Type: ${event.type} | Date: ${event.date} | Location: ${event.location}
Status: ${event.status} | Priority: ${event.priority}
Completion: ${event.completion}%

BUDGET
  Allocated: $${event.budget.allocated.toLocaleString()}
  Spent: $${event.budget.spent.toLocaleString()}
  Remaining: $${(event.budget.allocated - event.budget.spent).toLocaleString()}
  Utilization: ${Math.round((event.budget.spent / event.budget.allocated) * 100)}%

MILESTONES
${milestoneLog}

TASKS
  Total: ${event.tasks.total} | Completed: ${event.tasks.completed} | In Progress: ${event.tasks.inProgress} | Overdue: ${event.tasks.overdue}

TEAM CONTRIBUTIONS
${teamDetails}

VENDORS
${vendorDetails}

GUEST RESPONSES
  Invited: ${event.guests.invited} | Confirmed: ${event.guests.confirmed} | Declined: ${event.guests.declined} | Pending: ${event.guests.pending}
  VIP Guests: ${event.guests.vip} | Dietary Requests: ${event.guests.dietaryRequests}

COMMUNICATIONS
${commsLog || "  No communications sent yet."}

RISK ASSESSMENT
${riskLog || "  No active risks."}

RECENT ACTIVITY
${activityLog}

SUMMARY
${event.summary}
`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `report-${event.name.toLowerCase().replace(/\s+/g, '-')}.txt`; a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setExportingId(null), 1000);
  };

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Event Reports</h1>
        <p className="text-sm text-muted-foreground">Detailed breakdown of each event's progress, team contributions, vendors, and guest engagement</p>
      </div>

      {/* Event Reports */}
      <div className="space-y-3">
        {events.map(event => {
          const isExpanded = expandedEvent === event.id;
          const budgetPercent = Math.round((event.budget.spent / event.budget.allocated) * 100);
          const responseRate = event.guests.invited > 0 ? Math.round(((event.guests.confirmed + event.guests.declined) / event.guests.invited) * 100) : 0;

          return (
            <div key={event.id} className="bg-card rounded-xl border border-border overflow-hidden transition-all hover:shadow-elevated">
              {/* Event Header Row */}
              <button onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/30 transition-colors">
                <div className="text-muted-foreground">
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-foreground text-sm">{event.name}</h3>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${statusColor(event.status)}`}>{event.status}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-primary/10 text-primary">{event.priority}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.type} · {event.date} · {event.location}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-sm font-semibold text-foreground">{event.completion}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="text-sm font-semibold text-foreground">{event.tasks.completed}/{event.tasks.total}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Confirmed</p>
                    <p className="text-sm font-semibold text-foreground">{event.guests.confirmed}</p>
                  </div>
                </div>
              </button>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-border px-4 pb-5 pt-4 space-y-5">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-medium text-foreground">Overall Progress</span>
                      <span className="text-xs text-muted-foreground">{event.completion}%</span>
                    </div>
                    <Progress value={event.completion} className="h-2" />
                  </div>

                  {/* Summary Note */}
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-foreground">Report Summary</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.summary}</p>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Milestone className="w-3.5 h-3.5 text-primary" /> Milestones Timeline
                    </h4>
                    <div className="bg-muted/30 rounded-lg p-3 border border-border">
                      <div className="space-y-2">
                        {event.milestones.map((m, i) => (
                          <div key={i} className="flex items-center gap-3">
                            {milestoneStatusIcon(m.status)}
                            <span className={`text-xs flex-1 ${m.status === 'Done' ? 'text-muted-foreground line-through' : m.status === 'Overdue' ? 'text-amber-600 dark:text-amber-400 font-medium' : 'text-foreground'}`}>
                              {m.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{m.date}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                              m.status === 'Done' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' :
                              m.status === 'Overdue' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' :
                              m.status === 'In Progress' ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400' :
                              'bg-muted text-muted-foreground'
                            }`}>{m.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  {event.risks.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-primary" /> Risk Assessment
                      </h4>
                      <div className="space-y-2">
                        {event.risks.map((risk, i) => (
                          <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border">
                            <div className="flex items-start gap-2">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium shrink-0 mt-0.5 ${severityColor(risk.severity)}`}>{risk.severity}</span>
                              <div>
                                <p className="text-xs font-medium text-foreground">{risk.issue}</p>
                                <p className="text-[11px] text-muted-foreground mt-0.5">Mitigation: {risk.mitigation}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Budget */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" /> Budget Breakdown
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2 border border-border">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Allocated</span>
                          <span className="text-foreground font-medium">${event.budget.allocated.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Spent</span>
                          <span className="text-foreground font-medium">${event.budget.spent.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Remaining</span>
                          <span className={`font-medium ${event.budget.allocated - event.budget.spent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                            ${(event.budget.allocated - event.budget.spent).toLocaleString()}
                          </span>
                        </div>
                        <Progress value={budgetPercent} className="h-1.5 mt-1" />
                        <p className="text-[10px] text-muted-foreground text-right">{budgetPercent}% utilized</p>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <ListTodo className="w-3.5 h-3.5 text-primary" /> Task Breakdown
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2 border border-border">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Completed</span>
                          <span className="text-foreground font-medium">{event.tasks.completed}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3 h-3 text-blue-500" /> In Progress</span>
                          <span className="text-foreground font-medium">{event.tasks.inProgress}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3 text-muted-foreground" /> Remaining</span>
                          <span className="text-foreground font-medium">{event.tasks.total - event.tasks.completed - event.tasks.overdue - event.tasks.inProgress}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-amber-500" /> Overdue</span>
                          <span className={`font-medium ${event.tasks.overdue > 0 ? 'text-amber-500' : 'text-foreground'}`}>{event.tasks.overdue}</span>
                        </div>
                        <Progress value={Math.round((event.tasks.completed / event.tasks.total) * 100)} className="h-1.5 mt-1" />
                      </div>
                    </div>

                    {/* Guest Responses */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" /> Guest Engagement
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2 border border-border">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Invited</span>
                          <span className="text-foreground font-medium">{event.guests.invited}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Confirmed</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">{event.guests.confirmed}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Declined</span>
                          <span className="text-foreground font-medium">{event.guests.declined}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Pending</span>
                          <span className="text-amber-500 font-medium">{event.guests.pending}</span>
                        </div>
                        <div className="border-t border-border pt-2 mt-1 space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">VIP Guests</span>
                            <span className="text-primary font-medium">{event.guests.vip}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Dietary Requests</span>
                            <span className="text-foreground font-medium">{event.guests.dietaryRequests}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-muted-foreground text-right">{responseRate}% response rate</div>
                      </div>
                    </div>

                    {/* Team Contributions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-primary" /> Team Contributions
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-3 border border-border">
                        {event.team.map((member, i) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs font-medium text-foreground">{member.name}</p>
                                <p className="text-[10px] text-muted-foreground">{member.role}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-semibold text-foreground">{member.contributions} actions</p>
                                <p className="text-[10px] text-muted-foreground">{member.lastActive}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Progress value={Math.round((member.tasksCompleted / member.tasksAssigned) * 100)} className="h-1 flex-1" />
                              <span className="text-[10px] text-muted-foreground">{member.tasksCompleted}/{member.tasksAssigned} tasks</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vendors */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" /> Vendor Details & Performance
                    </h4>
                    <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Vendor</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground hidden md:table-cell">Deliverables</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground hidden sm:table-cell">Payment</th>
                            <th className="text-right py-2 px-3 font-medium text-muted-foreground">Rating</th>
                            <th className="text-right py-2 px-3 font-medium text-muted-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.vendors.map((vendor, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="py-2.5 px-3">
                                <p className="font-medium text-foreground">{vendor.name}</p>
                                <p className="text-[10px] text-muted-foreground">{vendor.category} · {vendor.contact}</p>
                              </td>
                              <td className="py-2.5 px-3 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">{vendor.deliverables}</td>
                              <td className={`py-2.5 px-3 font-medium ${vendorStatusColor(vendor.status)}`}>{vendor.status}</td>
                              <td className="py-2.5 px-3 text-muted-foreground hidden sm:table-cell">{vendor.paymentStatus}</td>
                              <td className="py-2.5 px-3 text-foreground text-right">
                                <span className="flex items-center justify-end gap-0.5">
                                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                                  {vendor.rating}
                                </span>
                              </td>
                              <td className="py-2.5 px-3 text-foreground font-medium text-right">{vendor.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Communications */}
                  {event.communications.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary" /> Communications Log
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 border border-border space-y-2">
                        {event.communications.map((comm, i) => (
                          <div key={i} className="flex items-center gap-3 text-xs">
                            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-medium shrink-0">{comm.type}</span>
                            <span className="text-foreground flex-1 truncate">{comm.subject}</span>
                            <span className="text-muted-foreground shrink-0">{comm.recipients} recipients</span>
                            <span className="text-muted-foreground shrink-0">{comm.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" /> Activity Log
                    </h4>
                    <div className="space-y-1.5">
                      {event.recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs py-1.5 px-3 rounded-md bg-muted/30">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-foreground flex-1">{activity.action}</span>
                          <span className="text-muted-foreground ml-auto whitespace-nowrap shrink-0">{activity.by} · {activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Export Single */}
                  <div className="flex justify-end pt-1">
                    <button onClick={() => handleExportSingle(event)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                      <Download className="w-3.5 h-3.5" />
                      {exportingId === event.id ? "Exported ✓" : "Export Report"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsPage;
