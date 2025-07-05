import React, { useState } from "react";
import LoadingSpinner from "../utils/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import { LetterInput } from "./LetterInput";
import { MagicalBasket } from "./MagicalBasket";
import { MagicalEnvelope } from "./MagicalEnvelope";
import { Button } from "../ui/button";
import { composeMessage } from "@/services/api";
import type { ToneSettings } from "@/types";

export const LetterAnimation: React.FC = () => {
  const [letterContent, setLetterContent] = useState<string>("");
  const [appState, setAppState] = useState<"input" | "basket" | "envelope">(
    "input"
  );
  const [loading, setLoading] = useState(false);

  const handleLetterSubmit = async (prompt: string, settings: ToneSettings) => {
    setLoading(true);

    const request = {
      contentIdea: prompt,
      messageType: settings.messageType,
      toneStyles: settings.toneStyles,
      occasion: settings.occasion,
      messageLength: settings.messageLength,
      language: settings.language,
      enhancements: settings.enhancements,
    };

    try {
      const generated = await composeMessage(request);
      setLetterContent(generated);
      setLoading(false);
      setAppState("basket");
    } catch (error) {
      setLoading(false);
      console.error("Error generating message:", error);
    }
  };

  const handleBasketTap = () => setAppState("envelope");

  const handleReset = () => {
    setLetterContent("");
    setAppState("input");
  };

  return (
    <motion.div
      className="flex flex-col justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {appState === "input" && !loading && (
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

        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center min-h-[300px]"
          >
            <LoadingSpinner />
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

      <motion.footer
        className="mt-auto p-6 text-center md:text-sm text-xs text-secondary-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Create your own magical letter and share it with someone
      </motion.footer>
    </motion.div>
  );
};
