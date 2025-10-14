"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    setTimeout(() => {
      setStatus("Message sent ✅");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-neutral-950 text-white overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-grotesk mb-4 text-center"
      >
        Get in Touch
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg max-w-xl text-center text-gray-300 mb-10"
      >
        Have a project or idea? Let’s make it real together.
      </motion.p>

      {!showForm && (
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 8px rgba(99,102,241,0.5)",
          }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowForm(true)}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r  from-blue-500 via-blue-700 to-blue-800 font-semibold tracking-wide shadow-xl transition-all"
        >
          Let’s Connect
        </motion.button>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg mt-6 p-[2px] rounded-3xl neon-border"
          >
            {/* Inner Form Container */}
            <div className="relative z-10 p-8 rounded-3xl bg-black border border-white/10 shadow-2xl">
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />

                <div className="flex gap-4 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-800 hover:to-blue-600 font-grotesk shadow-lg transition"
                  >
                    Send Message
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-gray-400 transition"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {status && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-gray-300"
        >
          {status}
        </motion.p>
      )}
    </section>
  );
};

export default Contact;
