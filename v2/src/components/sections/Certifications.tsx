"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Heart } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";

const certs = [
  {
    name: "Full-Stack Web Development Specialization",
    issuer: "Coursera • University of London",
    pdf: "/certificates/Coursera-9IS4T5VY4DGH.pdf",
  },
  {
    name: "Data-driven Websites: JSON, APIs and Templates",
    issuer: "Coursera",
    pdf: "/certificates/Coursera-RW146UKN2ATP.pdf",
  },
  {
    name: "CSS: Web Page Layout - Usability and Accessibility",
    issuer: "Coursera",
    pdf: "/certificates/Coursera-EVKZ1GMJR9XF.pdf",
  },
  {
    name: "HTML: How to Build a Website",
    issuer: "Coursera",
    pdf: "/certificates/Coursera-34GS3ZKQUQMZ.pdf",
  },
  {
    name: "Fundamentals of Java Programming",
    issuer: "Coursera",
    pdf: "/certificates/Coursera-3NI9OMXJKQMU.pdf",
  },
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services (AWS)",
    pdf: "/certificates/Coursera-0V9VN3DK0U57.pdf",
  },
  {
    name: "Introduction to Machine Learning on AWS",
    issuer: "Amazon Web Services (AWS)",
    pdf: "/certificates/Coursera-IFJMR6JDG7XD.pdf",
  },
];

const interests = [
  "Open Source Development",
  "Artificial Intelligence",
  "Cricket",
  "Music",
  "Strategic Gaming"
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 relative">
      {/* Background drifting glow elements */}
      <div className="absolute top-[20%] left-[5%] w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">Credentials & Passions</h2>
          <h3 className="text-4xl font-heading font-bold">Certifications & Interests</h3>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Column - Certifications (3 columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="text-primary" size={22} />
              <h4 className="text-xl font-bold text-white">Professional Certifications</h4>
            </div>
            <div className="grid gap-4">
              {certs.map((cert, idx) => (
                <motion.a
                  key={idx}
                  href={cert.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-accent/40 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div>
                    <h5 className="text-white font-bold text-base mb-1 group-hover:text-primary transition-colors">
                      {cert.name}
                    </h5>
                    <span className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </span>
                  </div>

                  <BadgeCheck
                    size={24}
                    className="text-accent group-hover:scale-110 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Column - Interests (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-red-500 fill-red-500/20" size={22} />
              <h4 className="text-xl font-bold text-white">Beyond Coding</h4>
            </div>
            <SpotlightCard className="p-8 rounded-2xl border-white/5 relative overflow-hidden group">
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                When I am not designing databases or crafting API integrations, you can find me exploring new frontiers, playing sports, or engaging with technology communities.
              </p>

              <div className="flex flex-wrap gap-3">
                {interests.map((interest, idx) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-red-500/30 text-white/90 hover:text-red-400 text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {interest}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
