import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SettingsModal } from "@/components/Modal/SettingsModal";
import type { ToneSettings } from "@/types";

export interface LetterInputProps {
  onSubmit: (prompt: string, settings: ToneSettings) => void;
  onToneSettingsChange?: (settings: ToneSettings) => void;
  initialToneSettings?: ToneSettings;
}

export const LetterInput: React.FC<LetterInputProps> = ({
  onSubmit,
  onToneSettingsChange,
  initialToneSettings,
}) => {
  const [letter, setLetter] = useState("");
  const [toneSettingsOpen, setToneSettingsOpen] = useState(false);
  const [toneSettings, setToneSettings] = useState<ToneSettings>(
    initialToneSettings || {
      messageType: "good-morning",
      toneStyles: [],
      occasion: "none",
      messageLength: "short",
      language: "english",
      enhancements: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (letter.trim()) onSubmit(letter, toneSettings);
  };

  const handleToneSettingsChange = (newSettings: ToneSettings) => {
    setToneSettings(newSettings);
    if (onToneSettingsChange) onToneSettingsChange(newSettings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xs min-w-xs sm:min-w-xl md:min-w-2xl lg:min-w-4xl mx-auto pb-2 md:pb-4 bg-message-input rounded-xl shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
        <Textarea
          placeholder="What do want to write today?"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          className="w-full border-none p-4 text-sm md:text-lg focus-visible:ring-0 max-h-36 md:min-h-[80px] md:p-6 overflow-y-auto no-scrollbar"
        />
        <div className="flex justify-between items-center px-4">
          <Button
            type="button"
            onClick={() => setToneSettingsOpen(true)}
            className="flex gap-2 bg-transparent shadow-none text-foreground hover:bg-primary-hover rounded-xl px-4 py-1 cursor-pointer"
            title="Adjust Tone Settings"
          >
            <Settings2 />
            <p className="text-xs md:text-sm">Adjust Settings</p>
          </Button>

          <Button
            type="submit"
            className="rounded-full w-7 h-7 md:w-10 md:h-10"
          >
            <SendHorizonal className="text-foreground" />
          </Button>
        </div>  
      </form>

      <SettingsModal
        open={toneSettingsOpen}
        onOpenChange={setToneSettingsOpen}
        settings={toneSettings}
        onSettingsChange={handleToneSettingsChange}
      />
    </motion.div>
  );
};
