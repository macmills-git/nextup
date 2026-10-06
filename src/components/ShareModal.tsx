import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, Share2, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  url?: string;
  description?: string;
}

export const ShareModal: React.FC<Props> = ({ open, onOpenChange, title, url, description }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
        toast.success("Shared successfully!");
      } catch {
        // User cancelled share
      }
    } else {
      handleCopy();
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`Check out "${title}" on NextUp: ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-normal text-foreground">Share this listing</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Distribute link directly via WhatsApp or copy the public link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex gap-2">
            <Button
              onClick={handleWhatsAppShare}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 font-medium"
            >
              <MessageCircle className="w-4 h-4" /> Share on WhatsApp
            </Button>
            {typeof navigator !== "undefined" && navigator.share && (
              <Button onClick={handleNativeShare} variant="outline" className="rounded-xl gap-2 font-medium">
                <Share2 className="w-4 h-4" /> Share
              </Button>
            )}
          </div>

          <div className="relative flex items-center gap-2 pt-2">
            <Input readOnly value={shareUrl} className="rounded-xl text-xs bg-stone-50 border-stone-200 pr-20" />
            <Button
              onClick={handleCopy}
              size="sm"
              className="absolute right-1 rounded-lg text-xs gap-1 h-7 px-3 bg-stone-900 text-white hover:bg-stone-800"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
