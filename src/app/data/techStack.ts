export type TechStackItem = {
  name: string;
  category: string;
  description: string;
  color: string;
  experience: string;
};

export const techStack: TechStackItem[] = [
  {
    name: "C++",
    category: "Language",
    description:
      "High-performance, low-level control for game and system development",
    color: "#00599C",
    experience: "3 years",
  },
  {
    name: "Java",
    category: "Language",
    description:
      "Robust OOP language for scalable apps and Android development",
    color: "#04a53cff",
    experience: "2 years",
  },
  {
    name: "Python",
    category: "Language",
    description:
      "Versatile scripting language for automation, AI, and backend systems",
    color: "#3776AB",
    experience: "2 years",
  },
  {
    name: "TypeScript",
    category: "Language",
    description: "Strongly typed JavaScript for scalable codebases",
    color: "#3178c6",
    experience: "2 years",
  },
  {
    name: "React",
    category: "Frontend",
    description: "Declarative UI library for building interactive interfaces",
    color: "#05bda7ff",
    experience: "1 year",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "Full-stack React framework for dynamic and static web apps",
    color: "#0064a2ff",
    experience: "1 year",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "Minimal Node.js framework for REST APIs and web servers",
    color: "#444444",
    experience: "1 year",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "JavaScript runtime for scalable network applications",
    color: "#339933",
    experience: "1 year",
  },
  {
    name: "Spring Boot",
    category: "Backend",
    description: "Java-based framework for microservices and enterprise apps",
    color: "#6DB33F",
    experience: "6 months",
  },
  {
    name: "FastAPI",
    category: "Backend",
    description: "Modern Python web framework for high-performance APIs",
    color: "#009688",
    experience: "6 months",
  },
  {
    name: "MySQL",
    category: "Database",
    description: "Relational database with ACID compliance",
    color: "#4479A1",
    experience: "2 years",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Advanced SQL database with strong data integrity features",
    color: "#336791",
    experience: "1 year",
  },
  {
    name: "Redis",
    category: "Database",
    description: "In-memory data store for caching and real-time operations",
    color: "#DC382D",
    experience: "6 months",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control and collaboration platform",
    color: "#181717",
    experience: "",
  },
  {
    name: "Docker",
    category: "Tools",
    description: "Containerization for consistent app environments",
    color: "#2496ED",
    experience: "",
  },
  {
    name: "VS Code",
    category: "Tools",
    description: "Lightweight yet powerful development environment",
    color: "#007ACC",
    experience: "",
  },
  {
    name: "Claude",
    category: "Tools",
    description: "AI assistant for research, debugging, and workflow acceleration",
    color: "#D97706",
    experience: "",
  },
  {
    name: "ChatGPT",
    category: "Tools",
    description: "AI copilot for problem-solving, scripting, and documentation support",
    color: "#10A37F",
    experience: "",
  },
  {
    name: "Railway",
    category: "Deployment",
    description: "Developer-friendly cloud deployment platform",
    color: "#64748b",
    experience: "1 year",
  },
  {
    name: "Vercel",
    category: "Deployment",
    description: "Serverless deployment for frontend frameworks",
    color: "#000000",
    experience: "1 year",
  },
  {
    name: "AWS",
    category: "Deployment",
    description: "Cloud infrastructure platform with wide service range",
    color: "#FF9900",
    experience: "6 months",
  },
  {
    name: "Wireshark",
    category: "Security Operations",
    description: "Packet analysis for traffic inspection and network forensics",
    color: "#1679A7",
    experience: "6 months",
  },
  {
    name: "Nmap",
    category: "Security Operations",
    description: "Network discovery and security auditing for surface mapping",
    color: "#214478",
    experience: "6 months",
  },
  {
    name: "Wazuh",
    category: "Security Operations",
    description:
      "Open-source SIEM and XDR platform for log analysis, alerting, and threat visibility",
    color: "#7C3AED",
    experience: "6 months",
  },
  {
    name: "Kali Linux",
    category: "Security Operations",
    description:
      "Security-focused Linux distribution for assessment and operational tooling; daily driving Arch means I’m unusually calm around terminals, configs, and broken packages",
    color: "#2563EB",
    experience: "6 months",
  },
  {
    name: "Incident Response",
    category: "Security Operations",
    description: "Structured investigation, containment, and remediation support",
    color: "#DC2626",
    experience: "6 months",
  },
  {
    name: "Unreal Engine",
    category: "Game Development",
    description: "AAA-level game engine powered by C++",
    color: "#0E1128",
    experience: "1 year",
  },
  {
    name: "Pygame",
    category: "Game Development",
    description: "Simple Python library for 2D game prototypes",
    color: "#306998",
    experience: "1 year",
  },
];

export const techStackCategories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
  "Security Operations",
  "Language",
];
