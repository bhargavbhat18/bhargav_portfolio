"use client";

import { motion } from "framer-motion";
import { Mic, Users, Megaphone, MonitorPlay } from "lucide-react";

export default function TEDxGCEM() {
  const roles = [
    { icon: <Users />, title: "Speaker Management", desc: "Curated and managed 10+ high-profile speakers, ensuring seamless technical onboarding." },
    { icon: <MonitorPlay />, title: "Technical Setup", desc: "Orchestrated the entire AV setup and live streaming architecture for 500+ virtual attendees." },
    { icon: <Megaphone />, title: "Branding", desc: "Designed and implemented the core digital brand identity across social media and the official website." },
  ];

  return (
    <section id="tedx" className="py-32 relative bg-surface/30 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-2 rounded-[2.5rem] rotate-[-2deg] border-red-500/20 hover:rotate-0 transition-transform duration-500">
              <div className="bg-[#111] rounded-[2rem] p-12 text-center border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,0,0,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-pulse" />
                <h3 className="text-5xl font-black tracking-tighter text-white mb-2 relative z-10">
                  <span className="text-red-600">TEDx</span>GCEM
                </h3>
                <p className="text-sm font-mono text-muted-foreground relative z-10">Production Team Member</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-2">07. Special Showcase</h2>
            <h3 className="text-4xl font-heading font-bold mb-6">Orchestrating Ideas Worth Spreading</h3>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Being a Production Team Member for TEDxGCEM 2025 gave me the opportunity to coordinate stage operations, technical equipment management, and media logistics to ensure smooth event execution.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {roles.map((role, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    {role.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{role.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
