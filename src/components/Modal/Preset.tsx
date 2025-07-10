import React, { useState } from "react";
import type { TonePreset } from "@/types";
import { presetApi } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, Pencil } from "lucide-react";

const MAX_PRESETS = 5;

interface PresetProps {
  presets: TonePreset[];
  setPresets: React.Dispatch<React.SetStateAction<TonePreset[]>>;
  applyPreset: (preset: TonePreset) => void;
  selectedPresetId: string | null;
  setSelectedPresetId: (id: string) => void;
  onDeleteRequest: (preset: TonePreset) => void;
}

export const Preset: React.FC<PresetProps> = ({ presets, setPresets, applyPreset, selectedPresetId, setSelectedPresetId, onDeleteRequest }) => {
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [editPreset, setEditPreset] = useState<TonePreset | null>(null);

  const saveAsPreset = () => {
    if (presets.length >= MAX_PRESETS) {
      alert(
        `You can only save up to ${MAX_PRESETS} presets. Please delete one before adding more.`
      );
      return;
    }

    setNewPresetName("");
  };

  const updatePreset = async () => {
    if(!editPreset || !newPresetName.trim()) return;

    try {
      const updated = await presetApi.updatePreset(editPreset.id, {
        preset_name: newPresetName,
      });

      setPresets((prev) => prev.map(p => 
        p.id === editPreset.id ? { ...p, preset_name: updated.preset_name } : p
      ));

      setEditPreset(null);
      setNewPresetName("");
    } catch (error) {
      console.error("Failed to update preset:", error);
    }
  };

  const startEditPreset = (preset: TonePreset) => {
    setEditPreset(preset);
    setNewPresetName(preset.preset_name);
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-secondary-foreground">
            Saved Presets
          </h3>
        </div>

        <ScrollArea className="h-52 rounded-md border p-4 bg-primary my-4">
          {presets.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-secondary-foreground py-8">
              <p>No presets saved</p>
              <Button variant="ghost" onClick={saveAsPreset} className="mt-2">
                Create your first preset
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {presets.map((preset) => (
                <Card key={preset.id}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{preset.preset_name}</div>
                      <div className="text-xs text-foreground">
                        {preset.message_type}, {preset.tone_styles.length} tone{preset.tone_styles.length !== 1 ? "s" : ""}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          applyPreset(preset)
                          setSelectedPresetId(preset.id)
                        }}
                      >
                        {selectedPresetId === preset.id ? "Applied" : "Apply"}
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                          >
                            <Pencil className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-4">
                            <h4 className="font-medium leading-none">
                              Rename Preset
                            </h4>
                            <div className="space-y-2">
                              <Input
                                value={
                                  editPreset?.id === preset.id
                                    ? newPresetName
                                    : preset.preset_name
                                }
                                onChange={(e) =>
                                  setNewPresetName(e.target.value)
                                }
                                placeholder="Preset name"
                                onClick={() => startEditPreset(preset)}
                              />
                              <div className="flex justify-end">
                                <Button
                                  size="sm"
                                  onClick={updatePreset}
                                  disabled={editPreset?.id !== preset.id}
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onDeleteRequest(preset)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="text-xs text-muted-foreground flex justify-center">
          You can save up to {MAX_PRESETS} presets. Currently saved:{" "}
          {presets.length}/{MAX_PRESETS}
        </div>
      </div>
      
    </>
  );
};