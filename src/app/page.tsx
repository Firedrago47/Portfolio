"use client";
import Link from "next/link";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import HorizontalTimeline from "./components/HorizontalTimeline";
export type TimelineItem = {
  title: string;
  subtitle?: string;
  description?: string;
  period: string;
  skills?: string[];
  gpa?: string;
  type: "experience" | "education";
};

const educationItems = [
  { date: "2018 - 2022", title: "B.Tech CSE", description: "Graduated with strong foundation.", gpa: "8.5" },
  { date: "2016 - 2018", title: "High School", description: "Completed with distinction." },
];
const experienceItems = [
  { date: "2022 - Present", title: "Software Engineer", description: "Building scalable apps.", skills: ["React", "Node"] },
  { date: "2020 - 2021", title: "Frontend Developer", description: "Delivered responsive UIs.", skills: ["Next.js", "Tailwind"] },
];

const items: TimelineItem[] = [
  ...educationItems.map((ed) => ({
    title: ed.title,
    description: ed.description,
    period: ed.date,
    gpa: ed.gpa,
    type: "education" as const,
  })),
  ...experienceItems.map((e) => ({
    title: e.title,
    description: e.description,
    period: e.date, // <-- map `date` to `period`
    skills: e.skills,
    type: "experience" as const,
  })),
];

export default function Home() {
  useLenis(); // Initialize Lenis

  return (
    <main className=" text-white">
      {/* Navbar */}
      <Navbar/>
      {/* About Section */}
      <About/>
      {/* Projects Section */}
      <HorizontalTimeline items={items} />

      <Projects/>
      {/* Contact Section */}
      <Contact/>
    </main>
  );
}
