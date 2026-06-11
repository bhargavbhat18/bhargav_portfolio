import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaAndroid, FaFigma, FaLinux, FaGitAlt } from "react-icons/fa";
import { SiFirebase, SiNextdotjs, SiCplusplus } from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

const allSkills = [
  { name: "HTML", icon: <FaHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <FaCss3Alt className="text-blue-500" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
  { name: "React", icon: <FaReact className="text-blue-400" /> },
  { name: "Android Studio", icon: <FaAndroid className="text-green-500" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-500" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
  { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
  { name: "Linux", icon: <FaLinux className="text-white" /> },
  { name: "Figma", icon: <FaFigma className="text-pink-400" /> },
  { name: "C++", icon: <SiCplusplus className="text-blue-600" /> },
  { name: "C#", icon: <TbBrandCSharp className="text-purple-500" /> },
];

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="max-w-4xl mx-auto px-5">
        <SectionTitle
          title="Technical Arsenal"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
          {allSkills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass p-5 rounded-2xl flex flex-col items-center justify-center gap-3 green-border group cursor-pointer"
            >
              <div className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
                {s.icon}
              </div>
              <span className="text-[var(--text-primary)] font-medium text-sm text-center">
                {s.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
