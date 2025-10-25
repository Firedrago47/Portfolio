"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Pause Lenis & ScrollTrigger when tab hidden
    function handleVisibility() {
      if (document.hidden) {
        lenis.stop();
        ScrollTrigger.getAll().forEach((t) => t.disable());
      } else {
        lenis.start();
        ScrollTrigger.getAll().forEach((t) => t.enable());
      }
    }

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", handleVisibility);
      delete window.lenis;
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
