"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail } from "lucide-react";

export default function Hero() {
  const [toastMessage, setToastMessage] = useState("");
  const resumeUrl = "/resume/Bhargav_Bhat_Resume.pdf";

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(resumeUrl, { method: "HEAD" });
      
      console.log("Analytics Event: Resume Download Attempted");

      if (res.ok) {
        console.log("Analytics Event: Resume Download Successful");
        const a = document.createElement("a");
        a.href = resumeUrl;
        a.download = "Bhargav_Bhat_Resume.pdf";
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        throw new Error("File not found");
      }
    } catch (error) {
      console.error("Analytics Event: Resume Download Failed", error);
      setToastMessage("Resume is currently unavailable.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
      {/* Background Animated Gradient Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-primary/30 w-fit">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="w-2 h-2 rounded-full bg-primary absolute" />
            <span className="text-xs font-mono text-primary font-medium tracking-wide">Available for Work</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tighter">
            Full Stack <br />
            <span className="text-gradient font-extrabold glow-cyan relative">Developer</span>
          </h1>

          <p className="text-lg text-muted-foreground font-sans max-w-xl leading-relaxed">
            I'm <strong className="text-white">Bhargav Bhat</strong>. A detail-oriented Full Stack Developer with expertise in Java, Spring Boot, REST APIs, SQL, Python, and React. Passionate about building scalable web applications, backend systems, and AI-powered solutions that solve real-world problems.
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-accent">
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Java</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Spring Boot</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">React</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10">AI Enthusiast</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-4 relative">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-colors"
            >
              View Projects <ArrowRight size={18} />
            </motion.a>
            <motion.a 
              href="/resume/Bhargav_Bhat_Resume.pdf"
              onClick={handleDownload}
              download="Bhargav_Bhat_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass-card text-white hover:border-primary/50 transition-colors cursor-pointer"
            >
              <Download size={18} className="text-primary" /> Download Resume
            </motion.a>
            <motion.a 
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-semibold transition-colors glow-cyan"
            >
              Contact Me <Mail size={18} />
            </motion.a>

            {/* Toast Notification */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-14 left-0 glass border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm flex items-center shadow-lg"
              >
                {toastMessage}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Image/Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative lg:ml-auto w-full max-w-md aspect-square rounded-3xl glass-card border-primary/20 overflow-hidden flex items-center justify-center group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative w-4/5 h-4/5 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#06b6d433_0%,transparent_60%)]" />
               <h2 className="text-4xl font-heading font-bold text-white z-10 mb-2">BB.</h2>
               <p className="text-sm font-mono text-muted-foreground z-10">&lt;coder/&gt;</p>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 -left-6 px-4 py-2 rounded-lg glass border-primary/30 font-mono text-xs text-primary"
          >
            Java / Spring Boot
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-20 -right-4 px-4 py-2 rounded-lg glass border-accent/30 font-mono text-xs text-accent"
          >
            React
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
