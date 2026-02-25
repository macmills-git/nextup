import { useState } from "react";
import { Bell, Check, Calendar, Users, DollarSign, MessageSquare, Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type Notification = {
  id: number;
  type: "event" | "team" | "budget" | "message" | "vendor";
  title: string;
  desc: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  { id: 1, type: "event", title: "Event reminder", desc: "Annual Corporate Gala starts in 3 days", time: "2m ago", read: false },
  { id: 2, type: "team", title: "New team member", desc: "Alex Johnson has joined your team", time: "15m ago", read: false },
  { id: 3, type: "budget", title: "Budget alert", desc: "Product Launch Party budget is 85% spent", time: "1h ago", read: false },
  { id: 4, type: "message", title: "New message", desc: "Akolo Studio sent you a message", time: "2h ago", read: true },
  { id: 5, type: "vendor", title: "Vendor update", desc: "Bake It Right confirmed catering menu", time: "3h ago", read: true },
  { id: 6, type: "event", title: "Task completed", desc: "Photography Briefing marked as done", time: "5h ago", read: true },
  { id: 7, type: "message", title: "New message", desc: "Sarah Williams: Can we reschedule?", time: "Yesterday", read: true },
  { id: 8, type: "budget", title: "Payment processed", desc: "$4,100 sent to Bake It Right", time: "Yesterday", read: true },
];

const typeIcons: Record<string, typeof Bell> = {
  event: Calendar, team: Users, budget: DollarSign, message: MessageSquare, vendor: Store,
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = filter === "all" ? notifications : notifications.filter(n => n.type === filter);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 rounded-lg text-muted-foreground hover:bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>Mark all as read</Button>
        )}
      </div>

      <div className="flex gap-2 flex-wrap">
        {["all", "event", "team", "budget", "message", "vendor"].map(f => (
          <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(notif => {
          const Icon = typeIcons[notif.type] || Bell;
          return (
            <div
              key={notif.id}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl border transition-colors cursor-pointer",
                notif.read ? "bg-card border-border" : "bg-accent border-primary/20"
              )}
              onClick={() => markAsRead(notif.id)}
            >
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                notif.read ? "bg-secondary" : "bg-primary/10"
              )}>
                <Icon className={cn("h-5 w-5", notif.read ? "text-muted-foreground" : "text-primary")} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={cn("text-sm font-medium", notif.read ? "text-muted-foreground" : "text-foreground")}>{notif.title}</h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{notif.desc}</p>
              </div>
              {!notif.read && (
                <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationsPage;
