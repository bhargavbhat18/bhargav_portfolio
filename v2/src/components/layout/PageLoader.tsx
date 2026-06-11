"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(prev + diff, 100);
      });
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-background z-[9999] flex flex-col items-center justify-center select-none"
        >
          {/* Animated Noise */}
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
          
          <div className="relative flex flex-col items-center gap-6">
            {/* Spinning Gradient Rings Logo */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-b-accent"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-transparent border-l-cyan-400 border-r-purple-400 opacity-60"
              />
              <span className="text-xl font-heading font-black text-white relative z-10">BB.</span>
            </div>

            {/* Progress Text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest animate-pulse">Initializing Portfolio</span>
              <span className="text-2xl font-bold font-mono text-gradient">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
