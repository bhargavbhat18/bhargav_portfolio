"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { GitBranch, Globe, Users, CheckCircle2, ListTodo, Terminal, Activity } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SpotlightCard from "../ui/SpotlightCard";
import CanvasParticles from "../ui/CanvasParticles";
import LiquidProgress from "../ui/LiquidProgress";
import Magnetic from "../ui/Magnetic";
import BorderBeam from "../ui/BorderBeam";
import InteractivePreview from "../ui/InteractivePreview";

// --- Animated Counter ---
function CounterNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return <motion.span ref={ref} className="font-heading font-bold">{rounded}</motion.span>;
}

export default function VitalGuardCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Parallax entry
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.97, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

  const vitalTech = ["Java", "Spring Boot", "Python", "REST APIs", "MySQL", "Android", "Firebase", "Git"];
  
  const currentFeatures = [
    "Secure JWT Authentication",
    "Clinical Role Access Controls",
    "Android Patient App Nodes"
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity }}
      className="w-full relative rounded-3xl p-[1px] bg-white/5 overflow-hidden flex"
    >
      {/* Background neon orbs inside the card border */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      {/* Border Beam Animation around Card */}
      <BorderBeam duration={9} colorFrom="#06B6D4" colorTo="#A855F7" />

      <SpotlightCard className="w-full relative overflow-hidden group p-6 lg:p-10 border-0 flex flex-col justify-between">
        {/* Particle Network layer inside card */}
        <CanvasParticles />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch flex-1">
          
          {/* Left Column (Details & Metadata) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div>
              {/* Badge & Live Indicator */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 shadow-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Active Build
                </span>
                <span className="text-[9px] font-mono text-white/40 tracking-wider">FLAGSHIP SUITE</span>
              </div>

              {/* Title */}
              <h3 className="text-4xl lg:text-5xl font-heading font-black mb-4 select-none tracking-tight">
                <span className="text-gradient text-shine-active drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                  VitalGuard
                </span>
              </h3>
              
              <p className="text-white/70 text-sm leading-relaxed font-light mb-6">
                A high-security, distributed healthcare environment connecting medical personnel and patients. Engineered to resolve clinical communication lags and secure health records.
              </p>

              {/* Progress Tracker */}
              <div className="mb-6 bg-white/[0.01] border border-white/5 rounded-2xl p-5 shadow-inner">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <GitBranch size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-bold text-white">Milestone Status</h4>
                    <p className="text-[10px] text-white/40">Core endpoints and database schema logged.</p>
                  </div>
                </div>
                <LiquidProgress value={45} />
              </div>

              {/* Features List */}
              <div className="space-y-2.5 bg-white/[0.01] border border-white/5 rounded-2xl p-5 mb-2">
                <h5 className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-1.5 font-bold mb-3">
                  <CheckCircle2 size={12} /> Live Components
                </h5>
                <ul className="grid grid-cols-1 gap-2">
                  {currentFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-white/70 hover:text-white transition-colors">
                      <span className="text-primary font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Repositories button */}
            <div className="pt-4 border-t border-white/10 mt-auto">
              <Magnetic className="w-full flex">
                <a
                  href="https://github.com/bhargavbhat18/Vital-Guard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all duration-300 border border-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                  <FaGithub size={16} className="group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">GitHub Repository</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Right Column (Live Preview Terminal & Tech/Ecosystem) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* Live Interactive Telemetry Terminal */}
            <InteractivePreview />

            {/* Micro Details Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              
              {/* Architecture Stack */}
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-heading font-bold text-white flex items-center gap-1.5">
                      <Activity size={12} className="text-primary" /> Tech Chips
                    </h4>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">
                      <CounterNumber value={vitalTech.length} /> Total
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {vitalTech.map((tech) => (
                      <div
                        key={tech}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/10 text-white/70 hover:border-primary/50 hover:text-white transition-colors cursor-default"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Ecosystem */}
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h4 className="text-xs font-heading font-bold text-white flex items-center gap-1.5 mb-2">
                    <Globe size={12} className="text-accent" /> Ecosystem
                  </h4>
                  {[
                    { label: "Pipeline", value: "REST API" },
                    { label: "UI Guide", value: "Material 3" },
                    { label: "Security", value: "JWT Auth" },
                    { label: "Database", value: "MySQL" }
                  ].map((meta, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] border-b border-white/5 last:border-0 pb-1.5 last:pb-0">
                      <span className="text-white/40">{meta.label}</span>
                      <span className="font-mono text-white/70">{meta.value}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
