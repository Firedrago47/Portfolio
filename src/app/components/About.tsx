"use client";

import { motion } from "framer-motion";
import { Download, Mail, GithubIcon, LinkedinIcon } from "lucide-react";

export default function About() {
  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    const lenis = (window as any).lenis;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -10 });
    } else if (target) {
      // fallback if lenis is not available
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const icons = [
    {
      id: 1,
      icon: <Download className="w-6 h-6" />,
      href: "/resume.pdf",
      title: "Download Resume",
      download: true,
      action: "download",
    },
    {
      id: 2,
      icon: <Mail className="w-6 h-6" />,
      href: "#contact",
      title: "Contact Me",
      action: "scroll",
    },
    {
      id: 3,
      icon: <GithubIcon className="w-6 h-6" />,
      href: "https://github.com/Firedrago47",
      title: "GitHub",
      action: "link",
    },
    {
      id: 4,
      icon: <LinkedinIcon className="w-6 h-6" />,
      href: "https://linkedin.com/in/yourusername",
      title: "LinkedIn",
      action: "link",
    },
  ];

  return (
    <section
      id="about"
      className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden text-white"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/sample_vid.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-alata mb-6 tracking-wide">
          DEEPAN <span className="text-blue-500">RAJ</span> S
        </h1>

        <p className="text-lg md:text-xl font-alata text-gray-200 max-w-2xl leading-relaxed mb-10">
          I’m a passionate{" "}
          <span className="text-blue-500 font-mono">Full-Stack Developer</span>{" "}
          crafting smooth and modern digital experiences. My focus is building
          scalable apps, interactive UI/UX, and seamless performance using{" "}
          <span className="text-blue-500 font-mono">
            React, Next.js, and Node.js
          </span>
          .
        </p>

        {/* Interactive Lucide Icons */}
        <motion.div
          className="flex gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {icons.map((item) => {
            if (item.action === "scroll") {
              // contact icon - scrolls smoothly
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleScroll(item.href)}
                  title={item.title}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    color: "#60A5FA",
                    filter: "drop-shadow(0 0 8px rgba(96,165,250,0.8))",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="cursor-pointer text-gray-300 hover:text-blue-400 transition"
                >
                  {item.icon}
                </motion.button>
              );
            }

            // other icons (download / external links)
            return (
              <motion.a
                key={item.id}
                href={item.href}
                title={item.title}
                download={item.download}
                target={item.action === "link" ? "_blank" : undefined}
                rel={item.action === "link" ? "noopener noreferrer" : undefined}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: 5,
                  color: "#60A5FA",
                  filter: "drop-shadow(0 0 8px rgba(96,165,250,0.8))",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="cursor-pointer text-gray-300 hover:text-blue-400 transition"
              >
                {item.icon}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
