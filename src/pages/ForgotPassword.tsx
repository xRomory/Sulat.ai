import React from "react";
import { motion } from "framer-motion";
import { ForgotPasswordForm } from "@/components/ForgotPassword/ForgotPasswordForm";
import { ForgotPasswordHeader } from "@/components/ForgotPassword/ForgotPasswordHeader";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <ForgotPasswordHeader />
        <ForgotPasswordForm />
      </motion.div>
      <motion.div
        className="text-center mt-8 text-sm text-secondary-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Sulat.ai. All rights reserved.
      </motion.div>
    </div>
  );
}
