// components/Projects.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Built with Next.js, TailwindCSS, and Framer Motion for smooth animations.",
    link: "#",
    gradient: "from-indigo-600 to-purple-600",
    size: "md:col-span-2 row-span-2",
    textColor: "text-indigo-200 hover:text-white",
  },
  {
    title: "E-Commerce App",
    description: "Full-stack MERN app with Stripe integration.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
  },
  {
    title: "Chat Application",
    description: "Real-time chat with WebSockets & Firebase.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
  },
  {
    title: "AI Image Generator",
    description:
      "Built with Next.js, OpenAI API, and Cloudinary for image hosting.",
    link: "#",
    gradient: "from-pink-500 to-orange-500",
    size: "md:col-span-2",
    textColor: "text-pink-100 hover:text-white",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col px-6 md:px-20 py-20 bg-neutral-950 text-white"
    >
      <h1 className="text-4xl md:text-6xl font-grotesk mb-6 text-center">
        Projects
      </h1>
      <p className="text-lg max-w-2xl text-center font-mono text-gray-300 mx-auto mb-12">
        Here are some of my works and experiments.
      </p>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`${project.size || ""} ${
              project.bg ||
              `bg-gradient-to-br ${project.gradient}`
            } rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition`}
          >
            <div>
              <h2
                className={`${
                  project.size ? "text-2xl" : "text-xl"
                } font-grotesk mb-2`}
              >
                {project.title}
              </h2>
              <p
                className={`${
                  project.gradient ? "text-gray-200" : "text-gray-400 text-sm"
                }`}
              >
                {project.description}
              </p>
            </div>
            <a
              href={project.link}
              target="_blank"
              className={`mt-4 font-medium ${project.textColor}`}
            >
              View Project →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
