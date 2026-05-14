import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEventStore } from "@/contexts/EventStore";
import {
  ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign, Save, Plus, Trash2, CheckCircle,
  AlertCircle, ChevronRight, UserPlus, Send, Bell, Activity, FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Task = { id: number; title: string; done: boolean; priority: "high" | "medium" | "low" };
type Milestone = { id: number; title: string; date: string; status: "completed" | "in-progress" | "pending" };
type Vendor = { id: number; name: string; category: string; status: "confirmed" | "pending" | "declined" };
type BudgetItem = { id: number; category: string; allocated: number; spent: number };
type Guest = { id: number; name: string; email: string; rsvp: "accepted" | "pending" | "declined" };
type TeamMember = { id: number; name: string; role: string };
type ActivityItem = { id: number; text: string; time: string };

const vendorCategories = ["Catering", "Photography", "Decoration", "Audio/Visual", "Entertainment", "Equipment", "Venue", "Other"];
const priorityColors = { high: "bg-destructive/10 text-destructive", medium: "bg-warning/10 text-warning", low: "bg-success/10 text-success" };
const rsvpColors = { accepted: "bg-success/10 text-success", pending: "bg-warning/10 text-warning", declined: "bg-destructive/10 text-destructive" };
const statusColors = { completed: "bg-success/10 text-success", "in-progress": "bg-primary/10 text-primary", pending: "bg-muted text-muted-foreground" };
const vendorStatusColors = { confirmed: "bg-success/10 text-success", pending: "bg-warning/10 text-warning", declined: "bg-destructive/10 text-destructive" };

const EventWorkspacePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [step, setStep] = useState(0);
  const params = useParams();
  const creating = !params.eventId && !params.id;

  // Overview
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventCity, setEventCity] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [eventDetails, setEventDetails] = useState("");

  // Timeline
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: "Book venue", date: "2026-03-10", status: "completed" },
    { id: 2, title: "Confirm vendors", date: "2026-03-15", status: "in-progress" },
    { id: 3, title: "Send invitations", date: "2026-03-20", status: "pending" },
    { id: 4, title: "Final walkthrough", date: "2026-03-28", status: "pending" },
  ]);
  const [newMilestone, setNewMilestone] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");

  // Tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Finalize venue contract", done: true, priority: "high" },
    { id: 2, title: "Confirm catering menu", done: false, priority: "high" },
    { id: 3, title: "Order decorations", done: false, priority: "medium" },
    { id: 4, title: "Arrange photographer", done: false, priority: "medium" },
    { id: 5, title: "Print name tags", done: false, priority: "low" },
  ]);
  const [newTask, setNewTask] = useState("");

  // Vendors
  const [vendors, setVendors] = useState<Vendor[]>([
    { id: 1, name: "Akolo Studio", category: "Photography", status: "confirmed" },
    { id: 2, name: "Bake It Right", category: "Catering", status: "pending" },
    { id: 3, name: "Event Bloom", category: "Decoration", status: "confirmed" },
  ]);
  const [newVendorName, setNewVendorName] = useState("");
  const [newVendorCategory, setNewVendorCategory] = useState("Catering");

  // Budget
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    { id: 1, category: "Venue", allocated: 15000, spent: 15000 },
    { id: 2, category: "Catering", allocated: 12000, spent: 8500 },
    { id: 3, category: "Decoration", allocated: 5000, spent: 3200 },
    { id: 4, category: "Photography", allocated: 4000, spent: 0 },
    { id: 5, category: "Entertainment", allocated: 3000, spent: 1500 },
    { id: 6, category: "Miscellaneous", allocated: 2000, spent: 800 },
  ]);

  // Guests
  const [guests, setGuests] = useState<Guest[]>([
    { id: 1, name: "John Smith", email: "john@example.com", rsvp: "accepted" },
    { id: 2, name: "Sarah Williams", email: "sarah@example.com", rsvp: "pending" },
    { id: 3, name: "Michael Chen", email: "michael@example.com", rsvp: "accepted" },
    { id: 4, name: "Emily Davis", email: "emily@example.com", rsvp: "declined" },
  ]);
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestEmail, setNewGuestEmail] = useState("");

  // Team
  const [team, setTeam] = useState<TeamMember[]>([
    { id: 1, name: "Jane Doe", role: "Project Manager" },
    { id: 2, name: "Michael Chen", role: "Event Coordinator" },
    { id: 3, name: "Sarah Williams", role: "Vendor Relations" },
  ]);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamRole, setNewTeamRole] = useState("");

  // Activity
  const activities: ActivityItem[] = [
    { id: 1, text: "Venue booking confirmed", time: "2 hours ago" },
    { id: 2, text: "Catering vendor added", time: "5 hours ago" },
    { id: 3, text: "Guest list updated", time: "1 day ago" },
    { id: 4, text: "Budget allocation revised", time: "2 days ago" },
  ];

  const totalBudget = budgetItems.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgetItems.reduce((s, b) => s + b.spent, 0);

  const store = useEventStore();
  // Load existing event when editing (from EventStore)
  useEffect(() => {
    const id = params.eventId || params.id;
    if (!id) return;
    const found = store.getEvent(id);
    if (found) {
      setEventName(found.title || "");
      setEventDate(found.date || "");
      setEventTime(found.time || "");
      setEventVenue(found.location || found.venue || "");
      setEventCity(found.city || "");
      setGuestCount(String(found.guests || ""));
      setEventDetails(found.details || "");
      if (found.milestones) setMilestones(found.milestones);
      if (found.tasks) setTasks(found.tasks);
      if (found.vendors) setVendors(found.vendors);
      if (found.budgetItems) setBudgetItems(found.budgetItems);
      if (found.guestsList) setGuests(found.guestsList);
      if (found.team) setTeam(found.team);
    }
  }, [params, store]);

  // Autosave edits back to store (debounced)
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  useEffect(() => {
    const id = params.eventId || params.id;
    if (!id) return;
    setSaving(true);
    const t = setTimeout(() => {
      store.updateEvent(id, {
        title: eventName,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        city: eventCity,
        guests: Number(guestCount || 0),
        details: eventDetails,
        milestones,
        tasks,
        vendors,
        budgetItems,
        guestsList: guests,
        team,
      });
      setSaving(false);
      setSavedAt(Date.now());
    }, 800);
    return () => clearTimeout(t);
  }, [eventName, eventDate, eventTime, eventVenue, eventCity, guestCount, eventDetails, milestones, tasks, vendors, budgetItems, guests, team, params, store]);

  const daysUntil = () => {
    if (!eventDate) return "TBD";
    const diff = Math.ceil((new Date(eventDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (diff > 1) return `${diff} days`;
    if (diff === 1) return `1 day`;
    if (diff === 0) return `Today`;
    return `Passed`;
  };

  const tasksCompletion = () => {
    if (!tasks.length) return 0;
    return Math.round((tasks.filter(t => t.done).length / tasks.length) * 100);
  };

  const vendorConfirmedPct = () => {
    if (!vendors.length) return 0;
    return Math.round((vendors.filter(v => v.status === 'confirmed').length / vendors.length) * 100);
  };

  const rsvpCounts = () => ({
    total: guests.length,
    accepted: guests.filter(g => g.rsvp === 'accepted').length,
    pending: guests.filter(g => g.rsvp === 'pending').length,
    declined: guests.filter(g => g.rsvp === 'declined').length,
  });

  // Creation wizard state (user-driven only)
  const [createStep, setCreateStep] = useState(0);
  const [eventType, setEventType] = useState("General");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [modality, setModality] = useState<"physical" | "virtual" | "hybrid">("physical");
  const [theme, setTheme] = useState("");
  const [goal, setGoal] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [structureSelections, setStructureSelections] = useState<Record<string, boolean>>({
    Catering: false, Stage: false, Security: false, Accommodation: false, Transportation: false, Photography: false, MC: false, Livestream: false,
  });
  const [planningMode, setPlanningMode] = useState<"diy" | "team" | "hire">("diy");

  // Inline editing ids for quick edits
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingMilestoneId, setEditingMilestoneId] = useState<number | null>(null);
  const [editingVendorId, setEditingVendorId] = useState<number | null>(null);
  const [editingBudgetId, setEditingBudgetId] = useState<number | null>(null);
  const [editingGuestId, setEditingGuestId] = useState<number | null>(null);
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview", icon: FileText },
    { id: "timeline", label: "Timeline", icon: Calendar },
    { id: "tasks", label: "Tasks", icon: CheckCircle },
    { id: "vendors", label: "Vendors", icon: Users },
    { id: "budget", label: "Budget", icon: DollarSign },
    { id: "guests", label: "Guests", icon: UserPlus },
    { id: "team", label: "Team", icon: Users },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  // Guide step
  const guideSteps = ["overview", "timeline", "vendors", "budget", "guests", "team"];
  const nextStep = () => {
    const currentIdx = guideSteps.indexOf(activeTab);
    if (currentIdx < guideSteps.length - 1) {
      setActiveTab(guideSteps[currentIdx + 1]);
      setStep(currentIdx + 1);
    }
  };

  const handleSaveEvent = () => {
    if (!eventName.trim()) return;
    try {
      const existing = JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
      const id = params.eventId || params.id;
      const payload = {
        id: id ? id : Date.now(),
        title: eventName,
        date: eventDate || "TBD",
        time: eventTime || "TBD",
        venue: eventVenue || "TBD",
        location: eventVenue || "TBD",
        city: eventCity || "Unknown",
        guests: Number(guestCount || 0),
        details: eventDetails,
        milestones,
        tasks,
        vendors,
        budgetItems,
        metadata: {
          eventType,
          visibility,
          modality,
          theme,
          goal,
          budgetMin,
          budgetMax,
          structureSelections,
          planningMode,
        },
        guests,
        team,
      };

      if (id) {
        const idx = existing.findIndex((e: any) => String(e.id) === String(id));
        if (idx >= 0) existing[idx] = payload; else existing.unshift(payload);
      } else {
        existing.unshift(payload);
      }
      sessionStorage.setItem("nested_published_events", JSON.stringify(existing));
    } catch (err) {
      // no-op local persistence fallback
    }
    // stay on workspace if editing, otherwise open the created event workspace
    if (params.eventId || params.id) {
      // update state only
    } else {
      const newId = payload.id;
      navigate(`/events/${newId}/workspace`);
    }
  };

  // Minimal Wizard component — user-driven only
  function Wizard() {
    const structureOptions = Object.keys(structureSelections);
    const onToggleStructure = (key: string) => {
      setStructureSelections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div>
        {createStep === 0 && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">Event name</label>
              <Input className="mt-1" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="e.g. Company Retreat" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground">Event type</label>
                <select value={eventType} onChange={e => setEventType(e.target.value)} className="mt-1 w-full h-9 rounded-lg border border-border bg-secondary px-3">
                  <option>General</option>
                  <option>Conference</option>
                  <option>Wedding</option>
                  <option>Workshop</option>
                  <option>Concert</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Visibility</label>
                <select value={visibility} onChange={e => setVisibility(e.target.value as any)} className="mt-1 w-full h-9 rounded-lg border border-border bg-secondary px-3">
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Modality</label>
                <select value={modality} onChange={e => setModality(e.target.value as any)} className="mt-1 w-full h-9 rounded-lg border border-border bg-secondary px-3">
                  <option value="physical">Physical</option>
                  <option value="virtual">Virtual</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground">Estimated guests</label>
                <Input className="mt-1" type="number" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Preferred date</label>
                <Input className="mt-1" type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Location / Venue</label>
              <Input className="mt-1" value={eventVenue} onChange={e => setEventVenue(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setCreateStep(s => Math.max(0, s - 1))}>Back</Button>
              <Button onClick={() => setCreateStep(1)}>Next</Button>
            </div>
          </div>
        )}

        {createStep === 1 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Select services and structure you want to manage in this event. Nothing will be auto-created — these are just categories you want to track.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {structureOptions.map(key => (
                <label key={key} className="flex items-center gap-2 p-2 border rounded-lg">
                  <input type="checkbox" checked={structureSelections[key]} onChange={() => onToggleStructure(key)} />
                  <span className="text-sm">{key}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setCreateStep(0)}>Back</Button>
              <Button onClick={() => setCreateStep(2)}>Next</Button>
            </div>
          </div>
        )}

        {createStep === 2 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Choose how you'll plan this event. (No automatic planning will occur.)</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2"><input type="radio" name="planmode" checked={planningMode === 'diy'} onChange={() => setPlanningMode('diy')} /> <span>DIY Planning</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="planmode" checked={planningMode === 'team'} onChange={() => setPlanningMode('team')} /> <span>Team Planning</span></label>
              <label className="flex items-center gap-2"><input type="radio" name="planmode" checked={planningMode === 'hire'} onChange={() => setPlanningMode('hire')} /> <span>Hire Professional Planner</span></label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setCreateStep(1)}>Back</Button>
              <Button onClick={() => { setCreateStep(0); handleSaveEvent(); }}>Finish</Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-6xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/events')} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{eventName || "New Event"}</h1>
          <p className="text-sm text-muted-foreground">Event Workspace</p>
        </div>
        <Button className="gradient-primary text-white gap-2" onClick={handleSaveEvent}>
          <Save className="h-4 w-4" /> Save Event
        </Button>
        <div className="ml-3 text-sm text-muted-foreground">
          {saving ? 'Saving...' : savedAt ? `Saved ${new Date(savedAt).toLocaleTimeString()}` : ''}
        </div>
        {/* AI creation removed per user request — creation is user-driven only */}
      </div>

      {/* Overview widgets (Event Command Center) */}
        {creating && !eventName ? (
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Create a new event</h2>
            <p className="text-sm text-muted-foreground">We'll guide you through three simple steps. You provide the choices — nothing will be autogenerated.</p>
            <Wizard />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Countdown</p>
          <p className="text-lg font-semibold text-foreground mt-2">{daysUntil()}</p>
          <p className="text-xs text-muted-foreground mt-1">{eventDate ? new Date(eventDate).toLocaleDateString() : 'Date TBD'}</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Budget Health</p>
          <p className="text-lg font-semibold text-foreground mt-2">${totalSpent.toLocaleString()} / ${totalBudget.toLocaleString()}</p>
          <div className="w-full h-2.5 bg-secondary rounded-full mt-3 overflow-hidden">
            <div className="h-full gradient-primary" style={{ width: `${Math.min(100, totalBudget ? (totalSpent / totalBudget) * 100 : 0)}%` }} />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Tasks Completion</p>
          <p className="text-lg font-semibold text-foreground mt-2">{tasksCompletion()}%</p>
          <p className="text-xs text-muted-foreground mt-1">{tasks.filter(t => t.done).length} of {tasks.length} tasks done</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Vendors & Guests</p>
          <div className="flex items-center gap-3 mt-2">
            <div>
              <p className="text-sm font-semibold text-foreground">Vendors</p>
              <p className="text-lg">{vendorConfirmedPct()}% confirmed</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">RSVP</p>
              <p className="text-lg">{rsvpCounts().accepted}/{rsvpCounts().total}</p>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Guide banner */}
      {step < guideSteps.length && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Step {step + 1} of {guideSteps.length}: Fill in {guideSteps[step]}</p>
              <p className="text-xs text-muted-foreground">Complete each section to create your event</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={nextStep} className="gap-1">
            Next <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Tab navigation */}
      <div className="flex gap-1 bg-secondary dark:bg-accent rounded-xl p-1 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              activeTab === tab.id
                ? "bg-card border border-border shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-5">
          <div>
            <label className="text-sm font-medium text-foreground">Event Name *</label>
            <Input className="mt-1" value={eventName} onChange={e => setEventName(e.target.value)} placeholder="Enter event name" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><label className="text-sm font-medium text-foreground">Date</label><Input className="mt-1" type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground">Time</label><Input className="mt-1" type="time" value={eventTime} onChange={e => setEventTime(e.target.value)} /></div>
            <div><label className="text-sm font-medium text-foreground">Guests</label><Input className="mt-1" type="number" value={guestCount} onChange={e => setGuestCount(e.target.value)} placeholder="0" /></div>
            <div><label className="text-sm font-medium text-foreground">Venue</label><Input className="mt-1" value={eventVenue} onChange={e => setEventVenue(e.target.value)} placeholder="Venue name" /></div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">City / Location</label>
            <Input className="mt-1" value={eventCity} onChange={e => setEventCity(e.target.value)} placeholder="e.g. Auckland" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Event Details</label>
            <textarea className="w-full mt-1 p-3 rounded-lg bg-secondary dark:bg-accent border border-border text-sm text-foreground resize-none min-h-[120px] outline-none" value={eventDetails} onChange={e => setEventDetails(e.target.value)} placeholder="Write a summary about your event..." />
          </div>
        </div>
      )}

      {/* Timeline */}
      {activeTab === "timeline" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex gap-2">
            <Input value={newMilestone} onChange={e => setNewMilestone(e.target.value)} placeholder="Milestone title" className="flex-1" />
            <Input type="date" value={newMilestoneDate} onChange={e => setNewMilestoneDate(e.target.value)} className="w-40" />
            <Button size="sm" onClick={() => { if (newMilestone.trim()) { setMilestones(prev => [...prev, { id: Date.now(), title: newMilestone, date: newMilestoneDate, status: "pending" }]); setNewMilestone(""); setNewMilestoneDate(""); } }} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="space-y-3">
            {milestones.sort((a, b) => a.date.localeCompare(b.date)).map((m, i) => (
              <div key={m.id} className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <button onClick={() => setMilestones(prev => prev.map(x => x.id === m.id ? { ...x, status: x.status === "completed" ? "pending" : x.status === "pending" ? "in-progress" : "completed" } : x))}
                    className={cn("w-4 h-4 rounded-full border-2 transition-colors", m.status === "completed" ? "bg-success border-success" : m.status === "in-progress" ? "bg-primary border-primary" : "border-border")} />
                  {i < milestones.length - 1 && <div className="w-px h-8 bg-border" />}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    {editingMilestoneId === m.id ? (
                      <div className="space-y-1">
                        <Input autoFocus value={m.title} onChange={e => setMilestones(prev => prev.map(x => x.id === m.id ? { ...x, title: e.target.value } : x))} onBlur={() => setEditingMilestoneId(null)} onKeyDown={e => { if (e.key === 'Enter') setEditingMilestoneId(null); }} />
                        <Input type="date" value={m.date} onChange={e => setMilestones(prev => prev.map(x => x.id === m.id ? { ...x, date: e.target.value } : x))} />
                      </div>
                    ) : (
                      <div>
                        <p onDoubleClick={() => setEditingMilestoneId(m.id)} className={cn("text-sm", m.status === "completed" ? "text-muted-foreground line-through" : "text-foreground font-medium")}>{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.date}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={statusColors[m.status]}>{m.status}</Badge>
                    <button onClick={() => setMilestones(prev => prev.filter(x => x.id !== m.id))} className="text-destructive/50 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tasks */}
      {activeTab === "tasks" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex gap-2">
            <Input value={newTask} onChange={e => setNewTask(e.target.value)} placeholder="Add a new task..." className="flex-1" onKeyDown={e => { if (e.key === 'Enter' && newTask.trim()) { setTasks(prev => [...prev, { id: Date.now(), title: newTask, done: false, priority: "medium" }]); setNewTask(""); } }} />
            <Button size="sm" onClick={() => { if (newTask.trim()) { setTasks(prev => [...prev, { id: Date.now(), title: newTask, done: false, priority: "medium" }]); setNewTask(""); } }} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group">
                <button onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}>
                  <CheckCircle className={cn("h-5 w-5", task.done ? "text-success" : "text-muted-foreground")} />
                </button>
                {editingTaskId === task.id ? (
                  <Input
                    autoFocus
                    value={task.title}
                    onChange={e => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, title: e.target.value } : t))}
                    onBlur={() => setEditingTaskId(null)}
                    onKeyDown={e => { if (e.key === 'Enter') setEditingTaskId(null); }}
                    className={cn("flex-1 text-sm")}
                  />
                ) : (
                  <span onDoubleClick={() => setEditingTaskId(task.id)} className={cn("flex-1 text-sm", task.done ? "text-muted-foreground line-through" : "text-foreground")}>{task.title}</span>
                )}
                <Badge className={priorityColors[task.priority]} onClick={() => setTasks(prev => prev.map(t => t.id === task.id ? { ...t, priority: t.priority === "high" ? "medium" : t.priority === "medium" ? "low" : "high" } : t))}>{task.priority}</Badge>
                <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))} className="opacity-0 group-hover:opacity-100 text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vendors */}
      {activeTab === "vendors" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <select value={newVendorCategory} onChange={e => setNewVendorCategory(e.target.value)} className="h-9 rounded-lg border border-border bg-secondary dark:bg-accent text-sm text-foreground px-3 outline-none">
              {vendorCategories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <Input value={newVendorName} onChange={e => setNewVendorName(e.target.value)} placeholder="Vendor name" className="flex-1 min-w-[200px]" />
            <Button size="sm" onClick={() => { if (newVendorName.trim()) { setVendors(prev => [...prev, { id: Date.now(), name: newVendorName, category: newVendorCategory, status: "pending" }]); setNewVendorName(""); } }} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="space-y-2">
            {vendors.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"><Users className="h-4 w-4 text-primary" /></div>
                  <div>
                    {editingVendorId === v.id ? (
                      <div className="space-y-1">
                        <Input autoFocus value={v.name} onChange={e => setVendors(prev => prev.map(x => x.id === v.id ? { ...x, name: e.target.value } : x))} onBlur={() => setEditingVendorId(null)} onKeyDown={e => { if (e.key === 'Enter') setEditingVendorId(null); }} />
                        <select value={v.category} onChange={e => setVendors(prev => prev.map(x => x.id === v.id ? { ...x, category: e.target.value } : x))} className="h-9 rounded-lg border border-border bg-secondary px-3 text-sm">
                          {vendorCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    ) : (
                      <div>
                        <p onDoubleClick={() => setEditingVendorId(v.id)} className="text-sm font-medium text-foreground">{v.name}</p>
                        <p className="text-xs text-muted-foreground">{v.category}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={vendorStatusColors[v.status]}>{v.status}</Badge>
                  <button onClick={() => setVendors(prev => prev.filter(x => x.id !== v.id))} className="text-destructive/50 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Budget */}
      {activeTab === "budget" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold text-foreground">${totalSpent.toLocaleString()}</p>
            </div>
            <div className="bg-card rounded-xl border border-border p-5">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-2xl font-bold text-success">${(totalBudget - totalSpent).toLocaleString()}</p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="space-y-4">
              {budgetItems.map(item => (
                <div key={item.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground font-medium">{item.category}</span>
                    <span className="text-muted-foreground">
                      {editingBudgetId === item.id ? (
                        <div className="flex items-center gap-2">
                          <Input type="number" value={String(item.spent)} onChange={e => setBudgetItems(prev => prev.map(x => x.id === item.id ? { ...x, spent: Number(e.target.value || 0) } : x))} className="w-28" />
                          <span>/</span>
                          <Input type="number" value={String(item.allocated)} onChange={e => setBudgetItems(prev => prev.map(x => x.id === item.id ? { ...x, allocated: Number(e.target.value || 0) } : x))} className="w-28" />
                          <Button size="sm" variant="ghost" onClick={() => setEditingBudgetId(null)}>Done</Button>
                        </div>
                      ) : (
                        `$${item.spent.toLocaleString()} / $${item.allocated.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary dark:bg-accent rounded-full overflow-hidden">
                    <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${Math.min(100, (item.spent / (item.allocated || 1)) * 100)}%` }} />
                  </div>
                  {editingBudgetId !== item.id && <div className="text-right mt-2"><Button size="sm" variant="outline" onClick={() => setEditingBudgetId(item.id)}>Edit</Button></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guests */}
      {activeTab === "guests" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex gap-2">
            <Input value={newGuestName} onChange={e => setNewGuestName(e.target.value)} placeholder="Guest name" className="flex-1" />
            <Input value={newGuestEmail} onChange={e => setNewGuestEmail(e.target.value)} placeholder="Email" className="flex-1" />
            <Button size="sm" onClick={() => { if (newGuestName.trim()) { setGuests(prev => [...prev, { id: Date.now(), name: newGuestName, email: newGuestEmail, rsvp: "pending" }]); setNewGuestName(""); setNewGuestEmail(""); } }} className="gap-1"><UserPlus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground mb-2">
            <span>Total: {guests.length}</span>
            <span className="text-success">Accepted: {guests.filter(g => g.rsvp === "accepted").length}</span>
            <span className="text-warning">Pending: {guests.filter(g => g.rsvp === "pending").length}</span>
            <span className="text-destructive">Declined: {guests.filter(g => g.rsvp === "declined").length}</span>
          </div>
          <div className="space-y-2">
            {guests.map(g => (
              <div key={g.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div>
                  {editingGuestId === g.id ? (
                    <div className="space-y-1">
                      <Input autoFocus value={g.name} onChange={e => setGuests(prev => prev.map(x => x.id === g.id ? { ...x, name: e.target.value } : x))} onBlur={() => setEditingGuestId(null)} onKeyDown={e => { if (e.key === 'Enter') setEditingGuestId(null); }} />
                      <Input value={g.email} onChange={e => setGuests(prev => prev.map(x => x.id === g.id ? { ...x, email: e.target.value } : x))} />
                    </div>
                  ) : (
                    <div>
                      <p onDoubleClick={() => setEditingGuestId(g.id)} className="text-sm font-medium text-foreground">{g.name}</p>
                      <p className="text-xs text-muted-foreground">{g.email}</p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={rsvpColors[g.rsvp]} onClick={() => setGuests(prev => prev.map(x => x.id === g.id ? { ...x, rsvp: x.rsvp === "accepted" ? "pending" : x.rsvp === "pending" ? "declined" : "accepted" } : x))}>{g.rsvp}</Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0"><Send className="h-3 w-3" /></Button>
                  <button onClick={() => setGuests(prev => prev.filter(x => x.id !== g.id))} className="text-destructive/50 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team */}
      {activeTab === "team" && (
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <div className="flex gap-2">
            <Input value={newTeamName} onChange={e => setNewTeamName(e.target.value)} placeholder="Name" className="flex-1" />
            <Input value={newTeamRole} onChange={e => setNewTeamRole(e.target.value)} placeholder="Role" className="flex-1" />
            <Button size="sm" onClick={() => { if (newTeamName.trim()) { setTeam(prev => [...prev, { id: Date.now(), name: newTeamName, role: newTeamRole }]); setNewTeamName(""); setNewTeamRole(""); } }} className="gap-1"><UserPlus className="h-4 w-4" /> Add</Button>
          </div>
          <div className="space-y-2">
            {team.map(m => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    {editingTeamId === m.id ? (
                      <div className="space-y-1">
                        <Input autoFocus value={m.name} onChange={e => setTeam(prev => prev.map(x => x.id === m.id ? { ...x, name: e.target.value } : x))} onBlur={() => setEditingTeamId(null)} onKeyDown={e => { if (e.key === 'Enter') setEditingTeamId(null); }} />
                        <Input value={m.role} onChange={e => setTeam(prev => prev.map(x => x.id === m.id ? { ...x, role: e.target.value } : x))} />
                      </div>
                    ) : (
                      <div>
                        <p onDoubleClick={() => setEditingTeamId(m.id)} className="text-sm font-medium text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.role}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => setTeam(prev => prev.filter(x => x.id !== m.id))} className="text-destructive/50 hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity */}
      {activeTab === "activity" && (
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="space-y-4">
            {activities.map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <Activity className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-foreground">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventWorkspacePage;
