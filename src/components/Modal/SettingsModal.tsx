import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { ToneSettings, Tone, Occasion, MessageType, Enhancement } from "@/types";

interface ToneSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: ToneSettings;
  onSettingsChange: (settings: ToneSettings) => void;
}

export const SettingsModal: React.FC<ToneSettingsModalProps> = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}) => {
  const handleMessageTypeChange = (value: string) =>
    onSettingsChange({ ...settings, messageType: value as MessageType });

  const handleToneStyleToggle = (value: string) => {
    const currentTones = [...settings.toneStyles];
    if (currentTones.includes(value as Tone)) {
      onSettingsChange({
        ...settings,
        toneStyles: currentTones.filter((tone) => tone !== (value as Tone)),
      });
    } else {
      onSettingsChange({
        ...settings,
        toneStyles: [...currentTones, value as Tone],
      });
    }
  };

  const handleOccasionChange = (value: string) =>
    onSettingsChange({ ...settings, occasion: value as Occasion });

  const handleMessageLengthChange = (value: string) =>
    onSettingsChange({ ...settings, messageLength: value as "short" | "medium" | "long" });

  const handleLanguageChange = (value: string) =>
    onSettingsChange({ ...settings, language: value as "english" | "filipino" | "taglish" });

  const handleEnhancementToggle = (value: string) => {
    const currentEnhancements = [...settings.enhancements];

    if (currentEnhancements.includes(value as Enhancement)) {
      onSettingsChange({
        ...settings,
        enhancements: currentEnhancements.filter(
          (enhance) => enhance !== (value as Enhancement)
        ),
      });
    } else {
      onSettingsChange({
        ...settings,
        enhancements: [...currentEnhancements, value as Enhancement],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs max-h-9/12 md:max-h-max md:max-w-md p-0 overflow-auto bg-light-modal border-0 rounded-lg no-scrollbar">
        <div className="p-6 space-y-6">
          <DialogHeader className="p-0 space-y-0.5">
            <div className="flex justify-center items-center">
              <DialogTitle>Tone Settings</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Message Type */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Message Type
              </Label>
              <RadioGroup
                value={settings.messageType}
                onValueChange={handleMessageTypeChange}
                className="grid grid-cols-2 gap-2 pt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-morning" value="good-morning" />
                  <Label
                    htmlFor="message-morning"
                    className="text-sm font-normal"
                  >
                    Good morning
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-evening" value="good-evening" />
                  <Label
                    htmlFor="message-evening"
                    className="text-sm font-normal"
                  >
                    Good Evening
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-comfort" value="comfort" />
                  <Label htmlFor="comfort" className="text-sm font-normal">
                    Comfort / Support
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id="message-appreciation"
                    value="appreciation"
                  />
                  <Label
                    htmlFor="message-appreciation"
                    className="text-sm font-normal"
                  >
                    Appreciation
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-apology" value="apology" />
                  <Label
                    htmlFor="message-apology"
                    className="text-sm font-normal"
                  >
                    Apology
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id="message-encouragement"
                    value="encouragement"
                  />
                  <Label
                    htmlFor="message-encouragement"
                    className="text-sm font-normal"
                  >
                    Encouragement
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-romantic" value="romantic" />
                  <Label
                    htmlFor="message-romantic"
                    className="text-sm font-normal"
                  >
                    Sweet Note
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    id="message-professional"
                    value="professional"
                  />
                  <Label
                    htmlFor="message-professional"
                    className="text-sm font-normal"
                  >
                    Professional
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Tone */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Tone (Style of Voice)
              </Label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-casual"
                    checked={settings.toneStyles.includes("casual")}
                    onCheckedChange={() => handleToneStyleToggle("casual")}
                  />
                  <Label htmlFor="tone-casual" className="text-sm font-normal">
                    Casual
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-sincere"
                    checked={settings.toneStyles.includes("sincere")}
                    onCheckedChange={() => handleToneStyleToggle("sincere")}
                  />
                  <Label htmlFor="tone-sincere" className="text-sm font-normal">
                    Sincere
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-romantic"
                    checked={settings.toneStyles.includes("romantic")}
                    onCheckedChange={() => handleToneStyleToggle("romantic")}
                  />
                  <Label
                    htmlFor="tone-romantic"
                    className="text-sm font-normal"
                  >
                    Romantic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-poetic"
                    checked={settings.toneStyles.includes("poetic")}
                    onCheckedChange={() => handleToneStyleToggle("poetic")}
                  />
                  <Label htmlFor="tone-poetic" className="text-sm font-normal">
                    Poetic
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-playful"
                    checked={settings.toneStyles.includes("playful")}
                    onCheckedChange={() => handleToneStyleToggle("playful")}
                  />
                  <Label htmlFor="tone-playful" className="text-sm font-normal">
                    Playful
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-warm"
                    checked={settings.toneStyles.includes("warm and gentle")}
                    onCheckedChange={() => handleToneStyleToggle("warm and gentle")}
                  />
                  <Label htmlFor="tone-warm" className="text-sm font-normal">
                    Warm and Gentle
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-thoughtful"
                    checked={settings.toneStyles.includes("thoughtful")}
                    onCheckedChange={() => handleToneStyleToggle("thoughtful")}
                  />
                  <Label
                    htmlFor="tone-thoughtful"
                    className="text-sm font-normal"
                  >
                    Thoughtful
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-witty"
                    checked={settings.toneStyles.includes("witty")}
                    onCheckedChange={() => handleToneStyleToggle("witty")}
                  />
                  <Label htmlFor="tone-witty" className="text-sm font-normal">
                    Witty / Clever
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-humble"
                    checked={settings.toneStyles.includes("humble")}
                    onCheckedChange={() => handleToneStyleToggle("humble")}
                  />
                  <Label htmlFor="tone-humble" className="text-sm font-normal">
                    Humble
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="tone-professional"
                    checked={settings.toneStyles.includes("formal")}
                    onCheckedChange={() =>
                      handleToneStyleToggle("formal")
                    }
                  />
                  <Label
                    htmlFor="tone-professional"
                    className="text-sm font-normal"
                  >
                    Professional
                  </Label>
                </div>
              </div>
            </div>

            {/* Ocaasions */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Occasion
              </Label>
              <div className="pt-1">
                <Select
                  value={settings.occasion}
                  onValueChange={handleOccasionChange}
                >
                  <SelectTrigger className="w-full bg-amber-100/80 border-amber-200">
                    <SelectValue placeholder="Select Occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Normal Days</SelectItem>
                    <SelectItem value="birthday">Birthday</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="valentine's day">Valentine's Day</SelectItem>
                    <SelectItem value="new year">New Year</SelectItem>
                    <SelectItem value="christmas">Christmas</SelectItem>
                    <SelectItem value="mother's day">Mother's Day</SelectItem>
                    <SelectItem value="father's day">Father's Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message Length */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Message Length
              </Label>
              <div className="pt-1">
                <Select
                  value={settings.messageLength}
                  onValueChange={handleMessageLengthChange}
                >
                  <SelectTrigger className="w-full bg-amber-100/80 border-amber-200">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short (1-2 sentences)</SelectItem>
                    <SelectItem value="medium">
                      Medium (3-5 sentences)
                    </SelectItem>
                    <SelectItem value="long">Long (6+ sentences)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Language
              </Label>
              <div className="pt-1">
                <Select
                  value={settings.language}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="w-full bg-amber-100/80 border-amber-200">
                    <SelectValue placeholder="Select length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="filipino">Filipino</SelectItem>
                    <SelectItem value="taglish">Taglish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">
                Optional Enhancements
              </Label>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enhance-quote"
                    checked={settings.enhancements.includes("include quote")}
                    onCheckedChange={() =>
                      handleEnhancementToggle("include quote")
                    }
                  />
                  <Label htmlFor="enhance-quote" className="font-normal">
                    Include quote
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enhance-poetic"
                    checked={settings.enhancements.includes("make it poetic")}
                    onCheckedChange={() =>
                      handleEnhancementToggle("make it poetic")
                    }
                  />
                  <Label htmlFor="enhance-poetic" className="font-normal">
                    Make it poetic
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enhance-humor"
                    checked={settings.enhancements.includes("add humor")}
                    onCheckedChange={() => handleEnhancementToggle("add humor")}
                  />
                  <Label htmlFor="enhance-poetic" className="font-normal">
                    Add humor
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="enhance-heartfelt"
                    checked={settings.enhancements.includes(
                      "make it heartfelt"
                    )}
                    onCheckedChange={() =>
                      handleEnhancementToggle("make it heartfelt")
                    }
                  />
                  <Label htmlFor="enhance-poetic" className="font-normal">
                    Make it heartfelt
                  </Label>
                </div>

              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};