import {
  CompassMark,
  Hero,
  ProductGrid,
  SiteFooter,
  SiteHeader,
  type Product,
} from "@/components/home";

import {
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

const products: Product[] = [
  {
    number: "01",
    id: "personality",
    title: "Personality Test",
    description:
      "Understand how you gain energy, process information, make decisions, and approach life.",
    metadata: "48 questions · 6–8 minutes",
    cta: "Start Personality Test",
    symbol: "P",
    href: "/personality",
  },
  {
    number: "02",
    id: "career",
    title: "Career Interest",
    description:
      "Discover the activities, environments, and fields that naturally attract you.",
    metadata: "36 questions · 5–7 minutes",
    cta: "Explore Career Interests",
    symbol: "C",
    href: "/career",
  },
  {
    number: "03",
    id: "zodiac",
    title: "Zodiac Identity",
    description:
      "Begin with your birth date and discover your zodiac identity.",
    metadata: "About 1 minute",
    cta: "Discover Your Sign",
    symbol: "Z",
    href: "/zodiac",
  },
];

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
  "InnerGeodessa does not provide medical or psychological diagnosis.",
  "No account is required for the initial experience.",
  "Privacy and user control will guide future development.",
];

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />
      <Hero />

      <Section
        id="explore"
        spacing="large"
        className="explore-section"
      >
        <Container>
          <SectionHeading
            eyebrow="Explore yourself"
            title="Three ways to understand yourself"
            description={
              <p>
                Start anywhere. Each experience offers a different lens on what
                makes you, you.
              </p>
            }
            className="mb-14"
          />

          <ProductGrid products={products} />
        </Container>
      </Section>

      <Section
        id="how-it-works"
        spacing="large"
        className="profile-section"
      >
        <Container className="profile-inner">
          <SectionHeading
            eyebrow="How it comes together"
            title={
              <>
                One profile.
                <br />
                <em>Three dimensions.</em>
              </>
            }
            description={
              <p>
                Each result becomes part of your InnerGeodessa identity profile,
                helping you understand yourself from different perspectives.
              </p>
            }
            className="profile-intro"
          />

          <div className="profile-example">
            <div className="profile-orbit" aria-hidden="true">
              <CompassMark />
            </div>

            <p className="example-label">Example identity</p>

            <div className="identity-result">
              <span>Personality</span>
              <strong>INTP</strong>
            </div>

            <div className="identity-result">
              <span>Career interests</span>
              <strong>Investigative · Artistic</strong>
            </div>

            <div className="identity-result">
              <span>Zodiac</span>
              <strong>Scorpio</strong>
            </div>

            <p className="example-note">
              A preview of how three perspectives can sit together. Saving
              profiles is not yet available.
            </p>
          </div>
        </Container>
      </Section>

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
