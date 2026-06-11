"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
  size: number;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 25, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const springConfigOuter = { stiffness: 200, damping: 25, mass: 0.6 };
  const cursorXOuter = useSpring(mouseX, springConfigOuter);
  const cursorYOuter = useSpring(mouseY, springConfigOuter);

  useEffect(() => {
    // 1. Mouse Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      mouseRef.current = { x: e.clientX, y: e.clientY };
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

    // 2. Canvas Setup and Loop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animateTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new point based on current mouse position
      if (isVisible) {
        pointsRef.current.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          alpha: 1,
          size: isHovered ? 12 : 6,
        });
      }

      // Limit array size
      if (pointsRef.current.length > 25) {
        pointsRef.current.shift();
      }

      // Update and draw points
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        p.alpha -= 0.04;
        p.size *= 0.94; // shrink over time

        if (p.alpha <= 0 || p.size <= 0.2) {
          pointsRef.current.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Custom neon cyan-purple gradient trail
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        const colorStart = isHovered 
          ? `rgba(168, 85, 247, ${p.alpha * 0.4})` // Purple hover
          : `rgba(6, 182, 212, ${p.alpha * 0.4})`; // Cyan standard
        
        gradient.addColorStop(0, colorStart);
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Draw connecting glowing path line
      if (pointsRef.current.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);
        for (let i = 1; i < pointsRef.current.length; i++) {
          const xc = (pointsRef.current[i].x + pointsRef.current[i - 1].x) / 2;
          const yc = (pointsRef.current[i].y + pointsRef.current[i - 1].y) / 2;
          ctx.quadraticCurveTo(pointsRef.current[i - 1].x, pointsRef.current[i - 1].y, xc, yc);
        }
        
        const pathGradient = ctx.createLinearGradient(
          pointsRef.current[0].x, pointsRef.current[0].y, 
          pointsRef.current[pointsRef.current.length - 1].x, pointsRef.current[pointsRef.current.length - 1].y
        );
        const strokeColor = isHovered ? "rgba(168, 85, 247, 0.15)" : "rgba(6, 182, 212, 0.15)";
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isHovered ? 4 : 2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = isHovered ? "rgba(168, 85, 247, 0.5)" : "rgba(6, 182, 212, 0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
      }

      animationId = requestAnimationFrame(animateTrail);
    };

    animateTrail();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, isHovered, mouseX, mouseY]);

  return (
    <>
      {/* High-Performance GPU Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[998] hidden lg:block"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Main Cursor Elements */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[999]">
        {/* Primary Dot */}
        <motion.div
          className="fixed w-2 h-2 bg-primary rounded-full z-[1000] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
          style={{
            x: cursorX,
            y: cursorY,
          }}
          animate={{
            scale: isHovered ? 2.2 : 1,
            backgroundColor: isHovered ? "rgb(168, 85, 247)" : "rgb(6, 182, 212)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        {/* Glowing Outer Ring */}
        <motion.div
          className="fixed w-6 h-6 border border-accent/40 rounded-full z-[999] -translate-x-1/2 -translate-y-1/2"
          style={{
            x: cursorXOuter,
            y: cursorYOuter,
          }}
          animate={{
            width: isHovered ? 48 : 24,
            height: isHovered ? 48 : 24,
            backgroundColor: isHovered ? "rgba(168, 85, 247, 0.08)" : "rgba(255, 255, 255, 0)",
            borderColor: isHovered ? "rgba(168, 85, 247, 0.3)" : "rgba(6, 182, 212, 0.4)"
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />
      </div>
    </>
  );
}
