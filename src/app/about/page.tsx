import type { Metadata } from "next";
import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import {
  AboutApproach,
  AboutBoundaries,
  AboutCommunity,
  AboutFramework,
  AboutHero,
  AboutName,
  AboutPlatform,
  AboutProfile,
  AboutPurpose,
  AboutResponsible,
} from "@/components/about";

export const metadata: Metadata = {
  title: "About InnerGeo | Self-Exploration and Growth",
  description:
    "Learn how InnerGeo brings personality, career interests, symbolic identity, reflection, and future community experiences into one thoughtful self-exploration platform.",
};

export default function AboutPage() {
  return (
    <main id="top">
      <SiteHeader homePath="/" />

      <AboutHero />

      <AboutPurpose />

      <AboutName />

      <AboutApproach />

      <AboutPlatform />

      <AboutProfile />

      <AboutFramework />

      <AboutBoundaries />

      <AboutCommunity />

      <AboutResponsible />

      <section className="status-section">
        <div className="status-inner shell">
          <div className="status-heading">
            <p className="eyebrow">Current platform status</p>
            <h2>Being built in clear stages</h2>
            <p>
              InnerGeo is currently being built in stages. The present
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
            InnerGeo is being built as a place to explore those layers
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
