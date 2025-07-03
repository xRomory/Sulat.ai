import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LetterInput } from "./LetterInput";
import { MagicalBasket } from "./MagicalBasket";
import { MagicalEnvelope } from "./MagicalEnvelope";
import { Button } from "../ui/button";

export const LetterAnimation: React.FC = () => {
  const [letterContent, setLetterContent] = useState<string>("");
  const [appState, setAppState] = useState<"input" | "basket" | "envelope">(
    "input"
  );

  const handleLetterSubmit = (text: string) => {
    setLetterContent(text);
    setAppState("basket");
  };

  const handleBasketTap = () => setAppState("envelope");

  const handleReset = () => {
    setLetterContent("");
    setAppState("input");
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {appState === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <motion.h1
              className="font-dm-serif-display text-6xl md:text-8xl mb-2 text-center"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
            >
              Sulat.ai
            </motion.h1>
            <LetterInput onSubmit={handleLetterSubmit} />
          </motion.div>
        )}

        {appState === "basket" && (
          <motion.div
            key="basket"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <MagicalBasket
              letterContent={letterContent}
              onBasketTap={handleBasketTap}
            />
          </motion.div>
        )}

        {appState === "envelope" && (
          <motion.div key="envelope">
            <motion.div
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <MagicalEnvelope letterContent={letterContent} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <Button 
                onClick={handleReset} 
                variant="outline" 
                className="bg-white/80 hover:bg-white border-pink-200 text-accent hover:text-accent/80 hover:border-accent/80"
              >
                Write Another Letter
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
