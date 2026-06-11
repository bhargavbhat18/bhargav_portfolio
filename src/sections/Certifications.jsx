import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const certs = [
  { name: "Google Data Analytics Professional Certificate", issuer: "Coursera", year: "2023" },
  { name: "Java Programming Masterclass", issuer: "Udemy", year: "2022" },
  { name: "Android App Development with Kotlin", issuer: "Google", year: "2023" },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle title="Certifications" />
        <div className="grid sm:grid-cols-2 gap-4">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-5 rounded-xl border border-[rgba(255,255,255,0.05)] hover:border-[var(--accent-green)] transition-colors"
            >
              <h4 className="text-white font-bold text-base mb-1">{cert.name}</h4>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-muted)]">{cert.issuer}</span>
                <span className="text-[var(--accent-green)]">{cert.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
