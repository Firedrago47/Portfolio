"use client";

export default function About() {
  return (
    <section
      id="about"
      className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden 
                 text-white transition-colors duration-300"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/sample_vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10 transition-colors duration-300" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-alata mb-8">
          Deepan Raj S
        </h1>
        <p className="text-lg md:text-xl font-alata text-gray-200 max-w-2xl leading-relaxed">
          I’m a passionate{" "}
          <span className="text-blue-500 font-mono">
            Full-Stack Developer
          </span>{" "}
          with a strong interest in crafting smooth and modern digital experiences.  
          My focus is on building scalable web applications, interactive UI/UX, and seamless
          performance using{" "}
          <span className="text-blue-500 font-mono">
            React, Next.js, and Node.js
          </span>.
        </p>
      </div>
    </section>
  );
}
