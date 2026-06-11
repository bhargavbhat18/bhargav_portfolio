import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

export default function Contact() {
  return (
    <section id="contact" className="section-pad relative bg-[var(--bg-secondary)]">
      <div className="max-w-3xl mx-auto px-5">
        <SectionTitle title="Let's Connect" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-2xl green-border"
        >
          <form className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-bold text-[var(--text-muted)]">Name</label>
              <input
                type="text"
                id="name"
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent-green)] transition-colors"
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold text-[var(--text-muted)]">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent-green)] transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-bold text-[var(--text-muted)]">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full bg-[#181818] border border-[rgba(255,255,255,0.1)] rounded-lg p-3 text-white focus:outline-none focus:border-[var(--accent-green)] transition-colors resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button
              type="submit"
              className="mt-2 w-full py-3 rounded-lg bg-[var(--accent-green)] text-black font-bold text-base hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
