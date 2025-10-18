"use client";

import { useRef, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // ✅ Desktop fade animation using gsap.matchMedia
    mm.add("(min-width: 768px)", () => {
      const left = leftRef.current;
      if (!left) return;

      const fadeTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top+=100 top",
        onEnter: () =>
          gsap.to(left, { opacity: 0, duration: 0.3, ease: "power1.out" }),
        onLeaveBack: () =>
          gsap.to(left, { opacity: 1, duration: 0.3, ease: "power1.out" }),
      });

      return () => fadeTrigger.kill();
    });

    // ✅ Center glow animation
    const glowTween = gsap.to(centerRef.current, {
      boxShadow: "0 0 6px 3px rgba(255,255,255,0.55)",
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // ✅ Ensure proper refresh
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    window.addEventListener("load", refresh);

    return () => {
      mm.revert(); // cleanup matchMedia
      glowTween.kill();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh);
    };
  }, []);

  // Smooth scroll
  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    const lenis = (window as any).lenis;
    if (target && lenis) lenis.scrollTo(target, { offset: -10 });
    else target?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // ✅ Animate mobile menu
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    gsap.to(mobileMenuRef.current, {
      y: menuOpen ? 0 : "-100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: menuOpen ? "auto" : "none",
    });
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4 bg-transparent">
      {/* Left Section (Logo) */}
      <div
        ref={leftRef}
        className="text-xl font-alata cursor-pointer text-white transition-opacity duration-300"
      >
        MyPortfolio
      </div>

      {/* Center Nav (desktop only) */}
      <div
        ref={centerRef}
        className="hidden md:flex sticky top-4 mr-128 z-50 bg-black/40 backdrop-blur-md rounded-full px-8 py-3 gap-6 shadow-md transition-shadow duration-300 font-alata"
      >
        <button
          onClick={() => handleScroll("#about")}
          className="text-white hover:text-gray-300 transition cursor-pointer"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="text-white hover:text-gray-300 transition cursor-pointer"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="text-white hover:text-gray-300 transition cursor-pointer"
        >
          Contact
        </button>
      </div>

      {/* Hamburger (mobile) */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen((p) => !p)} className="text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-10 text-white font-alata text-lg z-40"
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <button
          onClick={() => handleScroll("#about")}
          className="hover:text-gray-300 transition"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="hover:text-gray-300 transition"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="hover:text-gray-300 transition"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
