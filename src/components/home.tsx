import Link from "next/link";

import {
  ButtonLink,
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
      Inner<span>Geo</span>dessa
    </>
  );
}

export function SiteHeader({ homePath = "" }: { homePath?: string }) {
  return (
    <header className="site-header shell">
      <Link
        className="wordmark"
        href={homePath || "#top"}
        aria-label="InnerGeodessa home"
      >
        <Wordmark />
      </Link>
      <nav aria-label="Primary navigation">
        <Link href={`${homePath}#explore`}>Explore</Link>
        <Link href={`${homePath}#how-it-works`}>How It Works</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
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

function IdentityMap() {
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
        <strong>Personality</strong>
      </div>
      <div className="dimension-node dimension-career">
        <span>C</span>
        <strong>Career</strong>
      </div>
      <div className="dimension-node dimension-zodiac">
        <span>Z</span>
        <strong>Zodiac</strong>
      </div>

      <div className="map-center">
        <CompassMark />
        <span>You</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow">Your inner coordinates</p>
        <h1>
          Discover who you are.
          <br />
          <em>Find where you may thrive.</em>
        </h1>
        <p className="hero-intro">
          Explore your personality, career interests, and zodiac identity
          through three thoughtful self-discovery experiences.
        </p>
        <div className="hero-action">
          <PrimaryButton href="#explore">Start Exploring</PrimaryButton>
          <p>Begin with any test. No account required.</p>
        </div>
      </div>
      <IdentityMap />
    </section>
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

export function SiteFooter({ homePath = "" }: { homePath?: string }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner shell">
        <div>
          <Link
            className="wordmark footer-wordmark"
            href={homePath || "#top"}
            aria-label="InnerGeodessa home"
          >
            <Wordmark />
          </Link>
          <p>Self-discovery, thoughtfully mapped.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/personality">Personality</Link>
          <Link href="/career">Career</Link>
          <Link href="/zodiac">Zodiac</Link>
          <Link href={`${homePath}#trust`}>Privacy</Link>
          <Link href={`${homePath}#trust`}>Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
