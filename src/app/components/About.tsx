"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, GithubIcon, LinkedinIcon } from "lucide-react";

const TERMINAL_COMMAND = "whoami";
const IDENTITIES = [
  "DEEPAN RAJ S",
  "Full-Stack Developer",
  "Frontend Engineer",
  "Problem Solver",
];

export default function About() {
  const [commandText, setCommandText] = useState("");
  const [commandDone, setCommandDone] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [titleEntered, setTitleEntered] = useState(false);
  const [paragraphEntered, setParagraphEntered] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (commandDone) {
      return () => clearTimeout(timeout);
    }

    if (commandText.length < TERMINAL_COMMAND.length) {
      timeout = setTimeout(() => {
        setCommandText(TERMINAL_COMMAND.slice(0, commandText.length + 1));
      }, 90);
    } else {
      timeout = setTimeout(() => {
        setCommandDone(true);
      }, 250);
    }

    return () => clearTimeout(timeout);
  }, [commandDone, commandText]);

  useEffect(() => {
    if (!commandDone) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % IDENTITIES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [commandDone]);

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);

    if (!el) return;

    if (el instanceof HTMLElement && window.lenis) {
      window.lenis.scrollTo(el, { offset: -10 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const icons = [
    {
      id: 1,
      icon: <Download className="w-6 h-6" />,
      href: "/Resume.pdf",
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
        className="absolute top-0 left-0 w-full min-h-screen object-cover"
      >
        <source src="/videos/sample_vid.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 ml-0 md:ml-20 flex flex-col justify-center h-full">
        {/* Terminal typing intro */}
        <div className="font-mono text-sm md:text-base mb-4">
          <p className="text-xl mb-1 tracking-wide">
            <span className="text-blue-400">root@deepan</span>:~$ {commandText}
            {!commandDone && <span className="animate-pulse">|</span>}
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl font-alata mb-6 tracking-wide">
          <AnimatePresence mode="wait">
            <motion.span
              key={commandDone ? IDENTITIES[activeIndex] : "command-pending"}
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="inline-block text-zinc-100"
              onAnimationComplete={() => {
                if (commandDone && !titleEntered) {
                  setTitleEntered(true);
                }
              }}
            >
              {commandDone ? IDENTITIES[activeIndex] : "\u00A0"}
            </motion.span>
          </AnimatePresence>
        </h1>

        {titleEntered && (
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (!paragraphEntered) {
                setParagraphEntered(true);
              }
            }}
            className="text-lg md:text-xl font-alata text-gray-200 max-w-2xl leading-relaxed mb-10"
          >
            I’m a passionate{" "}
            <span className="text-blue-500 font-mono">Full-Stack Developer</span>{" "}
            crafting smooth and modern digital experiences. My focus is building
            scalable apps, interactive UI/UX, and seamless performance using{" "}
            <span className="text-blue-500 font-mono">
              React, Next.js, and Node.js
            </span>
            .
          </motion.p>
        )}

        {/* Interactive Lucide Icons */}
        <motion.div
          className="flex gap-6"
          initial="hidden"
          animate={paragraphEntered ? "visible" : "hidden"}
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
