"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { Briefcase, Users, GraduationCap, Target } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

// --- Float Counter ---
function CounterFloat({ value, decimals = 2 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.5, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// --- Integer Counter ---
function CounterInt({ value, suffix = "" }: { value: number; suffix?: string }) {
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

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">01. Who I am</h2>
          <h3 className="text-4xl font-heading font-bold">About Me</h3>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed flex flex-col justify-between"
          >
            <div className="space-y-6">
              <p className="text-lg text-white">
                Hello! I am an Information Science and Engineering student passionate about software development, backend engineering, and AI technologies.
              </p>
              <p>
                I enjoy building scalable applications using Java, Spring Boot, React, and modern development tools. I continuously improve my skills through projects, hackathons, certifications, and technical leadership roles.
              </p>
              <div className="pt-4">
                <h4 className="text-white font-bold mb-2">Education</h4>
                <p className="text-sm font-mono text-primary">Bachelor of Engineering (Information Science & Engineering)</p>
                <p className="text-sm text-white/70">Gopalan College of Engineering and Management (2023 - Present)</p>
              </div>
            </div>

            {/* Quick Stats Grid using SpotlightCard & counters */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {/* Stat 1: Projects */}
              <SpotlightCard className="p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group hover:border-primary/50 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform"><Briefcase size={22} /></div>
                <div className="text-2xl font-bold font-heading text-white">
                  <CounterInt value={5} suffix="+" />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">Projects Built</div>
              </SpotlightCard>

              {/* Stat 2: TEDxGCEM */}
              <SpotlightCard className="p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group hover:border-primary/50 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform"><Users size={22} /></div>
                <div className="text-sm font-bold font-heading text-white line-clamp-1 py-1">TEDxGCEM</div>
                <div className="text-[10px] font-mono text-muted-foreground">Production & Design</div>
              </SpotlightCard>

              {/* Stat 3: CGPA */}
              <SpotlightCard className="p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group hover:border-primary/50 transition-colors">
                <div className="text-primary group-hover:scale-110 transition-transform"><GraduationCap size={22} /></div>
                <div className="text-2xl font-bold font-heading text-white">
                  <CounterFloat value={7.82} />
                </div>
                <div className="text-[10px] font-mono text-muted-foreground">CGPA</div>
              </SpotlightCard>
            </div>
          </motion.div>

          {/* Right Column / Target Goals using SpotlightCard */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2"
          >
            <SpotlightCard className="p-8 h-full flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors pointer-events-none" />
              
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Target className="text-accent" /> Career Goals
              </h4>
              <ul className="space-y-5 text-sm text-muted-foreground">
                {[
                  "Build impactful software that solves complex real-world problems.",
                  "Master distributed systems, microservices, and AI integrations.",
                  "Contribute significantly to major open-source repositories."
                ].map((goal, i) => (
                  <motion.li 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    key={i} 
                    className="flex gap-3 items-start"
                  >
                    <span className="text-primary font-black mt-0.5">•</span>
                    <span>{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
