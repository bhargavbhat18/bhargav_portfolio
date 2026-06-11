"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, ArrowRight, Mail, Terminal } from "lucide-react";
import { FaReact, FaJava, FaPython } from "react-icons/fa";
import { SiSpringboot, SiMysql, SiJavascript } from "react-icons/si";
import Image from "next/image";
import Magnetic from "../ui/Magnetic";
import BorderBeam from "../ui/BorderBeam";

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
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span>
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} text-primary font-bold ml-1`}>|</span>
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

  const springConfig = { stiffness: 100, damping: 22, mass: 0.3 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Map mouse positions to different layers for parallax depth
  const bgGridX = useTransform(springX, (val) => val * 15);
  const bgGridY = useTransform(springY, (val) => val * 15);

  const ring1X = useTransform(springX, (val) => val * 25);
  const ring1Y = useTransform(springY, (val) => val * 25);

  const ring2X = useTransform(springX, (val) => val * -35);
  const ring2Y = useTransform(springY, (val) => val * -35);

  const avatarX = useTransform(springX, (val) => val * 45);
  const avatarY = useTransform(springY, (val) => val * 45);

  const icon1X = useTransform(springX, (val) => val * 60);
  const icon1Y = useTransform(springY, (val) => val * 40);

  const icon2X = useTransform(springX, (val) => val * -50);
  const icon2Y = useTransform(springY, (val) => val * 55);

  const icon3X = useTransform(springX, (val) => val * 55);
  const icon3Y = useTransform(springY, (val) => val * -50);

  const icon4X = useTransform(springX, (val) => val * -40);
  const icon4Y = useTransform(springY, (val) => val * -45);

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
      if (res.ok) {
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
      console.error("Resume download failed", error);
      setToastMessage("Resume is currently unavailable.");
      setTimeout(() => setToastMessage(""), 3000);
    }
  };

  // Split sentence into words for Vercel-style text slide up
  const headlineWords = "Full Stack Engineer & AI Builder".split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Grid Pattern moving with parallax */}
      <motion.div 
        data-testid="hero-grid"
        className="absolute -inset-10 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          x: bgGridX,
          y: bgGridY,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col gap-6 text-left">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-primary/20 w-fit relative overflow-hidden group/badge backdrop-blur-md shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="w-2 h-2 rounded-full bg-primary absolute" />
            <span className="text-xs font-mono text-primary font-medium tracking-wide relative z-10">Available for Work</span>
          </motion.div>

          {/* Vercel-style Word Slide Up Animation */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tighter text-white"
          >
            <div className="overflow-hidden flex flex-wrap gap-x-3">
              {headlineWords.slice(0, 3).map((word, idx) => (
                <span key={idx} className="block overflow-hidden py-1">
                  <motion.span variants={wordVariants} className="inline-block">
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>
            <div className="overflow-hidden flex flex-wrap gap-x-3">
              {headlineWords.slice(3).map((word, idx) => (
                <span key={idx} className="block overflow-hidden py-1">
                  <motion.span variants={wordVariants} className="inline-block text-gradient text-shine-active">
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Dynamic typed description */}
            <div className="text-xl font-heading text-white/80 font-semibold h-8">
              <span>I specialize in </span>
              <span className="text-primary font-bold">
                <Typewriter words={["Java Backend Architectures", "Spring Boot Scalability", "React UI Development", "AI Agent Integrations"]} />
              </span>
            </div>

            <p className="text-lg text-muted-foreground font-sans max-w-xl leading-relaxed">
              I'm <strong className="text-white">Bhargav Bhat</strong>. A detail-oriented Software Engineer specializing in building scalable backend systems, clean microservice architectures, and construction of modern web interfaces.
            </p>
          </motion.div>
          
          {/* Tech stack tags */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-accent"
          >
            {["Java", "Spring Boot", "React.js", "Python", "REST APIs", "MySQL"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-accent hover:text-white hover:bg-accent/5 transition-all duration-300">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Action CTAs (Magnetic) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap items-center gap-4 mt-4 relative"
          >
            <Magnetic>
              <a 
                href="#projects"
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] relative overflow-hidden"
              >
                View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </Magnetic>
            
            <Magnetic>
              <a 
                href="/resume/Bhargav_Bhat_Resume.pdf"
                onClick={handleDownload}
                className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card text-white hover:border-primary/50 transition-all border border-white/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
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
          </motion.div>
        </div>

        {/* Right Graphic: Floating Parallax Profile Avatar */}
        <div className="relative lg:ml-auto w-full max-w-[420px] aspect-square flex items-center justify-center select-none">
          
          {/* Layer 1: Outer Rotating Border Ring */}
          <motion.div
            style={{ x: ring1X, y: ring1Y }}
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-white/5 pointer-events-none"
          />

          {/* Layer 2: Glowing Middle Gradient Ring */}
          <motion.div
            style={{ x: ring2X, y: ring2Y }}
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute w-[310px] h-[310px] rounded-full border-2 border-transparent border-t-primary/30 border-b-accent/30 opacity-70 pointer-events-none"
          />

          {/* Layer 3: Main Parallax Avatar with Border Beam */}
          <motion.div
            style={{ x: avatarX, y: avatarY }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-[260px] h-[260px] rounded-full p-[2px] shadow-2xl flex items-center justify-center overflow-hidden cursor-pointer"
          >
            {/* Moving Border Highlight */}
            <BorderBeam duration={8} colorFrom="#06B6D4" colorTo="#A855F7" />

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 rounded-full z-0 pointer-events-none" />

            <div className="w-full h-full rounded-full overflow-hidden relative z-10 border border-white/5 bg-[#0A0A0A]">
              <Image 
                src="/avatar.png"
                alt="Bhargav Bhat Avatar"
                fill
                priority
                className="object-cover scale-[1.03] group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Floating Tech Stack Icons (3D Parallax Drifting) */}
          
          {/* React Icon */}
          <motion.div
            style={{ x: icon1X, y: icon1Y }}
            animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[5%] w-12 h-12 rounded-xl glass border border-cyan-500/30 flex items-center justify-center text-[#61DAFB] shadow-lg hover:border-cyan-400/80 transition-colors"
          >
            <FaReact size={24} />
          </motion.div>

          {/* Java Icon */}
          <motion.div
            style={{ x: icon2X, y: icon2Y }}
            animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute bottom-[15%] left-[8%] w-12 h-12 rounded-xl glass border border-red-500/30 flex items-center justify-center text-[#E76F00] shadow-lg hover:border-red-400/80 transition-colors"
          >
            <FaJava size={24} />
          </motion.div>

          {/* Spring Boot Icon */}
          <motion.div
            style={{ x: icon3X, y: icon3Y }}
            animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[12%] right-[5%] w-12 h-12 rounded-xl glass border border-green-500/30 flex items-center justify-center text-[#6DB33F] shadow-lg hover:border-green-400/80 transition-colors"
          >
            <SiSpringboot size={24} />
          </motion.div>

          {/* Python Icon */}
          <motion.div
            style={{ x: icon4X, y: icon4Y }}
            animate={{ y: [0, 12, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[18%] right-[10%] w-12 h-12 rounded-xl glass border border-blue-500/30 flex items-center justify-center text-[#3776AB] shadow-lg hover:border-blue-400/80 transition-colors"
          >
            <FaPython size={24} />
          </motion.div>

        </div>
      </div>

      {/* Floating Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-[9px] font-mono uppercase tracking-widest">Scroll Down</span>
        <div className="w-[1.5px] h-14 bg-gradient-to-b from-primary to-transparent rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
      </motion.div>
    </section>
  );
}
