"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2 } from "lucide-react";
import SpotlightCard from "../ui/SpotlightCard";
import Magnetic from "../ui/Magnetic";

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
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 relative">
      {/* Floating Background Blobs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">08. What's Next?</h2>
          <h3 className="text-4xl font-heading font-bold">Get In Touch</h3>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, my inbox is open!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6 flex flex-col justify-between"
          >
            {[
              { icon: <Mail />, title: "Email", value: "bhargavbhathosmane321@gmail.com", href: "mailto:bhargavbhathosmane321@gmail.com" },
              { icon: <Phone />, title: "Phone", value: "+91 8073897451", href: "tel:+918073897451" },
              { icon: <MapPin />, title: "Location", value: "Bengaluru, India", href: null }
            ].map((item, i) => (
              <SpotlightCard key={i} className="p-6 flex items-center gap-4 group hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </motion.div>

          {/* Contact Form Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 h-full"
          >
            <div className="glass-card p-8 rounded-3xl border border-white/10 relative overflow-hidden h-full">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-xs font-mono text-muted-foreground">Name</label>
                        <input 
                          required
                          type="text" 
                          id="name" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary hover:border-white/20 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-xs font-mono text-muted-foreground">Email</label>
                        <input 
                          required
                          type="email" 
                          id="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary hover:border-white/20 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-mono text-muted-foreground">Message</label>
                      <textarea 
                        required
                        id="message" 
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary hover:border-white/20 transition-colors resize-none"
                        placeholder="How can I help you?"
                      />
                    </div>

                    <Magnetic className="w-full flex">
                      <button 
                        type="submit"
                        disabled={status === "sending"}
                        className="w-full py-4 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:bg-primary/95 transition-all glow-cyan cursor-pointer overflow-hidden disabled:opacity-50"
                      >
                        {status === "sending" ? (
                          <>
                            <Loader2 size={18} className="animate-spin" /> Sending Message...
                          </>
                        ) : (
                          <>
                            Send Message <Send size={18} />
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
                    className="flex flex-col items-center justify-center text-center py-12 h-full"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-cyan-400 mb-6"
                    >
                      <CheckCircle size={64} className="glow-cyan rounded-full" />
                    </motion.div>
                    <h4 className="text-2xl font-bold font-heading text-white mb-2">Message Sent!</h4>
                    <p className="text-sm text-muted-foreground max-w-sm mb-6">
                      Thank you for reaching out. I'll get back to you as soon as possible.
                    </p>
                    <Magnetic>
                      <button
                        onClick={() => setStatus("idle")}
                        className="px-6 py-2.5 rounded-xl border border-white/10 hover:border-primary/50 text-white font-mono text-xs transition-colors"
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
