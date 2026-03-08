import { useState } from "react";
import { 
  Download, FileText, Calendar, Users, CheckCircle2, Clock, 
  AlertTriangle, TrendingUp, ChevronDown, ChevronRight, 
  Building2, ListTodo, MessageSquare, Star, Activity
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const events = [
  {
    id: 1,
    name: "Annual Corporate Gala",
    type: "Corporate",
    date: "Mar 15, 2026",
    status: "In Progress",
    completion: 72,
    budget: { allocated: 45000, spent: 32400 },
    tasks: { total: 28, completed: 20, overdue: 2 },
    team: [
      { name: "Sarah K.", role: "Lead", contributions: 34, lastActive: "2h ago" },
      { name: "James L.", role: "Coordinator", contributions: 22, lastActive: "30m ago" },
      { name: "Priya M.", role: "Designer", contributions: 18, lastActive: "1h ago" },
    ],
    vendors: [
      { name: "Grand Ballroom Venues", category: "Venue", status: "Confirmed", amount: "$12,000" },
      { name: "Gourmet Catering Co.", category: "Catering", status: "Confirmed", amount: "$8,500" },
      { name: "Lumina Decor", category: "Decor", status: "Pending", amount: "$4,200" },
    ],
    guests: { invited: 250, confirmed: 198, declined: 22, pending: 30 },
    recentActivity: [
      { action: "Venue contract signed", by: "Sarah K.", time: "2h ago" },
      { action: "Menu finalized with caterer", by: "James L.", time: "5h ago" },
      { action: "Sent 50 reminder invitations", by: "Priya M.", time: "1d ago" },
    ],
    summary: "Event planning is on track with 72% completion. Venue and catering are confirmed. Decor vendor awaiting final approval. 2 overdue tasks need attention — seating chart and AV equipment booking. Guest response rate is strong at 88%."
  },
  {
    id: 2,
    name: "Tech Conference 2026",
    type: "Conference",
    date: "Jun 20, 2026",
    status: "Planning",
    completion: 35,
    budget: { allocated: 120000, spent: 42000 },
    tasks: { total: 52, completed: 18, overdue: 0 },
    team: [
      { name: "David R.", role: "Lead", contributions: 41, lastActive: "15m ago" },
      { name: "Emily C.", role: "Logistics", contributions: 28, lastActive: "1h ago" },
      { name: "Mike T.", role: "Marketing", contributions: 19, lastActive: "3h ago" },
      { name: "Ana S.", role: "Speaker Coord.", contributions: 15, lastActive: "45m ago" },
    ],
    vendors: [
      { name: "Convention Center Downtown", category: "Venue", status: "Confirmed", amount: "$35,000" },
      { name: "TechStage Productions", category: "AV & Stage", status: "Confirmed", amount: "$18,000" },
      { name: "ByteBite Catering", category: "Catering", status: "In Review", amount: "$15,000" },
      { name: "PrintPro Badges", category: "Print", status: "Pending", amount: "$2,800" },
    ],
    guests: { invited: 1000, confirmed: 412, declined: 58, pending: 530 },
    recentActivity: [
      { action: "Added 3 keynote speakers", by: "Ana S.", time: "45m ago" },
      { action: "Updated venue floor plan", by: "Emily C.", time: "3h ago" },
      { action: "Launched early-bird registration", by: "Mike T.", time: "1d ago" },
    ],
    summary: "Conference is in early planning at 35% completion. Venue and AV secured. Catering proposals under review. Speaker lineup is 60% confirmed. Marketing campaign launched with early-bird pricing. No overdue tasks."
  },
  {
    id: 3,
    name: "Charity Fundraiser Gala",
    type: "Charity",
    date: "Feb 28, 2026",
    status: "Completed",
    completion: 100,
    budget: { allocated: 52000, spent: 48700 },
    tasks: { total: 35, completed: 35, overdue: 0 },
    team: [
      { name: "Lisa W.", role: "Lead", contributions: 48, lastActive: "Completed" },
      { name: "Carlos D.", role: "Volunteer Coord.", contributions: 32, lastActive: "Completed" },
    ],
    vendors: [
      { name: "Riverside Gardens", category: "Venue", status: "Completed", amount: "$9,500" },
      { name: "Harmony Band", category: "Entertainment", status: "Completed", amount: "$6,000" },
      { name: "Elegant Bites", category: "Catering", status: "Completed", amount: "$11,200" },
    ],
    guests: { invited: 300, confirmed: 278, declined: 22, pending: 0 },
    recentActivity: [
      { action: "Final report generated", by: "Lisa W.", time: "1w ago" },
      { action: "Vendor payments completed", by: "Carlos D.", time: "1w ago" },
    ],
    summary: "Event completed successfully. Raised $52,000 for charity. All tasks completed on time. Budget came in 6.3% under allocation. Guest satisfaction rated 4.9/5. All vendor payments settled."
  },
  {
    id: 4,
    name: "Product Launch Party",
    type: "Corporate",
    date: "Apr 10, 2026",
    status: "Draft",
    completion: 12,
    budget: { allocated: 28000, spent: 3200 },
    tasks: { total: 20, completed: 2, overdue: 1 },
    team: [
      { name: "Tom H.", role: "Lead", contributions: 8, lastActive: "2d ago" },
    ],
    vendors: [
      { name: "Urban Loft Space", category: "Venue", status: "Shortlisted", amount: "$5,500" },
    ],
    guests: { invited: 150, confirmed: 0, declined: 0, pending: 150 },
    recentActivity: [
      { action: "Created event draft", by: "Tom H.", time: "2d ago" },
      { action: "Added venue shortlist", by: "Tom H.", time: "2d ago" },
    ],
    summary: "Event is in draft stage with minimal progress. Only 1 team member assigned. Venue shortlisted but not confirmed. 1 overdue task: finalize event brief. Needs immediate attention to stay on timeline."
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

const vendorStatusColor = (status: string) => {
  switch (status) {
    case "Confirmed": case "Completed": return "text-emerald-600 dark:text-emerald-400";
    case "Pending": case "In Review": case "Shortlisted": return "text-amber-600 dark:text-amber-400";
    default: return "text-muted-foreground";
  }
};

const ReportsPage = () => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(1);
  const [exportingId, setExportingId] = useState<number | null>(null);

  const handleExportAll = () => {
    const content = events.map(e => 
      `# ${e.name}\nStatus: ${e.status} | Completion: ${e.completion}%\nBudget: $${e.budget.spent.toLocaleString()} / $${e.budget.allocated.toLocaleString()}\nTasks: ${e.tasks.completed}/${e.tasks.total} completed\nGuests: ${e.guests.confirmed} confirmed / ${e.guests.invited} invited\n\nSummary: ${e.summary}\n`
    ).join("\n---\n\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "nested-reports.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSingle = (event: typeof events[0]) => {
    setExportingId(event.id);
    const teamDetails = event.team.map(t => `  - ${t.name} (${t.role}): ${t.contributions} contributions`).join("\n");
    const vendorDetails = event.vendors.map(v => `  - ${v.name} [${v.category}]: ${v.amount} — ${v.status}`).join("\n");
    const activityLog = event.recentActivity.map(a => `  - ${a.action} by ${a.by} (${a.time})`).join("\n");
    
    const content = `EVENT REPORT: ${event.name}
Type: ${event.type} | Date: ${event.date} | Status: ${event.status}
Completion: ${event.completion}%

BUDGET
  Allocated: $${event.budget.allocated.toLocaleString()}
  Spent: $${event.budget.spent.toLocaleString()}
  Remaining: $${(event.budget.allocated - event.budget.spent).toLocaleString()}

TASKS
  Total: ${event.tasks.total} | Completed: ${event.tasks.completed} | Overdue: ${event.tasks.overdue}

TEAM CONTRIBUTIONS
${teamDetails}

VENDORS
${vendorDetails}

GUEST RESPONSES
  Invited: ${event.guests.invited} | Confirmed: ${event.guests.confirmed} | Declined: ${event.guests.declined} | Pending: ${event.guests.pending}

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

  const totalEvents = events.length;
  const completedEvents = events.filter(e => e.status === "Completed").length;
  const totalOverdue = events.reduce((sum, e) => sum + e.tasks.overdue, 0);
  const avgCompletion = Math.round(events.reduce((sum, e) => sum + e.completion, 0) / events.length);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Event Reports</h1>
          <p className="text-sm text-muted-foreground">In-depth breakdown of your events, team activity, and vendor performance</p>
        </div>
        <button onClick={handleExportAll}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
          <Download className="w-3.5 h-3.5" /> Export All Reports
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Calendar, label: "Total Events", value: totalEvents, sub: `${completedEvents} completed` },
          { icon: TrendingUp, label: "Avg. Completion", value: `${avgCompletion}%`, sub: "Across all events" },
          { icon: AlertTriangle, label: "Overdue Tasks", value: totalOverdue, sub: totalOverdue > 0 ? "Needs attention" : "All on track", alert: totalOverdue > 0 },
          { icon: Activity, label: "Active Team", value: events.reduce((s, e) => s + e.team.length, 0), sub: "Members contributing" },
        ].map((stat, i) => (
          <div key={i} className="bg-card rounded-xl border border-border p-4 hover:shadow-elevated transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`h-4 w-4 ${stat.alert ? 'text-amber-500' : 'text-muted-foreground'}`} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</p>
            <p className={`text-[11px] mt-0.5 ${stat.alert ? 'text-amber-500' : 'text-muted-foreground'}`}>{stat.sub}</p>
          </div>
        ))}
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
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{event.type} · {event.date}</p>
                </div>
                <div className="hidden sm:flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Completion</p>
                    <p className="text-sm font-semibold text-foreground">{event.completion}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Tasks</p>
                    <p className="text-sm font-semibold text-foreground">{event.tasks.completed}/{event.tasks.total}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Guests</p>
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
                  <div className="bg-muted/50 rounded-lg p-3.5 border border-border">
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileText className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-semibold text-foreground">Summary</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{event.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Budget */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-primary" /> Budget
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
                        <ListTodo className="w-3.5 h-3.5 text-primary" /> Tasks
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2 border border-border">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Completed</span>
                          <span className="text-foreground font-medium">{event.tasks.completed}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3 text-blue-500" /> Remaining</span>
                          <span className="text-foreground font-medium">{event.tasks.total - event.tasks.completed - event.tasks.overdue}</span>
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
                        <Users className="w-3.5 h-3.5 text-primary" /> Guest Responses
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
                        <div className="text-[10px] text-muted-foreground text-right">{responseRate}% response rate</div>
                      </div>
                    </div>

                    {/* Team Contributions */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                        <Star className="w-3.5 h-3.5 text-primary" /> Team Contributions
                      </h4>
                      <div className="bg-muted/30 rounded-lg p-3 space-y-2.5 border border-border">
                        {event.team.map((member, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div>
                              <p className="text-xs font-medium text-foreground">{member.name}</p>
                              <p className="text-[10px] text-muted-foreground">{member.role} · {member.lastActive}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-foreground">{member.contributions}</p>
                              <p className="text-[10px] text-muted-foreground">actions</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Vendors */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-primary" /> Vendors & Activities
                    </h4>
                    <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Vendor</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Category</th>
                            <th className="text-left py-2 px-3 font-medium text-muted-foreground">Status</th>
                            <th className="text-right py-2 px-3 font-medium text-muted-foreground">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {event.vendors.map((vendor, i) => (
                            <tr key={i} className="border-b border-border last:border-0">
                              <td className="py-2 px-3 font-medium text-foreground">{vendor.name}</td>
                              <td className="py-2 px-3 text-muted-foreground">{vendor.category}</td>
                              <td className={`py-2 px-3 font-medium ${vendorStatusColor(vendor.status)}`}>{vendor.status}</td>
                              <td className="py-2 px-3 text-foreground text-right">{vendor.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-primary" /> Recent Activity
                    </h4>
                    <div className="space-y-1.5">
                      {event.recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs py-1.5 px-3 rounded-md bg-muted/30">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                          <span className="text-foreground">{activity.action}</span>
                          <span className="text-muted-foreground ml-auto whitespace-nowrap">{activity.by} · {activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Export Single */}
                  <div className="flex justify-end pt-1">
                    <button onClick={() => handleExportSingle(event)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
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
