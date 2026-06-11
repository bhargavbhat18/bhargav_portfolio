"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/30 bg-surface/50 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <a href="#" className="text-2xl font-bold font-heading text-gradient tracking-tight mb-2">
            BB.
          </a>
          <p className="text-sm text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Bhargav Bhat. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: <FaGithub size={20} />, href: "https://github.com/bhargavbhat18" },
            { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/bhargavbhat18" },
            { icon: <Mail size={20} />, href: "mailto:bhargavbhathosmane321@gmail.com" },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, color: "#06B6D4" }}
              className="w-10 h-10 flex items-center justify-center rounded-full glass text-muted-foreground hover:border-primary/50 transition-colors"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
