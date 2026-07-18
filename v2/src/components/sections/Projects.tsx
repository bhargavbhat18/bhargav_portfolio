"use client";

import RegularProjectCard from "./RegularProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "VitalGuard",
      category: "Healthcare System",
      description: "A high-security, distributed healthcare environment connecting medical personnel and patients. Engineered to resolve clinical communication lags and secure health records.",
      tech: ["Java", "Spring Boot", "MySQL", "Android"],
      github: "https://github.com/bhargavbhat18/Vital-Guard",
      demo: "#",
      gradient: "from-primary/20 to-accent/20",
      status: "Active Build",
    },
    {
      title: "E-Commerce Web Application",
      category: "Full Stack",
      description: "Designed and developed a full-stack e-commerce platform featuring secure user authentication, catalog queries, transaction logging, and a highly responsive checkout workflow.",
      tech: ["Java", "Spring Boot", "REST APIs", "MySQL"],
      github: "https://github.com/bhargavbhat18/E-Commerce-Web-Application",
      demo: "#",
      gradient: "from-cyan-500/20 to-blue-500/20",
      status: "Completed",
    },
    {
      title: "Theater Seat Booking System",
      category: "Backend & Systems",
      description: "Developed a backend seat allocation platform that processes seat locks, scheduling grids, and concurrent payment webhooks while preventing race conditions.",
      tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
      github: "https://github.com/bhargavbhat18/Theater-Seat-Booking-System/tree/main/Book-My-Show-master",
      demo: "#",
      gradient: "from-purple-500/20 to-pink-500/20",
      status: "Completed",
    },
    {
      title: "Spring AI Chatbot",
      category: "AI & Backend",
      description: "An intelligent chatbot powered by Spring AI, integrating advanced natural language processing capabilities with robust Spring Boot backend architecture.",
      tech: ["Java", "Spring Boot", "Spring AI", "LLMs"],
      github: "https://github.com/bhargavbhat18/spring-ai-chatbot",
      demo: "#",
      gradient: "from-green-500/20 to-emerald-500/20",
      status: "Developing",
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      {/* Background radial spotlights */}
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">Featured Work</h2>
          <h3 className="text-4xl font-heading font-bold">Projects</h3>
        </div>

        {/* Regular Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {projects.map((project, idx) => (
            <div key={project.title} className="flex">
              <RegularProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
