"use client";

import Script from "next/script";

type CredlyBadgeProps = {
  badgeId: string;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * Renders an embedded Credly badge widget.
 * Docs: https://www.credly.com/docs/embedding_badges
 */
export default function CredlyBadge({
  badgeId,
  width = 150,
  height = 270,
  className = "",
}: CredlyBadgeProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div
        data-iframe-width={width}
        data-iframe-height={height}
        data-share-badge-id={badgeId}
        data-share-badge-host="https://www.credly.com"
      />
      <Script
        src="https://cdn.credly.com/assets/utilities/embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
