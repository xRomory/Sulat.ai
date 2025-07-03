import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MagicalEnvelopeProps {
  letterContent: string;
}

export const MagicalEnvelope: React.FC<MagicalEnvelopeProps> = ({ letterContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const flapAnimation = {
    closed: { 
      rotateX: 0, 
      originY: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    },
    open: { 
      rotateX: -180, 
      originY: 0,
      transition: { duration: 0.5, ease: "easeOut" as const } 
    }
  };

  const letterAnimation = {
    hidden: { y: 0, opacity: 0 },
    visible: { 
      y: -120, 
      opacity: 1,
      transition: { 
        delay: 0.3,
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.div
      className="relative w-80 h-96 cursor-pointer"
      initial={{ y: 100, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onClick={() => !isOpen && setIsOpen(true)}
    >

      {/* Envelope body */}
      <motion.div 
        className="absolute inset-0"
        style={{ perspective: "1000px" }}
      >
        {/* Back of envelope */}
        <div className="absolute inset-0 bg-amber-100 rounded-lg shadow-lg border-2 border-amber-200" />
        
        {/* Envelope flap */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 origin-bottom z-20"
          variants={flapAnimation}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
        >
          <div className="absolute inset-0">
            <div className="w-full h-full bg-amber-100 border-2 border-amber-200 rounded-t-lg">
              <div className="absolute bottom-0 left-0 w-full h-full">
                <div className="w-full h-full overflow-hidden">
                  {/* Triangle shape for the flap */}
                  <div className="w-full h-full bg-amber-100 border-2 border-amber-200 transform rotate-45 origin-bottom-right translate-y-[70%]" />
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
        
        {/* Side flaps (decorative) */}
        <div className="absolute bottom-0 left-0 w-1/4 h-[calc(50%-1px)] bg-amber-50 border-r border-amber-200 rounded-bl-lg z-10" />
        <div className="absolute bottom-0 right-0 w-1/4 h-[calc(50%-1px)] bg-amber-50 border-l border-amber-200 rounded-br-lg z-10" />
        
        {/* Bottom flap (decorative) */}
        <div className="absolute bottom-0 left-0 w-full h-1/8 bg-amber-50 border-t border-amber-200 z-10" />
      </motion.div>
      
      {/* Letter content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-[90%] h-[85%] bg-white rounded shadow-lg p-6 z-0"
            variants={letterAnimation}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="w-full h-full overflow-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="font-handwriting text-lg text-gray-800 whitespace-pre-wrap"
              >
                {letterContent}
              </motion.div>
            </div>
            <div className="absolute bottom-3 right-3 w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full text-pink-400 opacity-70">
                <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};