import type {
  Metadata,
} from "next";

import {
  ZodiacLanding,
} from "@/components/zodiac";

export const metadata: Metadata = {
  alternates: {
    canonical: "/zodiac",
  },
  robots: {
    index: true,
    follow: true,
  },
  title:
    "Free Birth Chart Calculator | Sun, Moon & Rising Sign | InnerGeo",
  description:
    "Create a free birth chart using your birth date, time and location. Calculate your Sun, Moon, Rising sign and key chart placements for a structured symbolic interpretation.",
};

export default function ZodiacPage() {
  return <ZodiacLanding />;
}
