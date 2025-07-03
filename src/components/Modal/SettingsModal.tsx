import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
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

import type { ToneSettings } from "@/types";

interface ToneSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: ToneSettings;
  onSettingsChange: (settings: ToneSettings) => void;
}

export const SettingsModal: React.FC<ToneSettingsModalProps> = ({ open, onOpenChange, settings, onSettingsChange }) => {
  const handleMessageTypeChange = (value: string) => onSettingsChange({ ...settings, messageType: value });

  const handleToneStyleToggle = (value: string) => {
    const currentTones = [...settings.toneStyles];
    if(currentTones.includes(value)) {
      onSettingsChange({
        ...settings,
        toneStyles: currentTones.filter((tone) => tone !== value),
      });
    } else {
      onSettingsChange({
        ...settings,
        toneStyles: [...currentTones, value],
      });
    }
  };

  const handleMessageLengthChange = (value: string) => onSettingsChange({ ...settings, messageLength: value });

  const handleLanguageChange = (value: string) => onSettingsChange({ ...settings, language: value });

  const handleEnhancementToggle = (value: string) => {
    const currentEnhancements = [...settings.enhancements];

    if(currentEnhancements.includes(value)) {
      onSettingsChange({
        ...settings,
        enhancements: currentEnhancements.filter((enhance) => enhance !== value),
      });
    } else {
      onSettingsChange({
        ...settings,
        enhancements: [...currentEnhancements, value],
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs max-h-9/12 md:max-w-md p-0 overflow-auto bg-light-modal border-0 rounded-lg">
        <div className="p-6 space-y-6">
          <DialogHeader className="p-0 space-y-0.5">
            <div className="flex justify-center items-center">
              <DialogTitle className="">Tone Settings</DialogTitle>
              <DialogClose className="h-6 w-6 rounded-full hover:bg-primary-hover inline-flex items-center justify-center"></DialogClose>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Message Type */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">Message Type</Label>
              <RadioGroup 
                value={settings.messageType}
                onValueChange={handleMessageTypeChange}
                className="grid grid-cols-2 gap-2 pt-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-good" value="good-morning" />
                  <Label htmlFor="message-good" className="text-sm font-normal">
                    Good morning / Good Evening
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-comfort" value="comfort" />
                  <Label htmlFor="comfort" className="text-sm font-normal">
                    Comfort / Support
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-appreciation" value="appreciation" />
                  <Label htmlFor="message-appreciation" className="text-sm font-normal">
                    Appreciation
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-apology" value="apology" />
                  <Label htmlFor="message-apology" className="text-sm font-normal">
                    Apology
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-encouragement" value="encouragement" />
                  <Label htmlFor="message-encouragement" className="text-sm font-normal">
                    Encouragement
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-thinking" value="thinking-of-you" />
                  <Label htmlFor="message-thinking" className="text-sm font-normal">
                    Just Thinking of You
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-romantic" value="romantic" />
                  <Label htmlFor="message-romantic" className="text-sm font-normal">
                    Sweet Note / Romantic
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="message-special" value="special-occasions" />
                  <Label htmlFor="message-special" className="text-sm font-normal">
                    Special Occasions
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Tone */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">Tone (Style of Voice)</Label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-casual" 
                    checked={settings.toneStyles.includes("casual")}
                    onCheckedChange={() => handleToneStyleToggle("casual")}
                  />
                  <Label htmlFor="tone-casual" className="text-sm font-normal">Casual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-sincere" 
                    checked={settings.toneStyles.includes("sincere")}
                    onCheckedChange={() => handleToneStyleToggle("sincere")}
                  />
                  <Label htmlFor="tone-sincere" className="text-sm font-normal">Sincere</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-romantic" 
                    checked={settings.toneStyles.includes("romantic")}
                    onCheckedChange={() => handleToneStyleToggle("romantic")}
                  />
                  <Label htmlFor="tone-romantic" className="text-sm font-normal">Romantic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-poetic" 
                    checked={settings.toneStyles.includes("poetic")}
                    onCheckedChange={() => handleToneStyleToggle("poetic")}
                  />
                  <Label htmlFor="tone-poetic" className="text-sm font-normal">Poetic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-playful" 
                    checked={settings.toneStyles.includes("playful")}
                    onCheckedChange={() => handleToneStyleToggle("playful")}
                  />
                  <Label htmlFor="tone-playful" className="text-sm font-normal">Playful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-warm" 
                    checked={settings.toneStyles.includes("warm")}
                    onCheckedChange={() => handleToneStyleToggle("warm")}
                  />
                  <Label htmlFor="tone-warm" className="text-sm font-normal">Warm and Gentle</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-thoughtful" 
                    checked={settings.toneStyles.includes("thoughtful")}
                    onCheckedChange={() => handleToneStyleToggle("thoughtful")}
                  />
                  <Label htmlFor="tone-thoughtful" className="text-sm font-normal">Thoughtful</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-witty" 
                    checked={settings.toneStyles.includes("witty")}
                    onCheckedChange={() => handleToneStyleToggle("witty")}
                  />
                  <Label htmlFor="tone-witty" className="text-sm font-normal">Witty / Clever</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-humble" 
                    checked={settings.toneStyles.includes("humble")}
                    onCheckedChange={() => handleToneStyleToggle("humble")}
                  />
                  <Label htmlFor="tone-humble" className="text-sm font-normal">Humble</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="tone-professional" 
                    checked={settings.toneStyles.includes("professional")}
                    onCheckedChange={() => handleToneStyleToggle("professional")}
                  />
                  <Label htmlFor="tone-professional" className="text-sm font-normal">Professional</Label>
                </div>
              </div>
            </div>
            
            {/* Message Length */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">Message Length</Label>
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
                    <SelectItem value="medium">Medium (3-5 sentences)</SelectItem>
                    <SelectItem value="long">Long (6+ sentences)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <Label className="text-secondary-foreground font-medium">Language</Label>
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
              <Label className="text-secondary-foreground font-medium">Optional Enhancements</Label>
              <div className="space-y-2 pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enhance-quote"
                    checked={settings.enhancements.includes("quote")}
                    onCheckedChange={() => handleEnhancementToggle("quote")}
                  />
                  <Label htmlFor="enhance-quote" className="font-normal">Add a quote</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enhance-poetic"
                    checked={settings.enhancements.includes("quote")}
                    onCheckedChange={() => handleEnhancementToggle("quote")}
                  />
                  <Label htmlFor="enhance-poetic" className="font-normal">Add a poetic line</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enhance-name"
                    checked={settings.enhancements.includes("quote")}
                    onCheckedChange={() => handleEnhancementToggle("quote")}
                  />
                  <Label htmlFor="enhance-name" className="font-normal">Include the recipient's name</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}