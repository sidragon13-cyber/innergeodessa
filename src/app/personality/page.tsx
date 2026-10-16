import type {
  Metadata,
} from "next";

import {
  PersonalityLanding,
} from "@/components/personality";

export const metadata: Metadata = {
  alternates: {
    canonical: "/personality",
  },
  robots: {
    index: true,
    follow: true,
  },
  title:
    "Free 16 Personality Test | MBTI-Style Assessment | InnerGeo",
  description:
    "Take a free 72-question MBTI-style personality test exploring Extraversion–Introversion, Sensing–Intuition, Thinking–Feeling, and Judging–Perceiving.",
};

export default function PersonalityPage() {
  return <PersonalityLanding />;
}
