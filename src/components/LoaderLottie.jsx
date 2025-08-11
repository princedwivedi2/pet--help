import * as LottieReact from 'lottie-react';
import { motion } from 'framer-motion';
const { Player } = LottieReact;

export default function LoaderLottie({ animationData, className = '' }) {
  return (
    <motion.div 
      className={`flex items-center justify-center ${className} reduced-motion`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="animate-pulse reduced-motion"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: 80, width: 80 }}
          className="shadow-glow"
        />
      </motion.div>
    </motion.div>
  );
}
