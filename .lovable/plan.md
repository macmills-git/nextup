# Event Operations System — Architectural Redesign

Shift from feature-pages to a **lifecycle-driven Event Workspace** where every event is a living command center. All modules (timeline, budget, vendors, tasks, guests, team, docs, comms) become **linked sub-systems of one event**, not isolated tools.

---

## 1. New Information Architecture

```text
/dashboard                  → Global multi-event overview
/dashboard/events           → All events (list + create)
/dashboard/events/:id       → EVENT WORKSPACE shell (nested tabs below)
   ├── overview             → Mission control widgets
   ├── timeline             → Multi-layer timeline (Planning / Run Sheet / Vendor / Team)
   ├── tasks                → Phase → Milestone → Task → Subtask
   ├── budget               → Estimated / Approved / Actual / Pending
   ├── vendors              → Lifecycle: Discover → Shortlist → Negotiate → Book → Execute → Review
   ├── guests               → Import, segment, RSVP, seating, check-in
   ├── team                 → Roles, permissions, activity
   ├── documents            → Files + AI extraction
   ├── communications       → Unified feed (team / vendor / guest)
   ├── event-day            → Live command center (run sheet, check-ins, alerts)
   └── reports              → Post-event analytics + AI insights
```

Vendor side & public pages unchanged.

---

## 2. Phase 1 — Event Initiation (Create Wizard)

Replace current single-screen create with **3-step guided wizard** (reusing existing `EventStore`):

- **Step 1 Basics** — name, type, public/private, modality, theme, guest count, goal, budget range, date, location
- **Step 2 Structure** — checklist (catering, stage, security, accommodation, transport, photography, MC, livestream). Selections **dynamically seed** vendor categories, budget categories, task groups, and timeline milestones.
- **Step 3 Planning Mode** — DIY / Team / Hire Planner / AI Assisted

On finish → save to `EventStore` and route to `/dashboard/events/:id/overview`.

---

## 3. Event Workspace Shell

New component `EventWorkspaceShell` with:
- Sticky header: event name, countdown chip, status, share, settings
- Horizontal tab nav for the 11 sub-areas above
- `<Outlet />` style nested routing via internal state (keeps single-page feel)
- Pulls live data from `EventStore` (`getEvent`, `updateEvent`)

---

## 4. Sub-System Modules (all wired to the same event record)

| Module | Key Feature this round |
|---|---|
| Overview | Widgets: countdown, budget health bar, task %, vendor status, RSVP donut, deadlines, risks |
| Timeline | 4 layers as tabs; dependency badges; AI overlap warnings (heuristic) |
| Tasks | Hierarchical list, deps, assignee, vendor link, budget link |
| Budget | Categories × layers matrix; auto-roll-up; vendor-linked line items |
| Vendors | Lifecycle kanban (Discover → Shortlist → Negotiate → Booked → Executing → Reviewed) |
| Guests | Import (CSV/manual), segments, RSVP, seating grid, check-in toggle |
| Team | Role chips, permission matrix, activity log |
| Documents | Upload list, type tags, mock AI extract panel |
| Communications | Unified feed combining mock vendor/team/guest events |
| Event Day | Live run sheet, check-in counters, issue log, AI suggestion banner |
| Reports | Financial summary, vendor scores, AI insight cards |

**Cross-linking** is the core value: hiring a vendor creates a budget line, a task, and a timeline entry automatically (helper `linkVendorToEvent`).

---

## 5. Data Model Extensions (EventStore)

Extend `EventModel` with: `phase`, `structure` (selected services), `planningMode`, `tasksTree`, `budgetCategories[]`, `vendorPipeline[]`, `guestsList[] (segment, rsvp, seat, checkedIn)`, `team[] (role)`, `documents[]`, `activity[]`, `runSheet[]`, `issues[]`. All in localStorage — no backend needed.

Add helpers: `addTask`, `addBudgetLine`, `addVendorToPipeline`, `logActivity`, `addGuest`, `addDocument`.

---

## 6. Files

**Create**
- `src/pages/dashboard/CreateEventWizard.tsx` (3-step wizard)
- `src/pages/dashboard/EventWorkspace/index.tsx` (shell + tab router)
- `src/pages/dashboard/EventWorkspace/tabs/Overview.tsx`
- `.../tabs/Timeline.tsx`
- `.../tabs/Tasks.tsx`
- `.../tabs/Budget.tsx`
- `.../tabs/Vendors.tsx`
- `.../tabs/Guests.tsx`
- `.../tabs/Team.tsx`
- `.../tabs/Documents.tsx`
- `.../tabs/Communications.tsx`
- `.../tabs/EventDay.tsx`
- `.../tabs/Reports.tsx`

**Modify**
- `src/contexts/EventStore.tsx` — extended schema + helpers
- `src/App.tsx` — `/dashboard/events/new` and `/dashboard/events/:id/*` routes
- `src/pages/Dashboard.tsx` / `DashboardSidebar.tsx` — point "Projects" CTA to new wizard / workspace
- `src/pages/dashboard/EventsPage.tsx` — list cards link to workspace; "New" → wizard

---

## 7. Design

Stay within existing tokens — coral primary, Space Grotesk/DM Sans, dark sphere bg, floating glass cards. Tab nav as pill row; overview widgets as bento grid; timeline as horizontal swim-lanes; budget as table with progress bars; vendor pipeline as column kanban. Smooth framer-motion transitions between tabs.

---

## 8. Scope for this iteration

Ship the **full shell + wizard + all 11 tabs functional with cross-linked mock+real data from EventStore**. AI features are heuristic (no LLM calls). Polished UI, no backend.