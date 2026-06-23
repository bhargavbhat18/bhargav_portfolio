"use client";

import { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useTransform, useInView } from "framer-motion";
import { FaJava, FaReact, FaPython, FaGitAlt, FaGithub, FaCode } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiJavascript, SiIntellijidea, SiAndroidstudio, SiGithubcopilot, SiOpenai } from "react-icons/si";
import { Sparkles, Terminal } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import BorderBeam from "../ui/BorderBeam";

export default function TechStack() {
  const row1 = [
    { name: "Java", icon: <FaJava /> },
    { name: "Spring Boot", icon: <SiSpringboot /> },
    { name: "React.js", icon: <FaReact /> },
    { name: "Python", icon: <FaPython /> },
    { name: "JavaScript", icon: <SiJavascript /> },
    { name: "MySQL", icon: <SiMysql /> },
    { name: "Git", icon: <FaGitAlt /> },
    { name: "GitHub", icon: <FaGithub /> }
  ];

  const row2 = [
    { name: "VS Code", icon: <FaCode /> },
    { name: "IntelliJ IDEA", icon: <SiIntellijidea /> },
    { name: "Android Studio", icon: <SiAndroidstudio /> },
    { name: "Copilot", icon: <SiGithubcopilot /> },
    { name: "ChatGPT", icon: <SiOpenai /> },
    { name: "REST APIs", icon: <Terminal size={14} /> },
    { name: "SQL", icon: <FaCode /> }
  ];

  const categories = [
    {
      title: "Programming Languages",
      icon: <FaCode className="text-primary" />,
      colorClass: "text-primary",
      borderColor: "hover:border-primary/30",
      dotColor: "bg-primary",
      hoverTextColor: "hover:text-primary",
      skills: ["Java", "Python", "JavaScript", "SQL"],
    },
    {
      title: "Frameworks & APIs",
      icon: <SiSpringboot className="text-emerald-400" />,
      colorClass: "text-emerald-400",
      borderColor: "hover:border-emerald-500/30",
      dotColor: "bg-emerald-400",
      hoverTextColor: "hover:text-emerald-400",
      skills: ["Spring Boot", "REST APIs", "React.js"],
    },
    {
      title: "Databases & Storage",
      icon: <SiMysql className="text-accent" />,
      colorClass: "text-accent",
      borderColor: "hover:border-accent/30",
      dotColor: "bg-accent",
      hoverTextColor: "hover:text-accent",
      skills: ["MySQL"],
    },
    {
      title: "Developer Tools",
      icon: <SiIntellijidea className="text-blue-400" />,
      colorClass: "text-blue-400",
      borderColor: "hover:border-blue-500/30",
      dotColor: "bg-blue-400",
      hoverTextColor: "hover:text-blue-400",
      skills: ["Git & GitHub", "VS Code", "IntelliJ IDEA", "Android Studio"],
    },
    {
      title: "AI Integrations",
      icon: <Sparkles className="text-pink-400" />,
      colorClass: "text-pink-400",
      borderColor: "hover:border-pink-500/30",
      dotColor: "bg-pink-400",
      hoverTextColor: "hover:text-pink-400",
      skills: ["Google Gemini", "Claude API", "GitHub Copilot"],
    },
  ];

  return (
    <section id="tech-stack" className="py-32 relative bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-2">My Arsenal</h2>
          <h3 className="text-4xl font-heading font-bold">Tech Stack</h3>
        </div>

        {/* --- INFINITE SCROLLING MARQUEE ROWS WITH TECH BADGES --- */}
        <div className="space-y-6 mb-24 overflow-hidden relative py-4">
          {/* Gradient fade borders */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Row 1: Leftwards */}
          <div className="flex gap-4 w-max">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 shrink-0"
            >
              {[...row1, ...row1].map((skill, i) => (
                <div 
                  key={i} 
                  className="px-5 py-3 rounded-2xl bg-white/[0.01] border border-white/5 text-white/80 font-mono text-sm shadow-md hover:border-primary/50 hover:text-primary hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-2.5"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Rightwards */}
          <div className="flex gap-4 w-max">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex gap-4 shrink-0"
            >
              {[...row2, ...row2].map((skill, i) => (
                <div 
                  key={i} 
                  className="px-5 py-3 rounded-2xl bg-white/[0.01] border border-white/5 text-white/80 font-mono text-sm shadow-md hover:border-accent/50 hover:text-accent hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-2.5"
                >
                  <span className="text-lg">{skill.icon}</span>
                  <span>{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Structured Skill Cards containing Skill Badges instead of meters */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="h-full"
            >
              <SpotlightCard className="h-full flex flex-col justify-between p-6 hover:border-primary/20 relative overflow-hidden group">
                {/* Slow border beam */}
                {idx === 0 && <BorderBeam duration={10} colorFrom="var(--primary)" colorTo="transparent" />}
                {idx === 1 && <BorderBeam duration={12} colorFrom="var(--accent)" colorTo="transparent" />}

                <div>
                  <h4 className="text-lg font-bold text-white mb-6 font-heading flex items-center gap-3 border-b border-white/5 pb-4">
                    {category.icon}
                    <span>{category.title}</span>
                  </h4>
                  
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIdx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: (idx * 0.1) + (sIdx * 0.05) }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/5 ${category.borderColor} text-white/80 ${category.hoverTextColor} text-xs font-mono transition-all duration-300 flex items-center gap-2 cursor-default`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${category.dotColor}`} />
                        <span>{skill}</span>
                      </motion.div>
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
