"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Briefcase, Users, GraduationCap, Target, Star, BrainCircuit, ShieldAlert } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import BorderBeam from "../ui/BorderBeam";

// --- Float Counter ---
function CounterFloat({ value, decimals = 2 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// --- Integer Counter ---
function CounterInt({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest) + suffix);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-32 relative">
      {/* Background drifting glow elements */}
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">01. Who I am</h2>
          <h3 className="text-4xl font-heading font-bold">About Me</h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-stretch"
        >
          {/* Left / Main Content */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed flex flex-col justify-between"
          >
            <div className="space-y-6">
              <p className="text-xl text-white font-heading font-light leading-relaxed">
                Hello! I am a passionate <span className="text-primary font-bold">Information Science & Engineering</span> student dedicated to creating clean backend systems, scalable architectures, and modern web application logic.
              </p>
              <p className="text-base">
                I focus heavily on building scalable APIs using Java, Spring Boot, React, and MySQL. I love taking down complex architectural challenges, working through logical pipelines, and integrating smart AI models into production.
              </p>

              <div className="pt-6 relative rounded-2xl p-6 bg-white/[0.01] border border-white/5 overflow-hidden group">
                {/* Micro Border Beam */}
                <BorderBeam duration={12} colorFrom="var(--primary)" colorTo="transparent" />
                <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                  <GraduationCap className="text-primary" size={20} /> Education
                </h4>
                <p className="text-sm font-mono text-primary font-bold">Bachelor of Engineering (Information Science & Engineering)</p>
                <p className="text-sm text-white/80">Gopalan College of Engineering and Management (2023 - Present)</p>
                <p className="text-xs text-muted-foreground mt-2">Specializing in algorithms, database management, and object-oriented systems engineering.</p>
              </div>
            </div>

            {/* Quick Stats Grid with stagger reveal */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {/* Stat 1: Projects */}
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group border-white/5 hover:border-primary/40 transition-colors">
                <div className="text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Briefcase size={22} />
                </div>
                <div className="text-3xl font-bold font-heading text-white">
                  <CounterInt value={5} suffix="+" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Projects Built</div>
              </SpotlightCard>

              {/* Stat 2: TEDxGCEM */}
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group border-white/5 hover:border-red-500/40 transition-colors">
                <div className="text-red-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Users size={22} />
                </div>
                <div className="text-sm font-black font-heading text-red-500 tracking-tighter">TEDxGCEM</div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Production</div>
              </SpotlightCard>

              {/* Stat 3: CGPA */}
              <SpotlightCard className="p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group border-white/5 hover:border-accent/40 transition-colors">
                <div className="text-accent group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                  <Star size={22} />
                </div>
                <div className="text-3xl font-bold font-heading text-white">
                  <CounterFloat value={7.82} />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">CGPA</div>
              </SpotlightCard>
            </div>
          </motion.div>

          {/* Right Column / Target Goals */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 h-full flex"
          >
            <SpotlightCard className="p-8 h-full flex flex-col justify-between relative overflow-hidden group border-white/5 hover:border-accent/30 w-full">
              {/* Moving Border Beam around card */}
              <BorderBeam duration={7} colorFrom="#A855F7" colorTo="#06B6D4" />

              <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />

              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 select-none">
                  <Target className="text-accent" /> Career Goals
                </h4>
                
                <ul className="space-y-6 text-sm text-muted-foreground">
                  {[
                    { icon: <BrainCircuit size={16} className="text-primary mt-1 shrink-0" />, text: "Engineer high-availability backend solutions that solve critical clinical and business workflows." },
                    { icon: <Star size={16} className="text-accent mt-1 shrink-0" />, text: "Master cloud microservices, transactional consistency, and high-performance databases." },
                    { icon: <GraduationCap size={16} className="text-primary mt-1 shrink-0" />, text: "Contribute to standard setting open source libraries in Java and the Spring community." }
                  ].map((goal, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                      key={i} 
                      className="flex gap-3 items-start hover:text-white transition-colors duration-300"
                    >
                      {goal.icon}
                      <span>{goal.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Status footer inside goals card */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">Status</span>
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Actively Learning
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
