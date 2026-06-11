"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import BorderBeam from "../ui/BorderBeam";

export default function Experience() {
  const experiences = [
    {
      role: "Production Team Member",
      company: "TEDxGCEM",
      duration: "2025",
      location: "Bengaluru, IN",
      description: "Coordinated stage operations, high-fidelity technical AV routing, and media pipeline logistics to guarantee smooth event delivery for attendees.",
    },
    {
      role: "Participant",
      company: "Smart India Hackathon",
      duration: "2025",
      location: "National Stage",
      description: "Co-developed complex microservice backend architectures and secure authentication interfaces to solve real-world industry problem statements in a 36-hour sprint.",
    },
    {
      role: "Production Head",
      company: "Estralis College Fest",
      duration: "2026",
      location: "Bengaluru, IN",
      description: "Led technical operations, equipment vendor logistics, and team allocations for a large-scale university cultural festival.",
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position to draw the line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Fade out timeline glow towards the end
  const pathOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0.5]);

  return (
    <section id="experience" className="py-32 relative bg-surface/30">
      {/* Drifting background glow */}
      <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-20">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">04. My Journey</h2>
          <h3 className="text-4xl font-heading font-bold">Experience</h3>
        </div>

        <div ref={containerRef} className="relative ml-4 md:ml-8 space-y-16">
          {/* Background track timeline line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/5 rounded-full" />
          
          {/* Active drawing line with neon gradient */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY, opacity: pathOpacity }}
              className="w-full h-full bg-gradient-to-b from-primary via-[#6366F1] to-accent origin-top shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            />
          </div>

          {/* Timeline Nodes */}
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-8 md:pl-16 group/node"
            >
              {/* Pulsing Timeline Node */}
              <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ 
                  scale: 1, 
                  borderColor: "rgb(6,182,212)", 
                  backgroundColor: "rgba(6,182,212,0.15)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.3)"
                }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-1 -left-[20px] w-10 h-10 rounded-full border border-white/10 bg-[#0A0A0A] flex items-center justify-center z-10 transition-colors duration-300"
              >
                <Briefcase size={16} className="text-primary group-hover/node:rotate-6 transition-transform" />
              </motion.div>

              {/* Sturdy Glass card with Border Beam on active hover */}
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between group/card border-white/5 hover:border-primary/20 relative overflow-hidden">
                {/* Slow border beam */}
                <BorderBeam duration={8} colorFrom="var(--primary)" colorTo="transparent" className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 border-b border-white/5 pb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover/card:text-primary transition-colors font-heading tracking-tight">{exp.role}</h4>
                    <span className="text-sm font-mono text-accent font-semibold">{exp.company}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] font-mono text-white/40"><MapPin size={10} /> {exp.location}</span>
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                      <Calendar size={10} className="text-primary" /> {exp.duration}
                    </span>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-light">
                  {exp.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
