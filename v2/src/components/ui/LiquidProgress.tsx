"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";

export default function LiquidProgress({ value = 45 }: { value?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + "%");

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut", delay: 0.2 });
      return controls.stop;
    }
  }, [inView, count, value]);

  // Spring width for the progress bar fill
  const springWidth = useSpring(useTransform(count, [0, 100], ["0%", "100%"]), {
    stiffness: 80,
    damping: 15
  });

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-mono mb-2">
        <span className="text-white/60">Development Progress</span>
        <motion.span ref={ref} className="text-cyan-400 font-bold font-mono">
          {rounded}
        </motion.span>
      </div>

      <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden relative border border-white/5 shadow-inner">
        {/* Fill bar */}
        <motion.div
          style={{ width: springWidth }}
          className="h-full bg-gradient-to-r from-cyan-500/80 to-blue-600/80 rounded-full relative overflow-hidden"
        >
          {/* Liquid Wave Overlay - 200% width div animated horizontally */}
          <div
            className="absolute inset-y-0 left-0 w-[200%] opacity-40 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13,67.73-11.33,136-40.08,206.6-40.75,72.84-.69,141.4,26.43,201,45.65V0Z' fill='%23ffffff' opacity='.3'/%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.6,31.77,25.42,61,54.8,98.78,74.5,41.52,21.65,89.47,21.93,133.56,9.25,33.56-9.65,63.15-26.39,94.2-39.8,41.16-17.78,85-42.53,130.82-45.74,36.27-2.54,70.61,9.81,98.07,31.77,32,25.61,61.4,55,99.58,74.49,42.42,21.65,91.3,21.36,135.9-9.15V0Z' fill='%23ffffff' opacity='.2'/%3E%3C/svg%3E")`,
              backgroundSize: '50% 100%',
              animation: 'wave 8s linear infinite'
            }}
          />
          {/* Shimmer overlay */}
          <div className="absolute inset-0 bg-white/10" style={{ animation: 'shimmer 2.5s infinite linear' }} />
          {/* Pulsing indicator bubble */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full blur-[1px] animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
