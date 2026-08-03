import type { Metadata } from "next";
import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import {
  AboutApproach,
  AboutBoundaries,
  AboutCommunity,
  AboutFinalCta,
  AboutFramework,
  AboutHero,
  AboutName,
  AboutPlatform,
  AboutProfile,
  AboutPurpose,
  AboutResponsible,
  AboutStatus,
} from "@/components/about";

export const metadata: Metadata = {
  title:
    "About InnerGeo｜关于 InnerGeo｜Self-Exploration and Growth",
  description:
    "Learn how InnerGeo brings personality, career interests, symbolic identity, and reflection together. 了解 InnerGeo 如何整合人格、职业兴趣、星座身份与自我反思。",
};

export default function AboutPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <AboutHero />

      <AboutPurpose />

      <AboutName />

      <AboutApproach />

      <AboutPlatform />

      <AboutProfile />

      <AboutFramework />

      <AboutBoundaries />

      <AboutCommunity />

      <AboutResponsible />

      <AboutStatus />

      <AboutFinalCta />

      <SiteFooter homePath="/" />
    </main>
  );
}
