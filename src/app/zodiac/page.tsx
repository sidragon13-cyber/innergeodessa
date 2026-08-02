import type { Metadata } from "next";

import {
  CompassMark,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

import {
  Container,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Zodiac Identity | InnerGeodessa",
  description:
    "Explore zodiac symbolism, personal identity, stories, and reflective themes through a thoughtful and culturally aware InnerGeodessa experience.",
};

const signs = [
  {
    code: "AR",
    name: "Aries",
    dates: "21 March – 19 April",
    theme: "Initiative, courage, and forward movement.",
    qualities: ["Action", "Independence", "Directness", "Starting new paths"],
  },
  {
    code: "TA",
    name: "Taurus",
    dates: "20 April – 20 May",
    theme: "Stability, value, patience, and grounded strength.",
    qualities: ["Consistency", "Comfort", "Loyalty", "Practical creation"],
  },
  {
    code: "GE",
    name: "Gemini",
    dates: "21 May – 20 June",
    theme: "Curiosity, connection, language, and changing perspectives.",
    qualities: ["Communication", "Adaptability", "Learning", "Multiple interests"],
  },
  {
    code: "CA",
    name: "Cancer",
    dates: "21 June – 22 July",
    theme: "Care, belonging, memory, and emotional protection.",
    qualities: ["Home", "Sensitivity", "Loyalty", "Emotional awareness"],
  },
  {
    code: "LE",
    name: "Leo",
    dates: "23 July – 22 August",
    theme: "Expression, confidence, creativity, and visible warmth.",
    qualities: ["Leadership", "Generosity", "Identity", "Creative presence"],
  },
  {
    code: "VI",
    name: "Virgo",
    dates: "23 August – 22 September",
    theme: "Discernment, improvement, service, and thoughtful order.",
    qualities: ["Analysis", "Detail", "Usefulness", "Refinement"],
  },
  {
    code: "LI",
    name: "Libra",
    dates: "23 September – 22 October",
    theme: "Balance, relationship, beauty, and shared understanding.",
    qualities: ["Harmony", "Fairness", "Diplomacy", "Aesthetics"],
  },
  {
    code: "SC",
    name: "Scorpio",
    dates: "23 October – 21 November",
    theme: "Depth, transformation, trust, and hidden strength.",
    qualities: ["Intensity", "Resilience", "Privacy", "Emotional truth"],
  },
  {
    code: "SA",
    name: "Sagittarius",
    dates: "22 November – 21 December",
    theme: "Exploration, meaning, freedom, and expanding horizons.",
    qualities: ["Travel", "Philosophy", "Optimism", "Discovery"],
  },
  {
    code: "CP",
    name: "Capricorn",
    dates: "22 December – 19 January",
    theme: "Responsibility, endurance, structure, and long-term achievement.",
    qualities: ["Discipline", "Ambition", "Reliability", "Strategic progress"],
  },
  {
    code: "AQ",
    name: "Aquarius",
    dates: "20 January – 18 February",
    theme: "Originality, independence, community, and future thinking.",
    qualities: [
      "Innovation",
      "Ideals",
      "Unconventional thinking",
      "Collective change",
    ],
  },
  {
    code: "PI",
    name: "Pisces",
    dates: "19 February – 20 March",
    theme: "Imagination, empathy, intuition, and emotional openness.",
    qualities: ["Creativity", "Compassion", "Symbolism", "Inner worlds"],
  },
];

const profilePreview = [
  "Sign symbolism",
  "Identity themes",
  "Strengths to reflect on",
  "Possible blind spots",
  "Communication themes",
  "Relationship reflections",
  "Growth prompts",
  "Seasonal symbolism",
  "Cultural stories",
  "Journaling questions",
  "Connections with personality and interests",
  "A future InnerGeodessa guardian concept",
];

const reflectionQuestions = [
  "Which themes feel familiar?",
  "Which themes do I resist?",
  "How have I changed?",
  "What qualities am I developing?",
  "Which stories help me understand myself?",
];

const futureConcepts = [
  "Guardian stories",
  "Symbolic colours",
  "Natural elements",
  "Guardian stones",
  "Reflective prompts",
  "Illustrated identities",
  "Personal collections",
  "Shared-interest spaces",
];


function ZodiacOrbit() {
  return (
    <div className="zodiac-orbit" aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none">
        <circle cx="320" cy="320" r="248" />
        <circle cx="320" cy="320" r="184" />
        <circle cx="320" cy="320" r="106" />
        <path d="M320 22v596M22 320h596M109 109l422 422M531 109 109 531" />
      </svg>
      <div className="zodiac-orbit-center">
        <CompassMark />
        <span>Reflection</span>
      </div>
      {signs.map((sign, index) => (
        <span className={`orbit-sign orbit-sign-${index + 1}`} key={sign.code}>
          {sign.code}
        </span>
      ))}
    </div>
  );
}

export default function ZodiacPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <Container
        as="section"
        size="full"
        className="zodiac-hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
      >
        <div className="zodiac-hero-copy">
          <p className="eyebrow">Zodiac Identity</p>

          <h1>
            Explore the stories you see in yourself.
          </h1>

          <p className="zodiac-intro">
            Zodiac traditions have connected people with symbols, seasons,
            stories, and shared identities for centuries. InnerGeodessa
            approaches them as a reflective language—not a fixed definition of
            who you are.
          </p>

          <ul className="assessment-meta" aria-label="Experience details">
            <li>Twelve zodiac identities</li>
            <li>Symbolic and story-based</li>
            <li>Reflection and entertainment</li>
            <li>No right or wrong identity</li>
          </ul>

          <div className="zodiac-actions">
            <a className="primary-button" href="/zodiac/test">
              Explore Your Birth Chart
            </a>

            <a className="secondary-link" href="#signs">
              Meet the Twelve Signs <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <ZodiacOrbit />
      </Container>

      <Container
        as="section"
        className="zodiac-meaning"
      >
        <div>
          <p className="eyebrow">Our approach</p>
          <h2>What zodiac identity means here</h2>
        </div>

        <div className="zodiac-meaning-copy">
          <p>
            Zodiac signs can act as cultural and symbolic reference points for
            thinking about traits, patterns, hopes, contradictions, and
            relationships. A sign does not fully describe a person.
          </p>

          <p>
            You may identify with some themes and reject others. The value lies
            in reflection and conversation rather than certainty—playful,
            thoughtful, and never a scientifically proven personality
            classification.
          </p>
        </div>
      </Container>

      <section className="signs-section" id="signs">
        <Container>
          <div className="zodiac-section-heading">
            <div>
              <p className="eyebrow">Symbolic identities</p>
              <h2>Meet the twelve signs</h2>
            </div>

            <p>
              Each sign is often associated with a family of themes. Use them
              as invitations to reflect, not rules about how anyone must be.
            </p>
          </div>

          <div className="sign-grid">
            {signs.map((sign, index) => (
              <article className="sign-card" key={sign.name}>
                <div className="sign-card-top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong aria-hidden="true">{sign.code}</strong>
                </div>

                <p className="sign-dates">{sign.dates}</p>
                <h3>{sign.name}</h3>
                <p className="sign-theme">{sign.theme}</p>

                <ul>
                  {sign.qualities.map((quality) => (
                    <li key={quality}>{quality}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <Container
        as="section"
        className="more-than-sign"
      >
        <div>
          <p className="eyebrow">Leave room for complexity</p>
          <h2>More than one label</h2>
        </div>

        <div className="more-than-sign-copy">
          <p>
            Personality develops through biology, upbringing, culture,
            education, relationships, choices, and experience. Zodiac
            symbolism is only one possible reflective lens.
          </p>

          <p>
            It is normal to connect with several signs or themes—and equally
            normal to disagree with a description. You should never reshape
            yourself to fit a label.
          </p>

          <p className="tradition-note">
            Broader traditions may discuss moon signs, rising signs, and birth
            charts. Those calculations are outside this experience.
          </p>
        </div>
      </Container>

      <section className="zodiac-profile-preview">
        <Container>
          <div className="zodiac-profile-heading">
            <p className="eyebrow">Future profile preview</p>
            <h2>What a zodiac profile may include</h2>
            <p>
              Reflective material for exploring stories and themes—not a fake
              personalised result or a promise of prediction accuracy.
            </p>
          </div>

          <ol>
            {profilePreview.map((item, index) => (
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
        className="reflection-section"
      >
        <div className="reflection-heading">
          <p className="eyebrow">Reflection, not prediction</p>
          <h2>Questions over fortune-telling</h2>
          <p>
            InnerGeodessa will not use zodiac identity to make definitive
            claims about future events, health, money, employment, marriage,
            legal outcomes, safety, or major life decisions.
          </p>
        </div>

        <div className="reflection-questions">
          {reflectionQuestions.map((question, index) => (
            <p key={question}>
              <span>0{index + 1}</span>
              {question}
            </p>
          ))}
        </div>
      </Container>

      <section className="culture-section">
        <Container className="culture-inner">
          <div>
            <p className="eyebrow">Culture and shared stories</p>
            <h2>Traditions shaped across time and place</h2>
          </div>

          <div>
            <p>
              Zodiac systems developed through long historical and cultural
              processes, changing across places and periods. Modern zodiac
              content often combines history, popular culture, storytelling,
              identity, and entertainment.
            </p>

            <p>
              InnerGeodessa aims to approach these traditions respectfully,
              without claiming that one simplified description represents
              every historical practice or cultural perspective.
            </p>
          </div>
        </Container>
      </section>

      <section className="guardian-section shell">
        <div className="guardian-copy">
          <p className="eyebrow">Future Geodessa connection</p>
          <h2>A symbolic story world, still to come</h2>
          <p>
            Future creative concepts may connect zodiac themes with guardian
            stories, symbolic colours, natural elements, illustrated
            identities, and reflective prompts. Guardian stones would be
            cultural, aesthetic, and storytelling objects only—not healing or
            medical tools.
          </p>
          <p className="future-status">
            All concepts shown here are future possibilities and are not yet
            available.
          </p>
        </div>
        <div className="guardian-concepts" aria-label="Future concepts">
          {futureConcepts.map((concept, index) => (
            <span key={concept}>
              <i>0{index + 1}</i>
              {concept}
            </span>
          ))}
        </div>
      </section>

      <section className="zodiac-community">
        <div className="zodiac-community-inner shell">
          <div>
            <p className="eyebrow">Future community concept</p>
            <h2>Shared signs, different stories</h2>
          </div>
          <p>
            Future users may compare interpretations, share stories, discuss
            identity themes, notice similarities and differences, and connect
            zodiac themes with personality and career interests. Community
            accounts, profiles, and discussion spaces are not yet available.
          </p>
        </div>
      </section>

      <section className="zodiac-disclaimer shell">
        <div>
          <p className="eyebrow">Responsible use</p>
          <h2>A reflective experience, not evidence or advice</h2>
        </div>
        <p>
          InnerGeodessa zodiac content is intended for reflection, culture,
          storytelling, and entertainment. It is not a scientific personality
          assessment, psychological evaluation, medical service, financial
          guide, or method of predicting future events. Important personal
          decisions should be based on reliable evidence, individual
          circumstances, and qualified professional advice where appropriate.
        </p>
      </section>

      <section className="zodiac-final-cta">
        <div className="shell">
          <p className="eyebrow">Another reflective lens</p>
          <h2>
            A symbol does not define you. It can give you another way to
            reflect.
          </h2>
          <p className="zodiac-final-copy">
            Explore the themes, stories, and questions connected with your
            sign while leaving room for everything that makes you uniquely
            yourself.
          </p>
          <div className="zodiac-final-actions">
            <a className="primary-button light-primary" href="/zodiac/test">Create Your Birth Chart</a>
            <a className="secondary-link light-secondary" href="/career">
              Explore Career Interests <span aria-hidden="true">↗</span>
            </a>
            <a className="quiet-route-link" href="/personality">
              Explore Personality
            </a>
          </div>
        </div>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
