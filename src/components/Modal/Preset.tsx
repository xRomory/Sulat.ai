import React, { useState, useEffect } from "react";
import type { TonePreset, ToneSettings } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Save, Trash2, Plus } from "lucide-react";


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
    if(presets.length >= MAX_PRESETS) {
      alert(`You can only save up to ${MAX_PRESETS} presets. Please delete one before adding more.`);
      return;
    }

    setNewPresetName("");
    setShowNewPresetDialog(true);
  }

  const createNewPreset = () => {
    //Logic For Creating New Preset
  }

  const updatePreset = () => {
    //Logic for editing preset 
  }

  const startEditPreset = (preset: TonePreset) => {
    setEditPreset(preset);
    setNewPresetName(preset.name);
  }

  const confirmDeletePreset = (preset: TonePreset) => {
    setPresetToDelete(preset);
  }

  const deletePreset = () => {
    if(!presetToDelete) return;

    const filteredPresets = presets.filter(preset => preset.id !== presetToDelete.id);
    setPresets(filteredPresets);
    setPresetToDelete(null);
  }

  const applyPreset = () => {
    //Logic for applying preset
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-secondary-foreground">
          Saved Presets
        </h3>
        {presets.length < MAX_PRESETS && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={saveAsPreset}
            className="flex items-center gap-1 bg-amber-100 border-amber-200 hover:bg-amber-200 text-amber-800"
          >
            <Plus className="h-3 w-3"/> Save Current
          </Button>
        )}
      </div>

      <ScrollArea className="h-52 rounded-md border p-4 bg-primary">
        {presets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-secondary-foreground py-8">
            <p>No presets saved</p>
            <Button 
              variant="ghost" 
              onClick={saveAsPreset}
              className="mt-2"
            >
              Create your first preset
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
