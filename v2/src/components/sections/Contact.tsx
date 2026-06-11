"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import Magnetic from "../ui/Magnetic";
import BorderBeam from "../ui/BorderBeam";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    
    setStatus("sending");
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1800);
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Background drifting glow elements */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">08. What's Next?</h2>
          <h3 className="text-4xl font-heading font-bold">Get In Touch</h3>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto font-light leading-relaxed">
            I'm currently seeking internships or new opportunities. If you have an inquiry, a project proposal, or just want to connect, feel free to drop a message!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Contact Details (Left side) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6 flex flex-col justify-between"
          >
            {[
              { icon: <Mail size={20} />, title: "Email Address", value: "bhargavbhathosmane321@gmail.com", href: "mailto:bhargavbhathosmane321@gmail.com", hoverClass: "hover:border-primary/40" },
              { icon: <Phone size={20} />, title: "Phone Line", value: "+91 8073897451", href: "tel:+918073897451", hoverClass: "hover:border-accent/40" },
              { icon: <MapPin size={20} />, title: "Current Office", value: "Bengaluru, India", href: null, hoverClass: "hover:border-primary/40" }
            ].map((item, i) => (
              <SpotlightCard key={i} className={`p-6 flex items-center gap-5 group border-white/5 transition-colors ${item.hoverClass}`}>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-primary group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white/50 uppercase font-mono tracking-wider mb-1">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold text-white hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold text-white">{item.value}</span>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* Form Container (Right side) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 h-full flex"
          >
            <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden flex-1 flex flex-col justify-center">
              {/* Border beam reveal */}
              <BorderBeam duration={10} colorFrom="#A855F7" colorTo="#06B6D4" />

              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 relative z-10"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Your Name</label>
                        <input 
                          required
                          type="text" 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-black/50 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 rounded-2xl px-4 py-3.5 text-white text-sm focus:shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-white/10 transition-all focus:outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Email Address</label>
                        <input 
                          required
                          type="email" 
                          id="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/50 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 rounded-2xl px-4 py-3.5 text-white text-sm focus:shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-white/10 transition-all focus:outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Message Text</label>
                      <textarea 
                        required
                        id="message" 
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-black/50 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/25 rounded-2xl px-4 py-3.5 text-white text-sm focus:shadow-[0_0_20px_rgba(6,182,212,0.12)] hover:border-white/10 transition-all resize-none focus:outline-none"
                        placeholder="How can I help you?"
                      />
                    </div>

                    <Magnetic className="w-full flex">
                      <button 
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-4 rounded-2xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] transition-all cursor-pointer overflow-hidden disabled:opacity-50 text-sm"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Transmitting Packet...
                          </>
                        ) : (
                          <>
                            Send Message <Send size={16} />
                          </>
                        )}
                      </button>
                    </Magnetic>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-10 h-full relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 250, damping: 15 }}
                      className="text-primary mb-6"
                    >
                      <CheckCircle size={60} className="glow-cyan rounded-full bg-primary/10 border border-primary/20 p-1" />
                    </motion.div>
                    <h4 className="text-2xl font-bold font-heading text-white mb-2">Transmission Successful</h4>
                    <p className="text-sm text-muted-foreground max-w-sm mb-8 font-light">
                      Thanks for reaching out! I've received your packet and will return a response shortly.
                    </p>
                    <Magnetic>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:border-primary/40 text-white font-mono text-xs transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </Magnetic>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
