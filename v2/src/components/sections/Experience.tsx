"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

export default function Experience() {
  const experiences = [
    {
      role: "Production Team Member",
      company: "TEDxGCEM",
      duration: "2025",
      description: "Coordinated stage operations, technical equipment management, and media logistics to ensure smooth event execution.",
    },
    {
      role: "Participant",
      company: "Smart India Hackathon",
      duration: "2025",
      description: "Developed backend solutions with external API integrations to solve real-world challenges during a national-level hackathon.",
    },
    {
      role: "Production Head",
      company: "Estralis College Fest",
      duration: "2026",
      description: "Led technical operations, logistics planning, and team coordination for a large-scale college festival.",
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll position to draw the timeline divider dynamically
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="experience" className="py-32 relative bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">04. My Journey</h2>
          <h3 className="text-4xl font-heading font-bold">Experience</h3>
        </div>

        <div ref={containerRef} className="relative ml-4 md:ml-6 space-y-12">
          {/* Background Track Line */}
          <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-white/5 rounded-full" />
          
          {/* Animated SVG/Path Timeline line drawing itself */}
          <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full overflow-hidden">
            <motion.div 
              style={{ scaleY }}
              className="w-full h-full bg-gradient-to-b from-primary to-accent origin-top"
            />
          </div>

          {/* Experience Timeline Grid */}
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Node - highlights on scroll entering */}
              <motion.div 
                initial={{ scale: 0.8, borderColor: "rgba(255,255,255,0.05)", backgroundColor: "#0A0A0A" }}
                whileInView={{ 
                  scale: 1, 
                  borderColor: "rgb(6,182,212)", 
                  backgroundColor: "rgba(6,182,212,0.1)",
                  boxShadow: "0 0 15px rgba(6,182,212,0.2)"
                }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="absolute top-0.5 -left-[23px] w-11 h-11 rounded-full border flex items-center justify-center z-10"
              >
                <Briefcase size={18} className="text-primary" />
              </motion.div>

              {/* Content Card with 3D Tilt */}
              <SpotlightCard className="p-6 md:p-8 flex flex-col justify-between group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{exp.role}</h4>
                    <span className="text-sm font-mono text-accent">{exp.company}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground w-fit">
                    {exp.duration}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
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
