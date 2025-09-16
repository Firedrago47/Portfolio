"use client";

import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export default function Navbar() {
  useEffect(() => {
    if (!lenis) {
      lenis = new Lenis();

      function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }, []);

  const handleScroll = (id: string) => {
    if (lenis) {
      lenis.scrollTo(id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm px-6 py-4 flex items-center justify-between border-b-2 rounded-b border-white-200">
      {/* Left Section (logo / name placeholder) */}
      <div className="text-xl font-bold">
        <span className="cursor-pointer">MyPortfolio</span>
      </div>

      {/* Center Section (Navigation) */}
      <div className="flex gap-8">
        <button
          onClick={() => handleScroll("#about")}
          className="hover:text-gray-400 transition"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="hover:text-gray-400 transition"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="hover:text-gray-400 transition"
        >
          Contact
        </button>
      </div>

      {/* Right Section (Social Icons) */}
      <div className="flex gap-4 text-xl">
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaTwitter />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
}
