"use client";

import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import HorizontalTimeline, {
  TimelineItem,
} from "./components/VerticalTimeline";
import TechStack from "./components/Techstack";
import Certifications from "./components/Certifications";

const items: TimelineItem[] = [
  {
    title: "HIGH SCHOOL EDUCATION - COMPUTER SCIENCE",
    period: "2020 - 2022",
    description:
      "Completed higher secondary education with a focus on Computer Science and Mathematics, which laid the groundwork for my interest in technology, programming, and problem solving.",
    type: "Education",
  },
  {
    title: "BACHELOR OF COMPUTER SCIENCE AND DESIGN",
    period: "2022 - 2026",
    description:
      "Graduated with a degree in Computer Science, building a strong foundation in algorithms, data structures, and software engineering while exploring practical application development and collaborative technology projects.",
    type: "Education",
  },
  {
    title: "FULL-STACK DEVELOPMENT",
    period: "2023 - Present",
    description:
      "Built web applications and interfaces using React, Next.js, Node.js, and Tailwind CSS, strengthening my engineering mindset, software design thinking, and end-to-end product development skills.",
    type: "Experience",
  },
  {
    title: "SECURITY OPERATIONS ENGINEER INTERN - XIOTZ PRIVATE LIMITED",
    period: "MAY 2026 - JUL 2026",
    description:
      "Gained hands-on experience in security monitoring, incident response, and Linux-based operations, working with tools such as Wazuh and Kali Linux to understand alert triage and real-world SOC workflows.",
    type: "Experience",
  },
  {
    title: "SECURITY & CLOUD FOCUS",
    period: "Current focus",
    description:
      "Targeting Security Operations Engineer and Cloud Security roles, with a focus on monitoring, incident handling, and secure systems operations. I continue to strengthen my Linux, Python, and security tooling skills to build a practical foundation for operational security roles.",
    type: "Experience",
  },

];

export default function Home() {
  useLenis();

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      {/* FULL-WIDTH GRID BACKGROUND */}
      <div className="absolute inset-0 -z-10 bg-black">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* CENTERED CONTENT */}
      <div className="">
        <Navbar />
        <About />
        <HorizontalTimeline items={items} />
        <TechStack />
        <Certifications />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
