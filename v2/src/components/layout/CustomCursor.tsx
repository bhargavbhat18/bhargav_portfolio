"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100, targetX: -100, targetY: -100 });
  const ringPos = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  
  // Hover states: "none" | "button" | "project" | "link"
  const hoverState = useRef<"none" | "button" | "project" | "link">("none");
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

    // Dynamically inject stylesheet to hide hardware cursor only when custom cursor is active
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
      html, body, a, button, select, input, textarea, [role="button"], [class*="interactive"], iframe {
        cursor: none !important;
      }
    `;
    document.head.appendChild(styleEl);

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ripple = rippleRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !ripple || !label) {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      return;
    }

    // Spring physics configuration
    const spring = {
      stiffness: 0.16, // Snappy but elastic stiffness
      damping: 0.62,   // Damping coefficient for premium inertia
    };

    // 1. Mouse Move Listener
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

    // 2. Mouse Over Listener (State tracking & DOM styling update)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isButton = target.tagName === "BUTTON" || target.closest("button") || target.getAttribute("role") === "button";
      const isProjectCard = target.closest("#projects") && !target.closest("a") && !target.closest("button");
      const isLink = target.tagName === "A" || target.closest("a") || target.classList.contains("interactive");

      if (isButton) {
        if (hoverState.current !== "button") {
          hoverState.current = "button";
          // Button state styles
          dot.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(0.6)`;
          dot.style.backgroundColor = "rgb(168, 85, 247)"; // Purple
          
          ring.style.borderColor = "rgba(168, 85, 247, 0.4)";
          ring.style.backgroundColor = "rgba(168, 85, 247, 0.08)";
          
          label.innerText = "Click";
          label.style.opacity = "1";
        }
      } else if (isProjectCard) {
        if (hoverState.current !== "project") {
          hoverState.current = "project";
          // Project Card state styles
          dot.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(0)`;
          
          ring.style.borderColor = "rgba(6, 182, 212, 0.5)";
          ring.style.backgroundColor = "rgba(6, 182, 212, 0.08)";
          
          label.innerText = "View Project";
          label.style.opacity = "1";
        }
      } else if (isLink) {
        if (hoverState.current !== "link") {
          hoverState.current = "link";
          // Link state styles
          dot.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(1.5)`;
          dot.style.backgroundColor = "rgb(168, 85, 247)"; // Purple
          
          ring.style.borderColor = "rgba(168, 85, 247, 0.3)";
          ring.style.backgroundColor = "rgba(168, 85, 247, 0.04)";
          
          label.style.opacity = "0";
        }
      } else {
        if (hoverState.current !== "none") {
          hoverState.current = "none";
          // Restore standard styles
          dot.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(1.0)`;
          dot.style.backgroundColor = "rgb(6, 182, 212)"; // Cyan
          
          ring.style.borderColor = "rgba(6, 182, 212, 0.4)";
          ring.style.backgroundColor = "rgba(6, 182, 212, 0.03)";
          
          label.style.opacity = "0";
        }
      }
    };

    // 3. Mouse Down (Click Ripple)
    const handleMouseDown = () => {
      // Position ripple at cursor coordinates
      ripple.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(0.5)`;
      ripple.style.transition = "none";
      ripple.style.opacity = "0.8";

      // Trigger reflow to apply styling immediately
      void ripple.offsetHeight;

      // Animate expansion and fade out via GPU
      ripple.style.transition = "transform 0.4s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.4s ease-out";
      ripple.style.transform = `translate3d(${mousePos.current.targetX}px, ${mousePos.current.targetY}px, 0) translate(-50%, -50%) scale(2.8)`;
      ripple.style.opacity = "0";
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
    window.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Initialize position off-screen
    mousePos.current.x = window.innerWidth / 2;
    mousePos.current.y = window.innerHeight / 2;
    ringPos.current.x = window.innerWidth / 2;
    ringPos.current.y = window.innerHeight / 2;

    // 4. Spring Physics Loop for Outer Ring
    let animationId: number;

    const tick = () => {
      // Calculate spring forces (Hooke's Law: F = -kx)
      const dx = mousePos.current.targetX - ringPos.current.x;
      const dy = mousePos.current.targetY - ringPos.current.y;
      
      const ax = dx * spring.stiffness;
      const ay = dy * spring.stiffness;

      // Update velocity with damping
      ringPos.current.vx = (ringPos.current.vx + ax) * spring.damping;
      ringPos.current.vy = (ringPos.current.vy + ay) * spring.damping;

      // Update position
      ringPos.current.x += ringPos.current.vx;
      ringPos.current.y += ringPos.current.vy;

      // Determine ring scale based on active hover element
      const scale = hoverState.current === "button" ? 1.8 
                  : hoverState.current === "project" ? 2.8
                  : hoverState.current === "link" ? 1.3
                  : 1.0;

      // Move and scale the outer ring using transform
      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(animationId);
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  return (
    <>

      {/* Main Cursor Elements Container */}
      <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
        {/* Primary Dot (Default 8px) */}
        <div
          ref={dotRef}
          className="fixed w-2 h-2 rounded-full z-[10000] mix-blend-screen transition-all duration-300 ease-out"
          style={{
            backgroundColor: "rgb(6, 182, 212)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)",
            willChange: "transform",
            opacity: 0,
            transitionProperty: "background-color, transform",
          }}
        />
        
        {/* Glowing Thin Outer Ring (Default 28px) */}
        <div
          ref={ringRef}
          className="fixed w-7 h-7 border rounded-full z-[9999] flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            backgroundColor: "rgba(6, 182, 212, 0.03)",
            borderColor: "rgba(6, 182, 212, 0.4)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(1)",
            boxShadow: "0 0 8px rgba(6, 182, 212, 0.12), 0 0 8px rgba(168, 85, 247, 0.12)", // Blue-purple subtle glow
            willChange: "transform",
            opacity: 0,
            transitionProperty: "background-color, border-color",
          }}
        >
          {/* Action text label (Click / View Project) */}
          <div
            ref={labelRef}
            className="text-[6.5px] font-mono font-black tracking-widest text-white uppercase opacity-0 transition-opacity duration-300 ease-out text-center px-1 select-none pointer-events-none"
            style={{
              textShadow: "0 0 4px rgba(0, 0, 0, 0.6)",
              lineHeight: "1.1",
            }}
          />
        </div>

        {/* Snappy Click Ripple */}
        <div
          ref={rippleRef}
          className="fixed w-6 h-6 border rounded-full z-[9998] pointer-events-none opacity-0"
          style={{
            borderColor: "rgba(6, 182, 212, 0.6)",
            transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%) scale(0.5)",
            willChange: "transform, opacity",
          }}
        />
      </div>
    </>
  );
}
