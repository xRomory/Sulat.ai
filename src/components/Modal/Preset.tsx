import React, { useState, useEffect } from "react";
import type { TonePreset, ToneSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, Plus, Pencil } from "lucide-react";

const MAX_PRESETS = 5;

export const Preset = () => {
  const [presets, setPresets] = useState<TonePreset[]>([]);
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [editPreset, setEditPreset] = useState<TonePreset | null>(null);
  const [presetToDelete, setPresetToDelete] = useState<TonePreset | null>(null);
  const [showNewPresetDialog, setShowNewPresetDialog] = useState<boolean>(false);

  useEffect(() => {
    // Logic for saving presets
  }, []);

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

  const updatePreset = () => {
    //Logic for editing preset
  };

  const startEditPreset = (preset: TonePreset) => {
    setEditPreset(preset);
    setNewPresetName(preset.name);
  };

  const confirmDeletePreset = (preset: TonePreset) => {
    setPresetToDelete(preset);
  };

  const deletePreset = () => {
    if (!presetToDelete) return;

    const filteredPresets = presets.filter(
      (preset) => preset.id !== presetToDelete.id
    );
    setPresets(filteredPresets);
    setPresetToDelete(null);
  };

  const applyPreset = (preset: TonePreset) => {
    //Logic for applying preset
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-secondary-foreground">
          Saved Presets
        </h3>
        {/* {presets.length < MAX_PRESETS && (
          <Button
            size="sm"
            variant="outline"
            onClick={saveAsPreset}
            className="flex items-center gap-1 bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800"
          >
            <Plus className="h-3 w-3" /> Save Current
          </Button>
        )} */}
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
                    <div className="font-medium">{preset.name}</div>
                    <div className="text-xs text-foreground">
                      {/* messageType, and other settings */}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => applyPreset(preset)}
                    >
                      Apply
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
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
                                  : preset.name
                              }
                              onChange={(e) => setNewPresetName(e.target.value)}
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
                      onClick={() => confirmDeletePreset(preset)}
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
  );
};
