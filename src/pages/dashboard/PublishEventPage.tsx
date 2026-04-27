import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const categories = ["Wedding", "Corporate", "Conference", "Social", "Workshop", "Birthday"];

const PublishEventPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "Corporate",
    date: "",
    time: "",
    location: "",
    city: "",
    guests: "",
    summary: "",
  });

  const handlePublish = () => {
    if (!form.title.trim() || !form.date || !form.location.trim()) return;
    try {
      const existing = JSON.parse(sessionStorage.getItem("nested_published_events") || "[]");
      existing.unshift({
        id: Date.now(),
        title: form.title,
        category: form.category,
        date: form.date,
        time: form.time,
        location: form.location,
        city: form.city,
        guests: Number(form.guests || 0),
        details: form.summary,
      });
      sessionStorage.setItem("nested_published_events", JSON.stringify(existing));
    } catch {
      // no-op
    }
    navigate("/dashboard/events");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Publish an event</h1>
        <p className="text-sm text-muted-foreground">Fill a simple form to publish your event for vendors and attendees.</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <div>
          <label className="text-xs text-muted-foreground">Event title</label>
          <input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="Annual Product Launch" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-muted-foreground">Category</label>
            <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none">
              {categories.map((cat) => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Date</label>
            <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Time</label>
            <input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="text-xs text-muted-foreground">Venue / address</label>
            <input value={form.location} onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="Convention Center, Downtown" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">City</label>
            <input value={form.city} onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="Auckland" />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Expected guests</label>
          <input value={form.guests} onChange={(e) => setForm((p) => ({ ...p, guests: e.target.value.replace(/[^0-9]/g, "") }))} className="w-full mt-1 h-10 px-3 rounded-lg border border-border bg-background text-sm outline-none" placeholder="250" />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Summary</label>
          <textarea value={form.summary} onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))} rows={5} className="w-full mt-1 px-3 py-2 rounded-lg border border-border bg-background text-sm outline-none resize-none" placeholder="Share what this event is about..." />
        </div>
        <div className="flex justify-end">
          <Button onClick={handlePublish} className="rounded-lg">Publish event</Button>
        </div>
      </div>
    </div>
  );
};

export default PublishEventPage;
