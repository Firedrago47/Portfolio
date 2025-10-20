"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, X } from "lucide-react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { name, email, message } = form;
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await emailjs.send(
        serviceID,
        templateID,
        { from_name: name, from_email: email, message },
        publicKey
      );
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("Failed to send message.");
    }
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
        className="text-lg max-w-xl text-center text-gray-300 mb-8"
      >
        Have a project or idea? Let’s make it real together.
      </motion.p>

      {!showForm && (
        <motion.button
          onClick={() => setShowForm(true)}
          className="relative group flex items-center justify-center w-16 h-16 rounded-full overflow-hidden 
                    bg-gradient-to-br from-blue-500 via-blue-800 to-purple-600 shadow-lg"
          whileHover={{
            scale: 1.1,
            rotate: 5,
            boxShadow: "0 0 8px rgba(96,165,250,0.9)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Holographic Shimmer Overlay */}
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-200 via-white to-white opacity-10 mix-blend-screen"
            style={{ backgroundSize: "200% 200%" }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Icon */}
          <motion.span
            className="relative z-10 text-white"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Mail className="w-6 h-6" />
          </motion.span>
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
            ref={formRef}
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg mt-1 p-[2px] rounded-3xl neon-border"
          >
            {/* Inner Form Container */}
            <div className="relative z-10 p-8 rounded-3xl bg-black border border-white/10 shadow-2xl">
              <div className="flex flex-col gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 font-alata rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 font-alata rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 font-alata rounded-lg bg-neutral-800/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                />
                <div className="flex gap-4 mt-2">
                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="relative flex items-center justify-center flex-1 px-6 py-3 rounded-lg shadow-lg overflow-hidden
                            bg-gradient-to-r from-blue-900 via-blue-800 to-blue-800"
                >
                  {/* Holographic Shimmer Overlay */}
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 via-blue-400 to-gray-800 opacity-50 mix-blend-screen"
                    style={{ backgroundSize: "200% 200%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Icon */}
                  <Send className="relative z-10 w-5 h-5 text-white" />
                </motion.button>

                {/* Cancel Button */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="relative flex items-center justify-center px-6 py-3 rounded-lg border border-gray-600 overflow-hidden"
                >
                  {/* Holographic Shimmer Overlay */}
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-900 to-zinc-800 opacity-40 mix-blend-screen"
                    style={{ backgroundSize: "200% 200%" }}
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Icon */}
                  <X className="relative z-10 w-5 h-5 text-gray-300 hover:text-white" />
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
          className="mt-6 text-gray-300 text-base font-alata"
        >
          {status}
        </motion.p>
      )}
    </section>
  );
};

export default Contact;
