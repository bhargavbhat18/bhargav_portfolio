"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const isHovered = useRef(false);
  const isVisible = useRef(false);

  useEffect(() => {
    // Disable custom cursor on mobile/tablet touch devices
    const isTouchDevice = 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0 || 
      (window.matchMedia && window.matchMedia("(max-width: 1023px)").matches);
      
    if (isTouchDevice) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // 1. Mouse Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX;
      mousePos.current.targetY = e.clientY;

      // Update primary dot position instantly inside mousemove callback
      // This eliminates the 1-frame scheduling delay of requestAnimationFrame
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if hovering a link, button, role=button, or element with interactive class
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive") ||
        target.getAttribute("role") === "button";

      if (isClickable) {
        if (!isHovered.current) {
          isHovered.current = true;
          // Transition styles for hovered state
          dot.style.backgroundColor = "rgb(168, 85, 247)"; // Purple
          ring.style.borderColor = "rgba(168, 85, 247, 0.5)";
          ring.style.backgroundColor = "rgba(168, 85, 247, 0.08)";
        }
      } else {
        if (isHovered.current) {
          isHovered.current = false;
          // Restore standard styles
          dot.style.backgroundColor = "rgb(6, 182, 212)"; // Cyan
          ring.style.borderColor = "rgba(6, 182, 212, 0.4)";
          ring.style.backgroundColor = "rgba(6, 182, 212, 0.04)";
        }
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnterWindow = () => {
      isVisible.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Initialize position off-screen
    mousePos.current.x = window.innerWidth / 2;
    mousePos.current.y = window.innerHeight / 2;

    // 2. High-Performance GPU Animation Loop (Lerp tracking for outer ring)
    let animationId: number;

    const tick = () => {
      // Snap factor (higher is snappier, lower is smoother)
      const lerpFactor = 0.22;
      
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * lerpFactor;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * lerpFactor;

      // Scale up outer ring when hovering clickable elements
      const scale = isHovered.current ? 1.8 : 1.0;

      // Leverage hardware-accelerated translate3d and scale
      ring.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Hide hardware cursor when custom one is rendering on desktop viewports */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
          html, body, a, button, select, input, textarea, [role="button"], [class*="interactive"], iframe {
            cursor: none !important;
          }
        }
      `}} />

      {/* Main Cursor Elements Container */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        {/* Primary Dot */}
        <div
          ref={dotRef}
          className="fixed w-2 h-2 rounded-full z-[10000] mix-blend-screen transition-colors duration-200 ease-out"
          style={{
            backgroundColor: "rgb(6, 182, 212)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
            willChange: "transform",
            opacity: 0,
            transitionProperty: "background-color",
          }}
        />
        {/* Thin Outer Ring */}
        <div
          ref={ringRef}
          className="fixed w-6 h-6 border rounded-full z-[9999] transition-all duration-300 ease-out"
          style={{
            backgroundColor: "rgba(6, 182, 212, 0.04)",
            borderColor: "rgba(6, 182, 212, 0.4)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)",
            willChange: "transform",
            opacity: 0,
            transitionProperty: "background-color, border-color",
          }}
        />
      </div>
    </>
  );
}
