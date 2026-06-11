import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { personal } from "../data/portfolio";
import heroImg from '../assets/hero.png'; // Assume this exists or we use a placeholder

export default function About() {
  return (
    <section id="about" className="section-pad relative bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle
          title="About Me"
        />

        <div className="flex flex-col items-center">
          
          {/* Avatar/Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden green-border mb-10"
          >
            <div className="w-full h-full bg-[#181818] flex items-center justify-center">
               <span className="text-6xl text-[var(--accent-green)] font-bold">BB</span>
               {/* Replace with actual image if available: <img src={heroImg} alt="Bhargav Bhat" className="w-full h-full object-cover grayscale" /> */}
            </div>
          </motion.div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full mb-10"
          >
            <h3 className="text-xl font-bold text-[var(--accent-green)] mb-4 uppercase tracking-wider">
              Professional Summary
            </h3>
            <div className="glass p-6 rounded-2xl text-[var(--text-muted)] leading-relaxed">
              I'm Bhargav Bhat, an MCA student passionate about building impactful software. My focus spans Android Development, Full-Stack systems with Spring Boot + React, and AI-powered applications — always driven by clean code and real-world problem solving.
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <h3 className="text-xl font-bold text-[var(--accent-green)] mb-6 uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-6 relative border-l-2 border-[var(--accent-green)]/30 ml-3 pl-6">
              
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--accent-green)] shadow-[0_0_10px_rgba(46,204,113,0.5)]"></div>
                <div className="glass p-5 rounded-2xl">
                  <h4 className="text-white font-bold text-lg">Master of Computer Applications (MCA)</h4>
                  <p className="text-[var(--accent-green)] text-sm mb-2">GCEM, Bangalore · 2023–2025</p>
                  <p className="text-[var(--text-muted)] text-sm">Focus: Advanced Java, Data Structures, Mobile Computing, Machine Learning.</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--accent-green)]"></div>
                <div className="glass p-5 rounded-2xl">
                  <h4 className="text-white font-bold text-lg">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-[var(--accent-green)] text-sm mb-2">2020–2023</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
