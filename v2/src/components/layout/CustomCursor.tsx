"use client";

import { useEffect, useState, useRef } from "react";

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
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pointsRef = useRef<TrailPoint[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRefPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Mouse Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
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

    // 2. Canvas Setup
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

    // 3. Combined GPU Animation Loop (Direct DOM Updates)
    const tick = () => {
      // Update Primary Dot Position Instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseRef.current.x}px, ${mouseRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Update Snappy Outer Ring Position (Lerp tracking)
      const lerpFactor = 0.28; // Snappy follow multiplier
      ringRefPos.current.x += (mouseRef.current.x - ringRefPos.current.x) * lerpFactor;
      ringRefPos.current.y += (mouseRef.current.y - ringRefPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringRefPos.current.x}px, ${ringRefPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Canvas Trail drawing
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isVisible) {
        // Add new point based on current mouse position
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
        
        const strokeColor = isHovered ? "rgba(168, 85, 247, 0.15)" : "rgba(6, 182, 212, 0.15)";
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = isHovered ? 4 : 2;
        ctx.shadowBlur = 4;
        ctx.shadowColor = isHovered ? "rgba(168, 85, 247, 0.5)" : "rgba(6, 182, 212, 0.5)";
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible, isHovered]);

  if (!isVisible) return null;

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
        <div
          ref={dotRef}
          className="fixed w-2 h-2 rounded-full z-[1000] mix-blend-screen transition-colors duration-200"
          style={{
            backgroundColor: isHovered ? "rgb(168, 85, 247)" : "rgb(6, 182, 212)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          }}
        />
        {/* Glowing Outer Ring */}
        <div
          ref={ringRef}
          className="fixed border rounded-full z-[999] transition-all duration-200"
          style={{
            width: isHovered ? "48px" : "24px",
            height: isHovered ? "48px" : "24px",
            backgroundColor: isHovered ? "rgba(168, 85, 247, 0.08)" : "rgba(255, 255, 255, 0)",
            borderColor: isHovered ? "rgba(168, 85, 247, 0.3)" : "rgba(6, 182, 212, 0.4)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}
