"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ShieldAlert, Sparkles, X } from "lucide-react";
import Magnetic from "../ui/Magnetic";

export default function EasterEggManager() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysPressed = useRef<string[]>([]);
  
  // Konami Code: Up, Up, Down, Down, Left, Right, Left, Right, B, A
  const konamiCode = [
    "arrowup",
    "arrowup",
    "arrowdown",
    "arrowdown",
    "arrowleft",
    "arrowright",
    "arrowleft",
    "arrowright",
    "b",
    "a"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keysPressed.current.push(key);
      
      // Limit memory of pressed keys
      if (keysPressed.current.length > konamiCode.length) {
        keysPressed.current.shift();
      }

      // Check match
      const isMatch = konamiCode.every(
        (val, index) => val === keysPressed.current[index]
      );

      if (isMatch) {
        setActive(true);
        keysPressed.current = []; // Reset sequence
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Matrix code rain animation inside canvas
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Matrix characters
    const alphabet = "アカサタナハマヤラワガザダバパイウエオ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const chars = alphabet.split("");

    const fontSize = 14;
    const columns = width / fontSize;
    const rainDrops = Array(Math.floor(columns) + 1).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0F0"; // Glowing matrix green
      ctx.shadowColor = "#0F0";
      ctx.shadowBlur = 4;
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Reset drop position at bottom
        if (y > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
      ctx.shadowBlur = 0; // Reset
      animId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    animId = requestAnimationFrame(draw);

    // Lock page scroll
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "unset";
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden">
          {/* Matrix canvas background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

          {/* Glitch Overlay Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative w-full max-w-lg bg-[#050B05]/95 border border-[#00FF00]/40 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(0,255,0,0.25)] mx-6 text-[#00FF00] font-mono glass"
          >
            {/* Corner highlight lines */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00FF00] rounded-tl-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00FF00] rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00FF00] rounded-bl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00FF00] rounded-br-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-[#00FF00]/30 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <ShieldAlert size={20} className="animate-pulse" />
                <h4 className="text-sm font-bold tracking-widest uppercase">System Override Triggered</h4>
              </div>
              <button 
                onClick={() => setActive(false)}
                className="hover:bg-[#00FF00]/20 p-1.5 rounded-lg border border-transparent hover:border-[#00FF00]/30 transition-all text-[#00FF00]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="flex items-center gap-2 bg-[#00FF00]/10 border border-[#00FF00]/20 p-3 rounded-2xl select-none">
                <Sparkles size={16} />
                <span>Achievement Unlocked: <strong>Master Hacker</strong></span>
              </div>

              <div className="bg-black/80 border border-[#00FF00]/20 rounded-2xl p-4 md:p-5 font-mono text-[10px] md:text-xs leading-relaxed space-y-3 shadow-inner">
                <div>
                  Bhargav Portfolio OS v2.0 - Secret Log
                </div>
                <div>
                  ================================================
                </div>
                <div>
                  Security Bypass: SUCCESSFUL
                </div>
                <div>
                  Override Status: OVERLORD LEVEL GRANTED
                </div>
                <div className="text-white mt-4 italic text-xs leading-relaxed font-sans font-light select-text">
                  "The best way to predict the future is to invent it. Let's build something world-class together."
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Magnetic>
                <button
                  onClick={() => setActive(false)}
                  className="px-6 py-3 rounded-xl bg-[#00FF00]/20 hover:bg-[#00FF00]/30 text-[#00FF00] font-bold border border-[#00FF00]/50 transition-colors cursor-pointer text-xs uppercase tracking-wider"
                >
                  Exit Safe Mode
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
