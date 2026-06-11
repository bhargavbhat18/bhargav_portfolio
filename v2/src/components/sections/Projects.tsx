"use client";

import VitaGuardCard from "./VitaGuardCard";
import RegularProjectCard from "./RegularProjectCard";

export default function Projects() {
  const projects = [
    {
      title: "E-Commerce Web Application",
      category: "Full Stack",
      description: "Designed and developed a full-stack e-commerce platform with secure authentication, product catalog management, order tracking, and scalable backend architecture.",
      tech: ["Java", "Spring Boot", "REST APIs", "MySQL"],
      github: "https://github.com/bhargavbhat18/E-Commerce-Web-Application",
      demo: "#",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Theater Seat Booking System",
      category: "Backend & Systems",
      description: "Developed a real-time seat booking platform that handles seat reservations, booking workflows, and payment integration while preventing double bookings.",
      tech: ["Java", "Spring Boot", "MySQL", "REST APIs"],
      github: "https://github.com/bhargavbhat18/Theater-Seat-Booking-System/tree/main/Book-My-Show-master",
      demo: "#",
      gradient: "from-purple-500/20 to-pink-500/20",
    }
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">03. Featured Work</h2>
          <h3 className="text-4xl font-heading font-bold">Projects</h3>
        </div>

        <VitaGuardCard />

        {/* Regular Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <RegularProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
