import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/portfolio";
import SectionTitle from "../components/SectionTitle";

/* Visual placeholder for project image */
function ProjectVisual({ title }) {
  const patterns = {
    VitaGuard:       { icon: "🏥", lines: ["patient", "doctor", "records", "auth"] },
    "TEDxGCEM Platform": { icon: "🎤", lines: ["speakers", "tickets", "events", "QR"] },
    "AI Assistant":  { icon: "🤖", lines: ["chat", "tasks", "suggest", "AI"] },
  };
  const p = patterns[title] || { icon: "💡", lines: ["code", "build", "ship", "scale"] };

  return (
    <div
      className="relative h-44 rounded-xl overflow-hidden flex items-center justify-center bg-[var(--bg-card)] green-border"
    >
      {/* Center icon */}
      <div className="relative z-10 text-center flex flex-col items-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-[0_0_15px_rgba(46,204,113,0.3)] bg-[rgba(46,204,113,0.1)] border border-[var(--accent-green)]"
        >
          {p.icon}
        </div>
        <div className="flex gap-2 justify-center flex-wrap px-2">
          {p.lines.map((l) => (
            <span
              key={l}
              className="font-mono-custom text-[10px] px-2 py-0.5 rounded bg-[rgba(46,204,113,0.1)] text-[var(--accent-green)] border border-[rgba(46,204,113,0.2)]"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-5xl mx-auto px-5">
        <SectionTitle
          title="Featured Work"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-5 group flex flex-col green-border"
            >
              {/* Visual */}
              <div className="pb-4">
                <ProjectVisual title={p.title} />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1">
                <p
                  className="font-mono-custom text-[10px] font-bold tracking-widest uppercase mb-2 text-[var(--accent-green)]"
                >
                  {p.category}
                </p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent-green)] transition-colors">
                  {p.title}
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 flex-1">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 rounded-full font-mono-custom bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[rgba(255,255,255,0.1)] group-hover:border-[rgba(46,204,113,0.3)] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={p.github}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold border border-[rgba(255,255,255,0.1)] text-white hover:bg-[var(--accent-green)] hover:text-black hover:border-[var(--accent-green)] transition-all"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold bg-[rgba(46,204,113,0.1)] text-[var(--accent-green)] border border-[var(--accent-green)] hover:bg-[var(--accent-green)] hover:text-black transition-all"
                  >
                    <FiExternalLink /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
