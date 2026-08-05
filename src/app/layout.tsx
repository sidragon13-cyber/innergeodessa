import type { Metadata } from "next";

import {
  LocaleProvider,
} from "@/components/locale";
import {
  AuthProvider,
} from "@/components/account/auth-provider";

import "./globals.css";
import "./brand-home.css";

export const metadata: Metadata = {
  title: "InnerGeo — Self-Discovery, Thoughtfully Mapped",
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
      <body className="min-h-full flex flex-col">
        <LocaleProvider>
          <AuthProvider>{children}</AuthProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
