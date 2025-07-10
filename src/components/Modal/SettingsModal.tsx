import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToneSetting } from "./ToneSetting";
import { Preset } from "./Preset";
import type { ToneSettings, TonePreset } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Save } from "lucide-react";

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

const MAX_PRESETS = 5;

export const SettingsModal: React.FC<ToneSettingsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tone-setting");
  const [settings, setSettings] = useState<ToneSettings>(defaultSettings);
  const [presets, setPresets] = useState<TonePreset[]>([]);
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [showNewPresetDialog, setShowNewPresetDialog] = useState<boolean>(false);

  const createNewPreset = () => {
    //Logic For Creating New Preset
  };

  const saveAsPreset = () => {
    if (presets.length >= MAX_PRESETS) {
      alert(
        `You can only save up to ${MAX_PRESETS} presets. Please delete one before adding more.`
      );
      return;
    }

    setNewPresetName("");
    setShowNewPresetDialog(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-xs max-h-9/12 md:max-h-max md:max-w-md p-0 overflow-auto bg-light-modal border-0 rounded-lg no-scrollbar">
          <div className="p-6 space-y-6">
            <DialogHeader className="p-0 space-y-0.5">
              <div className="flex justify-center items-center">
                <DialogTitle>Tone Settings</DialogTitle>
              </div>
            </DialogHeader>
            {user ? (
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
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={saveAsPreset}
                      className="bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800"
                    >
                      <Save className="h-3 w-3" /> Save Preset
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="presets" className="mt-2">
                <div className="space-y-4">
                  <Preset />
                </div>
              </TabsContent>
            </Tabs>
            ) : (
              <ToneSetting settings={settings} onSettingsChange={setSettings} />
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showNewPresetDialog} onOpenChange={setShowNewPresetDialog}>
        <DialogContent className="sm:max-w-[400px] bg-light-modal border-0">
          <DialogHeader>
            <DialogTitle>Save Tone Preset</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="preset-name" className="text-right mb-3">Preset Name</Label>
            <Input 
              id="preset-name"
              value={newPresetName}
              onChange={(e) => setNewPresetName(e.target.value)}
              className="col-span-3"
              placeholder="My Favorite Tone"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-destructive hover:bg-red-500 border-0 text-white" onClick={() => setShowNewPresetDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800" onClick={createNewPreset} disabled={!newPresetName.trim()}>
              Save Preset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
