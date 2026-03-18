"use client";

import { useEffect, useState } from "react";
import { Menu, X, User, Layers3, FolderKanban, Mail } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAboutVisible, setIsAboutVisible] = useState(true);

  const dockItems = [
    { id: "about", label: "About", icon: User },
    { id: "techstack", label: "Tech Stack", icon: Layers3 },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  // Scroll to section
  const handleScroll = (id: string) => {
    const target = document.querySelector(`#${id}`);
    const lenis = window.lenis;

    if (target instanceof HTMLElement && lenis) {
      lenis.scrollTo(target, { offset: -12 });
    } else {
      target?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Show desktop dock only after leaving About section
  useEffect(() => {
    const aboutSection = document.querySelector("#about");
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsAboutVisible(entry.isIntersecting),
      { threshold: 0.45 }
    );

    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile top navbar */}
      <nav
        className="w-full z-50 px-6 py-4 select-none bg-black md:hidden"
        role="navigation"
      >
        <div className="flex items-center justify-between relative">
          <div className="text-xl text-white">MyPortfolio</div>

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
          text-2xl z-40 transition-transform duration-300 ease-in-out
          ${
            menuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
        >
          <button
            onClick={() => handleScroll("about")}
            className="hover:text-blue-400"
          >
            About
          </button>
          <button
            onClick={() => handleScroll("projects")}
            className="hover:text-blue-400"
          >
            Projects
          </button>
          <button
            onClick={() => handleScroll("techstack")}
            className="hover:text-blue-400"
          >
            Tech Stack
          </button>
          <button
            onClick={() => handleScroll("contact")}
            className="hover:text-blue-400  "
          >
            Contact
          </button>
        </div>
      </nav>

      {/* Desktop left dock */}
      <nav
        role="navigation"
        aria-label="Desktop dock"
        className={`hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          isAboutVisible ? "opacity-0 pointer-events-none -translate-x-4" : "opacity-100"
        }`}
      >
        <div className="flex flex-col gap-3 rounded-xl border border-white/15 bg-black/50 backdrop-blur-md p-1 shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          {dockItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                title={item.label}
                aria-label={item.label}
                className="group relative flex h-11 w-11 items-center justify-center rounded-xl text-gray-300 transition-all duration-200 cursor-pointer hover:bg-white/2 hover:text-blue-400"
              >
                <Icon size={20} />
                <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
