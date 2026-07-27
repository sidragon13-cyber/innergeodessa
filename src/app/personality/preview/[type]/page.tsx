"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import {
  PERSONALITY_TIE_RULE,
  type PersonalityResultContract,
} from "@/data/assessment/scoring/personality";
import { getPersonalityProfile } from "@/data/personality";

const PREVIEW_TIMESTAMP = "2026-01-01T00:00:00.000Z";

export default function PersonalityPreviewPage() {
  const params = useParams<{ type: string }>();
  const router = useRouter();

  const personalityType = params.type.trim().toUpperCase();
  const profile = getPersonalityProfile(personalityType);

  useEffect(() => {
    if (!profile) {
      return;
    }

    const sessionId =
      `preview-${personalityType.toLowerCase()}`;

    const previewResult: PersonalityResultContract = {
      sessionId,
      status: "completed",
      type: profile.type,
      scores: {
        EI: profile.type[0] === "E" ? 8 : -8,
        SN: profile.type[1] === "S" ? 7 : -7,
        TF: profile.type[2] === "T" ? 7 : -7,
        JP: profile.type[3] === "J" ? 9 : -9,
      },
      confidence: {
        EI: 0.8,
        SN: 0.7,
        TF: 0.7,
        JP: 0.9,
      },
      answered: {
        EI: 18,
        SN: 18,
        TF: 18,
        JP: 18,
      },
      tie_rule: PERSONALITY_TIE_RULE,
      questionBankVersion: "preview",
      completedAt: PREVIEW_TIMESTAMP,
      calculatedAt: PREVIEW_TIMESTAMP,
    };

    sessionStorage.setItem(
      `innergeodessa-result-${sessionId}`,
      JSON.stringify(previewResult),
    );

    router.replace(
      `/personality/result/${sessionId}`,
    );
  }, [personalityType, profile, router]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-[#efede5] px-6 py-20 text-[#26372d]">
        <section className="mx-auto max-w-3xl border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Preview unavailable
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            This personality profile is not available yet.
          </h1>

          <Link
            href="/personality"
            className="mt-8 inline-flex min-h-12 items-center bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5]"
          >
            Personality overview
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#efede5] px-6 text-[#26372d]">
      <section className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
          Preparing preview
        </p>

        <h1 className="mt-4 text-3xl font-semibold">
          Loading {personalityType} profile…
        </h1>
      </section>
    </main>
  );
}
