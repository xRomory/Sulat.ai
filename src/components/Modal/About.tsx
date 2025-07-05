import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const About: React.FC<AboutModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-light-modal border-0 rounded-lg p-2 max-w-xs md:max-h-max">
        <div className="p-6 space-y-6">
          <DialogHeader>
            <div className="flex justify-center items-center">
              <DialogTitle>About Sulat.ai</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <p className="text-justify md:font-medium">
              Sulat.ai is a simple but meaningful AI-powered web application
              designed specifically for writing thoughtful, creative, and
              personal letters — not chatting. Unlike general-purpose AI
              assistants, Sulat.ai is focused solely oncomposing messages 
              and letters, with built-in settings to guide tone, language, and occasion.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
