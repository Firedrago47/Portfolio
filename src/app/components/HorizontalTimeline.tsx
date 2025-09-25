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
  skills?: string[];
  gpa?: string;
  type: "experience" | "education";
};

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

export default function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);

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

    ScrollTrigger.refresh();

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
      <h2 className="absolute top-16 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl font-grotesk z-20">
        Education &amp; Experience
      </h2>

      {/* Main horizontal line */}
      <div className="absolute mt-6 left-0 top-1/2 -translate-y-1/2 w-full h-[4px] bg-gray-600 z-0" />

      {/* Track */}
      <div
        ref={trackRef}
        className="relative flex flex-nowrap items-center h-full mt-6 w-max px-[20vw]"
        style={{ gap: "10rem" }}
      >
        {items.map((item, idx) => {
          const isTop = idx % 2 === 0;

          return (
            <div
              key={idx}
              className="relative flex-shrink-0 flex flex-col items-center"
              style={{ width: "380px" }}
            >
              {/* Dot */}
              <div className="absolute top-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    delay: idx * 0.05,
                  }}
                  className={`w-6 h-6 rounded-full shadow-lg ${
                    item.type === "experience" ? "bg-blue-500" : "bg-emerald-500"
                  }`}
                />
              </div>

              {/* Connector Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className={`absolute w-[2px] bg-gray-500 origin-top ${
                  isTop
                  ? "top-1/2 -translate-y-full" // goes downward to card
                    : "bottom-1/2 translate-y-full" // goes upward to card
                }`}
                style={{
                  height: "50px", // adjust based on your mb-56 / mt-56 spacing
                }}
              />

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: isTop ? -40 : 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl hover:scale-[1.02] transition ${
                  isTop ? "mb-65" : "mt-65"
                }`}
                style={{ minWidth: "380px" }}
              >
                <div className="relative z-10 text-center">
                  <h3 className="text-xl sm:text-2xl font-grotesk mb-1">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <h4
                      className={`text-md mb-3 font-grotesk ${
                        item.type === "experience"
                          ? "text-blue-400"
                          : "text-emerald-400"
                      }`}
                    >
                      {item.subtitle}
                    </h4>
                  )}
                  <span
                    className={`inline-block px-3 py-1 font-grotesk rounded-full text-sm mb-3 ${
                      item.type === "experience"
                        ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {item.period}
                  </span>
                  <p className="text-sm text-gray-300 font-grotesk leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
