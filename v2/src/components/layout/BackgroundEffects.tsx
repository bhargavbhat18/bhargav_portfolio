"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const xPx = useTransform(smoothX, (v) => `${v + 300}px`);
  const yPx = useTransform(smoothY, (v) => `${v + 300}px`);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Mesh/Aurora Gradients (Slow flow) */}
      <div className="absolute inset-0 aurora-container opacity-[0.25]" />

      {/* Floating Blurred Orbs */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -120, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[20%] w-[35rem] h-[35rem] rounded-full bg-cyan-500/10 blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -120, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[20%] right-[15%] w-[40rem] h-[40rem] rounded-full bg-purple-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, 100, -80, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute top-[40%] right-[30%] w-[25rem] h-[25rem] rounded-full bg-blue-500/5 blur-[90px]"
      />

      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />

      {/* Interactive Mouse Spotlight Glow */}
      <motion.div
        className="absolute -inset-[300px] pointer-events-none"
        style={{
          // Map motion values to custom properties for CSS
          "--x": xPx,
          "--y": yPx,
          background: "radial-gradient(600px circle at var(--x) var(--y), rgba(6, 182, 212, 0.07), transparent 80%)",
        } as any}
      />

      {/* Moving Noise Texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-[0.015]" />
    </div>
  );
}
