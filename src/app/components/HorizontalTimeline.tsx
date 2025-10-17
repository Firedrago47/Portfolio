"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Variable } from "lucide-react";

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
  
  // --- Glow beam sync with dots ---
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!section || !track || !glow) return;

    const itemWidth = 360; // each timeline item width
    const totalItems = items.length;
    const totalTrackWidth = track.scrollWidth;
    const totalScroll = Math.max(0, totalTrackWidth - window.innerWidth);

    // Horizontal scroll animation
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

    // Beam + Dots animation
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

          // Calculate glow width (includes extra space for screen end)
          const beamMaxWidth =
            totalItems * itemWidth +
            (window.innerWidth * 0.5); // beam ends at screen edge
          const currentWidth = progress * beamMaxWidth;

          gsap.set(glow, { width: currentWidth });

          // Handle dot glow activation
          dotRefs.current.forEach((dot, idx) => {
            const dotStart = (idx * itemWidth) / beamMaxWidth;
            const dotEnd = ((idx + 1) * itemWidth) / beamMaxWidth;

            if (progress >= dotStart && progress < dotEnd) {
              gsap.to(dot, {
                background: "radial-gradient(circle, #60a5fa, #2563eb)",
                boxShadow: "0 0 15px 6px rgba(59,130,246,0.6)",
                scale: 1.2,
                duration: 0.2,
                ease: "back.out(2)",
              });
            } else if (progress < dotStart) {
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
      className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-black to-neutral-950 text-white"
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
            style={{ width: "380px" }}
          >
            {/* Top: period + title + badge */}
            <div className="absolute md:mb-60 text-center">
              <p className="text-sm sm:text-base text-gray-300 uppercase tracking-wide font-bold mb-2">
                {item.period}
              </p>
              <p className="text-xl sm:text-2xl font-bold text-white mb-4">
                {item.title}
              </p>
              {item.type && (
                <span
                  className={`inline-block text-xs sm:text-sm font-semibold px-3 py-1 rounded-full border ${
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
              className="w-5 h-5 bg-gray-500 mt-1 rounded-full z-20 relative transition-all duration-300 cursor-pointer"
            />

            {/* Bottom: description */}
            <div
              ref={(el) => {
                if (el) descRefs.current[idx] = el;
              }}
              className="absolute top-24 sm:top-28 md:top-20 w-64 sm:w-72 md:w-80 p-5 rounded-xl 
             bg-white/4 backdrop-blur-md border border-white/10 
             shadow-[0_0_15px_rgba(59,130,246,0.15)]
             text-gray-300 transition-all duration-300 hover:border-blue-500 hover:bg-white/10 hover:text-white"
              onMouseEnter={() => {
                if (descRefs.current[idx])
                  descRefs.current[idx].classList.add("text-white");
              }}
              onMouseLeave={() => {
                if (descRefs.current[idx])
                  descRefs.current[idx].classList.remove("text-white");
              }} 
            >
              <p className={`text-sm sm:text-base leading-tight font-alata`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
