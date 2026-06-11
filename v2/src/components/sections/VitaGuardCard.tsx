"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useInView, animate } from "framer-motion";
import { AlertTriangle, GitBranch, Code, ArrowRight, Users, Globe, Terminal, CheckCircle2, ListTodo, ArrowUpRight } from "lucide-react";
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

// --- Canvas Cursor Trail ---
function BentoCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const points: { x: number; y: number; age: number }[] = [];
    const maxAge = 35;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      points.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        age: 0
      });
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const drawTrail = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw fading dots
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (1 - pt.age / maxAge) * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${(1 - pt.age / maxAge) * 0.2})`;
        ctx.fill();

        pt.age++;
        if (pt.age > maxAge) {
          points.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(drawTrail);
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);
    drawTrail();

    return () => {
      parent?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-20" />;
}

// --- Main Redesigned VitaGuard Bento Grid ---
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

  // Motion variants for staggered grid reveals
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

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
      style={{ scale, opacity, filter: `blur(${blurValue.get()})` }}
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

      {/* Canvas cursor trail over the Bento */}
      <BentoCursorTrail />

      {/* Bento Grid */}
      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-12 gap-4 lg:gap-6 relative z-10 p-4 lg:p-6"
      >
        
        {/* CARD 1: HERO / TITLE & DESCRIPTION (lg:col-span-8) */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-8 h-full">
          <SpotlightCard className="h-full min-h-[320px] flex flex-col justify-between relative overflow-hidden group">
            {/* Interactive Particle Network */}
            <CanvasParticles />
            
            <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 relative overflow-hidden">
                  {/* Glowing ping indicator */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Active Development
                </span>
                <span className="text-[10px] font-mono text-white/50 tracking-wider">PROJECT FLAGSHIP</span>
              </div>

              {/* Shiny text sweep title */}
              <h3 className="text-4xl lg:text-5xl font-heading font-black mb-4 select-none tracking-tight">
                <span className="text-shine-active drop-shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  VitaGuard
                </span>
              </h3>
              
              <p className="text-white/70 text-sm leading-relaxed max-w-2xl font-light">
                VitaGuard is a next-generation healthcare management ecosystem designed to seamlessly connect patients, medical practitioners, and administrators. Engineered to resolve clinical workflow bottlenecks through high-security communication and data modularity.
              </p>
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-xs font-mono text-white/40" style={{ transform: "translateZ(10px)" }}>
              <span className="flex items-center gap-1"><Terminal size={14} className="text-cyan-400/60" /> secure.scalable.modular</span>
              <span>v1.0.0-dev</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 2: PROGRESS FLASK (lg:col-span-4) */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-4">
          <SpotlightCard className="h-full flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400">
                <GitBranch size={20} />
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">Build Status</h4>
              <p className="text-xs text-white/50 mb-6 leading-relaxed">
                Core database schemas and patient authentication API routes are complete. Moving into clinic dashboard development.
              </p>
            </div>

            <div className="space-y-4">
              <LiquidProgress value={45} />
              
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] font-mono text-white/40 flex items-center justify-between">
                <span>Branch: <span className="text-white/60">main</span></span>
                <span className="flex items-center gap-1 text-cyan-400/70"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> active build</span>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 3: STATUS & METADATA (lg:col-span-4) */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-4">
          <SpotlightCard className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Globe size={20} />
              </div>
              
              <h4 className="text-lg font-heading font-bold text-white">Project Ecosystem</h4>
            </div>

            <div className="space-y-3 mt-6">
              {[
                { label: "Deployment", value: "Staging Sandbox" },
                { label: "Architecture", value: "REST Microservices" },
                { label: "Design", value: "Material 3 + Responsive" },
                { label: "Database", value: "Relational MySQL" }
              ].map((meta, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0 text-xs">
                  <span className="text-white/50">{meta.label}</span>
                  <span className="font-mono text-white/80">{meta.value}</span>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 4: TECH STACK PILLS & COUNT (lg:col-span-8) */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-8">
          <SpotlightCard className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-heading font-bold text-white mb-1">Architecture Stack</h4>
                  <p className="text-xs text-white/50">Full-stack technologies power secure health workflows.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-cyan-400 leading-none">
                    <CounterNumber value={vitaTech.length} />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono uppercase">Technologies</span>
                </div>
              </div>

              {/* Tag Grid with hover scale effects */}
              <div className="flex flex-wrap gap-2.5">
                {vitaTech.map((tech, i) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.5)", color: "#a855f7", boxShadow: "0 0 15px rgba(168,85,247,0.15)" }}
                    className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/80 cursor-default transition-all duration-200 relative overflow-hidden group/pills"
                  >
                    <span className="absolute inset-0 bg-purple-500/[0.04] opacity-0 group-hover/pills:opacity-100 transition-opacity" />
                    <span className="relative z-10">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between text-[11px] font-mono text-white/40">
              <span className="flex items-center gap-1"><Users size={12} className="text-purple-400" /> Individual Development</span>
              <span>100% Type-Safe API</span>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 5: FEATURES & MILESTONES MAP (lg:col-span-8) */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-8">
          <SpotlightCard className="h-full">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Current features */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={14} /> Current Build
                  </h5>
                  <div className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded-md">
                    <CounterNumber value={currentFeatures.length} /> Modules
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {currentFeatures.map((feat, i) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2 text-xs text-white/70"
                    >
                      <span className="text-cyan-400 font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Planned features */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                    <ListTodo size={14} /> Backlog Milestones
                  </h5>
                  <div className="text-xs font-mono bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-md">
                    <CounterNumber value={plannedFeatures.length} /> Planned
                  </div>
                </div>

                <ul className="space-y-3">
                  {plannedFeatures.map((feat, i) => (
                    <motion.li
                      key={feat}
                      initial={{ opacity: 0, x: -5 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-2 text-xs text-white/70"
                    >
                      <span className="text-purple-400 font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* CARD 6: ACTION / LINKS (lg:col-span-4) - HIGHLIGHTED BEAM */}
        <motion.div variants={cardVariants} className="col-span-12 lg:col-span-4">
          <SpotlightCard className="h-full flex flex-col justify-between" enableBeam={true}>
            <div>
              <h4 className="text-lg font-heading font-black text-white mb-2 flex items-center gap-2">
                Explore Code <ArrowUpRight size={18} className="text-cyan-400" />
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mb-6">
                Audit the system architecture, browse spring API routers, or review database relational diagrams directly in the open-source repository.
              </p>
            </div>

            <div className="space-y-3">
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
              
              <Magnetic className="w-full flex">
                <a
                  href="https://github.com/bhargavbhat18/VitaGuard/commits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full group flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black border border-cyan-500/20 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-cyan-400 scale-0 group-hover:scale-100 rounded-2xl transition-transform duration-300 origin-center" />
                  <Code size={18} className="relative z-10 group-hover:animate-pulse" />
                  <span className="relative z-10">Commits Timeline</span>
                </a>
              </Magnetic>
            </div>
          </SpotlightCard>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
