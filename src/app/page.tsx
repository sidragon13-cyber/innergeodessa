import {
  Hero,
  HomeExploreSection,
  HomeTrustMetrics,
  HomeProfileSection,
  HomeTrustSection,
  HomeValuesSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <Hero />
      <HomeTrustMetrics />

      <HomeExploreSection />

      <HomeProfileSection />

      <HomeValuesSection />

      <HomeTrustSection />

      <SiteFooter />
    </main>
  );
}
