import { motion } from "framer-motion";
import { HeartIcon } from "lucide-react";

const FloatingHearts = [...Array(6)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute text-pink-500 opacity-70"
    initial={{
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 100,
      scale: 0.5 + Math.random() * 0.5,
    }}
    animate={{
      y: -100,
      x: `calc(${Math.random() * 100}vw)`,
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay: i * 2,
      ease: "linear",
    }}
  >
    <HeartIcon className="h-6 w-6" />
  </motion.div>
));

export { FloatingHearts };