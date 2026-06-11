import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";

const experiences = [
  {
    role: "Freelance Android Developer",
    company: "Self-Employed",
    duration: "2023 - Present",
    description: "Developed and published multiple Android apps focusing on utility and student life, including a platform for managing events.",
  },
  {
    role: "Full Stack Intern",
    company: "Local Tech Startup",
    duration: "Summer 2023",
    description: "Assisted in building a full-stack dashboard using React and Spring Boot. Improved query performance and implemented RESTful APIs.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative bg-[var(--bg-secondary)]">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle title="Experience" />
        <div className="space-y-6 relative border-l-2 border-[var(--accent-green)]/30 ml-3 pl-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg-secondary)] border-2 border-[var(--accent-green)]"></div>
              <div className="glass p-6 rounded-2xl green-border">
                <h4 className="text-white font-bold text-lg">{exp.role}</h4>
                <div className="flex flex-wrap gap-2 text-[var(--accent-green)] text-sm mb-3">
                  <span>{exp.company}</span>
                  <span className="text-[var(--text-muted)]">|</span>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
