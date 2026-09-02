"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

type BadgeProps = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  color?: string;
  className?: string;
};

export default function Badge({
  icon: Icon,
  title,
  subtitle,
  color = "#60A5FA",
  className = "",
}: BadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 cursor-pointer hover:border-blue-400/50 transition-colors duration-300 ${className}`}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}22, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="relative flex h-14 w-14 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110"
        style={{
          borderColor: `${color}55`,
          background: `${color}15`,
          color,
          boxShadow: `0 4px 16px ${color}22`,
        }}
      >
        <Icon size={26} />
      </div>

      {/* Title */}
      <h3 className="text-sm font-grotesk text-gray-100 text-center leading-snug">
        {title}
      </h3>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-xs font-mono text-gray-500 text-center">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}