import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InnerGeodessa — Self-Discovery, Thoughtfully Mapped",
  description:
    "Explore your personality, career interests, and zodiac identity through three thoughtful self-discovery experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
