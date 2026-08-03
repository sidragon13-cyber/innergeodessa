import type {
  Metadata,
} from "next";

import {
  CareerLanding,
} from "@/components/career";

export const metadata: Metadata = {
  title:
    "Career Interest Assessment｜职业兴趣测评｜InnerGeo",
  description:
    "Explore six RIASEC career-interest dimensions and possible work directions. 探索六个 RIASEC 职业兴趣维度与可能的发展方向。",
};

export default function CareerPage() {
  return <CareerLanding />;
}
