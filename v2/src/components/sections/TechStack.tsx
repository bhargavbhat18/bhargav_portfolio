"use client";

import { motion } from "framer-motion";

export default function TechStack() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl group hover:border-primary/40 hover:glow-cyan transition-all duration-300"
            >
              <h4 className="text-lg font-bold text-white mb-6 font-heading group-hover:text-primary transition-colors">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-xs font-mono text-muted-foreground group-hover:border-white/10 group-hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
