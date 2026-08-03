"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { GithubIcon } from "lucide-react";

type Project = {
  title: string;
  description: string;
  link: string;
  gradient?: string;
  bg?: string;
  images: string[];
  accent: string;
  stack: string[];
};

const projects: Project[] = [
  {
    title: "CloudGuard - Cloud Security Dashboard",
    description:
      "CloudGuard is a comprehensive cloud security dashboard that provides real-time monitoring, threat detection, and compliance management for cloud infrastructures.",
    link: "https://github.com/Firedrago47/CloudGuard-back",
    bg: "bg-zinc-900",
    images: ["/images/cloudguard1.png", "/images/cloudguard2.png"],
    accent: "text-emerald-200",
    stack: ["AWS","Next.js", "Python"],
  },
  {
    title: "DevSync - Collaborative Code Editor",
    description:"Realtime collaborative editor with multiplayer sync, role-based spaces and deployment-ready architecture.",
    link: "https://devsync-teal.vercel.app",
    bg: "bg-zinc-900",
    images: ["/images/devsync1.png", "/images/devsync2.png", "/images/devsync3.png"],
    accent: "text-cyan-200",
    stack: ["Next.js", "TypeScript","Express.js", "Websockets", "Supabase", ],
  },
  {
    title: "Unified Ecommerce Platform",
    description:
      "Unified platform for food ordering, grocery delivery, taxi and cab booking in a single workflow.",
    link: "https://full-stack-app-gzj8.vercel.app",
    gradient: "from-zinc-900 via-slate-900 to-blue-900",
    images: [
      "/images/full-stack-app1.png",
      "/images/full-stack-app2.png",
      "/images/full-stack-app3.png",
    ],
    accent: "text-blue-200",
    stack: ["Next.js", "TypeScript", "postgreSQL"],
  },
];

function getProjectHighlights(title: string) {
  if (title.includes("Ecommerce")) return ["Multi-service workflow", "Role-based user flows", "Realtime order tracking"];
  if (title.includes("DevSync")) return ["Collaborative editing", "Session-based rooms", "Low-latency sync"];
  if (title.includes("ChainLabs")) return ["Immutable records", "Transparent publishing", "Research-first UX"];
  return ["Modern media UX", "Smart recommendation flow", "Scalable frontend architecture"];
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const githubProfile = "https://github.com/Firedrago47";
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const queueActivation = (index: number) => {
    clearHoverTimeout();
    if (index === 0) {
      setActiveIndex(index);
      return;
    }

    hoverTimeoutRef.current = setTimeout(() => {
      setActiveIndex(index);
      hoverTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => clearHoverTimeout();
  }, []);

  const getSpan = (index: number) => {
    if (activeIndex === null) {
      return index === 0
        ? "md:col-span-2 md:row-span-2"
        : "md:col-span-2 md:row-span-1";
    }

    if (activeIndex === 0) {
      return index === 0
        ? "md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-1"
        : index === 1
          ? "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-3"
          : "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-3";
    }

    if (activeIndex === 1) {
      return index === 0
        ? "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
        : index === 1
          ? "md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-2"
          : "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-1";
    }

    return index === 0
      ? "md:col-span-2 md:row-span-1 md:col-start-1 md:row-start-1"
      : index === 1
        ? "md:col-span-2 md:row-span-1 md:col-start-3 md:row-start-1"
        : "md:col-span-4 md:row-span-2 md:col-start-1 md:row-start-2";
  };

  return (
    <section
      id="projects"
      className="relative flex flex-col mx-6 px-4 sm:px-8 md:px-16 py-12 md:py-16 text-white overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl uppercase mb-4 text-gray-200 text-center"
      >
        PROJECTS
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-base sm:text-lg max-w-2xl text-center text-gray-300 mx-auto mb-10"
      >
        Hover a project card to expand it and inspect details.
      </motion.p>

      <motion.div
        layout
        onMouseLeave={() => {
          clearHoverTimeout();
          setActiveIndex(null);
        }}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 md:grid-cols-4 auto-rows-[220px] sm:auto-rows-[250px] md:auto-rows-[210px] gap-4 sm:gap-6"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            isActive={activeIndex === index}
            className={getSpan(index)}
            onActivate={() => queueActivation(index)}
            onFocusActivate={() => {
              clearHoverTimeout();
              setActiveIndex(index);
            }}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        viewport={{ once: true }}
        className="mt-10 flex justify-center"
      >
        <a
          href={githubProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-blue-200 transition hover:border-blue-300 hover:bg-blue-500/20 hover:text-white"
        >
          More on GitHub
          <GithubIcon className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}

function ProjectCard({
  project,
  isActive,
  className,
  onActivate,
  onFocusActivate,
}: {
  project: Project;
  isActive: boolean;
  className: string;
  onActivate: () => void;
  onFocusActivate: () => void;
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const highlights = useMemo(() => getProjectHighlights(project.title), [project.title]);
  const contentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
  };

  useEffect(() => {
    if (project.images.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % project.images.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [project.images]);

  const imageSrc = useMemo(() => project.images[imgIndex], [project.images, imgIndex]);

  return (
    <motion.a
      layout
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onActivate}
      onFocus={onFocusActivate}
      transition={{ layout: { type: "spring", stiffness: 180, damping: 26, mass: 0.9 } }}
      className={`${className} relative isolate overflow-hidden rounded-2xl border border-white/10 ${
        project.bg || `bg-gradient-to-br ${project.gradient}`
      } p-5 sm:p-6 shadow-[0_12px_30px_rgba(0,0,0,0.35)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_45%)]" />

      {!isActive && (
      <motion.div
        layout
        className={`relative z-10 flex h-full flex-col ${isActive ? "md:w-[52%]" : "w-full"}`}
        >
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Featured Project</p>
        <h2 className="text-lg sm:text-xl leading-tight text-white">{project.title}</h2>
        <p className={`mt-3 text-xs sm:text-sm leading-relaxed ${isActive ? "text-gray-200" : "text-gray-300"}`}>
          {project.description}
        </p>
          <div className="mt-5 flex items-center gap-2">
            {project.stack.slice(0, 2).map((tech) => (
              <span
                key={`${project.title}-stack-${tech}`}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        <div className="mt-auto pt-6">
          <span className={`inline-flex items-center gap-2 text-sm sm:text-base ${project.accent}`}>
            Open project
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </motion.div>
        )}

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div
            key={`${project.title}-expanded-shell`}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 hidden md:flex"
          >
            <motion.div
              variants={itemVariants}
              className="w-[45%] h-full p-6 lg:p-8 bg-black/45 backdrop-blur-[1.5px] flex flex-col"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Project Details</p>
              <h3 className="mt-2 text-2xl lg:text-3xl leading-tight text-white">{project.title}</h3>
              <p className="mt-3 text-sm lg:text-base leading-relaxed text-gray-200">{project.description}</p>

              <div className="mt-5 grid grid-cols-1 gap-2">
                {highlights.map((point) => (
                  <div key={`${project.title}-${point}`} className="flex items-center gap-2 text-sm text-gray-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <span className={`mt-auto inline-flex items-center gap-2 text-sm ${project.accent}`}>
                View full project <span aria-hidden="true"><GithubIcon className="h-4 w-4" /></span>
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="relative w-[55%] h-full border-l border-white/10">
              <div className="absolute inset-2 rounded-lg overflow-hidden border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={imageSrc}
                    initial={{ opacity: 0, scale: 1.06, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
                    transition={{ duration: 0.52, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={imageSrc}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/35 to-black/75" />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="absolute left-5 bottom-5 flex items-center gap-1.5">
                {project.images.map((_, idx) => (
                  <span
                    key={`${project.title}-dot-${idx}`}
                    className={`h-1.5 rounded-full transition-all duration-700 ${
                      idx === imgIndex ? "w-5 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute right-5 bottom-5 rounded-md bg-black/65 border border-white/15 px-2.5 py-1 text-[11px] text-gray-100">
                Preview
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
}
