"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  type?: "education" | "experience";
};

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

export default function HorizontalTimeline({ items }: HorizontalTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);
  const descRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!section || !track || !glow) return;

    const totalScroll = Math.max(0, track.scrollWidth - window.innerWidth);

    // Horizontal track scroll
    gsap.to(track, {
      x: () => -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        pin: true,
      },
    });

    // Glow beam dynamic width
    gsap.set(glow, { width: 0 });
    gsap.to(glow, {
      width: () => track.scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const totalDots = dotRefs.current.length;

          dotRefs.current.forEach((dot, idx) => {
            const threshold = idx / (totalDots - 1);

            if (progress >= threshold) {
              // ACTIVE DOT: Gradient + Glow
              gsap.to(dot, {
                background: "radial-gradient(circle, #60a5fa, #2563eb)",
                boxShadow: "0 0 15px 6px rgba(59,130,246,0.6)",
                scale: 1.2,
                duration: 0.4,
                ease: "back.out(2)",
              });
            } else {
              // INACTIVE DOT: Faded Gray Gradient
              gsap.to(dot, {
                background: "radial-gradient(circle, #6b7280, #374151)",
                boxShadow: "none",
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });
        },
      },
    });

  }, [items]);

  dotRefs.current = [];
  descRefs.current = [];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* Center Line */}
      <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-700 z-10" />

      {/* Glowing Beam */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-0 h-[4px] rounded-full
                   bg-gradient-to-r from-blue-400 via-white to-blue-400
                   shadow-[0_0_16px_8px_rgba(59,130,246,0.5)] z-20"
      />

      {/* Timeline Track */}
      <div
        ref={trackRef}
        className="relative flex flex-nowrap h-full items-center w-max
                   px-[10vw] sm:px-[12vw] md:px-[15vw]
                   gap-32 sm:gap-48 md:gap-64 z-30"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 flex flex-col items-center justify-center group"
            style={{ width: "360px" }}
          >
            {/* Top: period + title + badge */}
            <div className="absolute -top-32 sm:-top-36 md:-top-40 text-center">
              <p className="text-sm sm:text-base text-gray-300 uppercase tracking-wide mb-2">
                {item.period}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mb-2">
                {item.title}
              </p>
              {item.type && (
                <span
                  className={`inline-block text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border ${
                    item.type === "education"
                      ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10"
                      : "text-blue-400 border-blue-500/20 bg-blue-500/10"
                  }`}
                >
                  {item.type}
                </span>
              )}
            </div>

            {/* Dot */}
            <div
              ref={(el) => {
                if (el) dotRefs.current[idx] = el;
              }}
              className="w-5 h-5 bg-gray-500 mt-1 rounded-full z-20 relative transition-all duration-300 cursor-pointer"
            />

            {/* Bottom: description */}
            <div
              ref={(el) => {
                if (el) descRefs.current[idx] = el;
              }}
              className="absolute top-20 sm:top-28 md:top-20 text-center w-56 sm:w-64 md:w-72 transition-colors duration-300 text-gray-400"
              onMouseEnter={() => {
                if (descRefs.current[idx])
                  descRefs.current[idx].classList.add("text-white");
              }}
              onMouseLeave={() => {
                if (descRefs.current[idx])
                  descRefs.current[idx].classList.remove("text-white");
              }}
            >
              <p className="text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
