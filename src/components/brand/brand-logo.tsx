"use client";

import Link from "next/link";

export interface BrandLogoProps {
  href?: string;
  compact?: boolean;
  className?: string;
}

export function BrandConstellationMark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 96"
      className={className}
      fill="none"
    >
      <path
        d="M18 62L23 84L71 87L74 65L18 62ZM74 65L104 49L125 30L145 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {[["18","62"],["23","84"],["71","87"],["74","65"],["104","49"],["125","30"],["145","13"]].map(
        ([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4.5"
            fill="currentColor"
          />
        ),
      )}
    </svg>
  );
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
        "brand-inline-logo",
        compact
          ? "brand-inline-logo-compact"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="brand-inline-copy">
        <strong className="brand-name">
          InnerGeo
        </strong>

        <span
          className="brand-name-divider"
          aria-hidden="true"
        >
          <span className="brand-divider-dot" />
          <span className="brand-divider-line" />
          <span className="brand-divider-star">
            ✦
          </span>
          <span className="brand-divider-line" />
          <span className="brand-divider-dot" />
        </span>

        {!compact ? (
          <small>
            Understand Yourself. Shape Your Future.
          </small>
        ) : null}
      </span>
    </Link>
  );
}

export function BrandHeroVisual() {
  return (
    <div className="brand-map">
      <div
        className="brand-map-orbit brand-map-orbit-one"
        aria-hidden="true"
      />
      <div
        className="brand-map-orbit brand-map-orbit-two"
        aria-hidden="true"
      />
      <div
        className="brand-map-orbit brand-map-orbit-three"
        aria-hidden="true"
      />

      <svg
        className="brand-map-constellation"
        viewBox="0 0 800 600"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M98 390L115 505L274 515L290 402L98 390ZM290 402L410 350L505 277L600 186"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {[
          [98, 390],
          [115, 505],
          [274, 515],
          [290, 402],
          [410, 350],
          [505, 277],
          [600, 186],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="10"
            fill="currentColor"
          />
        ))}

        <path
          d="M600 186L716 78M638 210L716 78"
          stroke="var(--brand-gold)"
          strokeWidth="2"
          strokeDasharray="4 8"
        />
      </svg>

      <div
        className="brand-map-north-star"
        aria-hidden="true"
      >
        <span className="brand-map-star-core">
          ✦
        </span>
        <span className="brand-map-star-small star-one">
          ✦
        </span>
        <span className="brand-map-star-small star-two">
          ✦
        </span>
        <span className="brand-map-star-small star-three">
          ✦
        </span>
      </div>

      <HeroModule
        href="/personality"
        className="brand-map-module-personality"
        icon={<PersonalityIcon />}
        title="MBTI"
        description="Understand your inner patterns."
      />

      <HeroModule
        href="/career"
        className="brand-map-module-career"
        icon={<CareerIcon />}
        title="RIASEC"
        description="Discover your strengths and ideal paths."
      />

      <HeroModule
        href="/zodiac"
        className="brand-map-module-zodiac"
        icon={<ZodiacIcon />}
        title="Zodiac"
        description="Explore your cosmic blueprint and natural rhythm."
      />

      <p className="brand-map-caption">
        Three perspectives · One evolving self
      </p>
    </div>
  );
}

function HeroModule({
  href,
  className,
  icon,
  title,
  description,
}: {
  href: string;
  className: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className={`brand-map-module ${className}`}
    >
      <span className="brand-map-module-symbol">
        {icon}
      </span>

      <span className="brand-map-module-copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </Link>
  );
}

function PersonalityIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle
        cx="16"
        cy="10"
        r="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 27c0-6 3.7-10 9-10s9 4 9 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CareerIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <rect
        x="4"
        y="10"
        width="24"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M11 10V7h10v3M4 17h24M13 17v3h6v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ZodiacIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M16 3l2.6 9.4L28 16l-9.4 3.6L16 29l-2.6-9.4L4 16l9.4-3.6L16 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle
        cx="16"
        cy="16"
        r="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
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
          eyebrow: "全球广泛采用的测评方法",
          description:
            "InnerGeo 建立于国际成熟的人格、职业兴趣与自我探索框架之上，相关方法长期应用于企业、大学、招聘、咨询与人才发展领域。",
          organizations: "1,000+",
          organizationsLabel:
            "采用相关测评框架的企业与机构",
          participants: "100,000+",
          participantsLabel:
            "全球专业和研究应用中的测评参与者",
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
