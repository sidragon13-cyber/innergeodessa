import type { Metadata } from "next";
import {
  CompassMark,
  PrimaryButton,
  SiteFooter,
  SiteHeader,
} from "@/components/home";

export const metadata: Metadata = {
  title: "About InnerGeodessa | Self-Exploration and Growth",
  description:
    "Learn how InnerGeodessa brings personality, career interests, symbolic identity, reflection, and future community experiences into one thoughtful self-exploration platform.",
};

const principles = [
  {
    number: "01",
    title: "Explore from multiple perspectives",
    description:
      "No single test, sign, result, or label can fully explain a person.",
  },
  {
    number: "02",
    title: "Use results as starting points",
    description:
      "Results should generate questions, observations, and experiments rather than final verdicts.",
  },
  {
    number: "03",
    title: "Separate preference from ability",
    description:
      "What you enjoy, what you can do, and which opportunities exist may overlap without being identical.",
  },
  {
    number: "04",
    title: "Leave room for change",
    description:
      "People develop over time and should never feel trapped by an old result.",
  },
  {
    number: "05",
    title: "Connect insight with action",
    description:
      "Useful self-understanding should support decisions, learning, communication, and development.",
  },
  {
    number: "06",
    title: "Respect uncertainty",
    description:
      "Responsible exploration acknowledges limitations and avoids false precision.",
  },
];

const platformParts = [
  {
    code: "P",
    title: "Personality",
    description:
      "Explore patterns in attention, decision-making, energy, communication, and personal preferences.",
    status: "Introduction available · Assessment coming later",
    href: "/personality",
    available: true,
  },
  {
    code: "C",
    title: "Career Interests",
    description:
      "Explore activities, environments, and problems that hold your interest through six RIASEC dimensions.",
    status: "Introduction available · Assessment coming later",
    href: "/career",
    available: true,
  },
  {
    code: "Z",
    title: "Zodiac Identity",
    description:
      "Explore cultural symbolism, identity themes, stories, and reflective questions without deterministic claims.",
    status: "Introduction available · Interactive experience coming later",
    href: "/zodiac",
    available: true,
  },
  {
    code: "V",
    title: "Values",
    description:
      "Understand the principles and priorities that influence decisions.",
    status: "Future concept",
    available: false,
  },
  {
    code: "S",
    title: "Strengths",
    description:
      "Reflect on recurring capabilities, resources, and ways of contributing.",
    status: "Future concept",
    available: false,
  },
  {
    code: "L",
    title: "Learning Style",
    description:
      "Explore preferred ways of absorbing, practising, and applying knowledge without rigid categories.",
    status: "Future concept",
    available: false,
  },
];

const profileLayers = [
  "Personality preferences",
  "Career-interest pattern",
  "Values",
  "Strengths",
  "Learning preferences",
  "Communication patterns",
  "Personal goals",
  "Growth reflections",
  "Symbolic identity themes",
  "Saved observations and prompts",
];

const framework = [
  {
    number: "01",
    title: "Discover",
    description:
      "Recognise patterns, interests, preferences, values, questions, and possible strengths.",
  },
  {
    number: "02",
    title: "Understand",
    description:
      "Compare results with lived experience, context, feedback, and real-world evidence.",
  },
  {
    number: "03",
    title: "Grow",
    description:
      "Choose experiments, learning paths, conversations, rest, and reconsideration that help test possible directions.",
  },
];

const boundaries = [
  "Diagnose mental-health or medical conditions",
  "Replace qualified professional advice",
  "Guarantee career or relationship outcomes",
  "Predict future events",
  "Determine who should be hired, promoted, accepted, or rejected",
  "Reduce a person to a fixed label",
  "Present symbolic content as scientific fact",
  "Claim certainty where evidence is limited",
];

const responsibleDesign = [
  "Transparent limitations",
  "Understandable result explanations",
  "No false precision",
  "No manipulative urgency",
  "No deterministic predictions",
  "Accessible and readable interfaces",
  "User control over personal information",
  "Careful handling of sensitive reflections",
  "Clear boundaries around professional advice",
  "Continued review as the platform develops",
];

function AboutMap() {
  return (
    <div className="about-map" aria-hidden="true">
      <svg viewBox="0 0 640 640" fill="none">
        <path d="M-30 507c126-21 170-108 246-151 83-47 151-28 215-96 58-62 86-147 84-274" />
        <path d="M-5 562c143-25 193-113 270-158 78-46 142-37 205-99 70-69 103-167 101-305" />
        <path d="M78 640c103-53 153-116 219-154 72-41 126-48 183-102 83-78 124-195 119-384" />
        <circle cx="342" cy="315" r="165" />
        <circle cx="342" cy="315" r="96" />
      </svg>
      <div className="about-map-center">
        <CompassMark />
        <span>Inner layers</span>
      </div>
      <span className="about-map-label about-map-label-one">Identity</span>
      <span className="about-map-label about-map-label-two">Direction</span>
      <span className="about-map-label about-map-label-three">Growth</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <section className="about-hero shell">
        <div className="about-hero-copy">
          <p className="eyebrow">About InnerGeodessa</p>
          <h1>
            Understanding yourself is not a final answer. It is a lifelong
            practice.
          </h1>
          <p className="about-intro">
            InnerGeodessa brings together structured assessments, reflective
            tools, symbolic stories, and future community experiences to help
            people explore who they are, what draws them forward, and how they
            may continue growing.
          </p>
          <ul className="assessment-meta" aria-label="Platform principles">
            <li>Self-exploration, not diagnosis</li>
            <li>Multiple perspectives</li>
            <li>Evidence and context</li>
            <li>Lifelong development</li>
          </ul>
          <div className="about-actions">
            <PrimaryButton href="#platform">Explore the Platform</PrimaryButton>
            <a className="secondary-link" href="/personality">
              Explore Personality <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <AboutMap />
      </section>

      <section className="about-purpose shell">
        <div>
          <p className="eyebrow">Why we exist</p>
          <h2>Connect discovery with what comes next</h2>
        </div>
        <div className="about-purpose-copy">
          <p>
            Many people receive isolated labels but little guidance on what to
            do with them. Personality tests, career tools, interests, values,
            and identity experiences often sit apart from one another.
          </p>
          <p>
            A result may feel useful for a moment without becoming part of
            practical reflection or development. Meanwhile, people continue
            changing through education, work, relationships, environment, and
            personal choices.
          </p>
          <p>
            InnerGeodessa aims to connect discovery with reflection, possible
            direction, and continued growth. Better self-understanding should
            support better questions—not close down possibilities.
          </p>
        </div>
      </section>

      <section className="name-section">
        <div className="name-inner shell">
          <div className="name-heading">
            <p className="eyebrow">The meaning behind the name</p>
            <h2>Inner · Geo · Dessa</h2>
            <p>
              This is the platform&apos;s intended symbolic meaning, not a
              dictionary definition or historical etymology.
            </p>
          </div>
          <div className="name-parts">
            <article>
              <span>01</span>
              <h3>Inner</h3>
              <p>
                The internal world: identity, interests, values, patterns,
                questions, and potential.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Geo</h3>
              <p>
                Earth, grounding, place, layers, and the environments that
                shape people.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Dessa</h3>
              <p>
                A softer, human, and story-oriented character within the
                platform name.
              </p>
            </article>
          </div>
          <p className="name-summary">
            Together, InnerGeodessa suggests exploring the layers within
            oneself while remaining grounded in real life.
          </p>
        </div>
      </section>

      <section className="approach-section shell">
        <div className="about-section-heading">
          <div>
            <p className="eyebrow">Our approach</p>
            <h2>Principles for responsible self-exploration</h2>
          </div>
          <p>
            A calm, useful platform needs room for context, contradiction,
            uncertainty, and change.
          </p>
        </div>
        <div className="approach-grid">
          {principles.map((principle) => (
            <article key={principle.number}>
              <span>{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="platform-section" id="platform">
        <div className="shell">
          <div className="about-section-heading">
            <div>
              <p className="eyebrow">The platform parts</p>
              <h2>Several lenses, clearly separated</h2>
            </div>
            <p>
              Current introduction pages are distinct from future interactive
              features. Each status below reflects what is available now.
            </p>
          </div>
          <div className="platform-grid">
            {platformParts.map((part) => (
              <article className="platform-card" key={part.title}>
                <div>
                  <span className="platform-code" aria-hidden="true">
                    {part.code}
                  </span>
                  <p>{part.available ? "Current area" : "Future area"}</p>
                </div>
                <h3>{part.title}</h3>
                <p>{part.description}</p>
                <div className="platform-status">
                  <span>{part.status}</span>
                  {part.href ? (
                    <a href={part.href} aria-label={`Explore ${part.title}`}>
                      ↗
                    </a>
                  ) : (
                    <i aria-hidden="true">—</i>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="integrated-profile shell">
        <div className="integrated-profile-copy">
          <p className="eyebrow">Future product direction</p>
          <h2>From separate results to one evolving profile</h2>
          <p>
            Future profile layers may support comparison and reflection.
            Contradictions can be useful, behaviour can shift across
            environments, and every profile should remain open to change.
            Users should control how they interpret their results.
          </p>
          <p className="future-status">
            Integrated profiles and saved observations are not yet available.
          </p>
        </div>
        <div className="profile-layer-list">
          {profileLayers.map((layer, index) => (
            <span key={layer}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {layer}
            </span>
          ))}
        </div>
      </section>

      <section className="growth-framework">
        <div className="shell">
          <div className="growth-heading">
            <p className="eyebrow">A practical rhythm</p>
            <h2>Discovery, direction, and growth</h2>
          </div>
          <div className="growth-grid">
            {framework.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <p className="growth-note">
            Growth does not require constant productivity. Rest,
            reconsideration, and changing direction are valid parts of the
            process.
          </p>
        </div>
      </section>

      <section className="boundaries-section shell">
        <div className="boundaries-heading">
          <p className="eyebrow">Clear boundaries</p>
          <h2>What InnerGeodessa will not do</h2>
          <p>
            Trust begins with being direct about what a self-exploration
            platform cannot responsibly claim.
          </p>
        </div>
        <ul>
          {boundaries.map((boundary, index) => (
            <li key={boundary}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {boundary}
            </li>
          ))}
        </ul>
      </section>

      <section className="about-community">
        <div className="about-community-inner shell">
          <div>
            <p className="eyebrow">Future community vision</p>
            <h2>Shared experiences, not automatic compatibility</h2>
          </div>
          <div>
            <p>
              Future connections may bring together people with similar
              preferences, interests, goals, values, zodiac signs, or
              development challenges.
            </p>
            <p>
              Community could support comparing experiences, discussing
              interpretations, sharing resources, supporting projects, and
              learning from similarities and differences. Matching labels
              alone would never guarantee meaningful compatibility.
            </p>
            <p className="community-status">
              Community accounts, profiles, comments, chat, groups, and
              messaging are not yet available.
            </p>
          </div>
        </div>
      </section>

      <section className="responsible-section shell">
        <div>
          <p className="eyebrow">Responsible design</p>
          <h2>Principles for features still to come</h2>
          <p>
            These are design intentions, not claims of certifications, audits,
            or systems that have already been implemented.
          </p>
        </div>
        <div className="responsible-list">
          {responsibleDesign.map((principle, index) => (
            <span key={principle}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {principle}
            </span>
          ))}
        </div>
      </section>

      <section className="status-section">
        <div className="status-inner shell">
          <div className="status-heading">
            <p className="eyebrow">Current platform status</p>
            <h2>Being built in clear stages</h2>
            <p>
              InnerGeodessa is currently being built in stages. The present
              site establishes the platform&apos;s ideas, structure, and
              design before interactive assessments and user systems are
              introduced.
            </p>
          </div>
          <div className="status-columns">
            <div>
              <h3>Available now</h3>
              <ul>
                <li>Approved homepage</li>
                <li>Personality introduction</li>
                <li>Career Interest introduction</li>
                <li>Zodiac Identity introduction</li>
                <li>Platform information and design foundations</li>
              </ul>
            </div>
            <div>
              <h3>Not yet available</h3>
              <ul>
                <li>Assessments and personalised results</li>
                <li>Accounts and saved profiles</li>
                <li>Community features</li>
                <li>Integrated reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="shell">
          <p className="eyebrow">Room to change</p>
          <h2>You are more than one result, one role, or one story.</h2>
          <p>
            InnerGeodessa is being built as a place to explore those layers
            with curiosity, context, and room to change.
          </p>
          <div className="about-final-actions">
            <a className="primary-button" href="/personality">
              Explore Personality <span aria-hidden="true">↗</span>
            </a>
            <a className="secondary-link light-secondary" href="/career">
              Explore Career Interests <span aria-hidden="true">↗</span>
            </a>
            <a className="quiet-route-link" href="/zodiac">
              Explore Zodiac Identity
            </a>
          </div>
        </div>
      </section>

      <SiteFooter homePath="/" />
    </main>
  );
}
