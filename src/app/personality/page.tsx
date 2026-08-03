import type {
  Metadata,
} from "next";

import {
  PersonalityLanding,
} from "@/components/personality";

export const metadata: Metadata = {
  title:
    "Personality Test｜人格类型测评｜InnerGeo",
  description:
    "Explore four personality dimensions through a reflective 72-question assessment. 通过72道人格探索题目了解四个主要人格维度。",
};

export default function PersonalityPage() {
  return <PersonalityLanding />;
}
