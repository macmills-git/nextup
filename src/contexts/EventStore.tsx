import React, { createContext, useContext, useEffect, useState } from 'react';

export type EventMetadata = {
  eventType?: string;
  visibility?: 'public' | 'private';
  modality?: 'physical' | 'virtual' | 'hybrid';
  theme?: string;
  goal?: string;
  budgetMin?: string;
  budgetMax?: string;
  structureSelections?: Record<string, boolean>;
  planningMode?: 'diy' | 'team' | 'hire' | 'ai';
};

export type TaskItem = {
  id: string;
  title: string;
  phase?: string;
  milestone?: string;
  assignee?: string;
  due?: string;
  priority?: 'low' | 'med' | 'high';
  status?: 'todo' | 'in_progress' | 'done';
  vendorId?: string;
  budgetLineId?: string;
  dependsOn?: string[];
  subtasks?: { id: string; title: string; done?: boolean }[];
};

export type BudgetLine = {
  id: string;
  category: string;
  label: string;
  estimated: number;
  approved: number;
  actual: number;
  pending: number;
  vendorId?: string;
};

export type VendorEntry = {
  id: string;
  name: string;
  category: string;
  stage: 'discover' | 'shortlist' | 'negotiate' | 'booked' | 'executing' | 'reviewed';
  contact?: string;
  quote?: number;
  rating?: number;
  notes?: string;
  arrival?: string;
};

export type GuestEntry = {
  id: string;
  name: string;
  email?: string;
  segment?: 'vip' | 'family' | 'sponsor' | 'media' | 'staff' | 'general';
  rsvp?: 'pending' | 'accepted' | 'declined';
  plusOne?: number;
  seat?: string;
  checkedIn?: boolean;
  meal?: string;
};

export type TeamMember = {
  id: string;
  name: string;
  email?: string;
  role: 'owner' | 'planner' | 'finance' | 'vendor_coord' | 'guest_mgr' | 'logistics';
};

export type DocItem = {
  id: string;
  name: string;
  type?: 'contract' | 'permit' | 'invoice' | 'moodboard' | 'floorplan' | 'runsheet' | 'quote' | 'other';
  size?: string;
  uploadedAt?: number;
  extracted?: { amount?: number; date?: string; terms?: string };
};

export type TimelineItem = {
  id: string;
  layer: 'planning' | 'runsheet' | 'vendor' | 'team';
  title: string;
  start: string;
  end?: string;
  owner?: string;
  vendorId?: string;
  dependsOn?: string[];
};

export type ActivityItem = {
  id: string;
  ts: number;
  kind: 'task' | 'vendor' | 'budget' | 'guest' | 'doc' | 'team' | 'comms' | 'system';
  text: string;
};

export type Issue = { id: string; ts: number; severity: 'low' | 'med' | 'high'; text: string; resolved?: boolean };

export type EventModel = {
  id: string | number;
  title: string;
  date?: string;
  time?: string;
  venue?: string;
  location?: string;
  city?: string;
  guests?: number;
  details?: string;
  metadata?: EventMetadata;
  status?: 'draft' | 'launched' | 'archived';
  createdAt?: number;
  updatedAt?: number;
  // workspace
  phase?: 'initiation' | 'planning' | 'execution' | 'post';
  tasks?: TaskItem[];
  budget?: BudgetLine[];
  vendors?: VendorEntry[];
  guestsList?: GuestEntry[];
  team?: TeamMember[];
  documents?: DocItem[];
  timeline?: TimelineItem[];
  activity?: ActivityItem[];
  issues?: Issue[];
  // legacy
  milestones?: any[];
  budgetItems?: any[];
};

type Ctx = {
  events: EventModel[];
  saveDraft: (e: Partial<EventModel>) => EventModel;
  publishEvent: (e: Partial<EventModel>) => EventModel;
  getEvent: (id: string | number) => EventModel | undefined;
  updateEvent: (id: string | number, patch: Partial<EventModel>) => EventModel | undefined;
  // helpers
  addTask: (id: string | number, t: Partial<TaskItem>) => void;
  toggleTask: (id: string | number, taskId: string) => void;
  addBudgetLine: (id: string | number, b: Partial<BudgetLine>) => void;
  updateBudgetLine: (id: string | number, lineId: string, patch: Partial<BudgetLine>) => void;
  addVendor: (id: string | number, v: Partial<VendorEntry>) => VendorEntry;
  moveVendor: (id: string | number, vendorId: string, stage: VendorEntry['stage']) => void;
  addGuest: (id: string | number, g: Partial<GuestEntry>) => void;
  updateGuest: (id: string | number, guestId: string, patch: Partial<GuestEntry>) => void;
  addTeamMember: (id: string | number, m: Partial<TeamMember>) => void;
  addDoc: (id: string | number, d: Partial<DocItem>) => void;
  addTimeline: (id: string | number, t: Partial<TimelineItem>) => void;
  addIssue: (id: string | number, i: Partial<Issue>) => void;
  resolveIssue: (id: string | number, issueId: string) => void;
  logActivity: (id: string | number, kind: ActivityItem['kind'], text: string) => void;
};

const STORAGE_KEY = 'event_store_v2';
const Store = createContext<Ctx | null>(null);
const uid = () => Math.random().toString(36).slice(2, 10);

const SERVICE_TO_CATEGORY: Record<string, string> = {
  catering: 'Catering & Food',
  stage: 'Stage & Production',
  security: 'Security',
  accommodation: 'Accommodation',
  transport: 'Transportation',
  photography: 'Photography',
  mc: 'Entertainment',
  livestream: 'AV & Livestream',
  decor: 'Decoration',
  venue: 'Venue & Space',
};

function seedFromStructure(structure: Record<string, boolean> = {}): {
  budget: BudgetLine[]; tasks: TaskItem[]; timeline: TimelineItem[];
} {
  const enabled = Object.entries(structure).filter(([, v]) => v).map(([k]) => k);
  const all = ['venue', ...enabled];
  const budget: BudgetLine[] = all.map((k) => ({
    id: uid(), category: SERVICE_TO_CATEGORY[k] || k, label: SERVICE_TO_CATEGORY[k] || k,
    estimated: 0, approved: 0, actual: 0, pending: 0,
  }));
  const tasks: TaskItem[] = all.map((k) => ({
    id: uid(), title: `Book ${SERVICE_TO_CATEGORY[k] || k}`, phase: 'Planning', milestone: SERVICE_TO_CATEGORY[k] || k, status: 'todo', priority: 'med',
  }));
  const timeline: TimelineItem[] = all.map((k, i) => ({
    id: uid(), layer: 'planning', title: `Confirm ${SERVICE_TO_CATEGORY[k] || k}`, start: `T-${(all.length - i) * 7}d`,
  }));
  return { budget, tasks, timeline };
}

export const EventStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventModel[]>([]);

  useEffect(() => {
    try { setEvents(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); } catch { setEvents([]); }
  }, []);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(events)); } catch {} }, [events]);

  const patchEvent = (id: string | number, mut: (e: EventModel) => EventModel) => {
    setEvents(prev => prev.map(x => String(x.id) === String(id) ? mut(x) : x));
  };

  const saveDraft = (e: Partial<EventModel>) => {
    const id = e.id ?? Date.now();
    const now = Date.now();
    const existing = events.find(x => String(x.id) === String(id));
    const seed = !existing ? seedFromStructure(e.metadata?.structureSelections) : null;
    const model: EventModel = {
      ...(existing || {}),
      id,
      title: (e.title as string) || existing?.title || 'Untitled Event',
      date: e.date ?? existing?.date,
      time: e.time ?? existing?.time,
      venue: e.venue ?? existing?.venue,
      location: e.location ?? existing?.location,
      city: e.city ?? existing?.city,
      guests: e.guests ?? existing?.guests ?? 0,
      details: e.details ?? existing?.details ?? '',
      metadata: { ...(existing?.metadata || {}), ...(e.metadata || {}) },
      status: existing?.status || 'draft',
      phase: existing?.phase || 'planning',
      tasks: existing?.tasks || seed?.tasks || [],
      budget: existing?.budget || seed?.budget || [],
      vendors: existing?.vendors || [],
      guestsList: existing?.guestsList || [],
      team: existing?.team || [],
      documents: existing?.documents || [],
      timeline: existing?.timeline || seed?.timeline || [],
      activity: existing?.activity || [{ id: uid(), ts: now, kind: 'system', text: 'Event created' }],
      issues: existing?.issues || [],
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    };
    setEvents(prev => {
      const idx = prev.findIndex(x => String(x.id) === String(id));
      if (idx >= 0) { const c = [...prev]; c[idx] = model; return c; }
      return [model, ...prev];
    });
    return model;
  };

  const publishEvent = (e: Partial<EventModel>): EventModel => {
    const m = saveDraft(e);
    patchEvent(m.id, (x) => ({ ...x, status: 'launched' as const, updatedAt: Date.now() }));
    return { ...m, status: 'launched' as const };
  };

  const getEvent = (id: string | number) => events.find(x => String(x.id) === String(id));

  const updateEvent = (id: string | number, patch: Partial<EventModel>) => {
    let updated: EventModel | undefined;
    patchEvent(id, (x) => { updated = { ...x, ...patch, updatedAt: Date.now() }; return updated!; });
    return updated;
  };

  const logActivity: Ctx['logActivity'] = (id, kind, text) =>
    patchEvent(id, x => ({ ...x, activity: [{ id: uid(), ts: Date.now(), kind, text }, ...(x.activity || [])].slice(0, 80) }));

  const addTask: Ctx['addTask'] = (id, t) => {
    const task: TaskItem = { id: uid(), title: 'New task', status: 'todo', priority: 'med', ...t };
    patchEvent(id, x => ({ ...x, tasks: [task, ...(x.tasks || [])] }));
    logActivity(id, 'task', `Added task: ${task.title}`);
  };
  const toggleTask: Ctx['toggleTask'] = (id, taskId) => patchEvent(id, x => ({
    ...x, tasks: (x.tasks || []).map(t => t.id === taskId ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t)
  }));

  const addBudgetLine: Ctx['addBudgetLine'] = (id, b) => {
    const line: BudgetLine = { id: uid(), category: 'Misc', label: 'New item', estimated: 0, approved: 0, actual: 0, pending: 0, ...b };
    patchEvent(id, x => ({ ...x, budget: [line, ...(x.budget || [])] }));
    logActivity(id, 'budget', `Added budget line: ${line.label}`);
  };
  const updateBudgetLine: Ctx['updateBudgetLine'] = (id, lineId, patch) => patchEvent(id, x => ({
    ...x, budget: (x.budget || []).map(b => b.id === lineId ? { ...b, ...patch } : b)
  }));

  const addVendor: Ctx['addVendor'] = (id, v) => {
    const vendor: VendorEntry = { id: uid(), name: 'New vendor', category: 'Misc', stage: 'discover', ...v };
    patchEvent(id, x => ({ ...x, vendors: [vendor, ...(x.vendors || [])] }));
    logActivity(id, 'vendor', `Added vendor: ${vendor.name}`);
    return vendor;
  };
  const moveVendor: Ctx['moveVendor'] = (id, vendorId, stage) => {
    patchEvent(id, x => {
      const vendors = (x.vendors || []).map(v => v.id === vendorId ? { ...v, stage } : v);
      const v = vendors.find(v => v.id === vendorId);
      let { budget = [], tasks = [], timeline = [] } = x;
      // Auto-link when booked
      if (v && stage === 'booked') {
        const hasLine = budget.some(b => b.vendorId === vendorId);
        if (!hasLine) budget = [{ id: uid(), category: v.category, label: `${v.name} (contract)`, estimated: v.quote || 0, approved: v.quote || 0, actual: 0, pending: v.quote || 0, vendorId }, ...budget];
        tasks = [{ id: uid(), title: `Confirm deliverables with ${v.name}`, phase: 'Planning', milestone: v.category, status: 'todo', priority: 'high', vendorId }, ...tasks];
        timeline = [{ id: uid(), layer: 'vendor', title: `${v.name} setup`, start: v.arrival || 'T-1d', vendorId }, ...timeline];
      }
      return { ...x, vendors, budget, tasks, timeline };
    });
    logActivity(id, 'vendor', `Vendor moved to ${stage}`);
  };

  const addGuest: Ctx['addGuest'] = (id, g) => {
    const guest: GuestEntry = { id: uid(), name: 'Guest', segment: 'general', rsvp: 'pending', ...g };
    patchEvent(id, x => ({ ...x, guestsList: [guest, ...(x.guestsList || [])] }));
    logActivity(id, 'guest', `Added guest: ${guest.name}`);
  };
  const updateGuest: Ctx['updateGuest'] = (id, guestId, patch) => patchEvent(id, x => ({
    ...x, guestsList: (x.guestsList || []).map(g => g.id === guestId ? { ...g, ...patch } : g)
  }));

  const addTeamMember: Ctx['addTeamMember'] = (id, m) => {
    const member: TeamMember = { id: uid(), name: 'Member', role: 'planner', ...m };
    patchEvent(id, x => ({ ...x, team: [member, ...(x.team || [])] }));
    logActivity(id, 'team', `Added team member: ${member.name}`);
  };

  const addDoc: Ctx['addDoc'] = (id, d) => {
    const doc: DocItem = { id: uid(), name: 'document.pdf', type: 'other', uploadedAt: Date.now(), ...d };
    patchEvent(id, x => ({ ...x, documents: [doc, ...(x.documents || [])] }));
    logActivity(id, 'doc', `Uploaded ${doc.name}`);
  };

  const addTimeline: Ctx['addTimeline'] = (id, t) => {
    const item: TimelineItem = { id: uid(), layer: 'planning', title: 'Milestone', start: 'TBD', ...t };
    patchEvent(id, x => ({ ...x, timeline: [item, ...(x.timeline || [])] }));
  };

  const addIssue: Ctx['addIssue'] = (id, i) => {
    const issue: Issue = { id: uid(), ts: Date.now(), severity: 'med', text: 'Issue', ...i };
    patchEvent(id, x => ({ ...x, issues: [issue, ...(x.issues || [])] }));
    logActivity(id, 'system', `Issue: ${issue.text}`);
  };
  const resolveIssue: Ctx['resolveIssue'] = (id, issueId) => patchEvent(id, x => ({
    ...x, issues: (x.issues || []).map(i => i.id === issueId ? { ...i, resolved: true } : i)
  }));

  return (
    <Store.Provider value={{
      events, saveDraft, publishEvent, getEvent, updateEvent,
      addTask, toggleTask, addBudgetLine, updateBudgetLine, addVendor, moveVendor,
      addGuest, updateGuest, addTeamMember, addDoc, addTimeline, addIssue, resolveIssue, logActivity,
    }}>{children}</Store.Provider>
  );
};

export const useEventStore = () => {
  const ctx = useContext(Store);
  if (!ctx) throw new Error('useEventStore must be used within EventStoreProvider');
  return ctx;
};

export default Store;
