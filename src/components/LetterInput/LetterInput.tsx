import React from "react";
import { motion } from "framer-motion";
import { SendHorizonal, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LetterInputProps {
  onSubmit: (text: string) => void;
}

export const LetterInput: React.FC<LetterInputProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md min-w-2xs md:min-w-2xl mx-auto pb-4 bg-message-input rounded-xl shadow-lg"
    >
      <form className="space-y-4">
        <Textarea
          placeholder="What do want to write today?"
          className="border-none focus-visible:ring-0 min-h-[80px] p-6 font-libre-franklin"
        />
        <div className="flex justify-between items-center px-4">
          <div className="flex gap-2 hover:bg-primary-hover rounded-xl">
            <Settings2 />
            <p className="font-franklin-libre">Adjust Settings</p>
          </div>
          <Button>
            <SendHorizonal className="text-foreground"/>
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
