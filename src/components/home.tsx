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
            {dictionary.navigation.explore}
          </Link>
          <Link href={`${homePath}#how-it-works`}>
            {dictionary.navigation.howItWorks}
          </Link>
          <Link href="/about">
            {dictionary.navigation.about}
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
      size="full"
      className="hero max-w-[1400px] px-0 sm:px-0 lg:px-0"
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

      <BrandHeroVisual />
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
      <Container>
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

  return (
    <footer className="site-footer">
      <div
        className="site-footer-glow"
        aria-hidden="true"
      />

      <Container
        size="full"
        className="site-footer-inner max-w-[1400px]"
      >
        <div className="site-footer-brand">
          <BrandLogo
            href={homePath || "/"}
            compact
            className="footer-wordmark"
          />

          <p>{dictionary.footer.tagline}</p>
        </div>

        <nav
          className="site-footer-navigation"
          aria-label={
            dictionary.footer.navigationLabel
          }
        >
          <Link href="/personality">
            {dictionary.footer.personality}
          </Link>

          <Link href="/career">
            {dictionary.footer.career}
          </Link>

          <Link href="/zodiac">
            {dictionary.footer.zodiac}
          </Link>

          <Link href="/pricing">
            {dictionary.footer.pricing}
          </Link>

          <Link href="/contact">
            {dictionary.footer.contact}
          </Link>

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

        <p className="site-footer-copyright">
          © 2026 InnerGeo. All rights reserved.
        </p>
      </Container>
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
      <Container className="profile-inner">
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

        <div className="profile-example">
          <div className="profile-orbit" aria-hidden="true">
            <CompassMark />
          </div>

          <p className="example-label">
            {profile.exampleLabel}
          </p>

          <div className="identity-result">
            <span>{profile.personalityLabel}</span>
            <strong>INTP</strong>
          </div>

          <div className="identity-result">
            <span>{profile.careerLabel}</span>
            <strong>{profile.careerExample}</strong>
          </div>

          <div className="identity-result">
            <span>{profile.zodiacLabel}</span>
            <strong>{profile.zodiacExample}</strong>
          </div>

          <p className="example-note">
            {profile.note}
          </p>
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
      <Container>
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

export function HomeTrustSection() {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);
  const trust = dictionary.home.trust;

  return (
    <Section
      id="trust"
      spacing="large"
      className="trust-section"
    >
      <Container className="trust-inner">
        <SectionHeading
          eyebrow={trust.eyebrow}
          title={trust.title}
          className="trust-heading"
        />

        <ul>
          {trust.points.map((point, index) => (
            <li key={point}>
              <span aria-hidden="true">
                0{index + 1}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
