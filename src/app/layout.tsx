import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "SG Notes - AI Study Companion",
  description: "Singapore's smartest note-taking app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-pattern-sg min-h-screen text-slate-800 selection:bg-teal-200 selection:text-teal-900" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
