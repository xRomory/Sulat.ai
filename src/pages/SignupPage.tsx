import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SignupHeader } from '@/components/SignupComponents/SignupHeader'
import { SignupForm } from '@/components/SignupComponents/SignupForm'
import { ArrowLeftIcon } from "lucide-react";
import { FloatingHearts } from '@/components/utils/utils'

const SignupPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {FloatingHearts}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4 z-10"
      >
        <SignupHeader />
        <Link
          to="/home"
          className="flex items-center text-sm text-secondary hover:text-secondary/70 py-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Home Page
        </Link>
        <SignupForm />
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
  )
}

export default SignupPage