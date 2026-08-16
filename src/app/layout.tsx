import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";

import {
  LocaleProvider,
} from "@/components/locale";
import {
  AuthProvider,
} from "@/components/account/auth-provider";

import "./globals.css";
import "./brand-home.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-innergeo-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-innergeo-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "InnerGeo — Self-Discovery, Thoughtfully Mapped",
  description:
    "Explore personality, career interests, kids interest discovery, and zodiac identity through four thoughtful self-discovery experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <AuthProvider>{children}</AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
