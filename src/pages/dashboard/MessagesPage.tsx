import { useState } from "react";
import { Search, Send, Paperclip, MoreHorizontal, Phone, Video } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const conversations = [
  { id: 1, name: "Akolo Studio", avatar: "AS", lastMessage: "The photo previews are ready for review!", time: "2m ago", unread: 2 },
  { id: 2, name: "Sarah Williams", avatar: "SW", lastMessage: "Can we reschedule the vendor meeting?", time: "15m ago", unread: 1 },
  { id: 3, name: "Bake It Right", avatar: "BR", lastMessage: "Menu samples confirmed for Thursday.", time: "1h ago", unread: 0 },
  { id: 4, name: "Michael Chen", avatar: "MC", lastMessage: "Budget report has been uploaded.", time: "3h ago", unread: 0 },
  { id: 5, name: "Prime Audio", avatar: "PA", lastMessage: "Equipment list attached for the gala.", time: "Yesterday", unread: 0 },
];

const messages = [
  { id: 1, sender: "Akolo Studio", text: "Hi! I've finished editing the photos from the last event.", time: "10:30 AM", own: false },
  { id: 2, sender: "You", text: "That's great! Can you share the preview gallery?", time: "10:32 AM", own: true },
  { id: 3, sender: "Akolo Studio", text: "Sure! Here's the link to the gallery. Let me know if you'd like any changes.", time: "10:35 AM", own: false },
  { id: 4, sender: "You", text: "These look amazing! Love the lighting in the outdoor shots.", time: "10:38 AM", own: true },
  { id: 5, sender: "Akolo Studio", text: "The photo previews are ready for review!", time: "10:40 AM", own: false },
];

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConvos = conversations.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const activeConvo = conversations.find(c => c.id === activeChat);

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-card rounded-xl border border-border overflow-hidden shadow-card">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-foreground mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConvos.map(convo => (
            <button
              key={convo.id}
              onClick={() => setActiveChat(convo.id)}
              className={cn(
                "w-full flex items-start gap-3 p-4 text-left hover:bg-secondary/50 transition-colors border-b border-border",
                activeChat === convo.id && "bg-accent"
              )}
            >
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shrink-0">
                <span className="text-primary-foreground text-xs font-bold">{convo.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{convo.name}</span>
                  <span className="text-xs text-muted-foreground">{convo.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
              </div>
              {convo.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center shrink-0">
                  {convo.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-bold">{activeConvo?.avatar}</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">{activeConvo?.name}</h3>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary"><Phone className="h-4 w-4" /></button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary"><Video className="h-4 w-4" /></button>
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={cn("flex", msg.own ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2.5",
                msg.own
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              )}>
                <p className="text-sm">{msg.text}</p>
                <p className={cn("text-xs mt-1", msg.own ? "text-primary-foreground/70" : "text-muted-foreground")}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:bg-secondary"><Paperclip className="h-4 w-4" /></button>
            <Input
              placeholder="Type a message..."
              className="flex-1"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              onKeyDown={e => e.key === "Enter" && setNewMessage("")}
            />
            <Button size="icon" className="gradient-primary text-primary-foreground shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
