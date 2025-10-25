"use client";
import Link from "next/link";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import HorizontalTimeline, {
  TimelineItem,
} from "./components/HorizontalTimeline";
import TechStack from "./components/Techstack";

const items: TimelineItem[] = [
  {
    title: "HIGH SCHOOL EDUCATION",
    period: "2020 - 2022",
    description:
      "Completed higher secondary education with a focus on Computer Science and Mathematics. Developed an early interest in programming, technology, and creative problem-solving.",
    type: "Education",
  },
  {
    title: "BACHELOR OF COMPUTER SCIENCE AND DESIGN",
    period: "2022 - 2026",
    description:
      "Graduated with a degree in Computer Science. Built a strong foundation in algorithms, data structures, and web development. Participated in hackathons and open-source contributions.",
    type: "Education",
  },
  {
    title: "SOFTWARE DEVELOPER (Freelance)",
    period: "2023 - Present",
    description:
      "Worked as a freelance frontend developer for small businesses and startups. Designed and developed responsive websites using React, Next.js, and Tailwind CSS, focusing on user experience and performance.",
    type: "Experience",
  },
];

export default function Home() {
  useLenis();

  return (
    <main className="text-white">
      <Navbar />
      <About />
      <HorizontalTimeline items={items} />
      <TechStack />
      <Projects />
      <Contact />
    </main>
  );
}
