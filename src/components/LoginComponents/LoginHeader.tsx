import { motion } from "framer-motion";
import { MailOpenIcon, HeartIcon } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      <motion.div
        className="inline-block"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          delay: 0.2,
        }}
      >
        <div className="relative">
          <MailOpenIcon className="h-12 w-12 text-secondary mb-2" />
          <HeartIcon className="h-6 w-6 text-red-500 absolute top-1 right-1 animate-pulse" />
        </div>
      </motion.div>
      <h1 className="text-3xl mt-2 font-dm-serif-display">
        Sulat.ai
      </h1>
      <p className="text-secondary-foreground mt-2">Sign in to send your magical letters</p>
    </div>
  );
};
