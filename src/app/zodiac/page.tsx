import type {
  Metadata,
} from "next";

import {
  ZodiacLanding,
} from "@/components/zodiac";

export const metadata: Metadata = {
  title:
    "Zodiac Identity｜星座身份探索｜InnerGeo",
  description:
    "Explore zodiac symbolism and create a reflective birth chart. 探索星座象征并创建用于自我反思的出生星盘。",
};

export default function ZodiacPage() {
  return <ZodiacLanding />;
}
