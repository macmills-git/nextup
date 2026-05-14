import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEventStore } from "@/contexts/EventStore";

const steps = [
  { id: "basics", label: "Event Basics" },
  { id: "structure", label: "Structure Builder" },
  { id: "planning", label: "Planning Mode" },
  { id: "blueprint", label: "AI Blueprint" },
  { id: "launch", label: "Launch" },
];

const NewEventWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const store = useEventStore();
  const [step, setStep] = useState<number>(0);

  // Draft state
  const [draft, setDraft] = useState<any>({
    title: '', date: '', guests: '', venue: '', metadata: { structureSelections: {} }, planningMode: 'diy'
  });

  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);

  // Debounced autosave: save draft 800ms after last change
  useEffect(() => {
    setSaving(true);
    const t = setTimeout(() => {
      store.saveDraft({
        id: draft.id,
        title: draft.title,
        date: draft.date,
        venue: draft.venue,
        guests: Number(draft.guests || 0),
        metadata: { ...draft.metadata, planningMode: draft.planningMode }
      });
      setSaving(false);
      setSavedAt(Date.now());
    }, 800);
    return () => clearTimeout(t);
  }, [draft]);

  const saveStepDraft = () => {
    // save minimal draft to store
    store.saveDraft({
      id: draft.id,
      title: draft.title,
      date: draft.date,
      venue: draft.venue,
      guests: Number(draft.guests || 0),
      metadata: { ...draft.metadata, planningMode: draft.planningMode }
    });
  };

  const handleLaunch = () => {
    const published = store.publishEvent({
      title: draft.title || 'Untitled Event',
      date: draft.date,
      venue: draft.venue,
      guests: Number(draft.guests || 0),
      metadata: { ...draft.metadata, planningMode: draft.planningMode }
    });
    navigate(`/dashboard/events/${published.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-[1200px] mx-auto py-6 gap-6 px-4">
        {/* Left rail */}
        <aside className="w-48 hidden md:block">
          <div className="sticky top-6 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Launch Mission</h3>
            <nav className="mt-3 space-y-2">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setStep(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${i === step ? 'bg-card border border-border text-foreground' : 'text-muted-foreground hover:bg-muted'}`}>
                  <div className="text-sm font-medium">{s.label}</div>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main workspace */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" className="p-2" onClick={() => window.history.back()}><ArrowLeft className="h-4 w-4" /></Button>
              <div>
                <h1 className="text-2xl font-bold">Create Event</h1>
                <p className="text-xs text-muted-foreground">A focused multi-step workspace for launching an operational event.</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Step {step + 1} of {steps.length}</div>
                <div className="text-xs text-muted-foreground">{saving ? 'Saving...' : savedAt ? `Saved ${new Date(savedAt).toLocaleTimeString()}` : 'Not saved'}</div>
              </div>
              <Button onClick={() => setStep(s => Math.max(0, s - 1))} variant="outline">Back</Button>
              <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 min-h-[420px]">
            {step === 0 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Event Basics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Event name</label>
                    <Input className="mt-2" placeholder="Your event name" value={draft.title} onChange={e => setDraft(d => ({...d, title: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred date</label>
                    <Input type="date" className="mt-2" value={draft.date} onChange={e => setDraft(d => ({...d, date: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Estimated guests</label>
                    <Input type="number" className="mt-2" value={draft.guests} onChange={e => setDraft(d => ({...d, guests: e.target.value}))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Location / Venue</label>
                    <Input className="mt-2" placeholder="Venue or address" value={draft.venue} onChange={e => setDraft(d => ({...d, venue: e.target.value}))} />
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Event Structure Builder</h2>
                <p className="text-sm text-muted-foreground mb-4">Select services to build the operational architecture (vendors, budget categories, task groups, timeline phases).</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['Catering','Stage','Security','Accommodation','Transportation','Photography','Livestream','Ticketing'].map(s => (
                    <div key={s} className="p-3 rounded-lg border border-border bg-secondary hover:shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{s}</div>
                        <input
                          type="checkbox"
                          checked={!!draft.metadata?.structureSelections?.[s]}
                          onChange={() => setDraft(d => ({...d, metadata: {...d.metadata, structureSelections: {...d.metadata.structureSelections, [s]: !d.metadata.structureSelections?.[s] }}}))}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Manage vendors, tasks and budget categories for {s}.</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {step === 2 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Planning Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['diy','team','hire','ai'].map(mode => (
                    <div key={mode} className={`p-4 rounded-lg border border-border cursor-pointer ${draft.planningMode === mode ? 'bg-card' : 'bg-secondary'}`} onClick={() => setDraft(d => ({...d, planningMode: mode }))}>
                      <div className="font-medium">{mode === 'diy' ? 'DIY Planning' : mode === 'team' ? 'Team Collaboration' : mode === 'hire' ? 'Professional Planner' : 'AI Assisted'}</div>
                      <p className="text-xs text-muted-foreground mt-2">Choose how your team will operate and collaborate for this event.</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {step === 3 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">AI Event Blueprint (Preview)</h2>
                <p className="text-sm text-muted-foreground">Editable preview of the operational blueprint. (AI preview placeholder — user approves or edits.)</p>
                <div className="mt-4 p-4 border border-border rounded-lg bg-secondary">Timeline preview • Task hierarchy • Budget allocation</div>
              </section>
            )}

            {step === 4 && (
              <section>
                <h2 className="text-lg font-semibold mb-3">Launch Review</h2>
                <p className="text-sm text-muted-foreground">Final check before launching the Event Workspace.</p>
                <div className="mt-4 flex gap-3">
                  <Button variant="outline" onClick={() => { setStep(0); }}>Cancel</Button>
                  <Button className="gradient-primary text-white" onClick={() => { saveStepDraft(); handleLaunch(); }}>Launch Event Workspace</Button>
                </div>
              </section>
            )}
          </div>
        </main>

        {/* Right AI Panel */}
        <aside className="w-80 hidden xl:block">
          <div className="sticky top-6 p-4 bg-card rounded-xl border border-border">
            <h4 className="text-sm font-semibold">AI Assistant</h4>
            <p className="text-xs text-muted-foreground mt-2">Operational hints, estimated complexity, and budget risk indicators will appear here.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewEventWorkspace;
