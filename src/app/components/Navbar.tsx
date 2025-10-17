"use client";

import { useRef, useEffect } from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return;

    // Fade out left and right sections after scrolling 50px
    ScrollTrigger.create({
      trigger: document.body,
      start: "top+=50 top",
      onEnter: () => {
        gsap.to([leftRef.current, rightRef.current], {
          opacity: 0,
          duration: 0.3,
          ease: "power1.out",
        });
      },
      onLeaveBack: () => {
        gsap.to([leftRef.current, rightRef.current], {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });
      },
    });

    // Animate center glow
    if (centerRef.current) {
      gsap.to(centerRef.current, {
        boxShadow: "0 0 4px 2px rgba(255,255,255,0.6)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }
  }, []);

  const handleScroll = (id: string) => {
    const target = document.querySelector(id);
    const lenis = (window as any).lenis;
    if (target && lenis) {
      lenis.scrollTo(target, { offset: -10 });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 py-4">
      {/* Left Section (Logo) */}
      <div
        ref={leftRef}
        className="text-xl font-alata cursor-pointer text-white transition-opacity duration-300"
      >
        MyPortfolio
      </div>

      {/* Center Section (Sticky) with Glow */}
      <div
        ref={centerRef}
        className="sticky top-4 mx-auto z-50 bg-black/40 backdrop-blur-md rounded-full px-6 py-2 flex gap-6 shadow-md transition-shadow duration-300 font-grotesk"
      >
        <button
          onClick={() => handleScroll("#about")}
          className="text-white hover:text-gray-300 transition cursor-pointer font-inherit"
        >
          About
        </button>
        <button
          onClick={() => handleScroll("#projects")}
          className="text-white hover:text-gray-300 transition cursor-pointer font-inherit"
        >
          Projects
        </button>
        <button
          onClick={() => handleScroll("#contact")}
          className="text-white hover:text-gray-300 transition cursor-pointer font-inherit"
        >
          Contact
        </button>
      </div>

      {/* Right Section (Social Icons) */}
      <div
        ref={rightRef}
        className="flex gap-4 text-xl text-white transition-opacity duration-300"
      >
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
