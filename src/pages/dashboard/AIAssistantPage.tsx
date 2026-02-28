import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Lightbulb, TrendingUp, Calendar, DollarSign, Search, Paperclip, AtSign, ArrowUp, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Calendar, text: "Help me plan a corporate event for 200 guests" },
  { icon: DollarSign, text: "Optimize my budget for the upcoming gala" },
  { icon: TrendingUp, text: "Analyze vendor performance this quarter" },
  { icon: Lightbulb, text: "Suggest creative themes for a product launch" },
];

type Message = { id: number; role: "user" | "assistant"; text: string; event?: string };

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
  const [isExpanded, setIsExpanded] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const eventName = activeEvent ? events.find(e => e.id === activeEvent)?.name || "General" : "General";

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    if (!isExpanded) setIsExpanded(true);
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: "user", text: msg, event: eventName },
      { id: Date.now() + 1, role: "assistant", text: `I'm analyzing your request for "${eventName}". This is a demo — in the full version, I'd provide detailed recommendations based on your event data, vendor history, and budget constraints.`, event: eventName },
    ]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const hasInput = input.trim().length > 0;

  // Filter messages by active event
  const filteredMessages = activeEvent
    ? messages.filter(m => m.event === eventName)
    : messages;

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4">
      <div className="flex-1 flex flex-col">
        {/* Hero section - animates up when expanded */}
        <div className={cn(
          "flex flex-col items-center transition-all duration-700 ease-in-out",
          isExpanded ? "pt-2" : "flex-1 justify-center"
        )}>
          {!isExpanded && (
            <>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1 mb-6 bg-secondary dark:bg-accent animate-fade-in">
                <TrendingUp className="w-3.5 h-3.5" />
                AI-powered event planning assistant
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 text-center animate-fade-in">
                Plan your perfect event
              </h1>
              <p className="text-muted-foreground mb-2 text-center animate-fade-in">
                Generate complete event plans in seconds. <span className="underline cursor-pointer">Watch demo.</span>
              </p>
            </>
          )}

          {isExpanded && (
            <div className="flex items-center gap-2 mb-3 self-start animate-fade-in">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">AI Assistant</h2>
              <span className="text-xs text-muted-foreground">• {eventName}</span>
            </div>
          )}

          {/* Chat workspace - appears with animation */}
          {isExpanded && (
            <div className="w-full flex-1 mb-3 bg-card rounded-xl border border-border overflow-hidden flex flex-col animate-scale-in" style={{ minHeight: '300px', maxHeight: 'calc(100vh - 20rem)' }}>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {filteredMessages.map(msg => (
                  <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center mr-3 shrink-0 mt-1">
                        <Sparkles className="h-3.5 w-3.5 text-white" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-3",
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-secondary dark:bg-accent text-foreground rounded-bl-md"
                    )}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* Prompt box */}
          <div className={cn(
            "w-full bg-card border border-border rounded-2xl shadow-card p-4 flex flex-col transition-all duration-500",
            isExpanded ? "max-w-full" : "max-w-3xl mt-6",
            isExpanded ? "min-h-[80px]" : "min-h-[140px]"
          )}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Describe your event or ask anything..."
              className={cn(
                "flex-1 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm",
                isExpanded ? "min-h-[30px]" : "min-h-[60px]"
              )}
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
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    hasInput
                      ? "bg-primary text-white shadow-md"
                      : "bg-secondary border border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions + Bottom tabs - hidden when expanded */}
          {!isExpanded && (
            <>
              <div className="w-full max-w-3xl mt-6 grid grid-cols-2 gap-2 animate-fade-in">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.text)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border text-left hover:bg-secondary dark:hover:bg-accent transition-colors text-sm text-foreground bg-card"
                  >
                    <s.icon className="h-4 w-4 text-primary shrink-0" />
                    {s.text}
                  </button>
                ))}
              </div>

              <div className="w-full max-w-3xl mt-10">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <div className="flex gap-6">
                    {["Recent Chats", "Collaborations", "Iterations"].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-base transition-colors ${activeTab === tab ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-1.5 bg-secondary dark:bg-accent rounded-md"><Layers className="w-4 h-4 text-muted-foreground" /></button>
                    <div className="flex items-center gap-2 border border-border rounded-full px-3 py-1.5 bg-card text-sm">
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">Search projects...</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                  {recentChats.map((chat, i) => (
                    <div key={i} className="bg-secondary dark:bg-accent border border-border rounded-xl p-3 flex gap-4 items-center cursor-pointer hover:bg-accent dark:hover:bg-accent/80 transition-colors">
                      <div className={`w-14 h-14 rounded-lg ${chat.color} flex-shrink-0`} />
                      <div>
                        <p className="text-sm font-medium text-foreground leading-tight">{chat.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{chat.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Event sidebar */}
      <div className="w-52 hidden lg:flex flex-col bg-card rounded-xl border border-border p-4">
        <h3 className="font-semibold text-foreground text-sm mb-3">Events</h3>
        <p className="text-xs text-muted-foreground mb-3">Select event context</p>
        <div className="space-y-1 flex-1 overflow-y-auto">
          <button
            className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
              activeEvent === null ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary dark:hover:bg-accent"
            )}
            onClick={() => setActiveEvent(null)}
          >
            General
          </button>
          {events.map(event => (
            <button
              key={event.id}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                activeEvent === event.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary dark:hover:bg-accent"
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
