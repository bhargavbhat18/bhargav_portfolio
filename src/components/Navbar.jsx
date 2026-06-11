import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useScrollSpy } from "../hooks/useScrollSpy";

const navLinks = [
  { label: "About",     href: "about" },
  { label: "Skills",    href: "skills" },
  { label: "Projects",  href: "projects" },
  { label: "Experience",href: "experience" },
  { label: "Certs",     href: "certifications" },
  { label: "Contact",   href: "contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(["hero", "about", "skills", "projects", "experience", "certifications", "achievements", "contact"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg shadow-black/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-mono-custom text-xl tracking-widest font-bold bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-purple)] text-transparent bg-clip-text hover:opacity-80 transition-opacity"
        >
          &lt;BB /&gt;
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <button
                onClick={() => scrollTo(href)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 font-medium ${
                  active === href
                    ? "text-[var(--accent-green)] bg-[rgba(46,204,113,0.1)]"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo("contact")}
            className="px-4 py-1.5 text-sm font-bold rounded-lg border border-[var(--accent-green)] text-[var(--accent-green)] hover:bg-[var(--accent-green)] hover:text-[#000] transition-colors"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[rgba(46,204,113,0.1)]"
          >
            <ul className="px-5 py-4 flex flex-col gap-2">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active === href
                        ? "text-[var(--accent-green)] bg-[rgba(46,204,113,0.1)]"
                        : "text-[var(--text-muted)] hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

