"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  type?: "Education" | "Experience";
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

  const itemWidth = 300; // smaller width for responsiveness
  const totalItems = items.length;
  const totalTrackWidth = track.scrollWidth;
  const totalScroll = Math.max(0, totalTrackWidth - window.innerWidth);

  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Horizontal scroll
  gsap.to(track, {
    x: () => -totalScroll,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalScroll}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Beam animation
  gsap.set(glow, { width: 0 });
  gsap.to(glow, {
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${totalScroll}`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const beamMaxWidth = totalItems * itemWidth + window.innerWidth * 0.5;
        const currentWidth = progress * beamMaxWidth;
        gsap.set(glow, { width: currentWidth });

        dotRefs.current.forEach((dot, idx) => {
          const dotStart = (idx * itemWidth) / beamMaxWidth;
          const dotEnd = ((idx + 1) * itemWidth) / beamMaxWidth;

          if (progress >= dotStart && progress < dotEnd) {
            // Active dot 
            gsap.to(dot, {
              background: "radial-gradient(circle, #60a5fa, #2563eb)",
              boxShadow: "0 0 6px 2px rgba(59,130,246,0.6)",
              scale: 1.2,
              duration: 0.2,
              ease: "back.out(2)",
            });

            // Fade in the corresponding description 
            const desc = descRefs.current[idx];
            if (desc) {
              gsap.to(desc, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              });
            }
          } else if (progress < dotStart) {
            //  Reset before it reaches
            gsap.to(dot, {
              background: "radial-gradient(circle, #6b7280, #374151)",
              boxShadow: "none",
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });

            const desc = descRefs.current[idx];
            if (desc) {
              gsap.to(desc, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                ease: "power2.out",
              });
            }
          }
        });
      },
    },
  });

  // Initial hidden state for all descriptions
  descRefs.current.forEach((desc) => {
    gsap.set(desc, { opacity: 0, y: 30 });
  });

  const handleResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, [items]);


  dotRefs.current = [];
  descRefs.current = [];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-neutral-950 text-white"
    >
      {/* Base Line */}
      <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-700 z-10" />

      {/* Glowing Beam */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-0 h-[3px] rounded-full
        bg-gradient-to-r from-blue-400 via-white to-blue-400
        shadow-[0_0_10px_2px_rgba(59,130,246,0.5)] z-20"
      />

      {/* Timeline Track */}
      <div
        ref={trackRef}
        className="relative flex flex-nowrap items-center w-max h-full px-[8vw] sm:px-[10vw] gap-20 sm:gap-40 md:gap-64 z-30"
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative flex-shrink-0 flex flex-col items-center justify-center group"
            style={{ width: "min(100vw, 360px)" }} // auto shrink on mobile
          >
            {/* Top content */}
            <div className="absolute -top-40 sm:-top-50 text-center">
              <p className="text-xs sm:text-sm md:text-base text-gray-300 uppercase tracking-wide font-bold mb-2">
                {item.period}
              </p>
              <p className="text-2xl sm:text-2xl md:text-3xl font-bold text-zinc-300 mb-3">
                {item.title}
              </p>
              {item.type && (
                <span
                  className={`inline-block text-xs sm:text-sm font-medium px-3 py-1 rounded-full border ${
                    item.type === "Education"
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
              className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-500 mt-1 rounded-full z-20 relative transition-all duration-300"
            />

            {/* Description */}
            <div
              ref={(el) => {
                if (el) descRefs.current[idx] = el;
              }}
              className="absolute top-20 sm:top-18 md:top-20 w-[70vw] sm:w-64 md:w-100 p-10 md:p-10 rounded-2xl 
              bg-white/6 backdrop-blur-md border border-white/10 
              shadow-[0_0_8px_rgba(59,130,246,0.15)]
              text-gray-300 transition-all duration-300 hover:border-blue-500 hover:bg-gray-900 hover:text-white"
            >
              <p className="text-sm sm:text-base md:text-base leading-tight font-medium">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
