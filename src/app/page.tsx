"use client";
import Link from "next/link";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import HorizontalTimeline, { TimelineItem } from "./components/HorizontalTimeline";
import TechStack from "./components/Techstack";

const items: TimelineItem[] = [
  {
    title: "Bachelor of Computer Science",
    period: "2016 - 2020",
    description:
      "Completed a full-time undergraduate program focusing on software development, algorithms, and database systems. Participated in coding competitions and contributed to open-source projects.",
    type: "education",
  },
  {
    title: "Bachelor of Computer Science",
    period: "2016 - 2020",
    description:
      "Completed a full-time undergraduate program focusing on software development, algorithms, and database systems. Participated in coding competitions and contributed to open-source projects.",
    type: "education",
  },
  {
    title: "Frontend Developer",
    period: "2020 - 2022",
    description:
      "Worked on multiple client projects using React, Next.js, and Tailwind CSS. Focused on responsive design, performance optimization, and creating reusable UI components. Collaborated with designers and backend engineers to deliver high-quality web apps.",
    type: "experience",
  },
];

export default function Home() {
  useLenis(); // Initialize Lenis

  return (
    <main className="text-white">
      <Navbar />
      <About />
      <HorizontalTimeline items={items} />
      <TechStack/>
      <Projects />
      <Contact />
    </main>
  );
}
