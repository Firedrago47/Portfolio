"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Unified Ecommerce Platform",
    description:
      "An unified platform supporting food ordering, grocery delivery, taxi & cab booking.",
    link: "",
    gradient: "from-zinc-900 to-blue-900",
    size: "md:col-span-2 md:row-span-2",
    textColor: "text-indigo-200 hover:text-white",
    images: ["/images/Gemines1.png", "/images/Gemines2.png"],
  },
  {
    title: "DevSync – Collaborative Code Editor",
    description: "Full-stack MERN app with Stripe integration.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
    images: ["/images/Devsyncs1.png", "/images/Devsyncs2.png"],
  },
  {
    title: "ChainLabs – Blockchain-Based Scientific Research Platform",
    description: "Designed a platform for transparent and immutable scientific research publishing using blockchain principles.",
    link: "#",
    bg: "bg-neutral-800",
    textColor: "text-indigo-400 hover:text-white",
    images: ["/images/Devsyncs2.png", "/images/Devsyncs1.png"],
  },
  {
    title: "VibeTune – Music Streaming Application",
    description: "Next.js + OpenAI + Cloudinary.",
    link: "#",
    gradient: "from-gray-900 to-violet-900",
    size: "md:col-span-2",
    textColor: "text-pink-100 hover:text-white",
    images: ["/images/Gemines2.png", "/images/Gemines1.png"],
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
      className="relative min-h-screen flex flex-col px-4 sm:px-8 md:px-16 py-12 md:py-16 text-white overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="section-grid"
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
          <rect width="100%" height="100%" fill="url(#section-grid)" />
        </svg>
      </div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
        className="text-2xl md:text-4xl font-bold uppercase mb-4 text-gray-200 text-center"
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

      {/* GRID */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[200px] gap-4 sm:gap-6 [perspective:1200px]"
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </motion.div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const [imgIndex, setImgIndex] = useState(0);

  // --- RANDOM ANIMATION LIST ---
  const animations = [
    { // Fade
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    { // Slide Left
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
    },
    { // Slide Right
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    { // Slide Up
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
    },
    { // Slide Down
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
    },
    { // Zoom
      initial: { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
    },
    
  ];

  // Each card picks ONE random animation style at mount
  const randomAnim = React.useMemo(() => {
    const idx = Math.floor(Math.random() * animations.length);
    return animations[idx];
  }, []); // runs once per card

  // AUTO-CYCLING
  useEffect(() => {
    if (!project.images || project.images.length <= 1) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % project.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [project.images]);

  return (
    <motion.a
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
      className={`${
        project.size || ""
      } relative overflow-hidden group cursor-pointer ${
        project.bg || `bg-gradient-to-br ${project.gradient}`
      } rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-white/5 hover:border-white/20 backdrop-blur-sm`}
    >
      {/* STATIC CARD CONTENT */}
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
            project.gradient ? "text-gray-200" : "text-gray-400"
          } text-sm`}
        >
          {project.description}
        </p>
        <span className={`mt-auto font-medium ${project.textColor}`}>
          View Project →
        </span>
      </div>

      {/* AUTO-CYCLING, RANDOM-ANIMATED IMAGE */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden hidden sm:block">
        <motion.div
          key={imgIndex}
          initial={randomAnim.initial}
          animate={randomAnim.animate}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={project.images[imgIndex]}
            alt={project.title}
            fill
            className="object-cover rounded-2xl brightness-95"
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl flex flex-col justify-end p-6">
          <h3 className="text-lg md:text-xl font-grotesk">{project.title}</h3>
          <p className="text-gray-300 text-sm mt-2">{project.description}</p>
        </div>
      </div>
    </motion.a>
  );
}
