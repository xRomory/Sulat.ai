import React, { useState } from "react";
import { motion } from "framer-motion";

export interface MagicalBasketProps {
  letterContent: string;
  onBasketTap: () => void;
}

export const MagicalBasket: React.FC<MagicalBasketProps> = ({
  letterContent,
  onBasketTap
}) => {
  const [isWiggling, setIsWiggling] = useState(true);

  const wiggleAnimation = {
    initial: { rotate: 0 },
    animate: isWiggling ? {
      rotate: [ 0, -3, 0, 3, 0 ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" as const,
      }
    } : { rotate: 0 }
  };

  const envelopePeekAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };
    
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-xl font-medium"
      >
        Tap the basket
      </motion.div>

      <motion.div
      className="relative w-64 h-64 cursor-pointer"
        onClick={onBasketTap}
        {...wiggleAnimation}
      >
        <motion.div className="absolute inset-0 flex items-center justify-center z-1">
          <svg 
            viewBox="0 0 200 200" 
            className="w-full h-full"
          >
            {/* Basket body */}
            <path 
              d="M40,70 C40,60 160,60 160,70 L150,170 C150,180 50,180 50,170 Z" 
              fill="#e9bf8c" 
              stroke="#bf8c51" 
              strokeWidth="2"
            />

            {/* Basket rim */}
            <path 
              d="M30,70 C30,60 170,60 170,70" 
              fill="none" 
              stroke="#bf8c51" 
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Basket weave lines - horizontal */}
            <path d="M50,90 L150,90" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M50,110 L150,110" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M50,130 L150,130" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M50,150 L150,150" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            
            {/* Basket weave lines - vertical */}
            <path d="M70,80 L60,170" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M100,80 L100,170" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M130,80 L140,170" stroke="#bf8c51" strokeWidth="1" strokeDasharray="5,5" />
          </svg>
        </motion.div>

        {/* Envelope peeking out */}
        <motion.div 
          className="absolute top-[5%] left-1/2 transform -translate-x-1/2 w-32 h-24"
          {...envelopePeekAnimation}
        >
          <svg 
            viewBox="0 0 100 80" 
            className="w-full h-full"
          >
            {/* Envelope body - only partially visible */}
            <rect x="10" y="30" width="80" height="50" fill="#f8e8cd" stroke="#e2c196" strokeWidth="1" />
            <path d="M10,30 L50,50 L90,30" fill="none" stroke="#e2c196" strokeWidth="1" />
          </svg>
        </motion.div>
        
      </motion.div>
    </motion.div>
  )
}

export default MagicalBasket