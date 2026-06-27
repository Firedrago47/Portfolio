"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  techStack,
  techStackCategories,
  type TechStackItem,
} from "../data/techStack";

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState("Frontend");
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTech =
    selectedCategory === "All"
      ? techStack
      : techStack.filter(
          (tech: TechStackItem) => tech.category === selectedCategory,
        );

  return (
    <section
      id="techstack"
      className="relative min-h-screen py-24 px-6 md:px-16 overflow-hidden"
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
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(2,0,36,1)_0%,transparent_70%)] animate-[spin_45s_linear_infinite] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-grotesk bg-white bg-clip-text text-transparent uppercase tracking-wide">
            Tech <span className="text-blue-400">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-l mx-auto mt-4 text-base font-mono">
            Building modern digital experiences with full-stack engineering and
            security operations practices.
          </p>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techStackCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 text-sm font-mono ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-transparent to-blue-950 text-white border-blue-400 scale-105 shadow-lg shadow-blue-500/10"
                  : "border-grey-700 text-gray-400 hover:text-white hover:border-blue-400 cursor-pointer scale-100 hover:scale-105 hover:shadow-md hover:shadow-blue-500/5"
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
