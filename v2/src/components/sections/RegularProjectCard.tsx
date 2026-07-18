"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Magnetic from "../ui/Magnetic";
import BorderBeam from "../ui/BorderBeam";

interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  gradient: string;
  status?: string;
}

export default function RegularProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt coordinates
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  
  // Rotations mapped to -6 to 6 degrees
  const rotateX = useTransform(springY, [0, 1], [6, -6]);
  const rotateY = useTransform(springX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 35, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      className="glass rounded-3xl overflow-hidden group flex flex-col border border-white/5 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] relative w-full flex-1"
    >
      {/* Border Beam Animation on Hover */}
      {isHovered && (
        <BorderBeam duration={6} colorFrom="var(--primary)" colorTo="var(--accent)" />
      )}

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '45px 45px',
        }}
      />

      <div className="flex flex-col flex-1 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {/* visual banner */}
        <div className={`h-40 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center border-b border-white/5`}>
          {/* Subtle noise in banner */}
          <div className="absolute inset-0 bg-repeat opacity-[0.04]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
          
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          
          <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center text-white/60">
            <Terminal size={14} className="group-hover:text-primary transition-colors duration-300" />
          </div>
          
          <h4 className="text-xl font-heading font-black text-white/50 group-hover:scale-105 group-hover:text-white transition-all duration-500 relative z-10 select-none tracking-tight">
            {project.title.split(" ")[0]}
          </h4>
        </div>

        {/* content */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex justify-between items-start mb-1.5 gap-2">
              <span className="text-[9px] font-mono text-accent uppercase tracking-widest">{project.category}</span>
              {project.status && (
                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase tracking-widest whitespace-nowrap ${
                  project.status === "Completed" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-primary/10 text-primary border border-primary/20 animate-pulse"
                }`}>
                  {project.status}
                </span>
              )}
            </div>
            
            {/* Title character bounce animation */}
            <h4 className="text-lg font-bold text-white mb-3 flex flex-wrap cursor-default tracking-tight">
              {project.title.split(' ').map((word, wIdx) => (
                <span key={wIdx} className="mr-1.5 flex">
                  {word.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      className="hover:text-primary hover:scale-110 hover:-translate-y-0.5 transition-all duration-300 inline-block drop-shadow-md"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h4>
            
            <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-light">
              {project.description}
            </p>
          </div>

          <div>
            {/* Tech Tags */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-1.5 mb-6"
            >
              {project.tech.map((t) => (
                <motion.span 
                  variants={itemVariants}
                  whileHover={{ scale: 1.04, borderColor: "rgba(6,182,212,0.4)", color: "#06b6d4", backgroundColor: "rgba(6,182,212,0.03)" }}
                  key={t} 
                  className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground transition-all cursor-default"
                >
                  {t}
                </motion.span>
              ))}
            </motion.div>

            {/* Links */}
            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
              <Magnetic className="flex-1 flex">
                <a 
                  href={project.github} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-white text-xs font-semibold transition-all group/link relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/5 scale-0 group-hover/link:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                  <FaGithub size={14} className="group-hover/link:rotate-12 transition-transform duration-300 relative z-10" /> 
                  <span className="relative z-10">GitHub Repository</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
