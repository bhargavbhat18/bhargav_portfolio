import { motion } from "framer-motion";
import { FiDownload, FiMail, FiArrowRight } from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personal } from "../data/portfolio";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(155,89,182,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(46,204,113,0.10) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 pt-24 pb-10 flex flex-col items-center text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6 flex flex-col items-center"
        >
          <motion.p
            variants={item}
            className="font-mono-custom text-sm font-bold tracking-widest text-[var(--accent-green)] uppercase"
          >
            JOIN THE
          </motion.p>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-bold leading-tight flex flex-wrap justify-center items-center gap-3"
          >
            <span className="text-white">Hi, I'm</span>
            <span className="text-[var(--accent-green)]">Bhargav</span>
            <span className="purple-block">Bhat</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-[var(--text-muted)] text-lg md:text-xl font-medium tracking-wide mt-2"
          >
            <span className="text-white">{personal.title}</span>
          </motion.p>

          <motion.p
            variants={item}
            className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-2xl mt-4"
          >
            {personal.tagline}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <a
              href="#"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--accent-green)] text-black text-sm font-bold hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-[rgba(46,204,113,0.3)]"
            >
               Download Resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--accent-green)] text-[var(--accent-green)] text-sm font-bold hover:bg-[var(--accent-green)] hover:text-black transition-all hover:scale-[1.02]"
            >
               Contact Me
            </button>
          </motion.div>

          {/* Social */}
          <motion.div variants={item} className="flex gap-6 pt-8">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors text-2xl"
            >
              <FaGithub />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors text-2xl"
            >
              <FaLinkedin />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-[var(--text-muted)] hover:text-[var(--accent-green)] transition-colors text-2xl"
            >
              <FiMail />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="font-mono-custom text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 rounded-full bg-gradient-to-b from-[var(--accent-green)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
