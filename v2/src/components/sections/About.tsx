"use client";

import { motion } from "framer-motion";
import { Briefcase, Users, GraduationCap, Target } from "lucide-react";

export default function About() {
  const stats = [
    { icon: <Briefcase size={24} />, value: "5+", label: "Projects Built" },
    { icon: <Users size={24} />, value: "TEDxGCEM", label: "Organizer & Design Team" },
    { icon: <GraduationCap size={24} />, value: "7.82", label: "CGPA" },
  ];

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">01. Who I am</h2>
          <h3 className="text-4xl font-heading font-bold">About Me</h3>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3 space-y-6 text-muted-foreground leading-relaxed"
          >
            <p className="text-lg text-white">
              Hello! I am an Information Science and Engineering student passionate about software development, backend engineering, and AI technologies.
            </p>
            <p>
              I enjoy building scalable applications using Java, Spring Boot, React, and modern development tools. I continuously improve my skills through projects, hackathons, certifications, and technical leadership roles.
            </p>
            <div className="pt-4">
              <h4 className="text-white font-bold mb-2">Education</h4>
              <p className="text-sm font-mono text-primary">Bachelor of Engineering (Information Science & Engineering)</p>
              <p className="text-sm">Gopalan College of Engineering and Management (2023 - Present)</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 group hover:border-primary/50 transition-colors"
                >
                  <div className="text-primary group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <div className="text-2xl font-bold font-heading text-white">{stat.value}</div>
                  <div className="text-xs font-mono text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column / Image or Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 rounded-3xl h-full flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-colors" />
              
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="text-accent" /> Career Goals
              </h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Build impactful software that solves real-world problems.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Master distributed systems and advanced AI architectures.
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">✓</span>
                  Contribute significantly to major open-source projects.
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
