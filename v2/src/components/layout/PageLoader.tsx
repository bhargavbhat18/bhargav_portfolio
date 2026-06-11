"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState("Initializing Core Modules...");

  useEffect(() => {
    const steps = [
      { prg: 20, text: "Configuring environment..." },
      { prg: 45, text: "Constructing layout components..." },
      { prg: 70, text: "Compiling design systems..." },
      { prg: 90, text: "Optimizing assets & rendering..." },
      { prg: 100, text: "Ready to render." },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 600);
          return 100;
        }

        const nextVal = prev + Math.random() * 8 + 2;
        const matchedStep = steps.find(s => nextVal >= s.prg - 10 && nextVal <= s.prg);
        if (matchedStep) {
          setStepText(matchedStep.text);
        }

        return Math.min(nextVal, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 bg-[#070708] z-[9999] flex flex-col items-center justify-center select-none"
        >
          {/* Subtle noise and glow backdrop */}
          <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Elegant SVG Draw Logo Reveal */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer Border Beam spinning */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-3xl border border-dashed border-white/5"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-2xl border border-gradient-to-r from-primary/30 to-accent/30"
              />
              
              {/* Pulsing Core */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-primary/15 to-accent/15 blur-md"
              />

              {/* Animated SVG Draw Logo Reveal */}
              <svg 
                viewBox="0 0 100 100" 
                className="w-16 h-16 text-white relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]"
              >
                {/* Left B stem */}
                <motion.path
                  d="M 22 22 L 22 78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: "easeInOut" }}
                />
                {/* Left B loops */}
                <motion.path
                  d="M 22 22 C 38 22, 38 48, 22 48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut", delay: 0.4 }}
                />
                <motion.path
                  d="M 22 48 C 40 48, 40 78, 22 78"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut", delay: 0.7 }}
                />
                {/* Right B stem */}
                <motion.path
                  d="M 50 22 L 50 78"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
                />
                {/* Right B loops */}
                <motion.path
                  d="M 50 22 C 66 22, 66 48, 50 48"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut", delay: 0.6 }}
                />
                <motion.path
                  d="M 50 48 C 68 48, 68 78, 50 78"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: "easeInOut", delay: 0.9 }}
                />
                {/* Dot */}
                <motion.circle
                  cx="78"
                  cy="78"
                  r="3.5"
                  fill="#06B6D4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.4 }}
                />
              </svg>
            </div>

            {/* Load Information */}
            <div className="flex flex-col items-center gap-3 w-64">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest text-center h-4 line-clamp-1">
                {stepText}
              </span>
              
              <div className="text-3xl font-black font-mono text-gradient select-none">
                {Math.round(progress)}%
              </div>

              {/* Progress Slider */}
              <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-primary via-[#6366F1] to-accent rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
