import type { Metadata } from "next";
import Link from "next/link";

import {
  CompassMark,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Career Interest Assessment | InnerGeodessa",
  description:
    "Explore your career interests through six balanced dimensions and discover work environments, learning paths, and future directions that may fit you.",
};

const dimensions = [
  {
    code: "R",
    title: "Realistic",
    theme: "Build, operate, repair, and work with tangible systems.",
    examples: [
      "Practical activity",
      "Tools and equipment",
      "Nature and the physical world",
      "Hands-on problem-solving",
    ],
  },
  {
    code: "I",
    title: "Investigative",
    theme: "Understand, analyse, research, and solve complex questions.",
    examples: [
      "Science and data",
      "Research",
      "Systems thinking",
      "Independent problem-solving",
    ],
  },
  {
    code: "A",
    title: "Artistic",
    theme: "Create, express, imagine, and communicate original ideas.",
    examples: [
      "Design and writing",
      "Visual communication",
      "Performance",
      "Creative experimentation",
    ],
  },
  {
    code: "S",
    title: "Social",
    theme: "Support, teach, guide, connect, and develop people.",
    examples: [
      "Education",
      "Counselling",
      "Communication",
      "Collaborative development",
    ],
  },
  {
    code: "E",
    title: "Enterprising",
    theme: "Lead, persuade, initiate, organise, and create momentum.",
    examples: [
      "Business and leadership",
      "Negotiation",
      "Entrepreneurship",
      "Influence and decisions",
    ],
  },
  {
    code: "C",
    title: "Conventional",
    theme: "Organise, structure, maintain, and improve reliable processes.",
    examples: [
      "Planning",
      "Administration and finance",
      "Quality control",
      "Information organisation",
    ],
  },
];

const resultPreview = [
  "Primary and secondary interest dimensions",
  "An explanation of your RIASEC pattern",
  "Preferred tasks and environments",
  "Possible career families",
  "Education and learning directions",
  "Transferable strengths",
  "Development areas",
  "Questions for further exploration",
  "Possible links with personality and values",
  "Practical next-step recommendations",
];

const guidance = [
  "Answer according to genuine interest, not social expectations.",
  "Distinguish what you enjoy from what you are already good at.",
  "Avoid choosing answers only because a career seems prestigious or profitable.",
  "Think across school, work, hobbies, projects, and daily life.",
  "Use the result as evidence for reflection rather than a final decision.",
];

function ComingSoonAction({ children }: { children: React.ReactNode }) {
  return (
    <Link href="/career/test" className="primary-button">
      {children}
    </Link>
  );
}

function CareerMap() {
  return (
    <div className="career-map" aria-hidden="true">
      <svg viewBox="0 0 620 620" fill="none">
        <circle cx="310" cy="310" r="224" />
        <circle cx="310" cy="310" r="162" />
        <circle cx="310" cy="310" r="96" />
        <path d="M310 36v548M36 310h548M116 116l388 388M504 116 116 504" />
      </svg>
      <div className="career-map-center">
        <CompassMark />
        <span>Interests</span>
      </div>
      {dimensions.map((dimension, index) => (
        <span
          className={`career-map-code career-map-code-${index + 1}`}
          key={dimension.code}
        >
          {dimension.code}
        </span>
      ))}
    </div>
  );
}

export default function CareerPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="career-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="career-hero-copy">
          <p className="eyebrow">Career Interest Assessment</p>

          <h1>
            Discover the work that feels meaningful to you.
          </h1>

          <p className="career-intro">
            Explore the environments, activities, and challenges that
            naturally hold your attention. Your interests can help reveal
            career directions worth investigating—not a single job you must
            choose.
          </p>

          <ul className="assessment-meta" aria-label="Assessment details">
            <li>Six interest dimensions</li>
            <li>Approximately 8–12 minutes</li>
            <li>Designed for career exploration</li>
            <li>No right or wrong answers</li>
          </ul>

          <div className="career-actions">
            <ComingSoonAction>
              Start Assessment
            </ComingSoonAction>

            <a className="secondary-link" href="#riasec">
              Explore the Six Dimensions <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <CareerMap />
      </Container>

      <Container
        as="section"
        className="career-context"
      >
        <div className="career-context-heading">
          <p className="eyebrow">Look beyond the title</p>
          <h2>Why career interests matter</h2>
        </div>

        <div className="career-context-copy">
          <p>
            Career decisions are shaped by more than job titles. Sustained
            interest often grows from the activities you enjoy, the problems
            you want to solve, and the environments where your attention feels
            naturally engaged.
          </p>

          <p>
            You may prefer working with people, systems, ideas, creativity,
            structure, or practical action—and those interests may develop
            over time. A useful career direction also considers skills, values,
            opportunities, education, circumstances, and real-world
            experience.
          </p>
        </div>
      </Container>

      <section className="riasec-section" id="riasec">
        <Container>
          <div className="career-section-heading">
            <div>
              <p className="eyebrow">The RIASEC framework</p>
              <h2>Six dimensions of interest</h2>
            </div>

            <p>
              Most people combine several dimensions. None is more valuable
              than another, and no single dimension defines your future.
            </p>
          </div>

          <div className="riasec-grid">
            {dimensions.map((dimension, index) => (
              <article className="riasec-card" key={dimension.code}>
                <div className="riasec-card-top">
                  <span>0{index + 1}</span>
                  <strong aria-hidden="true">{dimension.code}</strong>
                </div>

                <h3>{dimension.title}</h3>
                <p>{dimension.theme}</p>

                <ul>
                  {dimension.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="interest-pattern"
      >
        <div className="interest-pattern-heading">
          <p className="eyebrow">Your interest pattern</p>
          <h2>A combination, not a rigid label</h2>
        </div>
        <div className="pattern-body">
          <p>
            The future assessment will highlight your strongest interest
            areas, supporting dimensions, preferred activities, and the
            environments that may feel energising—or require more deliberate
            effort.
          </p>
          <div className="pattern-examples" aria-label="Example combinations">
            <span>Investigative</span>
            <i>+</i>
            <span>Artistic</span>
            <em>or</em>
            <span>Enterprising</span>
            <i>+</i>
            <span>Social</span>
          </div>
          <p>
            Combinations help widen exploration. They are starting points for
            questions and real-world research, not instructions about the one
            career you should pursue.
          </p>
        </div>
      </Container>

      <section className="career-results">
        <Container className="career-results-inner">
          <div className="career-results-heading">
            <p className="eyebrow">Future result preview</p>
            <h2>What your result may include</h2>
            <p>
              A structured overview for comparing possibilities—not a claim
              to identify your perfect career.
            </p>
          </div>

          <ol>
            {resultPreview.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container
        as="section"
        className="beyond-section"
      >
        <div className="beyond-heading">
          <p className="eyebrow">Flexible directions</p>
          <h2>Beyond job titles</h2>
        </div>

        <div className="beyond-grid">
          <p>
            One interest pattern can connect to many occupations, and the same
            occupation can feel very different across industries.
          </p>

          <p>
            Work environment and role design may matter as much as the title
            printed on a job description.
          </p>

          <p>
            People can combine interests through portfolio careers,
            entrepreneurship, interdisciplinary work, and changing roles over
            time.
          </p>
        </div>
      </Container>

      <section className="career-guidance">
        <Container>
          <div className="career-section-heading">
            <div>
              <p className="eyebrow">Assessment guidance</p>
              <h2>Answer from genuine interest</h2>
            </div>
            <p>
              Curiosity is different from competence. Consider what draws you
              in, even when you are still learning.
            </p>
          </div>
          <div className="career-guidance-grid">
            {guidance.map((item, index) => (
              <article key={item}>
                <span>0{index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="career-disclaimer">
        <Container className="career-disclaimer-inner">
          <div>
            <p className="eyebrow">Professional context</p>
            <h2>Exploration, not a career decision</h2>
          </div>

          <div>
            <p>
              This assessment is designed for education, self-reflection, and
              career exploration. It does not provide a professional
              psychological, educational, recruitment, or employment
              decision.
            </p>

            <p>
              Career choices should also consider abilities, values,
              qualifications, personal circumstances, labour-market
              conditions, and professional guidance where appropriate.
            </p>

            <p className="disclaimer-source">
              Inspired by widely used RIASEC career-interest concepts. No
              endorsement by an external organisation is implied.
            </p>
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="future-profile"
      >
        <div className="future-profile-copy">
          <p className="eyebrow">Future InnerGeodessa connection</p>
          <h2>More perspectives, brought together</h2>
          <p>
            A future integrated profile may connect career interests with
            personality preferences, strengths, values, learning style, and
            personal goals. These connections are not yet available.
          </p>
        </div>
        <div className="future-profile-map" aria-hidden="true">
          {[
            "Career",
            "Personality",
            "Strengths",
            "Values",
            "Learning",
            "Goals",
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
          <CompassMark />
        </div>
      </Container>

      <section className="career-final-cta">
        <div className="shell">
          <p className="eyebrow">Your next direction</p>
          <h2>
            Your direction becomes clearer when you understand what draws you
            forward.
          </h2>
          <p className="career-final-copy">
            Begin with curiosity. Explore your interests, compare
            possibilities, and build a direction through evidence and
            experience.
          </p>
          <div className="career-final-actions">
            <ComingSoonAction>Start Career Assessment</ComingSoonAction>
            <a className="secondary-link light-secondary" href="/personality">
              Explore Personality <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
