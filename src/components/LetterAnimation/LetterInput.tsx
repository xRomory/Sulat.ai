import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { LetterInputProps } from "@/types";

export const LetterInput: React.FC<LetterInputProps> = ({ onSubmit }) => {
  const [letter, setLetter] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(letter.trim()) onSubmit(letter);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xs min-w-xs md:min-w-3xl mx-auto pb-2 md:pb-4 bg-message-input rounded-xl shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-2 md:space-y-4">
        <Textarea
          placeholder="What do want to write today?"
          value={letter}
          onChange={(e) => setLetter(e.target.value)}
          className="w-full border-none p-4 text-sm md:text-base focus-visible:ring-0 max-h-36 md:min-h-[80px] md:p-6 overflow-y-auto no-scrollbar"
        />
        <div className="flex justify-between items-center px-4">
          <Button
            className="flex gap-2 bg-transparent shadow-none text-foreground hover:bg-primary-hover rounded-xl px-4 py-1 cursor-pointer"
          >
            <Settings2 />
            <p className="text-xs md:text-sm">Adjust Settings</p>
          </Button>

          <Button 
            type="submit"
            className="rounded-full w-7 h-7 md:w-10 md:h-10"
          >
            <SendHorizonal className="text-foreground"/>
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
