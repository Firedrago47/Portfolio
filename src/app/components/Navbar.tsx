"use client";

import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

export default function Navbar() {
  const handleScroll = (id: string) => {
  const target = document.querySelector(id);
  const lenis = (window as any).lenis;
  if (target && lenis) {
    lenis.scrollTo(target, { offset: -80 });
  }
};


  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
      {/* Left Section (logo / name placeholder) */}
      <div className="text-xl">
        <span className="cursor-pointer font-alata">MyPortfolio</span>
      </div>

      {/* Center Section (Navigation) */}
      <div className="flex gap-8">
        <button
          onClick={() => handleScroll("#about")}
          className="font-alata hover:text-gray-400 transition"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="font-grotesk hover:text-gray-400 transition"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="hover:text-gray-400 transition font-alata"
        >
          Contact
        </button>
      </div>

      {/* Right Section (Social Icons + Theme) */}
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
