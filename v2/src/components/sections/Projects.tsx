"use client";

import VitalGuardCard from "./VitalGuardCard";
import RegularProjectCard from "./RegularProjectCard";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Web Application",
      category: "Full Stack",
      description: "Designed and developed a full-stack e-commerce platform featuring secure user authentication, catalog queries, transaction logging, and a highly responsive checkout workflow.",
      tech: ["Java", "Spring Boot", "REST APIs", "MySQL"],
      github: "https://github.com/bhargavbhat18/E-Commerce-Web-Application",
      demo: "#",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Theater Seat Booking System",
      category: "Backend & Systems",
      description: "Developed a backend seat allocation platform that processes seat locks, scheduling grids, and concurrent payment webhooks while preventing race conditions.",
      tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
      github: "https://github.com/bhargavbhat18/Theater-Seat-Booking-System/tree/main/Book-My-Show-master",
      demo: "#",
      gradient: "from-purple-500/20 to-pink-500/20",
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      {/* Background radial spotlights */}
      <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">03. Featured Work</h2>
          <h3 className="text-4xl font-heading font-bold">Projects</h3>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Flagship Project - Spans 8 Columns */}
          <div className="lg:col-span-8 flex">
            <VitalGuardCard />
          </div>

          {/* Secondary Projects - Spans 4 Columns Stacked */}
          <div className="lg:col-span-4 flex flex-col gap-8 justify-between">
            {projects.map((project, idx) => (
              <div key={project.title} className="flex-1 flex">
                <RegularProjectCard project={project} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
