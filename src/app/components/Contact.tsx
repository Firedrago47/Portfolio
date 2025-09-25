// components/Contact.tsx
"use client"; // if you’re using Next.js App Router

import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle submit (frontend only for now)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // Example: you can send this data to an API route (Next.js /api/contact)
      console.log("Form submitted:", form);

      setStatus("Message sent ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("Something went wrong ❌");
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-neutral-950 text-white"
    >
      <h1 className="text-4xl md:text-6xl font-grotesk mb-4">Contact</h1>
      <p className="text-lg max-w-xl text-center text-gray-300 mb-8">
        Let’s build something amazing together! Drop me a message.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-neutral-800 p-8 rounded-2xl shadow-lg space-y-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-grotesk transition"
        >
          Send Message
        </button>
      </form>

      {status && <p className="mt-4 text-gray-300">{status}</p>}
    </section>
  );
};

export default Contact;
