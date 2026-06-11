"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, FileText, Mail, ShieldAlert, ArrowRight, UserCheck } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Magnetic from "../ui/Magnetic";

export default function RecruiterDock() {
  const [isHovered, setIsHovered] = useState(false);

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleDownloadResume = () => {
    const resumeUrl = "/resume/Bhargav_Bhat_Resume.pdf";
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "Bhargav_Bhat_Resume.pdf";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const recruiterActions = [
    {
      label: "View Projects",
      icon: <Briefcase size={18} />,
      action: () => handleScrollToSection("projects"),
      color: "hover:text-primary hover:border-primary/40"
    },
    {
      label: "Download Resume",
      icon: <FileText size={18} />,
      action: handleDownloadResume,
      color: "hover:text-accent hover:border-accent/40"
    },
    {
      label: "Contact Me",
      icon: <Mail size={18} />,
      action: () => handleScrollToSection("contact"),
      color: "hover:text-emerald-400 hover:border-emerald-500/40"
    },
    {
      label: "GitHub Profile",
      icon: <FaGithub size={18} />,
      action: () => window.open("https://github.com/bhargavbhat18", "_blank"),
      color: "hover:text-white hover:border-white/30"
    }
  ];

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-end gap-3 group/dock select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Recruiter Badge */}
      <motion.div
        animate={{
          x: isHovered ? 0 : 8,
          scale: isHovered ? 1.05 : 1
        }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D0D11]/90 border border-primary/20 backdrop-blur-md shadow-lg text-[9px] font-mono font-bold tracking-widest text-primary uppercase cursor-pointer"
      >
        <UserCheck size={10} className="animate-pulse" />
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              Recruiter Mode
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Buttons Console */}
      <motion.div 
        animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }}
        className="bg-[#09090C]/85 backdrop-blur-xl border border-white/5 shadow-2xl rounded-2xl p-2.5 flex flex-col gap-3 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-accent/5 pointer-events-none" />
        
        {recruiterActions.map((item) => (
          <div key={item.label} className="relative flex items-center justify-end group">
            {/* Tooltip Label sliding left */}
            <span className="absolute right-[50px] opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap bg-black/85 text-[10px] font-mono font-semibold tracking-wide text-white border border-white/10 px-2.5 py-1.5 rounded-lg shadow-md">
              {item.label}
            </span>

            {/* Dock Icon Button */}
            <Magnetic>
              <button
                onClick={item.action}
                className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/50 transition-all duration-300 shadow-md ${item.color}`}
              >
                {item.icon}
              </button>
            </Magnetic>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
