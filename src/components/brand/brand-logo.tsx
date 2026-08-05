"use client";

import Image from "next/image";
import Link from "next/link";

export interface BrandLogoProps {
  href?: string;
  compact?: boolean;
  className?: string;
}

export function BrandLogo({
  href = "/",
  compact = false,
  className = "",
}: BrandLogoProps) {
  return (
    <Link
      href={href}
      aria-label="InnerGeo home"
      className={[
        "brand-logo",
        compact ? "brand-logo-compact" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src="/brand/innergeo-logo.png"
        alt="InnerGeo — Understand Yourself. Shape Your Future."
        width={1024}
        height={1024}
        priority
        className="brand-logo-image"
      />
    </Link>
  );
}

export function BrandHeroVisual() {
  return (
    <div className="brand-hero-visual">
      <div
        className="brand-hero-orbit brand-hero-orbit-one"
        aria-hidden="true"
      />
      <div
        className="brand-hero-orbit brand-hero-orbit-two"
        aria-hidden="true"
      />

      <Image
        src="/brand/innergeo-logo.png"
        alt="InnerGeo — Understand Yourself. Shape Your Future."
        width={1024}
        height={1024}
        priority
        className="brand-hero-logo"
      />
    </div>
  );
}

export function BrandTrustStrip({
  locale,
}: {
  locale: "en" | "zh";
}) {
  const content =
    locale === "zh"
      ? {
          eyebrow: "建立于全球广泛应用的测评框架",
          description:
            "InnerGeo 参考国际成熟的人格、职业兴趣与自我探索方法。相关测评框架长期应用于企业、大学、招聘、咨询和人才发展领域。",
          organizations: "1,000+",
          organizationsLabel:
            "采用相关测评框架的企业与机构",
          participants: "100,000+",
          participantsLabel:
            "全球专业及研究应用中的测评参与者",
          assessments: "3",
          assessmentsLabel:
            "核心自我探索系统",
        }
      : {
          eyebrow:
            "Built on widely adopted assessment frameworks",
          description:
            "InnerGeo draws on established personality, career-interest, and reflective identity methodologies used across organizational, academic, recruitment, consulting, and talent-development settings.",
          organizations: "1,000+",
          organizationsLabel:
            "Organizations using related assessment frameworks",
          participants: "100,000+",
          participantsLabel:
            "Participants reached through professional and research applications",
          assessments: "3",
          assessmentsLabel:
            "Core self-discovery systems",
        };

  return (
    <section className="brand-trust-strip">
      <div className="brand-trust-intro">
        <p className="brand-trust-eyebrow">
          {content.eyebrow}
        </p>

        <p className="brand-trust-description">
          {content.description}
        </p>
      </div>

      <div className="brand-trust-metrics">
        <TrustMetric
          value={content.organizations}
          label={content.organizationsLabel}
        />

        <TrustMetric
          value={content.participants}
          label={content.participantsLabel}
        />

        <TrustMetric
          value={content.assessments}
          label={content.assessmentsLabel}
        />
      </div>
    </section>
  );
}

function TrustMetric({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <article className="brand-trust-metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
