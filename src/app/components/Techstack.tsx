"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const techStack = [
  // 🧠 Core Languages
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
    color: "#F89820",
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

  // 🌐 Web & App Frameworks
  {
    name: "React",
    category: "Frontend",
    description: "Declarative UI library for building interactive interfaces",
    color: "#61DAFB",
    experience: "1 year",
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "Full-stack React framework for dynamic and static web apps",
    color: "#000000",
    experience: "1 year",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "Minimal Node.js framework for REST APIs and web servers",
    color: "#444444",
    experience: "1 year",
  },

  // ⚙️ Backend & APIs
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

  // 🗄️ Databases
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

  // 🧰 Tools & Workflow
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control and collaboration platform",
    color: "#181717",
    experience: "2 years",
  },
  {
    name: "Docker",
    category: "Tools",
    description: "Containerization for consistent app environments",
    color: "#2496ED",
    experience: "6 months",
  },
  {
    name: "VS Code",
    category: "Tools",
    description: "Lightweight yet powerful development environment",
    color: "#007ACC",
    experience: "2+ years",
  },

  // 🚀 Deployment & Cloud
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

  // 🎮 Game & System Development
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

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "Tools",
  "Deployment",
  "Language",
];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTech =
    selectedCategory === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === selectedCategory);

  return (
    <section
      id="techstack"
      className="relative py-24 px-6 md:px-16 bg-transparent overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#374151"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Subtle glowing orb background */}
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(2,0,36,1)_0%,transparent_70%)] animate-[spin_45s_linear_infinite] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-4xl font-bold bg-white bg-clip-text text-transparent uppercase tracking-wide">
            Tech <span className="text-blue-500">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-l mx-auto mt-4 text-base font-mono">
            Crafting digital experiences with cutting-edge technologies and
            modern development practices.
          </p>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 text-sm font-mono ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-950 to-blue-600 text-white border-black scale-105 shadow-lg shadow-blue-500/10"
                  : "border-gray-700 text-gray-400 hover:text-white hover:border-blue-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Tech Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.name}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative w-[300px] rounded-xl border backdrop-blur-sm bg-white/5 transition-all duration-300 cursor-pointer p-6
                ${
                  hoveredTech === tech.name
                    ? "shadow-[0_0_25px_rgba(167,112,239,0.3)] scale-105"
                    : "hover:shadow-[0_0_20px_rgba(167,112,239,0.1)]"
                }`}
              style={{
                borderColor:
                  hoveredTech === tech.name ? tech.color : "rgba(60,60,60,0.6)",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-grotesk text-gray-100">
                  {tech.name}
                </h3>
                <span
                  className="text-white text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: tech.color }}
                >
                  {tech.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm font-mono leading-relaxed">
                {tech.description}
              </p>
              <p className="text-gray-500 italic text-xs mt-3">
                {tech.experience} experience
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
