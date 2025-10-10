"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type TimelineItem = {
  title: string;
  subtitle?: string;
  description?: string;
  period: string;
  type: "experience" | "education";
};

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

export default function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const parallax = parallaxRef.current;
    if (!section || !track || !parallax) return;

    const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);

    // Create timeline for horizontal scrolling
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(track, { x: () => -totalScroll, ease: "none" }, 0);

    // Parallax movement for background
    gsap.to(parallax, {
      x: () => totalScroll * -0.2,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: true,
      },
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [items]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* 🌈 Parallax Gradient Background */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-black to-emerald-900/30 opacity-40 blur-xl"
        style={{ willChange: "transform" }}
      />

      {/* Heading */}
      <h2 className="absolute top-16 left-1/2 -translate-x-1/2 text-4xl font-grotesk z-20 tracking-wide">
        Education & Experience
      </h2>

      {/* Static Center Line */}
      <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-700 z-10" />

      {/* Horizontal Scroll Track */}
      <div
        ref={trackRef}
        className="relative flex flex-nowrap h-full items-center w-max px-[25vw] z-20"
        style={{ gap: "10rem", willChange: "transform" }}
      >
        {items.map((item, idx) => {
          const isTop = idx % 2 === 0;

          return (
            <div
              key={idx}
              className="relative flex-shrink-0 flex flex-col items-center justify-center"
              style={{ width: "320px" }}
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                viewport={{ once: true }}
                className={`w-6 h-6 rounded-full shadow-md z-20 ${
                  item.type === "experience" ? "bg-blue-500" : "bg-emerald-500"
                }`}
                style={{
                  position: "absolute",
                  top: "47%",
                  transform: "translateY(-50%)",
                }}
              />

              {/* Connecting Line */}
              <div
                className={`absolute w-[2px] bg-gray-500 ${
                  isTop ? "bottom-1/2" : "top-1/2"
                }`}
                style={{ height: "80px" }}
              />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: isTop ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className={`relative p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl backdrop-blur-md hover:scale-[1.03] transition-transform ${
                  isTop ? "mb-[200px]" : "mt-[210px]"
                }`}
                style={{ minWidth: "360px" }}
              >
                <h3 className="text-xl sm:text-2xl font-grotesk mb-2">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p
                    className={`text-md mb-3 ${
                      item.type === "experience"
                        ? "text-blue-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {item.subtitle}
                  </p>
                )}
                <span
                  className={`inline-block px-3 py-1 text-sm mb-3 rounded-full ${
                    item.type === "experience"
                      ? "bg-blue-500/10 text-blue-300 border border-blue-500/20"
                      : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                  }`}
                >
                  {item.period}
                </span>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Depth Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
    </section>
  );
}
