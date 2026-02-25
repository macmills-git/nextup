import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign, Edit, Save, Plus, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const eventsData: Record<string, any> = {
  "1": { title: "Annual Corporate Gala", date: "Mar 15, 2026", time: "6:00 PM", location: "Grand Ballroom, Downtown", guests: 250, status: "upcoming", budget: "$45,000", category: "Corporate", description: "Our annual corporate gala bringing together partners, employees, and stakeholders for an evening of celebration and networking." },
  "2": { title: "Product Launch Party", date: "Mar 22, 2026", time: "7:00 PM", location: "Tech Hub, Silicon Ave", guests: 150, status: "upcoming", budget: "$28,000", category: "Corporate", description: "Launching our new product line with a stylish evening event." },
  "3": { title: "Team Building Retreat", date: "Apr 5, 2026", time: "9:00 AM", location: "Mountain Lodge Resort", guests: 80, status: "planning", budget: "$15,000", category: "Corporate", description: "Team bonding activities and strategy sessions." },
  "4": { title: "Charity Fundraiser", date: "Apr 18, 2026", time: "5:00 PM", location: "City Art Museum", guests: 300, status: "planning", budget: "$52,000", category: "Social", description: "Annual charity fundraiser for local community." },
  "5": { title: "Summer Music Festival", date: "Jun 10, 2026", time: "12:00 PM", location: "Central Park Amphitheater", guests: 500, status: "draft", budget: "$75,000", category: "Social", description: "A day-long music festival with live performances." },
  "6": { title: "Wedding Reception — Smith", date: "Feb 14, 2026", time: "4:00 PM", location: "Rose Garden Estate", guests: 120, status: "completed", budget: "$35,000", category: "Wedding", description: "Beautiful garden wedding reception." },
  "7": { title: "Tech Conference 2026", date: "May 20, 2026", time: "8:00 AM", location: "Convention Center", guests: 1000, status: "planning", budget: "$120,000", category: "Conference", description: "Multi-track technology conference." },
};

const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventsData[eventId || "1"] || eventsData["1"];

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Book venue", done: true },
    { id: 2, title: "Confirm catering menu", done: false },
    { id: 3, title: "Send invitations", done: false },
    { id: 4, title: "Arrange photography", done: true },
    { id: 5, title: "Finalize guest list", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const [timeline] = useState([
    { date: "Week 1", task: "Venue booking & budget finalization", done: true },
    { date: "Week 2", task: "Vendor selection & contracts", done: true },
    { date: "Week 3", task: "Invitations & marketing", done: false },
    { date: "Week 4", task: "Final preparations & rehearsal", done: false },
  ]);

  const [teamMembers] = useState([
    { name: "Jane Doe", role: "Project Manager" },
    { name: "Michael Chen", role: "Event Coordinator" },
    { name: "Sarah Williams", role: "Vendor Relations" },
  ]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), title: newTask, done: false }]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/dashboard/events')} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          {editing ? (
            <Input value={title} onChange={e => setTitle(e.target.value)} className="text-2xl font-bold" />
          ) : (
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Badge className="bg-primary/10 text-primary">{event.status}</Badge>
            <Badge variant="outline">{event.category}</Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setEditing(!editing)} className="gap-2">
          {editing ? <><Save className="h-4 w-4" /> Save</> : <><Edit className="h-4 w-4" /> Edit</>}
        </Button>
      </div>

      {/* Event info */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-card">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{event.date}</span></div>
          <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{event.time}</span></div>
          <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{event.location}</span></div>
          <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-primary" /><span className="text-muted-foreground">{event.guests} guests</span></div>
        </div>
        <div className="flex items-center gap-2 text-sm mb-4"><DollarSign className="h-4 w-4 text-success" /><span className="font-semibold text-foreground">{event.budget}</span></div>
        {editing ? (
          <textarea className="w-full p-3 rounded-lg bg-secondary border border-border text-sm text-foreground resize-none" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        ) : (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <Tabs defaultValue="tasks">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Input placeholder="Add a new task..." value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === "Enter" && addTask()} />
              <Button size="sm" onClick={addTask} className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
            </div>
            <div className="space-y-2">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors group">
                  <button onClick={() => toggleTask(task.id)}>
                    <CheckCircle className={`h-5 w-5 ${task.done ? 'text-success' : 'text-muted-foreground'}`} />
                  </button>
                  <span className={`flex-1 text-sm ${task.done ? 'text-muted-foreground line-through' : 'text-foreground'}`}>{task.title}</span>
                  <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${item.done ? 'bg-success' : 'bg-border'}`} />
                    {i < timeline.length - 1 && <div className="w-px h-8 bg-border" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-primary">{item.date}</p>
                    <p className={`text-sm ${item.done ? 'text-muted-foreground' : 'text-foreground'}`}>{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <div className="space-y-3">
              {teamMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-bold">{m.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventDetailPage;
