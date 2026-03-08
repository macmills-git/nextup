import { useState } from "react";
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video, Check, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Conversation = {
  id: number; name: string; avatar: string; lastMessage: string; time: string;
  unread: number; type: "chat" | "team" | "vendor";
};

const conversations: Conversation[] = [
  { id: 1, name: "Akolo Studio", avatar: "AS", lastMessage: "The photo previews are ready for review!", time: "2m ago", unread: 2, type: "vendor" },
  { id: 2, name: "Sarah Williams", avatar: "SW", lastMessage: "Can we reschedule the vendor meeting?", time: "15m ago", unread: 1, type: "chat" },
  { id: 3, name: "Bake It Right", avatar: "BR", lastMessage: "Menu samples confirmed for Thursday.", time: "1h ago", unread: 0, type: "vendor" },
  { id: 4, name: "Michael Chen", avatar: "MC", lastMessage: "Budget report has been uploaded.", time: "3h ago", unread: 0, type: "chat" },
  { id: 5, name: "Prime Audio", avatar: "PA", lastMessage: "Equipment list attached for the gala.", time: "Yesterday", unread: 0, type: "vendor" },
  { id: 6, name: "Gala Team", avatar: "GT", lastMessage: "Jane: Let's finalize the venue by Friday", time: "1h ago", unread: 3, type: "team" },
  { id: 7, name: "Launch Team", avatar: "LT", lastMessage: "Emily: Marketing materials ready", time: "4h ago", unread: 0, type: "team" },
];

type MessageStatus = "sent" | "delivered" | "seen";
type Message = { id: number; sender: string; text: string; time: string; own: boolean; status?: MessageStatus };

const messagesData: Record<number, Message[]> = {
  1: [
    { id: 1, sender: "Akolo Studio", text: "Hi! I've finished editing the photos from the last event.", time: "10:30 AM", own: false },
    { id: 2, sender: "You", text: "That's great! Can you share the preview gallery?", time: "10:32 AM", own: true, status: "seen" },
    { id: 3, sender: "Akolo Studio", text: "Sure! Here's the link to the gallery.", time: "10:35 AM", own: false },
    { id: 4, sender: "You", text: "These look amazing! Love the lighting.", time: "10:38 AM", own: true, status: "delivered" },
    { id: 5, sender: "Akolo Studio", text: "The photo previews are ready for review!", time: "10:40 AM", own: false },
  ],
  2: [
    { id: 1, sender: "Sarah Williams", text: "Hey, can we move the vendor meeting to Thursday?", time: "9:00 AM", own: false },
    { id: 2, sender: "You", text: "Sure, what time works for you?", time: "9:05 AM", own: true, status: "seen" },
    { id: 3, sender: "Sarah Williams", text: "Can we reschedule the vendor meeting?", time: "9:10 AM", own: false },
  ],
  6: [
    { id: 1, sender: "Jane Doe", text: "Team, we need to finalize the venue for the Gala", time: "2:00 PM", own: false },
    { id: 2, sender: "Michael Chen", text: "I've shortlisted 3 options.", time: "2:05 PM", own: false },
    { id: 3, sender: "You", text: "Let's go with Grand Ballroom.", time: "2:10 PM", own: true, status: "seen" },
    { id: 4, sender: "Jane Doe", text: "Let's finalize the venue by Friday", time: "2:15 PM", own: false },
  ],
};

const StatusIcon = ({ status }: { status?: MessageStatus }) => {
  if (!status) return null;
  if (status === "sent") return <Check className="h-3 w-3 text-muted-foreground" />;
  if (status === "delivered") return <CheckCheck className="h-3 w-3 text-muted-foreground" />;
  return <CheckCheck className="h-3 w-3 text-blue-400" />;
};

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "chat" | "team" | "vendor">("all");
  const [allMessages, setAllMessages] = useState(messagesData);

  const filteredConvos = conversations.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.type === filter;
    return matchSearch && matchFilter;
  });

  const activeConvo = conversations.find(c => c.id === activeChat);
  const currentMessages = allMessages[activeChat] || [];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = { id: Date.now(), sender: "You", text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), own: true, status: "sent" };
    setAllMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), msg] }));
    setNewMessage("");
    setTimeout(() => {
      setAllMessages(prev => ({ ...prev, [activeChat]: (prev[activeChat] || []).map(m => m.id === msg.id ? { ...m, status: "delivered" as MessageStatus } : m) }));
    }, 1000);
    setTimeout(() => {
      setAllMessages(prev => ({ ...prev, [activeChat]: (prev[activeChat] || []).map(m => m.id === msg.id ? { ...m, status: "seen" as MessageStatus } : m) }));
    }, 3000);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-card rounded-xl border border-border overflow-hidden">
      <div className="w-80 border-r border-border flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground text-sm mb-3">Messages</h2>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 h-8 text-xs" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-1">
            {(["all", "chat", "team", "vendor"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs capitalize flex-1 py-1.5 rounded-md font-medium transition-all ${filter === f ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted'}`}>
                {f === "all" ? "All" : f === "chat" ? "Chats" : f === "team" ? "Teams" : "Vendors"}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(convo => (
            <button key={convo.id} onClick={() => setActiveChat(convo.id)}
              className={cn("w-full flex items-start gap-3 p-3.5 text-left hover:bg-muted/50 transition-colors border-b border-border", activeChat === convo.id && "bg-muted/50")}>
              <div className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0">
                <span className="text-background text-xs font-semibold">{convo.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{convo.name}</span>
                  <span className="text-[10px] text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center shrink-0 font-semibold">{convo.unread}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
              <span className="text-background text-xs font-semibold">{activeConvo?.avatar}</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{activeConvo?.name}</h3>
              <p className="text-[10px] text-emerald-500">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted"><Phone className="h-4 w-4" /></button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted"><Video className="h-4 w-4" /></button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {currentMessages.map(msg => (
            <div key={msg.id} className={cn("flex", msg.own ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[70%] rounded-2xl px-4 py-2.5",
                msg.own ? "bg-foreground text-background rounded-br-md" : "bg-muted text-foreground rounded-bl-md")}>
                {!msg.own && activeConvo?.type === "team" && <p className="text-xs font-medium text-primary mb-1">{msg.sender}</p>}
                <p className="text-sm">{msg.text}</p>
                <div className={cn("flex items-center gap-1 mt-1", msg.own ? "justify-end" : "")}>
                  <p className={cn("text-[10px]", msg.own ? "text-background/60" : "text-muted-foreground")}>{msg.time}</p>
                  {msg.own && <StatusIcon status={msg.status} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-muted"><Paperclip className="h-4 w-4" /></button>
            <Input placeholder="Type a message..." className="flex-1 h-9 text-sm" value={newMessage} onChange={e => setNewMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} />
            <Button size="icon" className="bg-foreground text-background hover:bg-foreground/90 shrink-0 h-9 w-9" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
