"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Maximize2, Minimize2, TerminalIcon } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "system";
}

const COMMAND_LIST = ["help", "about", "skills", "projects", "contact", "github", "resume", "vitaguard", "clear"];

export default function TerminalSection() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Bhargav Portfolio OS [Version 2.0.0]", type: "system" },
    { text: "(c) 2026 Bhargav Bhat. All rights reserved.", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
  ]);
  const [suggestion, setSuggestion] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on terminal body click
  const focusTerminal = () => {
    inputRef.current?.focus();
    setIsFocused(true);
  };

  // Scroll to bottom on history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Compute autocomplete suggestion based on typing prefix
  useEffect(() => {
    if (!input.trim()) {
      setSuggestion("");
      return;
    }
    const match = COMMAND_LIST.find(cmd => 
      cmd.startsWith(input.toLowerCase()) && cmd !== input.toLowerCase()
    );
    setSuggestion(match || "");
  }, [input]);

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

  // Process entered commands
  const handleCommand = (cmdStr: string) => {
    const trimmedCmd = cmdStr.trim().toLowerCase();
    const newHistory = [...history, { text: `visitor@bhargav-portfolio:~$ ${cmdStr}`, type: "input" as const }];

    if (!trimmedCmd) {
      setHistory(newHistory);
      return;
    }

    let responses: { text: string; type: "output" | "error" | "system" }[] = [];

    switch (trimmedCmd) {
      case "help":
        responses = [
          { text: "Available commands:", type: "system" },
          { text: "  about      - Read short biography and background info", type: "output" },
          { text: "  skills     - View technical stacks and language competencies", type: "output" },
          { text: "  projects   - Browse list of flagship & featured projects", type: "output" },
          { text: "  contact    - Display direct contact channels & email", type: "output" },
          { text: "  github     - Launch GitHub profile in a new browser tab", type: "output" },
          { text: "  resume     - Trigger a local download of the resume PDF", type: "output" },
          { text: "  vitaguard  - View architecture details of VitaGuard Suite", type: "output" },
          { text: "  clear      - Wipe clean the terminal screen log", type: "output" },
        ];
        break;
      case "about":
        responses = [
          { text: "Bhargav Bhat - Software Engineer & AI Builder", type: "system" },
          { text: "Specializing in JVM architectures, scalable microservices, and modern frontend interfaces.", type: "output" },
          { text: "Passionate about creating clean, optimized code architectures and robust developer systems.", type: "output" },
        ];
        break;
      case "skills":
        responses = [
          { text: "LANGUAGES:   Java, Python, SQL, JavaScript, TypeScript, HTML/CSS", type: "output" },
          { text: "FRAMEWORKS:  Spring Boot, React, Next.js, Hibernate, Spring Security", type: "output" },
          { text: "PLATFORMS:   Node.js, Git, Firebase, Android CLI, Docker, MySQL", type: "output" },
        ];
        break;
      case "projects":
        responses = [
          { text: "1. VitaGuard (Flagship Suite) - Secure distributed health records ecosystem.", type: "system" },
          { text: "   - Stack: Java, Spring Boot, MySQL, REST APIs, Android, Firebase", type: "output" },
          { text: "2. E-Commerce Platform - Scalable backend retail hub with token auth.", type: "system" },
          { text: "   - Stack: Java, Spring Boot, REST APIs, MySQL", type: "output" },
          { text: "3. Theater Seat Booking - Seat locking system resisting concurrency races.", type: "system" },
          { text: "   - Stack: Java, Spring Boot, MySQL, Concurrent Locks", type: "output" },
        ];
        break;
      case "contact":
        responses = [
          { text: "Email:      bhargavbhathosmane321@gmail.com", type: "output" },
          { text: "Phone:      +91 8073897451", type: "output" },
          { text: "Location:   Bengaluru, India", type: "output" },
          { text: "LinkedIn:   linkedin.com/in/bhargavbhat18", type: "output" },
        ];
        break;
      case "github":
        responses = [{ text: "Launching GitHub profile (https://github.com/bhargavbhat18)...", type: "system" }];
        window.open("https://github.com/bhargavbhat18", "_blank");
        break;
      case "resume":
        responses = [{ text: "Downloading resume file (Bhargav_Bhat_Resume.pdf)...", type: "system" }];
        handleDownloadResume();
        break;
      case "vitaguard":
        responses = [
          { text: "VITAGUARD TELEMETRY SYSTEM v1.0.4", type: "system" },
          { text: "Status: ACTIVE DEPLOYMENT", type: "output" },
          { text: "Core endpoints: Java Spring Boot microservice.", type: "output" },
          { text: "Telemetry nodes: Android patient monitoring logs with Firebase hookups.", type: "output" },
          { text: "GitHub link: https://github.com/bhargavbhat18/VitaGuard", type: "output" },
        ];
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        responses = [{ text: `sh: command not found: ${trimmedCmd}. Type 'help' for options.`, type: "error" }];
    }

    // Add entries to history with a typing/log animation stagger
    setHistory(newHistory);
    
    // Simulate real terminal typing/log print latency
    responses.forEach((resp, index) => {
      setTimeout(() => {
        setHistory(prev => [...prev, resp]);
      }, (index + 1) * 80);
    });

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Autocomplete on Tab or ArrowRight
    if ((e.key === "Tab" || e.key === "ArrowRight") && suggestion) {
      e.preventDefault();
      setInput(suggestion);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
    }
  };

  return (
    <section id="terminal" className="py-24 relative select-none">
      {/* Background spotlights */}
      <div className="absolute top-[20%] right-[10%] w-[450px] h-[450px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-12">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">07. Interactive Console</h2>
          <h3 className="text-4xl font-heading font-bold">Terminal Mode</h3>
          <p className="text-muted-foreground mt-3 text-sm font-light max-w-lg leading-relaxed">
            Prefer a command-line interface? Tap anywhere inside the terminal to boot up a session and query my portfolio metrics directly.
          </p>
        </div>

        {/* Terminal Window container */}
        <div 
          onClick={focusTerminal}
          className={`w-full bg-[#09090C] border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
            isFocused ? "border-primary/40 shadow-primary/5" : "border-white/5 shadow-black"
          }`}
        >
          {/* Terminal Window Header */}
          <div className="bg-[#101015] border-b border-white/5 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/35">
              <TerminalIcon size={12} className={isFocused ? "text-primary" : ""} />
              <span>guest@bhargavbhat.dev: ~</span>
            </div>

            <div className="w-6" /> {/* Spacer */}
          </div>

          {/* Terminal Screen Body */}
          <div className="p-6 h-[320px] overflow-y-auto font-mono text-xs text-white/85 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-white/5 pr-4">
            
            {/* Command Log output */}
            <div className="flex flex-col gap-1.5">
              {history.map((line, idx) => {
                let colorClass = "text-white/80";
                if (line.type === "input") colorClass = "text-white font-semibold";
                if (line.type === "system") colorClass = "text-primary/90 font-semibold";
                if (line.type === "error") colorClass = "text-red-400 font-medium";

                return (
                  <div key={idx} className={`leading-relaxed break-all whitespace-pre-wrap ${colorClass}`}>
                    {line.text}
                  </div>
                );
              })}
            </div>

            {/* Prompt input field */}
            <div className="flex items-center relative mt-1 select-none">
              <span className="text-emerald-400 font-bold mr-2 whitespace-nowrap">visitor@bhargav-portfolio:~$</span>
              
              <div className="flex-1 flex items-center relative h-5">
                {/* Visual rendering of typed text and grey text autocompletion */}
                <div className="absolute inset-0 flex items-center pointer-events-none z-10 leading-none">
                  <span className="text-white">{input}</span>
                  {suggestion && (
                    <span className="text-white/30">
                      {suggestion.slice(input.length)}
                    </span>
                  )}
                  {/* Blinking Cursor block */}
                  <span className={`inline-block w-1.5 h-3.5 bg-primary ml-0.5 ${
                    isFocused ? "animate-pulse" : "opacity-40"
                  }`} />
                </div>

                {/* Hidden input overlay to capture keys */}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-transparent border-0 outline-none text-transparent caret-transparent focus:ring-0 absolute inset-0 z-20"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
            </div>

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Footer Bar */}
          <div className="bg-[#0D0D11] border-t border-white/5 px-6 py-2.5 flex items-center justify-between text-[9px] font-mono text-white/30">
            <div className="flex items-center gap-4">
              <span>TAB / ArrowRight Autocomplete</span>
              <span>ENTER Execute</span>
            </div>
            <div>
              Status: Connected
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
