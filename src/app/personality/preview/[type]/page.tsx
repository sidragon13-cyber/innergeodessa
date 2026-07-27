"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const supportedPreviewTypes = ["ENTJ", "INTJ"] as const;

type SupportedPreviewType =
  (typeof supportedPreviewTypes)[number];

function isSupportedPreviewType(
  value: string,
): value is SupportedPreviewType {
  return supportedPreviewTypes.includes(
    value as SupportedPreviewType,
  );
}

export default function PersonalityPreviewPage() {
  const params = useParams<{ type: string }>();
  const router = useRouter();

  const personalityType = params.type.toUpperCase();

  useEffect(() => {
    if (!isSupportedPreviewType(personalityType)) {
      return;
    }

    const sessionId =
      `preview-${personalityType.toLowerCase()}`;

    const previewResult = {
      type: personalityType,
      scores: {
        EI: personalityType === "ENTJ" ? 8 : -8,
        SN: -7,
        TF: 7,
        JP: 9,
      },
      confidence: {
        EI: 0.8,
        SN: 0.7,
        TF: 0.7,
        JP: 0.9,
      },
      answered: {},
      preview: true,
    };

    sessionStorage.setItem(
      `innergeodessa-result-${sessionId}`,
      JSON.stringify(previewResult),
    );

    router.replace(
      `/personality/result/${sessionId}`,
    );
  }, [personalityType, router]);

  if (!isSupportedPreviewType(personalityType)) {
    return (
      <main className="min-h-screen bg-[#efede5] px-6 py-20 text-[#26372d]">
        <section className="mx-auto max-w-3xl border border-[#c8c2b5] bg-[#f7f4ec] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6d746b]">
            Preview unavailable
          </p>

          <h1 className="mt-4 text-3xl font-semibold">
            This personality profile is not available yet.
          </h1>

          <p className="mt-5 leading-7 text-[#596158]">
            Available previews: ENTJ and INTJ.
          </p>

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
