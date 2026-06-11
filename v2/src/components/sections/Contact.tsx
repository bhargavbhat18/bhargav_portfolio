"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest mb-2">08. What's Next?</h2>
          <h3 className="text-4xl font-heading font-bold">Get In Touch</h3>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question, a project proposal, or just want to say hi, my inbox is always open!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass p-6 rounded-2xl flex items-center gap-4 group hover:glow-cyan transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Mail />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Email</h4>
                <a href="mailto:bhargavbhathosmane321@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">bhargavbhathosmane321@gmail.com</a>
              </div>
            </div>
            
            <div className="glass p-6 rounded-2xl flex items-center gap-4 group hover:glow-cyan transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Phone />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Phone</h4>
                <a href="tel:+918073897451" className="text-sm text-muted-foreground hover:text-primary transition-colors">+91 8073897451</a>
              </div>
            </div>

            <div className="glass p-6 rounded-2xl flex items-center gap-4 group hover:glow-cyan transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <MapPin />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Location</h4>
                <span className="text-sm text-muted-foreground">Bengaluru, India</span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form className="glass-card p-8 rounded-3xl space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-mono text-muted-foreground">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-mono text-muted-foreground">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-mono text-muted-foreground">Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="How can I help you?"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-4 rounded-xl bg-primary text-black font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors glow-cyan"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
