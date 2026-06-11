import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      {eyebrow && (
        <p className="font-mono-custom text-xs font-bold tracking-[0.25em] text-[var(--accent-green)] uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[var(--accent-green)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-5 mx-auto w-16 h-0.5 rounded-full bg-[var(--accent-green)] shadow-[0_0_10px_rgba(46,204,113,0.5)]" />
    </motion.div>
  );
}
