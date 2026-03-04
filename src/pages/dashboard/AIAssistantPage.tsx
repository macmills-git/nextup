import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Lightbulb, TrendingUp, Calendar, DollarSign, Search, Paperclip, AtSign, ArrowUp, Layers, Plus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Calendar, text: "Help me plan a corporate event for 200 guests" },
  { icon: DollarSign, text: "Optimize my budget for the upcoming gala" },
  { icon: TrendingUp, text: "Analyze vendor performance this quarter" },
  { icon: Lightbulb, text: "Suggest creative themes for a product launch" },
];

type Message = { id: number; role: "user" | "assistant"; text: string };
type Conversation = { id: string; title: string; messages: Message[]; time: string };

const AIAssistantPage = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: "1", title: "Corporate Gala Budget Plan", messages: [
      { id: 1, role: "user", text: "Help me plan the budget for our corporate gala" },
      { id: 2, role: "assistant", text: "I'd be happy to help with your corporate gala budget! Based on typical events of this scale, here's a recommended budget breakdown..." },
    ], time: "Feb 23, 2:02 AM" },
    { id: "2", title: "Vendor Selection Analysis", messages: [
      { id: 1, role: "user", text: "Compare our top 3 catering vendors" },
      { id: 2, role: "assistant", text: "Here's a detailed comparison of your top catering vendors based on pricing, reviews, and past performance..." },
    ], time: "Feb 22, 11:30 AM" },
    { id: "3", title: "Team Assignment Optimization", messages: [
      { id: 1, role: "user", text: "How should I assign team roles for the product launch?" },
      { id: 2, role: "assistant", text: "Based on your team's strengths, I recommend the following role assignments for the product launch event..." },
    ], time: "Feb 21, 4:15 PM" },
  ]);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeConvo = conversations.find(c => c.id === activeConversation);

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;

    if (!isExpanded) setIsExpanded(true);

    const userMsg: Message = { id: Date.now(), role: "user", text: msg };
    const aiMsg: Message = { id: Date.now() + 1, role: "assistant", text: `I'm analyzing your request. Here are my recommendations based on your event data and current planning context...` };

    if (activeConversation) {
      setConversations(prev => prev.map(c =>
        c.id === activeConversation ? { ...c, messages: [...c.messages, userMsg, aiMsg] } : c
      ));
    } else {
      const newId = Date.now().toString();
      const title = msg.length > 40 ? msg.slice(0, 40) + "..." : msg;
      setConversations(prev => [{ id: newId, title, messages: [userMsg, aiMsg], time: "Just now" }, ...prev]);
      setActiveConversation(newId);
    }
    setInput("");
  };

  const createNewChat = () => {
    setActiveConversation(null);
    setIsExpanded(false);
    setInput("");
  };

  const switchConversation = (id: string) => {
    setActiveConversation(id);
    setIsExpanded(true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConvo?.messages]);

  const hasInput = input.trim().length > 0;
  const displayMessages = activeConvo?.messages || [];

  const filteredConvos = conversations.filter(c =>
    searchQuery === "" || c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4">
      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <div className={cn(
          "flex flex-col transition-all duration-700 ease-in-out",
          isExpanded ? "flex-1" : "flex-1 justify-center items-center"
        )}>
          {/* Hero - hidden when expanded */}
          {!isExpanded && (
            <>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1 mb-6 bg-secondary dark:bg-accent animate-fade-in self-center">
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

          {/* Chat header when expanded */}
          {isExpanded && (
            <div className="flex items-center gap-2 mb-3 animate-fade-in">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">AI Assistant</h2>
              {activeConvo && <span className="text-xs text-muted-foreground">• {activeConvo.title}</span>}
            </div>
          )}

          {/* Chat workspace */}
          {isExpanded && (
            <div className="w-full flex-1 mb-3 bg-card rounded-xl border border-border overflow-hidden flex flex-col animate-scale-in" style={{ minHeight: '250px' }}>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {displayMessages.map(msg => (
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
            isExpanded ? "max-w-full min-h-[80px]" : "max-w-3xl mt-6 min-h-[140px] self-center"
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
                      ? "bg-primary text-white shadow-md scale-110"
                      : "bg-secondary border border-border text-muted-foreground"
                  )}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Suggestions + Bottom tabs - hidden when expanded */}
          {!isExpanded && (
            <div className="w-full max-w-3xl mt-6 grid grid-cols-2 gap-2 animate-fade-in self-center">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSend(s.text)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border text-left hover:bg-secondary dark:hover:bg-accent transition-colors text-sm text-foreground bg-card">
                  <s.icon className="h-4 w-4 text-primary shrink-0" />
                  {s.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sidebar - conversations */}
      <div className="w-56 hidden lg:flex flex-col bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground text-sm">Chats</h3>
          <button onClick={createNewChat} className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors" title="New Chat">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full h-8 pl-7 pr-2 rounded-lg bg-secondary dark:bg-accent text-xs text-foreground placeholder:text-muted-foreground outline-none border-none"
          />
        </div>

        <button onClick={createNewChat}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 transition-colors flex items-center gap-2 mb-2">
          <MessageSquare className="w-3.5 h-3.5" /> New Chat
        </button>

        <div className="border-t border-border my-2" />

        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Recent</p>
        <div className="space-y-1 flex-1 overflow-y-auto">
          {filteredConvos.map(convo => (
            <button
              key={convo.id}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                activeConversation === convo.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary dark:hover:bg-accent hover:text-foreground"
              )}
              onClick={() => switchConversation(convo.id)}
            >
              <p className="truncate">{convo.title}</p>
              <p className="text-[10px] mt-0.5 opacity-60">{convo.time}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
