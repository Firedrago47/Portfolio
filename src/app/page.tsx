"use client";
import Link from "next/link";
import useLenis from "./hooks/useLenis";
import Navbar from "./components/Navbar";

export default function Home() {
  useLenis(); // Initialize Lenis

  return (
    <main className="bg-black text-white">
      {/* Navbar */}
      <Navbar/>

      {/* About Section */}
      <section
        id="about"
        className="h-screen flex flex-col items-center justify-center px-6"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Deepan Raj S</h1>
        <p className="text-lg max-w-xl font-bold text-center text-gray-300">
          I'm a passionate developer building smooth digital experiences.
        </p>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="h-screen flex flex-col items-center justify-center px-6 bg-gray-900"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Projects</h1>
        <p className="text-lg max-w-xl text-center text-gray-300">
          Here are some of my works and experiments.
        </p>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="h-screen flex flex-col items-center justify-center px-6 bg-gray-800"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact</h1>
        <p className="text-lg max-w-xl text-center text-gray-300">
          Let’s build something amazing together! Drop me a message.
        </p>
      </section>
    </main>
  );
}
