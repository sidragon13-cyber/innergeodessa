import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

import {
  Hero,
  HomeExploreSection,
  HomeTrustMetrics,
  HomeProfileSection,
  HomeMethodologyTeaser,
  HomeValuesSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <Hero />
      <HomeExploreSection />

      <HomeTrustMetrics />

      <HomeProfileSection />

      <HomeValuesSection />

      <HomeMethodologyTeaser />

      <SiteFooter />
    </main>
  );
}
