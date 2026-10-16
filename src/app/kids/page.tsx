import type { Metadata } from "next";

import { KidsLanding } from "@/components/kids/kids-landing";

export const metadata: Metadata = {
  alternates: {
    canonical: "/kids",
  },
  robots: {
    index: true,
    follow: true,
  },
  title:
    "Free Kids Interest Test | Child Interest Assessment Ages 6–12 | InnerGeo",
  description:
    "Take a free kids interest test designed for ages 6–8 and 9–12. Help children discover activities and interest directions they naturally want to explore—without ability labels or career predictions.",
};

export default function KidsPage() {
  return <KidsLanding />;
}
