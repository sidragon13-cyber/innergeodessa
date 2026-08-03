import {
  CompassMark,
  Hero,
  HomeExploreSection,
  HomeProfileSection,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

const values = [
  {
    number: "01",
    title: "Understand your patterns",
    description:
      "Notice the preferences and tendencies that shape how you move through everyday life.",
  },
  {
    number: "02",
    title: "Explore suitable directions",
    description:
      "Use your interests and natural inclinations as thoughtful starting points for what comes next.",
  },
  {
    number: "03",
    title: "Connect through shared identities",
    description:
      "See where your perspective overlaps with others as community features develop in a later phase.",
  },
];

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

      <Section
        id="about"
        spacing="large"
        className="value-section"
      >
        <Container>
          <div className="value-heading">
            <p className="eyebrow">Thoughtful by design</p>
            <h2>More than a label</h2>
            <p>
              Results are starting points for reflection—not boxes to put
              yourself in.
            </p>
          </div>

          <div className="value-grid">
            {values.map((value) => (
              <article key={value.number}>
                <span className="value-number">{value.number}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>

          <p className="future-note">
            <span aria-hidden="true">○</span>
            Community features are planned for a later phase.
          </p>
        </Container>
      </Section>

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
