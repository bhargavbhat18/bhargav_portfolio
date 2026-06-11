"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, ArrowRight, Mail, Terminal } from "lucide-react";
import Magnetic from "../ui/Magnetic";

// --- Typewriter Component ---
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const cursorTimeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(cursorTimeout);
  }, [blink]);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} text-primary font-bold`}>|</span>
    </span>
  );
}

// --- Main Hero Component ---
export default function Hero() {
  const [toastMessage, setToastMessage] = useState("");
  const sectionRef = useRef<HTMLDivElement>(null);
  const resumeUrl = "/resume/Bhargav_Bhat_Resume.pdf";

  // Mouse Parallax coordinates (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 25 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse positions to different layers for parallax
  const ring1X = useTransform(springX, (val) => val * 20);
  const ring1Y = useTransform(springY, (val) => val * 20);
  const ring2X = useTransform(springX, (val) => val * -30);
  const ring2Y = useTransform(springY, (val) => val * -30);
  const innerCardX = useTransform(springX, (val) => val * 40);
  const innerCardY = useTransform(springY, (val) => val * 40);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/30 w-fit relative overflow-hidden group/badge">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="w-2 h-2 rounded-full bg-primary absolute" />
            <span className="text-xs font-mono text-primary font-medium tracking-wide relative z-10">Available for Work</span>
          </div>

          {/* Title with reveal */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tighter text-white">
            Full Stack <br />
            <span className="text-gradient font-black text-shine-active">
              <Typewriter words={["Developer", "Backend Architect", "Systems Engineer", "AI Builder"]} />
            </span>
          </h1>

          <p className="text-lg text-muted-foreground font-sans max-w-xl leading-relaxed">
            I'm <strong className="text-white">Bhargav Bhat</strong>. A detail-oriented Software Engineer specializing in Java, Spring Boot, React, and Python. Passionate about scaling backend architectures, designing clean APIs, and constructing AI integrations.
          </p>
          
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-accent">
            {["Java", "Spring Boot", "React.js", "Python", "REST APIs", "MySQL"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:border-accent hover:text-white transition-colors">
                {tag}
              </span>
            ))}
          </div>

          {/* Action CTAs (Magnetic) */}
          <div className="flex flex-wrap items-center gap-4 mt-4 relative">
            <Magnetic>
              <a 
                href="#projects"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="/resume/Bhargav_Bhat_Resume.pdf"
                onClick={handleDownload}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card text-white hover:border-primary/50 transition-all border border-white/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <Download size={18} className="text-primary group-hover:animate-bounce" /> Download Resume
              </a>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="#contact"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-semibold transition-all glow-cyan relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-primary scale-0 group-hover:scale-100 rounded-xl transition-transform duration-300 origin-center" />
                <span className="relative z-10 flex items-center gap-2">Contact Me <Mail size={18} /></span>
              </a>
            </Magnetic>

            {/* Toast Notification */}
            {toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-14 left-0 glass border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm flex items-center shadow-lg"
              >
                {toastMessage}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Right Graphic: Multi-Layer Parallax Concentric Rings */}
        <div className="relative lg:ml-auto w-full max-w-md aspect-square flex items-center justify-center select-none">
          
          {/* Layer 1: Outer Dotted Ring */}
          <motion.div
            style={{ x: ring1X, y: ring1Y }}
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-96 h-96 rounded-full border border-dashed border-white/5 pointer-events-none"
          />

          {/* Layer 2: Glowing Middle Gradient Ring */}
          <motion.div
            style={{ x: ring2X, y: ring2Y }}
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-80 h-80 rounded-full border border-gradient-to-tr from-cyan-500/20 to-purple-500/20 border-white/10 opacity-60 pointer-events-none"
          />

          {/* Layer 3: Inner Parallax Glass Card */}
          <motion.div
            style={{ x: innerCardX, y: innerCardY }}
            whileHover={{ scale: 1.03 }}
            className="relative w-72 h-72 rounded-3xl glass border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden group cursor-pointer"
          >
            {/* Spotlight reflection on card hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(150px circle at 50% 50%, rgba(6, 182, 212, 0.1), transparent 80%)`,
              }}
            />

            <div className="w-4/5 h-4/5 rounded-2xl overflow-hidden border border-white/5 bg-[#0D0D0D] p-8 flex flex-col items-center justify-center text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15)_0%,transparent_70%)]" />
              <h2 className="text-5xl font-heading font-black text-white group-hover:scale-110 transition-transform duration-500 tracking-tight">BB.</h2>
              <p className="text-[10px] font-mono text-white/40 mt-3 flex items-center gap-1"><Terminal size={10} className="text-primary animate-pulse" /> dev.active</p>
            </div>
          </motion.div>

          {/* Floating badge 1 */}
          <motion.div 
            style={{ x: innerCardX, y: innerCardY }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-8 left-0 px-4 py-2 rounded-xl glass border border-primary/20 font-mono text-[10px] text-primary shadow-lg"
          >
            Java / Spring Boot
          </motion.div>

          {/* Floating badge 2 */}
          <motion.div 
            style={{ x: ring2X, y: ring2Y }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-12 right-0 px-4 py-2 rounded-xl glass border border-accent/20 font-mono text-[10px] text-accent shadow-lg"
          >
            React.js / Next.js
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest">Scroll Down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
