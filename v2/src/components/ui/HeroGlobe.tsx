"use client";

import { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  pz: number;
}

export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    const points: Point3D[] = [];
    const numPoints = 140; // Dense network node count
    let radius = Math.min(width, height) * 0.35;
    if (radius > 180) radius = 180;
    if (radius < 100) radius = 100;

    const focalLength = 350;
    let angleX = 0.001;
    let angleY = 0.0015;

    // Distribute points on a sphere using Fibonacci spiral algorithm
    const initGlobe = () => {
      points.length = 0;
      for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(1 - 2 * (i + 0.5) / numPoints);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        
        // Add minor randomness to simulate organic particle nodes
        const rOffset = (Math.random() - 0.5) * 5;
        const r = radius + rOffset;

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        points.push({ x, y, z, px: 0, py: 0, pz: 0 });
      }
    };

    // Keep track of rotation velocities with inertia
    let rotVelX = 0.001;
    let rotVelY = 0.0015;
    const dragFactor = 0.95;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse drag/move interaction velocities
      if (mouseRef.current.active) {
        const dx = mouseRef.current.targetX - mouseRef.current.x;
        const dy = mouseRef.current.targetY - mouseRef.current.y;
        mouseRef.current.x += dx * 0.08;
        mouseRef.current.y += dy * 0.08;

        rotVelY = mouseRef.current.x * 0.00004;
        rotVelX = -mouseRef.current.y * 0.00004;
      } else {
        // Return to standard rotation speed gently
        rotVelX += (0.0008 - rotVelX) * 0.02;
        rotVelY += (0.0012 - rotVelY) * 0.02;
      }

      angleX += rotVelX;
      angleY += rotVelY;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const center = { x: width / 2, y: height / 2 };

      // Project all points to 2D
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.x * sinY + p.z * cosY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Perspective projection scale
        const scale = focalLength / (focalLength + z2);
        
        // Add 2D offset coordinates
        const px = x1 * scale + center.x;
        const py = y2 * scale + center.y;

        return {
          ...p,
          px,
          py,
          pz: z2 // Save rotated depth for sorting
        };
      });

      // Render sorting (painters algorithm) based on depth Z (pz)
      // Further nodes (larger pz) drawn first
      projected.sort((a, b) => b.pz - a.pz);

      // Draw Network Lines
      ctx.lineWidth = 0.55;
      const maxDistance = radius * 0.95; // Link threshold

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          
          // Calculate 3D Euclidean distance between nodes to establish links
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < maxDistance) {
            // Screen coordinates distance
            const dpx = p1.px - p2.px;
            const dpy = p1.py - p2.py;
            const dist2D = Math.sqrt(dpx * dpx + dpy * dpy);

            // Establish alpha based on 3D distance and average depth
            const avgPz = (p1.pz + p2.pz) / 2;
            const depthAlpha = Math.max(0.05, Math.min(0.5, (focalLength - avgPz) / (focalLength * 2)));
            const distanceAlpha = 1 - dist3D / maxDistance;
            const alpha = depthAlpha * distanceAlpha * 0.45;

            if (alpha > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              
              // Gradient line between cyan and purple
              const grad = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py);
              grad.addColorStop(0, `rgba(6, 182, 212, ${alpha})`); // Cyan
              grad.addColorStop(1, `rgba(168, 85, 247, ${alpha * 0.6})`); // Purple
              
              ctx.strokeStyle = grad;
              ctx.stroke();
            }
          }
        }
      }

      // Draw Nodes (Particles)
      projected.forEach((p) => {
        // Size and brightness depends on depth pz
        const sizeScale = focalLength / (focalLength + p.pz);
        const radiusSize = Math.max(0.5, Math.min(3.5, sizeScale * 1.6));
        
        const avgPz = p.pz;
        const opacity = Math.max(0.05, Math.min(0.85, (focalLength - avgPz) / (focalLength * 1.5)));

        ctx.beginPath();
        ctx.arc(p.px, p.py, radiusSize, 0, Math.PI * 2);

        // Calculate node color based on its coordinates
        // Nodes at the front/top are cyan, nodes at the back/bottom fade to purple
        if (p.pz < 0) {
          ctx.fillStyle = `rgba(6, 182, 212, ${opacity})`;
          ctx.shadowColor = "#06B6D4";
          ctx.shadowBlur = p.pz < -100 ? 5 : 2;
        } else {
          ctx.fillStyle = `rgba(168, 85, 247, ${opacity * 0.75})`;
          ctx.shadowColor = "#A855F7";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow blur
      });

      // Mouse interactivity - trace links from hover position
      if (mouseRef.current.active) {
        const mouseXCanvas = mouseRef.current.x + center.x;
        const mouseYCanvas = mouseRef.current.y + center.y;

        projected.forEach((p) => {
          const dx = p.px - mouseXCanvas;
          const dy = p.py - mouseYCanvas;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.25;
            ctx.beginPath();
            ctx.moveTo(mouseXCanvas, mouseYCanvas);
            ctx.lineTo(p.px, p.py);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      mouseRef.current.targetX = clientX - width / 2;
      mouseRef.current.targetY = clientY - height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      radius = Math.min(width, height) * 0.35;
      if (radius > 180) radius = 180;
      if (radius < 100) radius = 100;
      initGlobe();
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    
    initGlobe();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
