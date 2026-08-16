"use client";

import Link from "next/link";

import {
  BrandHeroVisual,
  BrandLogo,
  BrandTrustStrip,
} from "@/components/brand";

import {
  LocaleSwitcher,
  useLocale,
} from "@/components/locale";
import {
  AccountHeaderLink,
} from "@/components/account/account-header-link";
import {
  getUiDictionary,
} from "@/data/i18n";
import {
  ButtonLink,
  Container,
  Section,
  SectionHeading,
} from "@/components/ui";

export type Product = {
  number: string;
  id: string;
  title: string;
  description: string;
  metadata: string;
  cta: string;
  symbol: string;
  href: string;
};

export function CompassMark() {
  return (
    <svg
      aria-hidden="true"
      className="compass-mark"
      viewBox="0 0 100 100"
      fill="none"
    >
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth=".5" />
      <path d="M50 6v88M6 50h88" stroke="currentColor" strokeWidth=".5" />
      <path
        d="m50 18 6 26 26 6-26 6-6 26-6-26-26-6 26-6 6-26Z"
        fill="currentColor"
      />
      <circle cx="50" cy="50" r="3" fill="var(--paper)" />
    </svg>
  );
}

export function SiteHeader({ homePath = "" }: { homePath?: string }) {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);

  return (
    <Container
      as="header"
      size="full"
      className="site-header max-w-[1400px]"
    >
      <BrandLogo
        href={homePath || "/"}
        compact
      />

      <div className="flex items-center gap-4">
        <nav aria-label={dictionary.navigation.primaryLabel}>
          <Link href={`${homePath}#explore`}>
            {dictionary.navigation.assessments}
          </Link>
          <Link href="/zodiac">
            {dictionary.navigation.zodiac}
          </Link>
          <Link href="/about">
            {dictionary.navigation.about}
          </Link>
          <Link href="/pricing">
            {dictionary.navigation.pricing}
          </Link>
          <AccountHeaderLink />
        </nav>

        <LocaleSwitcher />
      </div>
    </Container>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isPageAnchor = href.startsWith("#");

  return (
    <ButtonLink
      href={href}
      size="large"
      className="primary-button"
    >
      <span className="inline-flex items-center gap-8">
        {children}
        <span aria-hidden="true">
          {isPageAnchor ? "↓" : "→"}
        </span>
      </span>
    </ButtonLink>
  );
}

export function Hero() {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const hero = dictionary.home.hero;

  return (
    <Container
      as="section"
      size="wide"
      className="hero px-0 sm:px-0 lg:px-0"
    >
      <div className="hero-copy">
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1>
          {hero.title}
          <br />
          <em>{hero.emphasizedTitle}</em>
        </h1>

        <p className="hero-intro">
          {hero.description}
        </p>

        <div className="hero-action">
          <PrimaryButton href="#explore">
            {hero.primaryAction}
          </PrimaryButton>

          <p>{hero.note}</p>
        </div>
      </div>

      <BrandHeroVisual locale={locale} />
    </Container>
  );
}

export function HomeTrustMetrics() {
  const { locale } = useLocale();

  return (
    <BrandTrustStrip locale={locale} />
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="experience-card" id={product.id}>
      <div className="card-topline">
        <span>{product.number}</span>
        <span className="card-symbol" aria-hidden="true">
          {product.symbol}
        </span>
      </div>
      <div className="card-copy">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
      <div className="card-footer">
        <p>{product.metadata}</p>
        <Link
          className="card-link"
          href={product.href}
          aria-label={product.cta}
        >
          {product.cta}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="experience-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}


export function HomeExploreSection() {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const explore = dictionary.home.explore;

  const isChineseLocale = String(locale)
    .toLowerCase()
    .startsWith("zh");

  const kidsProduct = {
    title: isChineseLocale
      ? "儿童兴趣探索"
      : "Kids Interest Discovery",
    description: isChineseLocale
      ? "通过适龄问题，发现孩子自然产生兴趣的方向，建立属于他们自己的兴趣地图。"
      : "Discover the areas a child is naturally drawn to through age-appropriate questions and build an individual interest map.",
    metadata: isChineseLocale
      ? "6–12岁 · 兴趣发现"
      : "Ages 6–12 · Interest Discovery",
    cta: isChineseLocale
      ? "开始探索"
      : "Start Exploring",
  };

  const products: Product[] = [
    {
      number: "01",
      id: "personality",
      title: explore.products.personality.title,
      description: explore.products.personality.description,
      metadata: explore.products.personality.metadata,
      cta: explore.products.personality.cta,
      symbol: "P",
      href: "/personality",
    },
    {
      number: "02",
      id: "career",
      title: explore.products.career.title,
      description: explore.products.career.description,
      metadata: explore.products.career.metadata,
      cta: explore.products.career.cta,
      symbol: "C",
      href: "/career",
    },
    {
      number: "03",
      id: "kids",
      title: kidsProduct.title,
      description: kidsProduct.description,
      metadata: kidsProduct.metadata,
      cta: kidsProduct.cta,
      symbol: "K",
      href: "/kids",
    },
    {
      number: "04",
      id: "zodiac",
      title: explore.products.zodiac.title,
      description: explore.products.zodiac.description,
      metadata: explore.products.zodiac.metadata,
      cta: explore.products.zodiac.cta,
      symbol: "Z",
      href: "/zodiac",
    },
  ];

  return (
    <Section
      id="explore"
      spacing="large"
      className="explore-section"
    >
      <Container
        size="wide"
        className="explore-shell"
      >
        <SectionHeading
          eyebrow={explore.eyebrow}
          title={explore.title}
          description={<p>{explore.description}</p>}
          className="mb-14"
        />

        <ProductGrid products={products} />
      </Container>
    </Section>
  );
}

export function SiteFooter({
  homePath = "",
}: {
  homePath?: string;
}) {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const isZh = String(locale)
    .toLowerCase()
    .startsWith("zh");

  const footerCopy = isZh
    ? {
        platform:
          "在线自我探索与数字测评平台",
        explore: "探索",
        support: "关于与支持",
        legal: "政策",
        about: "关于 InnerGeo",
        methodology: "方法与使用边界",
        kids: "儿童兴趣",
        principles: [
          "结构化测评",
          "数字报告",
          "清晰使用边界",
          "隐私与用户控制",
        ],
      }
    : {
        platform:
          "Online self-discovery & digital assessment platform",
        explore: "Explore",
        support: "About & Support",
        legal: "Legal",
        about: "About InnerGeo",
        methodology: "Methodology & Use Boundaries",
        kids: "Kids Interests",
        principles: [
          "Structured Assessments",
          "Digital Reports",
          "Clear Boundaries",
          "Privacy & User Control",
        ],
      };

  return (
    <footer className="site-footer">
      <div className="site-footer-principles">
        <Container
          size="wide"
          className="site-footer-principles-inner px-0 sm:px-0 lg:px-0"
        >
          {footerCopy.principles.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </Container>
      </div>

      <div className="site-footer-body">
        <Container
          size="wide"
          className="site-footer-inner px-0 sm:px-0 lg:px-0"
        >
          <div className="site-footer-grid">
            <div className="site-footer-brand">
              <BrandLogo
                href={homePath || "/"}
                compact
                className="footer-wordmark"
              />

              <p>{footerCopy.platform}</p>
            </div>

            <div className="site-footer-column">
              <h3>{footerCopy.explore}</h3>
              <nav aria-label={footerCopy.explore}>
                <Link href="/personality">
                  {dictionary.footer.personality}
                </Link>
                <Link href="/career">
                  {dictionary.footer.career}
                </Link>
                <Link href="/kids">
                  {footerCopy.kids}
                </Link>
                <Link href="/zodiac">
                  {dictionary.footer.zodiac}
                </Link>
                <Link href="/pricing">
                  {dictionary.footer.pricing}
                </Link>
              </nav>
            </div>

            <div className="site-footer-column">
              <h3>{footerCopy.support}</h3>
              <nav aria-label={footerCopy.support}>
                <Link href="/about">
                  {footerCopy.about}
                </Link>
                <Link href="/methodology">
                  {footerCopy.methodology}
                </Link>
                <Link href="/contact">
                  {dictionary.footer.contact}
                </Link>
              </nav>
            </div>

            <div className="site-footer-column">
              <h3>{footerCopy.legal}</h3>
              <nav aria-label={footerCopy.legal}>
                <Link href="/privacy">
                  {dictionary.footer.privacy}
                </Link>
                <Link href="/terms">
                  {dictionary.footer.terms}
                </Link>
                <Link href="/refund-policy">
                  {dictionary.footer.refund}
                </Link>
              </nav>
            </div>
          </div>

          <div className="site-footer-bottom">
            <p className="site-footer-copyright">
              © 2026 InnerGeo. All rights reserved.
            </p>

            <Link
              className="site-footer-methodology-link"
              href="/methodology"
            >
              {footerCopy.methodology}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export function HomeProfileSection() {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const profile = dictionary.home.profile;

  return (
    <Section
      id="how-it-works"
      spacing="large"
      className="profile-section"
    >
      <Container
        size="wide"
        className="profile-shell"
      >
        <div className="inner-map-card">
          <div className="inner-map-copy">
            <SectionHeading
              eyebrow={profile.eyebrow}
              title={
                <>
                  {profile.title}
                  <br />
                  <em>{profile.emphasizedTitle}</em>
                </>
              }
              description={<p>{profile.description}</p>}
              className="profile-intro"
            />
          </div>

          <div className="inner-map-preview">
            <div
              className="inner-map-grid"
              aria-hidden="true"
            />

            <svg
              className="inner-map-connections"
              viewBox="0 0 620 440"
              fill="none"
              aria-hidden="true"
            >
              <path d="M142 105C212 118 246 158 310 220" />
              <path d="M478 105C410 122 372 164 310 220" />
              <path d="M145 334C216 319 252 278 310 220" />
              <path d="M478 334C410 316 372 272 310 220" />
              <circle cx="310" cy="220" r="7" />
            </svg>

            <div className="inner-map-node inner-map-node-personality">
              <span>01</span>
              <strong>{profile.personalityLabel}</strong>
            </div>

            <div className="inner-map-node inner-map-node-career">
              <span>02</span>
              <strong>{profile.careerLabel}</strong>
            </div>

            <div className="inner-map-node inner-map-node-kids">
              <span>03</span>
              <strong>{profile.kidsLabel}</strong>
            </div>

            <div className="inner-map-node inner-map-node-zodiac">
              <span>04</span>
              <strong>{profile.zodiacLabel}</strong>
            </div>

            <div className="inner-map-summary">
              <p>{profile.mapTitle}</p>
              <strong>{profile.mapStatus}</strong>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export function HomeValuesSection() {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const values = dictionary.home.values;

  return (
    <Section
      id="about"
      spacing="large"
      className="value-section"
    >
      <Container
        size="wide"
        className="value-shell"
      >
        <div className="value-heading">
          <p className="eyebrow">{values.eyebrow}</p>
          <h2>{values.title}</h2>
          <p>{values.description}</p>
        </div>

        <div className="value-grid">
          {values.items.map((value) => (
            <article key={value.number}>
              <span className="value-number">
                {value.number}
              </span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>

        <p className="future-note">
          <span aria-hidden="true">○</span>
          {values.futureNote}
        </p>
      </Container>
    </Section>
  );
}

export function HomeMethodologyTeaser() {
  const { locale } = useLocale();
  const isZh = String(locale)
    .toLowerCase()
    .startsWith("zh");

  const copy = isZh
    ? {
        eyebrow: "方法与使用边界",
        title: "清晰的方法，明确的边界",
        description:
          "InnerGeo 用于自我理解、兴趣发现与方向探索。我们同时清楚说明测评结果适合如何使用、不能代表什么，以及数字报告的服务范围。",
        boundary:
          "不提供医学或心理诊断，也不以测评结果替代教育、职业或其他重要个人决定。",
        action: "了解方法与使用边界",
      }
    : {
        eyebrow: "Methodology & Use Boundaries",
        title: "Clear methods. Clear boundaries.",
        description:
          "InnerGeo supports self-understanding, interest discovery and direction exploration. We also explain how results should be used, what they cannot represent, and the scope of our digital reports.",
        boundary:
          "InnerGeo does not provide medical or psychological diagnosis, and assessment results do not replace important education, career or personal decisions.",
        action: "Explore methodology & boundaries",
      };

  return (
    <section className="methodology-teaser-section">
      <Container
        size="wide"
        className="methodology-teaser-shell px-0 sm:px-0 lg:px-0"
      >
        <div className="methodology-teaser-copy">
          <p className="methodology-teaser-eyebrow">
            {copy.eyebrow}
          </p>

          <h2>{copy.title}</h2>

          <p className="methodology-teaser-description">
            {copy.description}
          </p>

          <p className="methodology-teaser-boundary">
            {copy.boundary}
          </p>
        </div>

        <Link
          className="methodology-teaser-link"
          href="/methodology"
        >
          <span>{copy.action}</span>
          <strong aria-hidden="true">↗</strong>
        </Link>
      </Container>
    </section>
  );
}
