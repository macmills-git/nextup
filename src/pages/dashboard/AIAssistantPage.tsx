import { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Lightbulb, TrendingUp, Calendar, DollarSign, Search, Paperclip, AtSign, ArrowUp, Plus, MessageSquare, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const suggestions = [
  { icon: Calendar, text: "Help me plan a corporate event for 200 guests" },
  { icon: DollarSign, text: "Optimize my budget for the upcoming gala" },
  { icon: TrendingUp, text: "Analyze vendor performance this quarter" },
  { icon: Lightbulb, text: "Suggest creative themes for a product launch" },
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}
interface Conversation {
  id: string;
  title: string;
  updated_at: string;
}

const AIAssistantPage = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load conversations
  useEffect(() => {
    if (!user) return;
    supabase
      .from("ai_conversations")
      .select("id, title, updated_at")
      .order("updated_at", { ascending: false })
      .then(({ data }) => setConversations(data ?? []));
  }, [user]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeId) { setMessages([]); return; }
    supabase
      .from("ai_messages")
      .select("id, role, content")
      .eq("conversation_id", activeId)
      .order("created_at")
      .then(({ data }) => {
        setMessages((data ?? []).map((m) => ({ id: m.id, role: m.role as "user" | "assistant", content: m.content })));
      });
  }, [activeId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, [activeId, sending]);

  const ensureConversation = useCallback(async (firstMessage: string): Promise<string | null> => {
    if (activeId) return activeId;
    if (!user) return null;
    const title = firstMessage.length > 60 ? firstMessage.slice(0, 60) + "…" : firstMessage;
    const { data, error } = await supabase
      .from("ai_conversations")
      .insert({ user_id: user.id, title })
      .select("id, title, updated_at")
      .single();
    if (error || !data) {
      toast.error(error?.message ?? "Failed to start conversation");
      return null;
    }
    setConversations((prev) => [data, ...prev]);
    setActiveId(data.id);
    return data.id;
  }, [activeId, user]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || sending || !user) return;

    setSending(true);
    setInput("");
    const conversationId = await ensureConversation(msg);
    if (!conversationId) { setSending(false); return; }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: msg };
    const asstId = crypto.randomUUID();
    setMessages((prev) => [...prev, userMsg, { id: asstId, role: "assistant", content: "", pending: true }]);

    // Persist user message
    await supabase.from("ai_messages").insert({
      conversation_id: conversationId,
      user_id: user.id,
      role: "user",
      content: msg,
    });

    // Build full history to send
    const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token;
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
        },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const err = await res.text();
        throw new Error(err || `${res.status}`);
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let assembled = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n");
        buf = parts.pop() ?? "";
        for (const line of parts) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            const delta = j.choices?.[0]?.delta?.content;
            if (delta) {
              assembled += delta;
              setMessages((prev) => prev.map((m) => m.id === asstId ? { ...m, content: assembled, pending: false } : m));
            }
          } catch { /* ignore */ }
        }
      }

      // Persist assistant response
      if (assembled) {
        await supabase.from("ai_messages").insert({
          conversation_id: conversationId,
          user_id: user.id,
          role: "assistant",
          content: assembled,
        });
        await supabase.from("ai_conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);
      }
    } catch (e) {
      const errMsg = e instanceof Error ? e.message : "AI request failed";
      toast.error(errMsg);
      setMessages((prev) => prev.map((m) => m.id === asstId ? { ...m, content: `⚠️ ${errMsg}`, pending: false } : m));
    } finally {
      setSending(false);
    }
  };

  const newChat = () => {
    setActiveId(null);
    setMessages([]);
    setInput("");
  };

  const filtered = conversations.filter((c) => !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const isExpanded = activeId !== null || messages.length > 0;
  const hasInput = input.trim().length > 0;

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4">
      <div className="flex-1 flex flex-col">
        <div className={cn("flex flex-col transition-all duration-500 ease-in-out", isExpanded ? "flex-1" : "flex-1 justify-center items-center")}>
          {!isExpanded && (
            <>
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-full px-3 py-1 mb-6 bg-secondary self-center">
                <TrendingUp className="w-3.5 h-3.5" /> AI-powered event planning assistant
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3 text-center">Plan your perfect event</h1>
              <p className="text-muted-foreground mb-2 text-center">Generate complete event plans in seconds.</p>
            </>
          )}

          {isExpanded && (
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-foreground">Nested AI</h2>
            </div>
          )}

          {isExpanded && (
            <div className="w-full flex-1 mb-3 bg-card rounded-xl border border-border overflow-hidden flex flex-col" style={{ minHeight: "250px" }}>
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                    {m.role === "assistant" && (
                      <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center mr-3 shrink-0 mt-1">
                        <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-secondary text-foreground rounded-bl-md"
                    )}>
                      {m.pending && !m.content ? (
                        <span className="inline-flex items-center gap-2 text-muted-foreground"><Loader2 className="w-3 h-3 animate-spin" /> Thinking…</span>
                      ) : m.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-2 prose-headings:my-2 prose-ul:my-2">
                          <ReactMarkdown>{m.content}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="whitespace-pre-wrap">{m.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          <div className={cn(
            "w-full bg-card border border-border rounded-2xl shadow-sm p-4 flex flex-col transition-all",
            isExpanded ? "max-w-full min-h-[80px]" : "max-w-3xl mt-6 min-h-[140px] self-center"
          )}>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Describe your event or ask anything…"
              disabled={sending}
              className={cn(
                "flex-1 bg-transparent resize-none outline-none text-foreground placeholder:text-muted-foreground text-sm",
                isExpanded ? "min-h-[30px]" : "min-h-[60px]"
              )}
            />
            <div className="flex justify-between items-center mt-auto pt-2">
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
                  <Sparkles className="w-3.5 h-3.5" /> Nested AI
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground"><AtSign className="w-4 h-4" /></button>
                <button className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground"><Paperclip className="w-4 h-4" /></button>
                <button
                  onClick={() => send()}
                  disabled={!hasInput || sending}
                  className={cn("w-8 h-8 rounded-full flex items-center justify-center transition-all",
                    hasInput && !sending ? "bg-primary text-primary-foreground shadow-md scale-110" : "bg-secondary border border-border text-muted-foreground")}
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowUp className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {!isExpanded && (
            <div className="w-full max-w-3xl mt-6 grid grid-cols-2 gap-2 self-center">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => send(s.text)}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border text-left hover:bg-secondary text-sm text-foreground bg-card">
                  <s.icon className="h-4 w-4 text-primary shrink-0" />
                  {s.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-56 hidden lg:flex flex-col bg-card rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground text-sm">Chats</h3>
          <button onClick={newChat} className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20" title="New chat">
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search chats…"
            className="w-full h-8 pl-7 pr-2 rounded-lg bg-secondary text-xs text-foreground outline-none border-none" />
        </div>

        <button onClick={newChat}
          className="w-full text-left px-3 py-2 rounded-lg text-sm text-primary font-medium hover:bg-primary/5 flex items-center gap-2 mb-2">
          <MessageSquare className="w-3.5 h-3.5" /> New chat
        </button>

        <div className="border-t border-border my-2" />
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Recent</p>
        <div className="space-y-1 flex-1 overflow-y-auto">
          {filtered.map((c) => (
            <button key={c.id}
              className={cn("w-full text-left px-3 py-2 rounded-lg text-xs transition-colors",
                activeId === c.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground")}
              onClick={() => setActiveId(c.id)}>
              <p className="truncate">{c.title}</p>
              <p className="text-[10px] mt-0.5 opacity-60">{new Date(c.updated_at).toLocaleDateString()}</p>
            </button>
          ))}
          {!filtered.length && <p className="text-xs text-muted-foreground px-3 py-2">No conversations yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default AIAssistantPage;
