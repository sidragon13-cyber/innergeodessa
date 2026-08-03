import {
  CompassMark,
  Hero,
  HomeExploreSection,
  HomeProfileSection,
  HomeTrustSection,
  HomeValuesSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";


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
