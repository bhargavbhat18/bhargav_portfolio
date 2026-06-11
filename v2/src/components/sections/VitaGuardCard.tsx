"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";
import { AlertTriangle, GitBranch, Code, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Magnetic from "../ui/Magnetic";

// --- Animated Counter ---
function AnimatedCounter({ value }: { value: number }) {
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

  return <motion.span ref={ref} className="text-cyan-400 font-bold">{rounded}</motion.span>;
}

// --- Main VitaGuard Component ---
export default function VitaGuardCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt state
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth out the tilt
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Map values to rotations (-5deg to 5deg)
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const titleText = "VitaGuard";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className="mb-16 glass-card rounded-3xl p-8 border border-white/10 hover:border-cyan-500/50 transition-colors duration-500 hover:glow-cyan relative overflow-hidden group"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite',
        }}
      />
      {/* Floating Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700 animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" style={{ animation: 'float 6s ease-in-out infinite' }} />
      
      <div className="grid lg:grid-cols-2 gap-12 relative z-10" style={{ transform: 'translateZ(30px)' }}>
        {/* Left Col: Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5 animate-pulse relative overflow-hidden group/badge">
              <span className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover/badge:translate-y-0 transition-transform duration-300" />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-ping absolute opacity-75"></div>
              <div className="w-2 h-2 rounded-full bg-green-500 relative z-10"></div>
              <span className="relative z-10 flex items-center gap-1.5"><AlertTriangle size={14} /> Active Development</span>
            </span>
            <span className="text-xs font-mono text-muted-foreground">Healthcare Management Platform</span>
          </div>

          <h4 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-4 flex cursor-default">
            {titleText.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 150 }}
                className="hover:text-cyan-400 hover:scale-110 hover:-translate-y-1 transition-all duration-300 inline-block drop-shadow-md hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              >
                {char}
              </motion.span>
            ))}
          </h4>
          
          <div className="text-muted-foreground leading-relaxed mb-6 text-sm">
            <p className="mb-4">
              VitaGuard is a healthcare management platform currently under development. The project aims to streamline interactions between patients, doctors, and healthcare administrators through a secure and scalable ecosystem.
            </p>
            <p className="mb-2">Key features under development include:</p>
            <motion.ul 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="list-none space-y-1 pl-1"
            >
              {[
                "Patient management",
                "Authentication & authorization",
                "Appointment scheduling",
                "Medical records management",
                "Role-based access control",
                "AI-assisted healthcare features"
              ].map((feat, i) => (
                <motion.li key={i} variants={itemVariants} className="flex gap-2">
                  <span className="text-cyan-500/50">•</span> {feat}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-white">Development Progress</span>
              <AnimatedCounter value={45} />
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "45%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full" style={{ animation: 'shimmer 2s infinite linear' }} />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full blur-[2px] animate-pulse" />
              </motion.div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 flex gap-1 items-center italic">
              <GitBranch size={10} className="text-cyan-500/50" /> This project is actively being developed.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <Magnetic>
              <a href="https://github.com/bhargavbhat18/VitaGuard" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all duration-300 border border-white/5 hover:border-white/20 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden">
                <span className="absolute inset-0 bg-white/5 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                <FaGithub size={16} className="group-hover:rotate-12 transition-transform duration-300 relative z-10" /> 
                <span className="relative z-10">View GitHub Repository</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a href="https://github.com/bhargavbhat18/VitaGuard/commits" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black border border-cyan-500/20 text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] relative overflow-hidden">
                <span className="absolute inset-0 bg-cyan-400 scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                <Code size={16} className="relative z-10 group-hover:animate-pulse" /> 
                <span className="relative z-10">View Development Updates</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Right Col: Details & Meta */}
        <div className="flex flex-col gap-6 lg:border-l border-white/10 lg:pl-12 pt-8 lg:pt-0">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Status", value: "Active Development" },
              { label: "Team", value: "Personal Project" },
              { label: "Type", value: "Healthcare Technology" },
              { label: "Platform", value: "Android + Web" },
              { label: "Repository", value: "Public GitHub" }
            ].map((meta, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                key={i} className="flex flex-col group/meta"
              >
                <span className="text-[10px] font-mono text-muted-foreground uppercase group-hover/meta:text-cyan-500/70 transition-colors">{meta.label}</span>
                <span className="text-sm text-white font-medium">{meta.value}</span>
              </motion.div>
            ))}
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-white/10 to-transparent my-2" />

          {/* Tech Stack Tags */}
          <div>
            <h5 className="text-xs font-mono text-muted-foreground uppercase mb-3">Tech Stack</h5>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2"
            >
              {vitaTech.map((t) => (
                <motion.span 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, borderColor: "rgba(34,211,238,0.5)", color: "rgb(34,211,238)", boxShadow: "0 0 10px rgba(34,211,238,0.2)" }}
                  key={t} 
                  className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white transition-all cursor-default relative overflow-hidden group/tech"
                >
                  <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/tech:opacity-100 transition-opacity" />
                  <span className="relative z-10">{t}</span>
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h5 className="text-xs font-mono text-cyan-400 uppercase mb-3 flex items-center gap-1 group/feat">
                <ArrowRight size={12} className="group-hover/feat:translate-x-1 transition-transform" /> Current
              </h5>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xs text-muted-foreground space-y-2"
              >
                {currentFeatures.map((feat, i) => (
                  <motion.li variants={itemVariants} key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-500/50 mt-0.5">•</span> <span>{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <div>
              <h5 className="text-xs font-mono text-purple-400 uppercase mb-3 flex items-center gap-1 group/feat">
                <ArrowRight size={12} className="group-hover/feat:translate-x-1 transition-transform" /> Planned
              </h5>
              <motion.ul 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-xs text-muted-foreground space-y-2"
              >
                {plannedFeatures.map((feat, i) => (
                  <motion.li variants={itemVariants} key={i} className="flex items-start gap-1.5">
                    <span className="text-purple-500/50 mt-0.5">•</span> <span>{feat}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
