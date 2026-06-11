"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const springConfigOuter = { stiffness: 200, damping: 25, mass: 0.6 };
  const cursorXOuter = useSpring(mouseX, springConfigOuter);
  const cursorYOuter = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999]">
      {/* Primary Dot */}
      <motion.div
        className="fixed w-2.5 h-2.5 bg-primary rounded-full z-[1000] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          backgroundColor: isHovered ? "rgb(168, 85, 247)" : "rgb(6, 182, 212)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      {/* Glowing Outer Ring */}
      <motion.div
        className="fixed w-8 h-8 border border-accent/40 rounded-full z-[999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXOuter,
          y: cursorYOuter,
        }}
        animate={{
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
          backgroundColor: isHovered ? "rgba(168, 85, 247, 0.08)" : "rgba(255, 255, 255, 0)",
          borderColor: isHovered ? "rgba(168, 85, 247, 0.3)" : "rgba(6, 182, 212, 0.4)"
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </div>
  );
}
