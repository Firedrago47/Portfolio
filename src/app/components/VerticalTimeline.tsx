"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

export type TimelineItem = {
  title: string;
  period: string;
  description: string;
  type?: "Education" | "Experience";
};

interface VerticalTimelineProps {
  items: TimelineItem[];
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function VerticalTimeline({ items }: VerticalTimelineProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setup = useCallback(() => {
    const track = trackRef.current;
    const glow = glowRef.current;
    if (!track || !glow) return;

    ScrollTrigger.getAll().forEach((t) => t.kill());

    // ── Beam: grows from top of track to bottom as you scroll ──
    const trackHeight = track.offsetHeight;
    gsap.set(glow, { height: 0 });
    gsap.to(glow, {
      height: trackHeight,
      ease: "none",
      scrollTrigger: {
        trigger: track,
        start: "top center",      // beam starts when track top hits mid-viewport
        end: "bottom center",     // beam finishes when track bottom hits mid-viewport
        scrub: true,
      },
    });

    // ── Per-item: dot pulse + card & label slide in ──
    items.forEach((_, idx) => {
      const dot = dotRefs.current[idx];
      const card = cardRefs.current[idx];
      const label = labelRefs.current[idx];
      if (!dot || !card || !label) return;

      // Reset state
      gsap.set(dot, {
        background: "radial-gradient(circle, #6b7280, #374151)",
        boxShadow: "none",
        scale: 1,
      });
      gsap.set(card, { opacity: 0, x: idx % 2 === 0 ? -40 : 40 });
      gsap.set(label, { opacity: 0, x: idx % 2 === 0 ? 40 : -40 });

      // Shared trigger: fires when the dot reaches 60% down the viewport
      const trigger = {
        trigger: dot,
        start: "center 60%",
        end: "center 40%",
        scrub: 0.4,
      } as const;

      // Dot activation
      gsap.to(dot, {
        background: "radial-gradient(circle, #60a5fa, #2563eb)",
        boxShadow: "0 0 10px 3px rgba(59,130,246,0.6)",
        scale: 1.3,
        ease: "back.out(2)",
        scrollTrigger: trigger,
      });

      // Card slide in (alternates left / right)
      gsap.to(card, {
        opacity: 1,
        x: 0,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      // Label slide in (opposite side)
      gsap.to(label, {
        opacity: 1,
        x: 0,
        ease: "power3.out",
        scrollTrigger: trigger,
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [items]);

  useEffect(() => {
    const cleanup = setup();
    return () => { if (cleanup) cleanup(); };
  }, [setup]);

  // ── Keyboard nav ──────────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();

    const track = trackRef.current;
    if (!track) return;
    const dots = track.querySelectorAll("[data-timeline-dot]");

    // Find whichever dot is closest to center of viewport
    const mid = window.innerHeight / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    dots.forEach((dot, i) => {
      const dist = Math.abs(dot.getBoundingClientRect().top + 10 - mid);
      if (dist < closestDist) { closestDist = dist; closestIdx = i; }
    });

    const next =
      e.key === "ArrowDown"
        ? Math.min(closestIdx + 1, dots.length - 1)
        : Math.max(closestIdx - 1, 0);

    dots[next]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <section
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Career Timeline"
      role="region"
      className="relative w-full bg-gradient-to-b from-black to-transparent text-white py-24 px-4 sm:px-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* Centered column that holds the line + items */}
      <div
        ref={trackRef}
        className="relative max-w-4xl mx-auto"
      >
        {/* ── Static grey line (full height of track) ── */}
        {/* <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gray-700 z-10" /> */}

        {/* ── Glowing beam (animates height from 0 → full) ── */}
        <div
          ref={glowRef}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] rounded-full z-20 origin-top"
          style={{
            background: "linear-gradient(to bottom, #60a5fa, #ffffff 50%, #60a5fa)",
            boxShadow: "0 0 8px 2px rgba(59,130,246,0.5)",
            // Softly fade the animated beam near its top and bottom edges.
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        />

        {/* ── Items ── */}
        <div className="relative z-30 flex flex-col gap-34 sm:gap-42">
          {items.map((item, idx) => {
            const isLeft = idx % 2 === 0; // alternate sides

            return (
              <div
                key={idx}
                data-timeline-item
                className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-x-10 sm:gap-x-14 md:gap-x-18"
              >
                {/* ── Left column (label or card depending on alternation) ── */}
                <div className={`min-w-0 flex ${isLeft ? "justify-end" : "justify-start"}`}>
                  {isLeft ? (
                    // Label on the left
                    <div
                      ref={(el) => { labelRefs.current[idx] = el; }}
                      className=""
                    >
                      <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">
                        {item.period}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-200">
                        {item.title}
                      </p>
                      {item.type && (
                        <span
                          className={`inline-block mt-2 text-xs font-semibold px-3 py-0.5 rounded-full border ${
                            item.type === "Education"
                              ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                              : "text-blue-400 border-blue-500/30 bg-blue-500/10"
                          }`}
                        >
                          {item.type}
                        </span>
                      )}
                    </div>
                  ) : (
                    // Card on the left
                    <div
                      ref={(el) => { cardRefs.current[idx] = el; }}
                      className="w-full max-w-[360px] p-4 sm:p-5 rounded-xl
                        bg-white/5 backdrop-blur-sm border border-white/10
                        shadow-[0_0_8px_rgba(59,130,246,0.12)]
                        text-gray-400 transition-colors duration-300
                        hover:border-blue-500/50 hover:bg-gray-900/80 hover:text-gray-200"
                    >
                      <p className="text-sm sm:text-base leading-snug">{item.description}</p>
                    </div>
                  )}
                </div>

                {/* ── Center dot ── */}
                <div className="flex justify-center">
                  <div
                    ref={(el) => { dotRefs.current[idx] = el; }}
                    data-timeline-dot
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-full relative z-30 flex-shrink-0"
                    style={{ background: "radial-gradient(circle, #6b7280, #374151)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* ── Right column (card or label depending on alternation) ── */}
                <div className={`min-w-0 flex ${isLeft ? "justify-start" : "justify-end"}`}>
                  {isLeft ? (
                    // Card on the right
                    <div
                      ref={(el) => { cardRefs.current[idx] = el; }}
                      className="w-full max-w-[360px] p-4 sm:p-5 rounded-xl
                        bg-white/5 backdrop-blur-sm border border-white/10
                        shadow-[0_0_8px_rgba(59,130,246,0.12)]
                        text-gray-400 transition-colors duration-300
                        hover:border-blue-500/50 hover:bg-gray-900/80 hover:text-gray-200"
                    >
                      <p className="text-sm sm:text-base leading-snug">{item.description}</p>
                    </div>
                  ) : (
                    // Label on the right
                    <div
                      ref={(el) => { labelRefs.current[idx] = el; }}
                      className="text-right"
                    >
                      <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">
                        {item.period}
                      </p>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-zinc-200">
                        {item.title}
                      </p>
                      {item.type && (
                        <span
                          className={`inline-block mt-2 text-xs font-semibold px-3 py-0.5 rounded-full border ${
                            item.type === "Education"
                              ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                              : "text-blue-400 border-blue-500/30 bg-blue-500/10"
                          }`}
                        >
                          {item.type}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Screen-reader summary ── */}
      <div className="sr-only">
        {items.map((item, idx) => (
          <div key={idx}>
            <h3>{item.title}</h3>
            <span>{item.period}</span>
            {item.type && <span>{item.type}</span>}
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
