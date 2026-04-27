import { useMemo, useState } from "react";
import { Mail, Send, Users, Megaphone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Audience = "invitees" | "ticket-buyers" | "vendors";

const audienceOptions: { id: Audience; label: string; count: number }[] = [
  { id: "invitees", label: "Invitees", count: 184 },
  { id: "ticket-buyers", label: "Ticket buyers", count: 326 },
  { id: "vendors", label: "Vendors", count: 42 },
];

const MarketingPage = () => {
  const [audience, setAudience] = useState<Audience>("invitees");
  const [subject, setSubject] = useState("You're invited to our upcoming event");
  const [message, setMessage] = useState("Hello,\n\nWe would love to see you at our event. Here are the latest updates and details.\n\nBest regards,\nEventNest Team");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const selectedAudience = useMemo(
    () => audienceOptions.find((item) => item.id === audience),
    [audience]
  );

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) return;
    setSending(true);
    setSent(false);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Marketing</h1>
        <p className="text-sm text-muted-foreground">Send bulk email updates to invitees, ticket buyers and vendors.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Mail className="h-4 w-4 text-primary" /> Campaign composer
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {audienceOptions.map((item) => (
              <button
                key={item.id}
                onClick={() => setAudience(item.id)}
                className={`text-left rounded-lg border px-3 py-2 transition-all ${
                  audience === item.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:bg-muted"
                }`}
              >
                <p className="text-xs font-semibold">{item.label}</p>
                <p className={`text-[11px] ${audience === item.id ? "text-background/70" : "text-muted-foreground"}`}>
                  {item.count} recipients
                </p>
              </button>
            ))}
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1 h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Email subject..."
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={9}
              className="w-full mt-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={handleSend} disabled={sending} className="rounded-lg">
              <Send className="h-4 w-4 mr-1.5" />
              {sending ? "Sending..." : "Send campaign"}
            </Button>
            {sent && (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" /> Campaign sent successfully
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-xs text-muted-foreground">Selected audience</p>
            <p className="text-lg font-semibold text-foreground mt-1">{selectedAudience?.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{selectedAudience?.count} people</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Megaphone className="h-4 w-4 text-primary" /> Suggestions
            </div>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>- Keep subject under 60 characters.</li>
              <li>- Include clear event date and location.</li>
              <li>- Add one clear call-to-action.</li>
            </ul>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
              <Users className="h-4 w-4 text-primary" /> Last campaign
            </div>
            <p className="text-xs text-muted-foreground">Reminder: Event starts in 5 days</p>
            <p className="text-[11px] text-muted-foreground mt-1">Open rate: 42.8%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;
