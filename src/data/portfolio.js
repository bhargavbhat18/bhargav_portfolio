// ── Portfolio Data ──────────────────────────────────────────────
export const personal = {
  name: "Bhargav Bhat",
  title: "MCA Student · Android Developer · Full-Stack Developer",
  tagline: "Passionate MCA student focused on Android Development, Full-Stack Development, and AI-powered applications.",
  email: "bhargavbhat@email.com",
  github: "https://github.com/bhargavbhat",
  linkedin: "https://linkedin.com/in/bhargavbhat",
};

export const skills = {
  Programming: [
    { name: "Java",       level: 88 },
    { name: "Python",     level: 78 },
    { name: "JavaScript", level: 82 },
    { name: "SQL",        level: 80 },
  ],
  Frameworks: [
    { name: "Spring Boot",          level: 80 },
    { name: "React",                level: 78 },
    { name: "Android Development",  level: 85 },
  ],
  Tools: [
    { name: "Git",            level: 88 },
    { name: "GitHub",         level: 88 },
    { name: "Android Studio", level: 85 },
    { name: "VS Code",        level: 90 },
    { name: "MySQL",          level: 80 },
  ],
};

export const projects = [
  {
    id: 1,
    title: "VitaGuard",
    category: "Android · Spring Boot",
    description:
      "Healthcare management application built with Android and Spring Boot, featuring role-based authentication for patients, doctors, and administrators with real-time appointment scheduling.",
    tags: ["Android", "Spring Boot", "Java", "MySQL"],
    accent: "#00d4ff",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "TEDxGCEM Platform",
    category: "Full-Stack · Event Tech",
    description:
      "End-to-end event management platform for TEDxGCEM featuring speaker registration, dynamic schedule builder, and integrated ticket management with QR-code check-in.",
    tags: ["React", "Spring Boot", "MySQL", "REST API"],
    accent: "#7c3aed",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "AI Assistant",
    category: "AI · Productivity",
    description:
      "AI-powered productivity assistant with conversational interface, task management, context-aware suggestions, and a sleek modern UI built for focus and flow.",
    tags: ["Python", "React", "OpenAI API", "FastAPI"],
    accent: "#10b981",
    github: "#",
    demo: "#",
  },
];

export const experience = [
  {
    year: "2024",
    role: "TEDxGCEM Volunteer",
    org: "TEDx · GCEM",
    desc: "Contributed to organizing TEDxGCEM event — coordinated speaker logistics, managed on-ground operations, and developed the event's digital platform.",
  },
  {
    year: "2023 – Present",
    role: "Academic Projects Lead",
    org: "MCA Program",
    desc: "Led cross-functional teams in full-stack and Android development projects; introduced CI/CD practices and code-review workflows to the cohort.",
  },
  {
    year: "2024",
    role: "Internship (Upcoming)",
    org: "Software Development",
    desc: "Actively seeking internship opportunities in Android/Full-Stack development to apply academic skills in a production environment.",
  },
];

export const certifications = [
  {
    issuer: "Cisco",
    title: "Networking Essentials",
    year: "2024",
    color: "#00d4ff",
  },
  {
    issuer: "NPTEL",
    title: "Data Structures & Algorithms",
    year: "2024",
    color: "#7c3aed",
  },
  {
    issuer: "Coursera",
    title: "Android App Development",
    year: "2023",
    color: "#10b981",
  },
  {
    issuer: "Udemy",
    title: "Spring Boot – Complete Guide",
    year: "2023",
    color: "#f59e0b",
  },
];

export const achievements = [
  {
    category: "Technical Events",
    icon: "🏆",
    items: [
      "Top 10 – State-level Hackathon 2024",
      "Winner – Intra-college Coding Contest",
      "Participant – Smart India Hackathon",
    ],
  },
  {
    category: "Hackathons",
    icon: "⚡",
    items: [
      "Built VitaGuard in 24-hr hackathon",
      "Led team of 4 for national-level project challenge",
      "Finalist – AI Innovation Challenge 2024",
    ],
  },
  {
    category: "Leadership",
    icon: "🎯",
    items: [
      "TEDxGCEM Volunteer Coordinator",
      "Class Representative, MCA 2023-25",
      "Mentored junior students in Android Dev",
    ],
  },
];
