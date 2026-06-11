"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { GitBranch, Globe, Users, CheckCircle2, ListTodo, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import SpotlightCard from "../ui/SpotlightCard";
import CanvasParticles from "../ui/CanvasParticles";
import LiquidProgress from "../ui/LiquidProgress";
import Magnetic from "../ui/Magnetic";

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

// --- Main Redesigned VitaGuard Card ---
export default function VitaGuardCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll Parallax for Section Entry
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const blurValue = useTransform(scrollYProgress, [0, 0.3], ["8px", "0px"]);

  const vitaTech = ["Java", "Spring Boot", "Python", "REST APIs", "MySQL", "Android Studio", "Firebase", "Git & GitHub"];
  
  const currentFeatures = [
    "Authentication & Authorization",
    "Patient Management",
    "Android Application",
    "Role-Based Access Control"
  ];

  const plannedFeatures = [
    "Doctor Dashboard",
    "Appointment Scheduling",
    "Medical Records",
    "Prescription Tracking",
    "AI Assistance & Analytics",
    "Notifications System"
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ scale, opacity, filter: blurValue }}
      className="mb-24 relative rounded-3xl p-1 lg:p-2 bg-gradient-to-b from-white/5 to-transparent border border-white/5 overflow-hidden"
    >
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 aurora-container opacity-40 pointer-events-none z-0" />
      
      {/* Noise Texture layer */}
      <div className="absolute inset-0 noise-overlay pointer-events-none z-10" />

      {/* Animated Moving Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'gridMove 25s linear infinite',
        }}
      />

      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 p-4 lg:p-6"
      >
        <SpotlightCard className="w-full relative overflow-hidden group p-8 lg:p-12">
          {/* Interactive Particle Network in the background of the single card */}
          <CanvasParticles />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Header & Description (Left Column on Desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 relative overflow-hidden">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Active Development
                  </span>
                  <span className="text-[10px] font-mono text-white/50 tracking-wider">PROJECT FLAGSHIP</span>
                </div>

                <h3 className="text-4xl lg:text-5xl font-heading font-black mb-6 select-none tracking-tight">
                  <span className="text-shine-active drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                    VitaGuard
                  </span>
                </h3>
                
                <p className="text-white/70 text-sm leading-relaxed font-light mb-8">
                  VitaGuard is a next-generation healthcare management ecosystem designed to seamlessly connect patients, medical practitioners, and administrators. Engineered to resolve clinical workflow bottlenecks through high-security communication and data modularity.
                </p>

                {/* Progress / Status */}
                <div className="mb-8 bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <GitBranch size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-white">Build Status</h4>
                      <p className="text-xs text-white/50">Core schemas & auth complete.</p>
                    </div>
                  </div>
                  <LiquidProgress value={45} />
                </div>
              </div>

              {/* Action Links */}
              <div className="space-y-3 pt-6 border-t border-white/10 mt-auto">
                <Magnetic className="w-full flex">
                  <a
                    href="https://github.com/bhargavbhat18/VitaGuard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full group flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-all duration-300 border border-white/5 hover:border-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] relative overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300 origin-center" />
                    <FaGithub size={18} className="group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">GitHub Repository</span>
                  </a>
                </Magnetic>
              </div>
            </div>

            {/* Right Column Content */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Top half: Ecosystem & Stack */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Ecosystem */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                        <Globe size={16} />
                      </div>
                      <h4 className="text-sm font-heading font-bold text-white">Project Ecosystem</h4>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Deployment", value: "Staging Sandbox" },
                        { label: "Architecture", value: "REST Microservices" },
                        { label: "Design", value: "Material 3" },
                        { label: "Database", value: "Relational MySQL" }
                      ].map((meta, i) => (
                        <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0 text-xs">
                          <span className="text-white/50">{meta.label}</span>
                          <span className="font-mono text-white/80 text-right">{meta.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-sm font-heading font-bold text-white">Architecture Stack</h4>
                      <div className="text-xl font-bold font-mono text-cyan-400 leading-none">
                        <CounterNumber value={vitaTech.length} />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {vitaTech.map((tech) => (
                        <div
                          key={tech}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-white/80 hover:border-purple-500/50 transition-colors"
                        >
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-white/40">
                    <span className="flex items-center gap-1"><Users size={12} className="text-purple-400" /> Individual</span>
                    <span>100% Type-Safe</span>
                  </div>
                </div>
              </div>

              {/* Bottom half: Features */}
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 h-full">
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Current features */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                        <CheckCircle2 size={14} /> Current Build
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {currentFeatures.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="text-cyan-400 font-bold mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Planned features */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                        <ListTodo size={14} /> Backlog Milestones
                      </h5>
                    </div>
                    <ul className="space-y-2">
                      {plannedFeatures.map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-white/70">
                          <span className="text-purple-400 font-bold mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}

