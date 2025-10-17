"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "SvelteKit", category: "Frontend", description: "Lightning-fast reactive framework", color: "#f97316", experience: "2 years" },
  { name: "Solid.js", category: "Frontend", description: "Fine-grained reactive primitives", color: "#3b82f6", experience: "1 year" },
  { name: "Astro", category: "Frontend", description: "Content-focused static site generator", color: "#a855f7", experience: "1.5 years" },
  { name: "Alpine.js", category: "Frontend", description: "Minimal framework for HTML enhancement", color: "#14b8a6", experience: "2 years" },
  { name: "Bun", category: "Backend", description: "All-in-one JavaScript runtime & toolkit", color: "#facc15", experience: "6 months" },
  { name: "Hono", category: "Backend", description: "Ultrafast web framework for edge", color: "#ef4444", experience: "8 months" },
  { name: "Drizzle ORM", category: "Backend", description: "TypeScript ORM with SQL-like syntax", color: "#22c55e", experience: "1 year" },
  { name: "tRPC", category: "Backend", description: "End-to-end typesafe APIs", color: "#6366f1", experience: "1.5 years" },
  { name: "Turso", category: "Database", description: "Edge SQLite database", color: "#06b6d4", experience: "8 months" },
  { name: "PlanetScale", category: "Database", description: "Serverless MySQL platform", color: "#ec4899", experience: "1 year" },
  { name: "Upstash", category: "Database", description: "Serverless Redis & Kafka", color: "#10b981", experience: "1 year" },
  { name: "Biome", category: "Tools", description: "Fast formatter & linter", color: "#8b5cf6", experience: "6 months" },
  { name: "Vite", category: "Tools", description: "Next generation build tool", color: "#fbbf24", experience: "2 years" },
  { name: "Turborepo", category: "Tools", description: "High-performance monorepo system", color: "#f43f5e", experience: "1 year" },
  { name: "Cloudflare Workers", category: "Deployment", description: "Serverless compute at the edge", color: "#fb923c", experience: "1.5 years" },
  { name: "Railway", category: "Deployment", description: "Infrastructure platform", color: "#64748b", experience: "1 year" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Deployment"];

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTech =
    selectedCategory === "All"
      ? techStack
      : techStack.filter((tech) => tech.category === selectedCategory);

  return (
    <section className="relative py-24 px-6 md:px-16 bg-transparent overflow-hidden">
      {/* Subtle glowing orb background */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(2,0,36,1)_0%,transparent_70%)] animate-[spin_45s_linear_infinite] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-5xl md:text-4xl font-bold bg-white bg-clip-text text-transparent uppercase tracking-wide">
            Tech Stack & <span className="text-blue-500">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-l mx-auto mt-4 text-base font-mono">
            Crafting digital experiences with cutting-edge technologies and modern development practices.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
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
              className={`relative w-[280px] rounded-xl border backdrop-blur-sm bg-white/5 transition-all duration-300 cursor-pointer p-6
                ${hoveredTech === tech.name ? "shadow-[0_0_25px_rgba(167,112,239,0.3)] scale-105" : "hover:shadow-[0_0_20px_rgba(167,112,239,0.1)]"}`}
              style={{
                borderColor: hoveredTech === tech.name ? tech.color : "rgba(60,60,60,0.6)",
              }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-grotesk text-gray-100">{tech.name}</h3>
                <span
                  className="text-white text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: tech.color }}
                >
                  {tech.category}
                </span>
              </div>
              <p className="text-gray-400 text-sm font-mono leading-relaxed">{tech.description}</p>
              <p className="text-gray-500 italic text-xs mt-3">{tech.experience} experience</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
