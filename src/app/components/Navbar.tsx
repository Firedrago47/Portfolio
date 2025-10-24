"use client";

import { useRef, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const leftRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  // Scroll to section
  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    const lenis = (window as any).lenis;

    if (target && lenis) {
      lenis.scrollTo(target, { offset: -10 });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }

    setMenuOpen(false); // Close mobile menu
  };

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // IntersectionObserver for logo visibility
  useEffect(() => {
    const aboutSection = document.querySelector("#about");
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowLogo(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 select-none"
      role="navigation"
    >
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <div
          ref={leftRef}
          className={`text-xl font-alata text-white cursor-pointer transition-opacity duration-300 ${
            showLogo || menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          MyPortfolio
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div className="bg-white/2 backdrop-blur-xl border border-white/10 shadow-lg rounded-full px-10 py-2 flex gap-6 font-alata transition-all duration-500">
            <button onClick={() => handleScroll("#about")} className="cursor-pointer">About</button>
            <button onClick={() => handleScroll("#projects")} className="cursor-pointer">Projects</button>
            <button onClick={() => handleScroll("#contact")} className="cursor-pointer">Contact</button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-50"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black/85 backdrop-blur-md 
          flex flex-col items-center justify-center gap-10 text-white 
          font-alata text-2xl z-40 transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <button
          onClick={() => handleScroll("#about")}
          className="hover:text-blue-300"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="hover:text-blue-300"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="hover:text-blue-300"
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
