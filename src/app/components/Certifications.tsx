"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Cloud,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Badge from "./Badge";

const tabs = [
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "badges", label: "Badges", icon: Cloud },
] as const;

type TabId = (typeof tabs)[number]["id"];

type BadgeData = {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  color: string;
};

const certifications: BadgeData[] = [
  {
    icon: Cloud,
    title: "AWS Certified AI Practitioner",
    subtitle: "Amazon Web Services",
    color: "#FF9900",
  },
  {
    icon: Cloud,
    title: "AWS Certified Cloud Practitioner",
    subtitle: "Amazon Web Services",
    color: "#FF9900",
  },
  {
    icon: ShieldCheck,
    title: "AWS Security Specialty",
    subtitle: "In progress",
    color: "#7C3AED",
  },
];

const certificationBadges: BadgeData[] = [
  {
    icon: Cloud,
    title: "Credly Badge",
    subtitle: "AWS Verified Credential",
    color: "#FF9900",
  },
];

export default function Certifications() {
  const [activeTab, setActiveTab] = useState<TabId>("certifications");

  const activeData =
    activeTab === "certifications" ? certifications : certificationBadges;

  return (
    <section
      id="certifications"
      className="relative min-h-screen py-24 px-6 md:px-16 overflow-hidden"
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="certifications-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#374151"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#certifications-grid)" />
        </svg>
      </div>

      {/* Glowing orb */}
      <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(2,0,36,1)_0%,transparent_70%)] animate-[spin_45s_linear_infinite] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-grotesk bg-white bg-clip-text text-transparent uppercase tracking-wide">
            Certifications <span className="text-blue-400">&</span> Badges
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mt-4 text-base font-mono">
            Professional AWS certifications and verified credentials in cloud, AI, and security.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all duration-300 text-sm font-mono cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-transparent to-blue-950 text-white border-blue-400 scale-105 shadow-lg shadow-blue-500/10"
                    : "border-grey-700 text-gray-400 hover:text-white hover:border-blue-400 scale-100 hover:scale-105 hover:shadow-md hover:shadow-blue-500/5"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "certifications" && (
          <div className="max-w-3xl mx-auto space-y-4">
            {activeData.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${badge.color}22`, color: badge.color }}
                  >
                    <badge.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {badge.title}
                    </h3>
                    <p className="text-sm text-gray-400">{badge.subtitle}</p>
                  </div>
                </div>

                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-mono uppercase tracking-[0.18em] text-blue-300">
                  {badge.title.includes("In progress") ? "In Progress" : "Certified"}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "badges" && (
          <div className="flex min-h-[260px] items-center justify-center mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div
                data-iframe-width="150"
                data-iframe-height="270"
                data-share-badge-id="a424ff4f-32a1-4c0c-9f7c-3b1c0535361f"
                data-share-badge-host="https://www.credly.com"
              ></div>
              <script
                type="text/javascript"
                async
                src="//cdn.credly.com/assets/utilities/embed.js"
              ></script>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}