import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ToneSetting } from "./ToneSetting";
import { Preset } from "./Preset";
import type { ToneSettings } from "@/types";

const defaultSettings: ToneSettings = {
  messageType: "good-morning",
  toneStyles: [],
  occasion: "none",
  messageLength: "short",
  language: "english",
  enhancements: [],
};

interface ToneSettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SettingsModal: React.FC<ToneSettingsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const [activeTab, setActiveTab] = useState("tone-setting");
  const [settings, setSettings] = useState<ToneSettings>(defaultSettings);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs max-h-9/12 md:max-h-max md:max-w-md p-0 overflow-auto bg-light-modal border-0 rounded-lg no-scrollbar">
        <div className="p-6 space-y-6">
          <DialogHeader className="p-0 space-y-0.5">
            <div className="flex justify-center items-center">
              <DialogTitle>Tone Settings</DialogTitle>
            </div>
          </DialogHeader>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tone-setting" className="text-xs">
                Tone Settings
              </TabsTrigger>
              <TabsTrigger value="presets" className="text-xs">
                Presets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tone-setting" className="mt-2">
              <div className="space-y-6">
                <ToneSetting
                  settings={settings}
                  onSettingsChange={setSettings}
                />
                <div className="space-y-3 flex justify-center">
                  <Button>Save Preset</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="presets" className="mt-2">
              <div className="space-y-4">
                <Preset />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
