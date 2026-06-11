"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Code2, 
  Briefcase, 
  Mail, 
  Download, 
  ShieldCheck,
  Search,
  CornerDownLeft
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface CommandItem {
  id: string;
  name: string;
  description: string;
  action: () => void;
  icon: React.ReactNode;
  category: "Navigation" | "External Links" | "Resources";
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle palette on Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset indices and focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleScrollToSection = (id: string) => {
    setIsOpen(false);
    
    // Custom smooth scroll logic
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for sticky navbar
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
    setIsOpen(false);
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

  const commands: CommandItem[] = [
    {
      id: "nav-home",
      name: "Go to Home",
      description: "Navigate to the top introduction banner",
      icon: <Home size={16} />,
      category: "Navigation",
      action: () => handleScrollToSection("home"),
    },
    {
      id: "nav-about",
      name: "Go to About",
      description: "Read bio, education and background information",
      icon: <User size={16} />,
      category: "Navigation",
      action: () => handleScrollToSection("about"),
    },
    {
      id: "nav-skills",
      name: "Go to Skills",
      description: "View technical credentials and coding tool stack",
      icon: <Code2 size={16} />,
      category: "Navigation",
      action: () => handleScrollToSection("tech-stack"),
    },
    {
      id: "nav-projects",
      name: "Go to Projects",
      description: "Browse software portfolio projects",
      icon: <Briefcase size={16} />,
      category: "Navigation",
      action: () => handleScrollToSection("projects"),
    },
    {
      id: "nav-contact",
      name: "Go to Contact",
      description: "Send direct feedback packets or hire inquiries",
      icon: <Mail size={16} />,
      category: "Navigation",
      action: () => handleScrollToSection("contact"),
    },
    {
      id: "link-github",
      name: "Open GitHub Profile",
      description: "Visit @bhargavbhat18 repositories on GitHub",
      icon: <FaGithub size={16} />,
      category: "External Links",
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/bhargavbhat18", "_blank");
      },
    },
    {
      id: "link-linkedin",
      name: "Open LinkedIn Profile",
      description: "Connect on LinkedIn with Bhargav Bhat",
      icon: <FaLinkedin size={16} />,
      category: "External Links",
      action: () => {
        setIsOpen(false);
        window.open("https://linkedin.com/in/bhargavbhat18", "_blank");
      },
    },
    {
      id: "res-resume",
      name: "Download PDF Resume",
      description: "Save a local copy of official developer resume",
      icon: <Download size={16} />,
      category: "Resources",
      action: handleDownloadResume,
    },
    {
      id: "res-vitaguard",
      name: "Open VitaGuard Repository",
      description: "Inspect flagship healthcare system architecture",
      icon: <ShieldCheck size={16} />,
      category: "Resources",
      action: () => {
        setIsOpen(false);
        window.open("https://github.com/bhargavbhat18/VitaGuard", "_blank");
      },
    },
  ];

  // Filter commands by search input
  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Manage keyboard navigations inside filtered list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Adjust scroll position of active item
  useEffect(() => {
    if (listRef.current) {
      const activeElement = listRef.current.querySelector("[data-active='true']");
      if (activeElement) {
        activeElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Categories mapping
  const categories: ("Navigation" | "External Links" | "Resources")[] = [
    "Navigation",
    "External Links",
    "Resources"
  ];

  return (
    <>
      {/* Keyboard Shortcut Indicator in Navbar Area (Floating indicator) */}
      <div 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 hover:border-primary/40 hover:bg-black/60 transition-all cursor-pointer shadow-lg backdrop-blur-md text-[10px] font-mono text-white/50 hover:text-primary-foreground group select-none"
      >
        <Search size={10} className="group-hover:text-primary transition-colors" />
        <span>Search</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] border border-white/5">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] border border-white/5">K</kbd>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh]">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#0C0C0E]/95 border border-white/10 rounded-2xl overflow-hidden glass-card shadow-[0_32px_64px_rgba(0,0,0,0.8)] flex flex-col max-h-[50vh] mx-4"
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                <Search size={18} className="text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search commands... (e.g. About, GitHub, Resume)"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1 bg-transparent border-0 outline-none text-white text-sm placeholder-white/35 focus:ring-0 focus:outline-none"
                />
                <div className="flex items-center gap-1 text-[9px] font-mono text-white/30 border border-white/10 rounded-md px-1.5 py-0.5 select-none">
                  ESC
                </div>
              </div>

              {/* Scrollable Commands List */}
              <div 
                ref={listRef}
                className="flex-1 overflow-y-auto p-2 scrollbar-none max-h-[35vh]"
              >
                {filteredCommands.length > 0 ? (
                  categories.map((category) => {
                    const categoryCmds = filteredCommands.filter(c => c.category === category);
                    if (categoryCmds.length === 0) return null;

                    return (
                      <div key={category} className="mb-2">
                        {/* Section Header */}
                        <div className="px-3 py-1.5 text-[9px] font-mono font-bold text-primary uppercase tracking-widest opacity-60 select-none">
                          {category}
                        </div>
                        
                        {/* Section Items */}
                        <div className="space-y-0.5">
                          {categoryCmds.map((cmd) => {
                            // Find absolute index inside filtered list
                            const itemIndex = filteredCommands.findIndex(c => c.id === cmd.id);
                            const isSelected = itemIndex === selectedIndex;

                            return (
                              <button
                                key={cmd.id}
                                data-active={isSelected}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(itemIndex)}
                                className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer group ${
                                  isSelected 
                                    ? "bg-white/5 border-l-2 border-primary pl-4 text-white" 
                                    : "text-white/60 hover:text-white"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                                    isSelected 
                                      ? "bg-primary/15 border-primary/30 text-primary" 
                                      : "bg-white/[0.02] border-white/5 text-white/45 group-hover:border-white/10"
                                  }`}>
                                    {cmd.icon}
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold">{cmd.name}</div>
                                    <div className="text-[10px] text-white/35 font-light leading-snug">{cmd.description}</div>
                                  </div>
                                </div>

                                {isSelected && (
                                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-white/40 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 animate-fade-in">
                                    <span>Select</span>
                                    <CornerDownLeft size={8} />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  // Bespoke Empty State SVG Animation
                  <div className="flex flex-col items-center justify-center py-10 px-4 text-center select-none">
                    <svg className="w-16 h-16 text-white/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      {/* Radar circle pulse */}
                      <circle cx="12" cy="12" r="9" className="opacity-30" />
                      <motion.circle 
                        cx="12" 
                        cy="12" 
                        r="9" 
                        stroke="#06B6D4" 
                        strokeWidth="1.5"
                        strokeDasharray="4 8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        className="origin-center"
                      />
                      {/* Magnifying Glass search */}
                      <path d="M10 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" strokeWidth="1.5" />
                      <path d="M12 12l3.5 3.5" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <div className="text-xs font-semibold text-white/80">No Commands Found</div>
                    <div className="text-[10px] text-white/40 mt-1 max-w-[200px] leading-relaxed">
                      We couldn't resolve any actions matching "{search}". Try another query.
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer Tip */}
              <div className="bg-[#101013] border-t border-white/5 px-4 py-2.5 flex items-center justify-between text-[9px] font-mono text-white/30 select-none">
                <div className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>ENTER Select</span>
                  <span>ESC Close</span>
                </div>
                <div>
                  Bhargav Portfolio OS v2.0
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
