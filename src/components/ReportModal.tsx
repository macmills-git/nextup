import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import { useEventStore } from "@/contexts/EventStore";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetType: "event" | "vendor";
  targetId: string;
  targetTitle: string;
}

export const ReportModal: React.FC<Props> = ({ open, onOpenChange, targetType, targetId, targetTitle }) => {
  const { submitReport } = useEventStore();
  const [reason, setReason] = useState<string>("");
  const [details, setDetails] = useState<string>("");

  const eventReasons = [
    "Spam or misleading information",
    "Fake or non-existent event",
    "Inappropriate content or imagery",
    "Duplicate listing",
    "Copyright or trademark violation",
    "Other",
  ];

  const vendorReasons = [
    "Fake business or scam",
    "Inappropriate content or imagery",
    "Misleading services or pricing",
    "Spam listing",
    "Other",
  ];

  const reasons = targetType === "event" ? eventReasons : vendorReasons;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please select a reason for reporting");
      return;
    }

    submitReport({
      targetType,
      targetId,
      targetTitle,
      reason,
      details,
    });

    toast.success("Report submitted. Our moderation team will review it shortly.");
    setReason("");
    setDetails("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertTriangle className="w-5 h-5" />
            <DialogTitle className="text-lg font-normal text-foreground">
              Report {targetType === "event" ? "Event" : "Vendor"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground pt-1">
            Help us keep NextUp safe and accurate. Reporting "<span className="font-semibold text-foreground">{targetTitle}</span>".
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">Reason for report</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger className="rounded-xl text-xs bg-stone-50 border-stone-200">
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((r) => (
                  <SelectItem key={r} value={r} className="text-xs">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-foreground">Additional details (Optional)</Label>
            <Textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide any context that helps our admin team investigate..."
              rows={3}
              className="rounded-xl text-xs bg-stone-50 border-stone-200 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-xl text-xs">
              Cancel
            </Button>
            <Button type="submit" variant="destructive" className="rounded-xl text-xs font-semibold px-4">
              Submit Report
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
