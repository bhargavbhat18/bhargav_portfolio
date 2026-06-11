"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Heart } from "lucide-react";

export default function Certifications() {
  const certs = [
    { name: "Java Full Stack Development", issuer: "Certification" },
    { name: "Spring Boot Development", issuer: "Certification" },
    { name: "Generative AI", issuer: "Certification" },
    { name: "Infosys Certifications", issuer: "Infosys" },
    { name: "Coursera Certifications", issuer: "Coursera" },
    { name: "Udemy Certifications", issuer: "Udemy" },
    { name: "Edubridge Certifications", issuer: "Edubridge" },
  ];

  const interests = [
    "Open Source Development",
    "Artificial Intelligence",
    "Cricket",
    "Music",
    "Strategic Gaming"
  ];

  return (
    <section id="certifications" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        
        {/* Certifications */}
        <div>
          <div className="mb-10">
            <h2 className="text-sm font-mono text-accent uppercase tracking-widest mb-2">05. Knowledge base</h2>
            <h3 className="text-4xl font-heading font-bold flex items-center gap-3">
              Certifications <BadgeCheck className="text-accent" size={32} />
            </h3>
          </div>
          <div className="grid gap-4">
            {certs.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-accent/40 transition-colors hover:glow-purple"
              >
                <div>
                  <h4 className="text-white font-bold text-base mb-1">{cert.name}</h4>
                  <span className="text-sm text-muted-foreground">{cert.issuer}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <div className="mb-10">
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">06. Beyond Code</h2>
            <h3 className="text-4xl font-heading font-bold flex items-center gap-3">
              Interests <Heart className="text-primary" size={32} />
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            {interests.map((interest, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card px-6 py-4 rounded-full border border-primary/20 text-white font-medium hover:border-primary/60 transition-colors"
              >
                {interest}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
