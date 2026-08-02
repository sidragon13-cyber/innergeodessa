import type { Metadata } from "next";
import {
  CompassMark,
  PrimaryButton,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Personality Test — InnerGeodessa",
  description:
    "Explore four broad personality dimensions through a reflective 72-question self-discovery assessment.",
};

const dimensions = [
  {
    number: "01",
    name: "Energy",
    spectrum: "Extraversion — Introversion",
    description: "How you tend to direct and restore your energy.",
    initials: ["E", "I"],
  },
  {
    number: "02",
    name: "Information",
    spectrum: "Sensing — Intuition",
    description: "How you tend to notice, interpret, and connect information.",
    initials: ["S", "N"],
  },
  {
    number: "03",
    name: "Decisions",
    spectrum: "Thinking — Feeling",
    description: "How you tend to weigh logic, values, and human impact.",
    initials: ["T", "F"],
  },
  {
    number: "04",
    name: "Structure",
    spectrum: "Judging — Perceiving",
    description: "How you tend to approach planning, openness, and daily life.",
    initials: ["J", "P"],
  },
];

const resultDetails = [
  "A four-letter personality profile",
  "A plain-language explanation of your tendencies",
  "Strengths and possible blind spots",
  "Preferred working and learning environments",
  "Career areas worth exploring",
  "A complete personality report you can review and print",
];

const guidance = [
  "Choose the response that reflects your typical behaviour.",
  "Do not answer according to who you think you should be.",
  "Avoid overthinking individual questions.",
  "There are no right or wrong personality types.",
];

const limitations = [
  "This is an original self-exploration assessment inspired by public personality-dimension theory.",
  "It is not an official MBTI assessment. MBTI is a trademark of The Myers-Briggs Company.",
  "Results are not medical, psychological, or employment diagnoses.",
  "Treat your result as one perspective rather than a fixed identity.",
];

function PersonalityContour() {
  return (
    <div className="personality-contour" aria-hidden="true">
      <svg viewBox="0 0 620 560" fill="none">
        <path d="M-12 446c104-23 138-102 210-144 76-44 148-27 205-94 48-57 72-128 71-220" />
        <path d="M-2 493c117-23 162-105 234-150 74-46 139-39 197-98 62-64 89-144 86-245" />
        <path d="M23 540c122-31 179-108 247-152 72-47 129-48 187-100 73-66 105-160 102-288" />
        <path d="M118 560c85-44 127-100 188-138 66-41 117-48 171-96 80-71 119-179 116-326" />
        <circle cx="321" cy="275" r="126" />
        <circle cx="321" cy="275" r="76" />
      </svg>
      <div className="personality-compass">
        <CompassMark />
        <span>Your pattern</span>
      </div>
      <span className="contour-code contour-code-one">E / I</span>
      <span className="contour-code contour-code-two">S / N</span>
      <span className="contour-code contour-code-three">T / F</span>
      <span className="contour-code contour-code-four">J / P</span>
    </div>
  );
}

export default function PersonalityPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="personality-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="personality-hero-copy">
          <p className="eyebrow">Personality</p>

          <h1>
            Understand the patterns behind how you think, decide, and engage
            with the world.
          </h1>

          <p className="personality-intro">
            This reflective assessment explores four broad personality
            dimensions and combines them into one of sixteen descriptive
            profiles.
          </p>

          <ul className="assessment-meta" aria-label="Assessment details">
            <li>72 questions</li>
            <li>8–12 minutes</li>
            <li>No account required</li>
          </ul>

          <div className="personality-actions">
            <PrimaryButton href="/personality/test">
              Begin the Assessment
            </PrimaryButton>

            <a className="secondary-link" href="#dimensions">
              How the assessment works <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <PersonalityContour />
      </Container>

      <Container
        as="section"
        id="dimensions"
        className="dimensions-section"
      >
        <div className="personality-section-heading">
          <p className="eyebrow">The framework</p>
          <h2>Four dimensions. One profile.</h2>
          <p>
            Each dimension describes a continuum of preferences. Neither side
            is better, healthier, or more capable than the other.
          </p>
        </div>

        <div className="dimension-list">
          {dimensions.map((dimension) => (
            <article className="dimension-row" key={dimension.name}>
              <span className="dimension-number">{dimension.number}</span>

              <div className="dimension-name">
                <p>{dimension.name}</p>
                <h3>{dimension.spectrum}</h3>
              </div>

              <p className="dimension-description">
                {dimension.description}
              </p>

              <div className="dimension-initials" aria-hidden="true">
                <span>{dimension.initials[0]}</span>
                <i />
                <span>{dimension.initials[1]}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>

      <section className="result-section">
        <Container className="result-inner">
          <div className="result-heading">
            <p className="eyebrow">Your result</p>
            <h2>What you will receive</h2>
            <p>
              A clear starting point for reflection, with practical language
              you can carry into work, learning, and everyday life.
            </p>
          </div>

          <ol className="result-list">
            {resultDetails.map((detail, index) => (
              <li key={detail}>
                <span>0{index + 1}</span>
                {detail}
              </li>
            ))}
          </ol>

          <p className="result-note">
            Your result is generated immediately after completion. No account
            or sign-in is required.
          </p>
        </Container>
      </section>

      <Container
        as="section"
        className="guidance-section"
      >
        <div className="guidance-heading">
          <p className="eyebrow">Before you begin</p>
          <h2>Answer as you usually are</h2>
        </div>

        <div className="guidance-grid">
          {guidance.map((item, index) => (
            <article key={item}>
              <span>0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </Container>

      <section className="limitation-section">
        <Container className="limitation-inner">
          <div>
            <p className="eyebrow">Use with perspective</p>
            <h2>A tool for reflection, not diagnosis.</h2>
          </div>

          <ul>
            {limitations.map((limitation) => (
              <li key={limitation}>{limitation}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        className="personality-final-cta"
        id="assessment"
      >
        <Container>
          <CompassMark />

          <p className="eyebrow">
            Personality assessment
          </p>

          <h2>
            Ready to explore your personality?
          </h2>

          <PrimaryButton href="/personality/test">
            Begin the Assessment
          </PrimaryButton>

          <p className="final-cta-note">
            72 questions · approximately 8–12 minutes
          </p>
        </Container>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
