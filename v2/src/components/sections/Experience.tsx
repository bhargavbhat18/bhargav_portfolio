"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

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

  return (
    <section id="experience" className="py-32 relative bg-surface/30">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">04. My Journey</h2>
          <h3 className="text-4xl font-heading font-bold">Experience</h3>
        </div>

        <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Node */}
              <div className="absolute top-0 -left-[25px] w-12 h-12 rounded-full glass border border-primary/50 flex items-center justify-center glow-cyan bg-background">
                <Briefcase size={20} className="text-primary" />
              </div>

              {/* Content Card */}
              <div className="glass p-8 rounded-3xl group hover:border-primary/40 transition-colors duration-300">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
