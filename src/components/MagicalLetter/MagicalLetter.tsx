import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MagicalLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div onClick={() => setIsOpen(true)} className="cursor-pointer relative">      
        <motion.div
          initial={{ rotateX: 0 }}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.8 }}
          className="w-40 h-28 bg-yellow-300 border-4 border-yellow-500 relative origin-bottom rounded-t shadow-lg"
        >
          <div className="absolute bottom-0 w-full h-1/2 bg-yellow-200 z-10"></div>
          <div className="absolute bottom-2 inset-0 flex justify-center items-center text-lg font-semibold text-yellow-800">
            {isOpen ? "" : "Click Me"}
          </div>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scaleY: 0 }}
              animate={{ opacity: 1, y: -40, scaleY: 1 }}
              exit={{ opacity: 0, y: 20, scaleY: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute left-1/2 top-full transform -translate-x-1/2 w-56 h-40 bg-white border border-gray-400 rounded shadow-md z-10 p-6 origin-top"
            >
              <p className="text-light-fg text-sm">
                Dear You,
                <br />
                <br />
                You are appreciated. You are seen. Keep going — you’re doing
                great! 🌟
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
