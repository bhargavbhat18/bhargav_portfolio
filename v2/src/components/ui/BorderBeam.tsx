"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
}

export default function BorderBeam({
  duration = 5,
  colorFrom = "#06B6D4", // var(--primary) cyan
  colorTo = "#A855F7",   // var(--accent) purple
  className,
}: BorderBeamProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] p-[1px] overflow-hidden z-20",
        className
      )}
      style={{
        // Excludes the content box from the border box, drawing ONLY the border
        maskImage: "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
        maskClip: "content-box, border-box",
        maskComposite: "exclude",
        WebkitMaskImage: "linear-gradient(#fff 0 0), linear-gradient(#fff 0 0)",
        WebkitMaskClip: "content-box, border-box",
        WebkitMaskComposite: "xor",
      } as any}
    >
      <div
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 45%, ${colorFrom} 70%, ${colorTo} 90%, transparent 100%)`,
          animation: `rotate-beam ${duration}s linear infinite`,
        }}
        className="absolute -inset-[200%] origin-center"
      />
    </div>
  );
}
