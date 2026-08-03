import {
  Hero,
  HomeExploreSection,
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

      <HomeExploreSection />

      <HomeProfileSection />

      <HomeValuesSection />

      <HomeTrustSection />

      <SiteFooter />
    </main>
  );
}
