"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "Built with Next.js, TailwindCSS, and Framer Motion for smooth animations.",
    link: "#",
    gradient: "from-zinc-900 to-blue-900",
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
    gradient: "from-gray-900 to-violet-900",
    size: "md:col-span-2",
    textColor: "text-pink-100 hover:text-white",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// 🎥 Cards rise up, fade in, and rotate slightly for cinematic entry
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: 15,
    scale: 0.9,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col px-6 md:px-20 py-20 bg-neutral-950 text-white perspective-[1200px]"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-grotesk mb-6 text-center"
      >
        Projects
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg max-w-2xl text-center font-mono text-gray-300 mx-auto mb-12"
      >
        A few of my featured works and experiments.
      </motion.p>

      {/* ✳️ Animated Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 auto-rows-[200px] gap-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 0 30px rgba(147,197,253,0.25)",
            }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.8,
            }}
            className={`${project.size || ""} ${
              project.bg || `bg-gradient-to-br ${project.gradient}`
            } rounded-2xl p-6 flex flex-col justify-between 
              hover:translate-y-[-4px] transition-all duration-300
              border border-white/5 hover:border-white/20 backdrop-blur-sm`}
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
                  project.gradient
                    ? "text-gray-200"
                    : "text-gray-400 text-sm"
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
      </motion.div>
    </section>
  );
}
