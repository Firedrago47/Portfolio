"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with Next.js, TailwindCSS, and Framer Motion to showcase smooth UI and performance.",
    link: "#",
    gradient: "from-zinc-900 to-blue-900",
    size: "md:col-span-2 md:row-span-2",
    textColor: "text-indigo-200 hover:text-white",
    image: "/images/Gemines1.png",
  },
  {
    title: "E-Commerce App",
    description:
      "Full-stack MERN app with Stripe integration for payments and admin dashboard.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
    image: "/images/Devsyncs1.png",
  },
  {
    title: "Chat Application",
    description:
      "Real-time chat powered by WebSockets & Firebase with instant message sync.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
    image: "/images/Devsyncs2.png",
  },
  {
    title: "AI Image Generator",
    description:
      "Next.js + OpenAI API app that generates unique images and stores them on Cloudinary.",
    link: "#",
    gradient: "from-gray-900 to-violet-900",
    size: "md:col-span-2",
    textColor: "text-pink-100 hover:text-white",
    image: "/images/Gemines2.png",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
    rotateX: 15,
    scale: 0.9,
    transformPerspective: 1200,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col px-4 sm:px-8 md:px-16 py-12 md:py-16 bg-neutral-950 text-white"
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-grotesk mb-4 text-center"
      >
        Projects
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-base sm:text-lg max-w-2xl text-center font-alata text-gray-300 mx-auto mb-10"
      >
        A few of my featured works and experiments.
      </motion.p>

      {/* ✳️ Responsive Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[200px] gap-4 sm:gap-6 [perspective:1200px]"
      >
        {projects.map((project, index) => (
          <motion.a
            key={index}
            variants={cardVariants}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{
              scale: 1.03,
              rotateX: 2,
              rotateY: -2,
              boxShadow: "0 0 8px rgba(147,197,253,0.25)",
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              mass: 0.5,
            }}
            className={`${project.size || ""} relative overflow-hidden group cursor-pointer ${
              project.bg || `bg-gradient-to-br ${project.gradient}`
            } rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/5 hover:border-white/20 backdrop-blur-sm`}
          >
            {/* Default Content */}
            <div className="z-10 relative flex flex-col h-full justify-between group-hover:opacity-0 transition-opacity duration-500">
              <h2
                className={`${
                  project.size ? "text-2xl" : "text-lg sm:text-xl"
                } font-grotesk mb-2`}
              >
                {project.title}
              </h2>
              <p
                className={`${
                  project.gradient
                    ? "text-gray-200 text-sm"
                    : "text-gray-400 text-sm"
                }`}
              >
                {project.description}
              </p>
              <span className={`mt-auto font-medium ${project.textColor}`}>
                View Project →
              </span>
            </div>

            {/* Hover Overlay (for desktop only) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out hidden sm:block">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover rounded-2xl brightness-95 scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl flex flex-col justify-end p-5 sm:p-6">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl font-grotesk"
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-gray-300 text-sm mt-2 font-grotesk"
                >
                  {project.description}
                </motion.p>
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
