import { motion } from "framer-motion";
import { LoginForm } from "@/components/LoginComponents/LoginForm";
import { LoginHeader } from "@/components/LoginComponents/LoginHeader";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <LoginHeader />
        <LoginForm />
      </motion.div>
      <motion.div
        className="text-center mt-8 text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Sulat.ai. All rights reserved.
      </motion.div>
    </div>
  );
};

export default LoginPage;
