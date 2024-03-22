import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components";

export const metadata: Metadata = {
  title: "OnlyFrames",
  description: "Basically gum road but better on Frames",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-gradient-radial from-[#1b4142] via-[#0e302b] to-[#0E0E0E]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
