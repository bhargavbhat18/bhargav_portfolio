"use client";

import { motion } from "framer-motion";
import SpotlightCard from "../ui/SpotlightCard";

export default function TechStack() {
  const row1 = ["Java", "Spring Boot", "React.js", "Python", "REST APIs", "MySQL", "JavaScript", "SQL"];
  const row2 = ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Android Studio", "Claude", "Google Gemini", "GitHub Copilot"];

  const categories = [
    {
      title: "Programming Languages",
      skills: ["Java", "Python", "JavaScript", "SQL"],
    },
    {
      title: "Frameworks & APIs",
      skills: ["Spring Boot", "REST APIs", "React.js"],
    },
    {
      title: "Databases",
      skills: ["MySQL"],
    },
    {
      title: "Developer Tools",
      skills: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Android Studio"],
    },
    {
      title: "AI Tools",
      skills: ["ChatGPT", "Claude", "Google Gemini", "GitHub Copilot"],
    },
  ];

  return (
    <section id="tech-stack" className="py-32 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-2">02. My Arsenal</h2>
          <h3 className="text-4xl font-heading font-bold">Tech Stack</h3>
        </div>

        {/* --- INFINITE SCROLLING MARQUEE ROWS --- */}
        <div className="space-y-6 mb-20 overflow-hidden relative py-4">
          {/* Gradient fade borders */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1: Leftwards */}
          <div className="flex gap-4 w-max">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 shrink-0"
            >
              {[...row1, ...row1].map((skill, i) => (
                <div 
                  key={i} 
                  className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 font-mono text-sm shadow-md hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Rightwards */}
          <div className="flex gap-4 w-max">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 shrink-0"
            >
              {[...row2, ...row2].map((skill, i) => (
                <div 
                  key={i} 
                  className="px-6 py-3 rounded-2xl bg-white/[0.02] border border-white/5 text-white/80 font-mono text-sm shadow-md hover:border-accent/50 hover:text-accent hover:shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-default"
                >
                  {skill}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Structured Categorized Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full flex flex-col justify-between p-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-6 font-heading group-hover:text-primary transition-colors">
                    {category.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <motion.span
                        whileHover={{ scale: 1.05, y: -2, borderColor: "rgba(6,182,212,0.5)", color: "#06b6d4" }}
                        key={skill}
                        className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-muted-foreground transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
