import {
  CompassMark,
  Hero,
  HomeExploreSection,
  HomeProfileSection,
  HomeValuesSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

const trustPoints = [
  "Results are designed for self-exploration and personal reflection.",
  "InnerGeo does not provide medical or psychological diagnosis.",
  "No account is required for the initial experience.",
  "Privacy and user control will guide future development.",
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <Hero />

      <HomeExploreSection />

      <HomeProfileSection />

      <HomeValuesSection />

      <Section
        id="trust"
        spacing="large"
        className="trust-section"
      >
        <Container className="trust-inner">
          <SectionHeading
            eyebrow="A considered approach"
            title="Designed for reflection, not diagnosis."
            className="trust-heading"
          />

          <ul>
            {trustPoints.map((point, index) => (
              <li key={point}>
                <span aria-hidden="true">0{index + 1}</span>
                {point}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <SiteFooter />
    </main>
  );
}
