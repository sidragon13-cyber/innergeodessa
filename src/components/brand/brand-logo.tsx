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
      </span>
    </Link>
  );
}

export function BrandHeroVisual({
  locale = "en",
}: {
  locale?: "en" | "zh";
}) {
  const copy =
    locale === "zh"
      ? {
          origin: "你在这里",
          explore: "探索",
          understand: "理解",
          direction: "方向",
          caption: "从理解自己，到找到方向",
        }
      : {
          origin: "You are here",
          explore: "Explore",
          understand: "Understand",
          direction: "Direction",
          caption: "From insight to direction",
        };

  return (
    <div className="brand-map brand-direction-map">
      <div
        className="brand-direction-grid"
        aria-hidden="true"
      />

      <svg
        className="brand-direction-contours"
        viewBox="0 0 720 540"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-70 420C72 326 148 346 236 292C326 237 344 137 461 111C566 87 632 148 790 43" />
        <path d="M-84 469C49 383 147 402 265 339C374 281 398 188 500 160C599 133 663 177 788 105" />
        <path d="M-48 511C70 450 165 458 290 402C421 343 474 263 579 236C650 218 713 230 790 192" />
        <path d="M420 -40C372 67 391 143 465 209C532 269 619 293 760 302" />
      </svg>

      <div className="brand-direction-coordinates brand-direction-coordinates-top">
        <span>X 04.58</span>
        <span>Y 12.36</span>
      </div>

      <div className="brand-direction-coordinates brand-direction-coordinates-side">
        <span>INNER MAP</span>
        <span>01—04</span>
      </div>

      <svg
        className="brand-direction-route"
        viewBox="0 0 720 540"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="brand-direction-route-shadow"
          d="M102 422C175 386 205 396 276 348C338 306 365 261 426 232C493 200 544 214 615 143"
        />
        <path
          className="brand-direction-route-line"
          d="M102 422C175 386 205 396 276 348C338 306 365 261 426 232C493 200 544 214 615 143"
        />
        <path
          className="brand-direction-route-final"
          d="M615 143C638 124 657 104 675 78"
        />
      </svg>

      <div className="brand-direction-node brand-direction-node-origin">
        <span className="brand-direction-point">
          <span />
        </span>
        <span className="brand-direction-label">
          <strong>{copy.origin}</strong>
          <small>01 / ORIGIN</small>
        </span>
      </div>

      <div className="brand-direction-node brand-direction-node-explore">
        <span className="brand-direction-point">
          <span />
        </span>
        <span className="brand-direction-label">
          <strong>{copy.explore}</strong>
          <small>02 / EXPLORE</small>
        </span>
      </div>

      <div className="brand-direction-node brand-direction-node-understand">
        <span className="brand-direction-point">
          <span />
        </span>
        <span className="brand-direction-label">
          <strong>{copy.understand}</strong>
          <small>03 / INSIGHT</small>
        </span>
      </div>

      <div className="brand-direction-node brand-direction-node-direction">
        <span className="brand-direction-point brand-direction-point-final">
          <span />
        </span>
        <span className="brand-direction-label">
          <strong>{copy.direction}</strong>
          <small>04 / DIRECTION</small>
        </span>
      </div>

      <p className="brand-direction-caption">
        {copy.caption}
      </p>
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
          eyebrow: "InnerGeo 是什么",
          title: "在线自我探索与数字测评平台",
          description:
            "InnerGeo 提供人格、职业兴趣、儿童兴趣等结构化测评，以及独立的星座兴趣探索。用户可在线完成探索、获得结果，并选择购买更深入的数字报告，用于理解自己、发现兴趣与探索方向。",
          flow:
            "在线测评 → 查看结果 → 可选购深入数字报告",
          services: [
            {
              number: "01",
              title: "在线测评",
              description:
                "完成结构化问卷或引导式探索体验，获得个人结果与基础解读。",
            },
            {
              number: "02",
              title: "数字报告",
              description:
                "可选购更深入的数字报告，获得扩展解读、个人洞察与方向参考。",
            },
            {
              number: "03",
              title: "自我探索",
              description:
                "帮助理解性格、兴趣与可能的方向，用于个人探索与反思，不提供医学或心理诊断。",
            },
          ],
        }
      : {
          eyebrow: "What InnerGeo Does",
          title:
            "Online Self-Discovery & Digital Assessment Platform",
          description:
            "InnerGeo provides structured assessments for personality, career interests and kids interests, alongside a separate Zodiac Interests experience. Users complete assessments online, receive results, and can purchase in-depth digital reports for self-understanding, interest discovery and direction exploration.",
          flow:
            "Online assessment → Results → Optional paid digital report",
          services: [
            {
              number: "01",
              title: "Online Assessments",
              description:
                "Complete structured questionnaires or guided exploration experiences and receive personal results with introductory explanations.",
            },
            {
              number: "02",
              title: "Digital Reports",
              description:
                "Optional paid digital reports provide deeper interpretation, personal insights and direction-oriented guidance.",
            },
            {
              number: "03",
              title: "Self-Discovery",
              description:
                "Designed for personal exploration and reflection. InnerGeo does not provide medical or psychological diagnosis.",
            },
          ],
        };

  return (
    <section
      className="brand-purpose-strip"
      aria-labelledby="brand-purpose-title"
    >
      <div className="brand-purpose-intro">
        <p className="brand-purpose-eyebrow">
          {content.eyebrow}
        </p>

        <h2
          id="brand-purpose-title"
          className="brand-purpose-title"
        >
          {content.title}
        </h2>

        <p className="brand-purpose-description">
          {content.description}
        </p>

        <p className="brand-purpose-flow">
          {content.flow}
        </p>
      </div>

      <div className="brand-purpose-services">
        {content.services.map((service) => (
          <PurposeItem
            key={service.number}
            number={service.number}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

function PurposeItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="brand-purpose-item">
      <span className="brand-purpose-number">
        {number}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
