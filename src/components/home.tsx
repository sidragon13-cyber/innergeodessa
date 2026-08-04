"use client";

import Link from "next/link";

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

function Wordmark() {
  return (
    <>
      Inner<span>Geo</span>
    </>
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
      <Link
        className="wordmark"
        href={homePath || "#top"}
        aria-label={dictionary.accessibility.homeLabel}
      >
        <Wordmark />
      </Link>

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

interface IdentityMapProps {
  personalityLabel: string;
  careerLabel: string;
  zodiacLabel: string;
  youLabel: string;
}

function IdentityMap({
  personalityLabel,
  careerLabel,
  zodiacLabel,
  youLabel,
}: IdentityMapProps) {
  return (
    <div className="identity-map" aria-hidden="true">
      <svg
        className="contour-art"
        viewBox="0 0 760 640"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M76 640C53 548 107 476 191 455c119-30 85-138 171-205 80-62 179-39 254-105 47-41 59-96 59-145" />
        <path d="M131 640c-27-93 18-143 96-171 118-42 76-138 168-190 78-44 163-37 233-105 49-47 69-107 68-174" />
        <path d="M188 640c-23-71 9-116 79-149 102-48 78-132 166-175 72-36 145-37 205-97 55-56 78-132 75-219" />
        <path d="M251 640c-13-59 12-94 69-126 84-46 77-117 154-157 72-38 117-45 168-93 62-59 91-155 89-264" />
        <path d="M323 640c-3-46 14-74 58-105 67-46 70-100 131-139 60-38 90-48 133-88 68-63 102-175 103-308" />
        <path d="M0 188c84 9 139-16 166-75C189 61 236 27 306 9" />
        <path d="M0 241c99 8 165-24 195-94 23-52 70-88 140-108" />
        <path d="M0 297c117 4 194-37 229-122 20-50 67-86 137-108" />
        <path d="M0 356c126-1 216-53 255-150 19-47 61-83 128-109" />
        <circle cx="400" cy="316" r="150" />
        <circle cx="400" cy="316" r="93" />
      </svg>

      <span className="map-axis map-axis-one" />
      <span className="map-axis map-axis-two" />

      <div className="dimension-node dimension-personality">
        <span>P</span>
        <strong>{personalityLabel}</strong>
      </div>
      <div className="dimension-node dimension-career">
        <span>C</span>
        <strong>{careerLabel}</strong>
      </div>
      <div className="dimension-node dimension-zodiac">
        <span>Z</span>
        <strong>{zodiacLabel}</strong>
      </div>

      <div className="map-center">
        <CompassMark />
        <span>{youLabel}</span>
      </div>
    </div>
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

      <IdentityMap
        personalityLabel={hero.personalityLabel}
        careerLabel={hero.careerLabel}
        zodiacLabel={hero.zodiacLabel}
        youLabel={hero.youLabel}
      />
    </Container>
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

export function SiteFooter({ homePath = "" }: { homePath?: string }) {
  const { locale } = useLocale();
  const dictionary = getUiDictionary(locale);

  return (
    <footer className="site-footer">
      <Container
        size="full"
        className="site-footer-inner max-w-[1400px]"
      >
        <div>
          <Link
            className="wordmark footer-wordmark"
            href={homePath || "#top"}
            aria-label="InnerGeo home"
          >
            <Wordmark />
          </Link>

          <p>{dictionary.footer.tagline}</p>
        </div>

        <nav aria-label={dictionary.footer.navigationLabel}>
          <Link href="/personality">
            {dictionary.footer.personality}
          </Link>
          <Link href="/career">
            {dictionary.footer.career}
          </Link>
          <Link href="/zodiac">
            {dictionary.footer.zodiac}
          </Link>
          <Link href={`${homePath}#trust`}>
            {dictionary.footer.privacy}
          </Link>
          <Link href={`${homePath}#trust`}>
            {dictionary.footer.terms}
          </Link>
        </nav>
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
