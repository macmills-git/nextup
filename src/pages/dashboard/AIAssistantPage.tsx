import { useState } from "react";
import { Sparkles, Send, Lightbulb, TrendingUp, Calendar, DollarSign, Search, Paperclip, AtSign, ArrowUp, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Calendar, text: "Help me plan a corporate event for 200 guests" },
  { icon: DollarSign, text: "Optimize my budget for the upcoming gala" },
  { icon: TrendingUp, text: "Analyze vendor performance this quarter" },
  { icon: Lightbulb, text: "Suggest creative themes for a product launch" },
];

type Message = { id: number; role: "user" | "assistant"; text: string };

const events = [
  { id: 1, name: "Annual Corporate Gala" },
  { id: 2, name: "Product Launch Party" },
  { id: 3, name: "Team Building Retreat" },
  { id: 4, name: "Charity Fundraiser" },
  { id: 5, name: "Summer Music Festival" },
];

const recentChats = [
  { title: "Corporate Gala Budget Plan", time: "Feb 23, 2:02 AM", color: "bg-primary" },
  { title: "Vendor Selection Analysis", time: "Feb 22, 11:30 AM", color: "bg-success" },
  { title: "Team Assignment Optimization", time: "Feb 21, 4:15 PM", color: "bg-warning" },
];

const AIAssistantPage = () => {
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("Recent Chats");

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    const eventContext = activeEvent ? ` (Context: ${events.find(e => e.id === activeEvent)?.name})` : "";
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: "user" as const, text: msg },
      { id: Date.now() + 1, role: "assistant" as const, text: `I'm analyzing your request${eventContext}. This is a demo — in the full version, I'd provide detailed recommendations based on your event data, vendor history, and budget constraints.` },
    ]);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4">
      <div className="flex-1 flex flex-col">
        {!hasMessages ? (
          /* Hero prompt view */
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1 mb-8 bg-secondary">
              <TrendingUp className="w-3.5 h-3.5" />
              AI-powered event planning assistant
            </span>

            <h1 className="text-5xl font-bold text-foreground tracking-tight mb-4 text-center">
              Plan your perfect event
            </h1>
            <p className="text-muted-foreground mb-2 text-center">
              Generate complete event plans in seconds. <span className="underline cursor-pointer">Watch demo.</span>
            </p>

            {/* Prompt box */}
            <div className="w-full max-w-3xl mt-8 bg-card border border-border rounded-2xl shadow-card p-4 flex flex-col min-h-[140px]">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Describe your event or ask anything..."
                className="flex-1 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm min-h-[60px]"
              />
              <div className="flex justify-between items-center mt-auto pt-2">
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Sparkles className="w-3.5 h-3.5" /> Prompt Builder
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Sparkles className="w-3.5 h-3.5" /> EventNest AI
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><AtSign className="w-4 h-4" /></button>
                  <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"><Paperclip className="w-4 h-4" /></button>
                  <button
                    onClick={() => handleSend()}
                    className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="w-full max-w-3xl mt-6 grid grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.text)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border text-left hover:bg-secondary transition-colors text-sm text-foreground bg-card"
                >
                  <s.icon className="h-4 w-4 text-primary shrink-0" />
                  {s.text}
                </button>
              ))}
            </div>

            {/* Bottom tabs */}
            <div className="w-full max-w-3xl mt-12">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex gap-6">
                  {["Recent Chats", "Collaborations", "Iterations"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-lg transition-colors ${activeTab === tab ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-1.5 bg-secondary rounded-md"><Layers className="w-4 h-4 text-muted-foreground" /></button>
                  <div className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 bg-card text-sm">
                    <Search className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">Search projects...</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {recentChats.map((chat, i) => (
                  <div key={i} className="bg-secondary border border-border rounded-xl p-3 flex gap-4 items-center cursor-pointer hover:bg-accent transition-colors">
                    <div className={`w-16 h-16 rounded-lg ${chat.color} flex-shrink-0`} />
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">{chat.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Chat view */
          <>
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
              </div>
              <p className="text-sm text-muted-foreground">Your intelligent event planning companion</p>
            </div>

            <div className="flex-1 bg-card rounded-xl border border-border shadow-card flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center mr-3 shrink-0 mt-1">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    placeholder="Ask me anything about event planning..."
                    className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/20"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <Button size="icon" className="gradient-primary text-primary-foreground" onClick={() => handleSend()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Event sidebar */}
      <div className="w-56 hidden lg:flex flex-col bg-card rounded-xl border border-border shadow-card p-4">
        <h3 className="font-semibold text-foreground text-sm mb-3">Events</h3>
        <p className="text-xs text-muted-foreground mb-3">Select an event for context</p>
        <div className="space-y-1 flex-1">
          <button
            className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              activeEvent === null ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
            )}
            onClick={() => setActiveEvent(null)}
          >
            General
          </button>
          {events.map(event => (
            <button
              key={event.id}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                activeEvent === event.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-secondary"
              )}
              onClick={() => setActiveEvent(event.id)}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
