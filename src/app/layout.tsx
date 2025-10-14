import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Alata } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const alata = Alata({
  subsets: ["latin"],
  variable: "--font-alata",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio to get placed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} ${alata.variable} antialiased bg-neutral-950 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
