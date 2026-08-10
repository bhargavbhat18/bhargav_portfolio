"use client";

import { motion } from "framer-motion";
import { GraduationCap, Target, Star, BrainCircuit } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import BorderBeam from "../ui/BorderBeam";

export default function About() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="py-32 relative">
      {/* Background drifting glow elements */}
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">Who I am</h2>
          <h3 className="text-4xl font-heading font-bold">About Me</h3>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* Intro Text */}
          <motion.div variants={itemVariants} className="max-w-4xl space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-2xl text-white font-heading font-light leading-relaxed">
              Hello! I am a passionate <span className="text-primary font-semibold">Information Science & Engineering</span> student dedicated to creating clean backend systems, scalable architectures, and modern web application logic.
            </p>
            <p className="text-base text-white/80">
              I focus heavily on building scalable APIs using Java, Spring Boot, React, and MySQL. I love taking down complex architectural challenges, working through logical pipelines, and integrating smart AI models into production.
            </p>
          </motion.div>

          {/* Symmetrical Grid: Education & Career Goals */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Education Card */}
            <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden group border-white/5 hover:border-primary/30 w-full">
              <BorderBeam duration={9} colorFrom="var(--primary)" colorTo="transparent" />
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-[40px] pointer-events-none" />
              
              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 select-none font-heading">
                  <GraduationCap className="text-primary" /> Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-mono text-primary font-bold block uppercase tracking-wider mb-1">Bachelor of Engineering</span>
                    <h5 className="text-base font-bold text-white">Information Science & Engineering</h5>
                    <span className="text-sm text-white/70 block mt-0.5">Gopalan College of Engineering and Management</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Specializing in algorithms, database management systems, and object-oriented systems engineering. (2023 - Present)
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">Expected Graduation</span>
                <span className="text-primary font-bold">2027</span>
              </div>
            </SpotlightCard>

            {/* Career Goals Card */}
            <SpotlightCard className="p-6 sm:p-8 h-full flex flex-col justify-between relative overflow-hidden group border-white/5 hover:border-accent/30 w-full">
              <BorderBeam duration={9} colorFrom="#A855F7" colorTo="#06B6D4" />
              <div className="absolute top-0 right-0 w-36 h-36 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />

              <div>
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2 select-none font-heading">
                  <Target className="text-accent" /> Career Goals
                </h4>
                
                <ul className="space-y-4 text-sm text-muted-foreground">
                  {[
                    { icon: <BrainCircuit size={16} className="text-primary mt-1 shrink-0" />, text: "Engineer high-availability backend solutions that solve critical clinical and business workflows." },
                    { icon: <Star size={16} className="text-accent mt-1 shrink-0" />, text: "Master cloud microservices, transactional consistency, and high-performance databases." },
                    { icon: <GraduationCap size={16} className="text-primary mt-1 shrink-0" />, text: "Contribute to standard-setting open source libraries in Java and the Spring community." }
                  ].map((goal, i) => (
                    <motion.li 
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
                      key={i} 
                      className="flex gap-3 items-start hover:text-white transition-colors duration-300"
                    >
                      {goal.icon}
                      <span>{goal.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-white/40">Status</span>
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Actively Learning
                </span>
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
