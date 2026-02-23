import { useState } from "react";
import { Sparkles, Send, Lightbulb, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const suggestions = [
  { icon: Calendar, text: "Help me plan a corporate event for 200 guests" },
  { icon: DollarSign, text: "Optimize my budget for the upcoming gala" },
  { icon: TrendingUp, text: "Analyze vendor performance this quarter" },
  { icon: Lightbulb, text: "Suggest creative themes for a product launch" },
];

type Message = { id: number; role: "user" | "assistant"; text: string };

const chatHistory: Message[] = [
  { id: 1, role: "assistant", text: "Hello! I'm your AI event planning assistant. I can help you with event planning, vendor selection, budget optimization, and more. What would you like help with today?" },
];

const AIAssistantPage = () => {
  const [messages, setMessages] = useState(chatHistory);
  const [input, setInput] = useState("");

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: "user" as const, text: msg },
      { id: Date.now() + 1, role: "assistant" as const, text: "I'm analyzing your request. This is a demo — in the full version, I'd provide detailed recommendations based on your event data, vendor history, and budget constraints." },
    ]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
        </div>
        <p className="text-sm text-muted-foreground">Your intelligent event planning companion</p>
      </div>

      {/* Chat */}
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

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-6 pb-4">
            <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(s.text)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border text-left hover:bg-secondary transition-colors text-sm text-foreground"
                >
                  <s.icon className="h-4 w-4 text-primary shrink-0" />
                  {s.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Ask me anything about event planning..."
              className="flex-1"
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
    </div>
  );
};

export default AIAssistantPage;
