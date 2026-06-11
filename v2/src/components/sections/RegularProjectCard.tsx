"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Magnetic from "../ui/Magnetic";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  gradient: string;
}

export default function RegularProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D Tilt state
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // Smooth out the tilt
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });
  
  // Map values to rotations (-5deg to 5deg)
  const rotateX = useTransform(springY, [0, 1], [5, -5]);
  const rotateY = useTransform(springX, [0, 1], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className="glass rounded-3xl overflow-hidden group flex flex-col border border-white/5 hover:border-primary/30 transition-colors duration-500 hover:glow-purple relative"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'gridMove 20s linear infinite',
        }}
      />

      <div className="flex flex-col flex-1 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {/* Visual Placeholder */}
        <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
          <h4 className="text-2xl font-heading font-bold text-white/50 group-hover:scale-110 transition-transform duration-500">{project.title}</h4>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <span className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">{project.category}</span>
          
          <h4 className="text-xl font-bold text-white mb-3 flex flex-wrap cursor-default">
            {project.title.split(' ').map((word, wIdx) => (
              <span key={wIdx} className="mr-1.5 flex">
                {word.split('').map((char, i) => (
                  <motion.span
                    key={i}
                    className="hover:text-primary hover:scale-110 hover:-translate-y-1 transition-all duration-300 inline-block drop-shadow-md hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h4>
          
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            {project.description}
          </p>

          {/* Tech Tags */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {project.tech.map((t) => (
              <motion.span 
                variants={itemVariants}
                whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.5)", color: "rgb(168,85,247)", boxShadow: "0 0 10px rgba(168,85,247,0.2)" }}
                key={t} 
                className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground transition-all cursor-default relative overflow-hidden group/tech"
              >
                <span className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover/tech:opacity-100 transition-opacity" />
                <span className="relative z-10">{t}</span>
              </motion.span>
            ))}
          </motion.div>

          {/* Links */}
          <div className="flex items-center gap-4 mt-auto">
            <Magnetic className="flex-1 flex">
              <a href={project.github} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white text-sm font-medium transition-all group/link relative overflow-hidden">
                <span className="absolute inset-0 bg-white/5 scale-0 group-hover/link:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                <FaGithub size={16} className="group-hover/link:rotate-12 transition-transform duration-300 relative z-10" /> 
                <span className="relative z-10">GitHub Repository</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
