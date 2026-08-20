"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useLocale } from "@/components/locale";
import {
  getKidsQuestionsForForm,
  hasKidsVisualAsset,
  type KidsForm,
} from "@/data/kids";
import {
  fetchKidsResult,
  type KidsResultContract,
} from "@/data/kids/result";
import {
  getKidsResponseContract,
} from "@/data/kids/schema";

type ViewStatus =
  | "loading"
  | "ready"
  | "error";

interface SessionResponse {
  session_id?: string;
  claim_secret?: string;
  started_at?: string;
  question_bank_version?: string;
  form?: KidsForm;
  error?: string;
}

interface BackendItem {
  item_id: string;
  wording: string;
  master_order: number;
  form?: KidsForm;
  question_bank_version?: string;
}

type ItemsResponse =
  | BackendItem[]
  | {
      count?: number;
      items?: BackendItem[];
      error?: string;
    };

interface AnswerRecord {
  value: number;
  responseTimeMs: number;
}

interface SaveAnswerResponse {
  saved?: boolean;
  error?: string;
}

interface CompleteResponse {
  error?: string;
}

type LocalizedLabel = {
  en?: string;
  zh?: string;
};

function getOptionLabel(
  option: unknown,
  locale: "en" | "zh",
): string {
  const candidate = option as {
    value?: number;
    label?:
      | string
      | LocalizedLabel;
    text?: LocalizedLabel;
    en?: string;
    zh?: string;
  };

  if (typeof candidate.label === "string") {
    return candidate.label;
  }

  if (
    candidate.label &&
    typeof candidate.label === "object"
  ) {
    return (
      candidate.label[locale] ??
      candidate.label.en ??
      candidate.label.zh ??
      String(candidate.value ?? "")
    );
  }

  if (candidate.text) {
    return (
      candidate.text[locale] ??
      candidate.text.en ??
      candidate.text.zh ??
      String(candidate.value ?? "")
    );
  }

  return (
    candidate[locale] ??
    String(candidate.value ?? "")
  );
}

const FORM_INFO = {
  k68: {
    titleEn: "Ages 6–8",
    titleZh: "6–8岁",
    expectedCount: 30,
    bank: "KIDS-K68-RF-V2",
  },
  k912: {
    titleEn: "Ages 9–12",
    titleZh: "9–12岁",
    expectedCount: 42,
    bank: "KIDS-K912-RF-V2",
  },
} as const;

export function KidsTest({
  form,
}: {
  form: KidsForm;
}) {
  const router = useRouter();
  const { locale } = useLocale();
  const isZh = locale === "zh";

  const initialLocale = useRef(locale);
  const questionStartedAt =
    useRef<number | null>(null);

  const localQuestions = useMemo(
    () => getKidsQuestionsForForm(form),
    [form],
  );

  const responseContract =
    getKidsResponseContract(form);

  const answerOptions =
    responseContract.options;

  const [items, setItems] =
    useState<BackendItem[]>([]);

  const [sessionId, setSessionId] =
    useState("");

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, AnswerRecord>>({});

  const [status, setStatus] =
    useState<ViewStatus>("loading");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isSaving, setIsSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [completionResult, setCompletionResult] =
    useState<KidsResultContract | null>(null);

  useEffect(() => {
    let active = true;

    async function startAssessment() {
      try {
        const expected = FORM_INFO[form];

        if (
          localQuestions.length !==
          expected.expectedCount
        ) {
          throw new Error(
            `The local Kids question bank is incomplete. form=${form}; local=${localQuestions.length}; expected=${expected.expectedCount}`,
          );
        }

        const sessionResponse =
          await fetch("/api/sessions", {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              consent: true,
              language:
                initialLocale.current,
              module: "kids",
              form,
            }),
          });

        const sessionData:
          SessionResponse =
          await sessionResponse.json();

        if (
          !sessionResponse.ok ||
          !sessionData.session_id ||
          !sessionData.claim_secret
        ) {
          throw new Error(
            sessionData.error ??
              "Unable to create the Kids assessment session.",
          );
        }

        if (
          sessionData.form !== form ||
          sessionData.question_bank_version !==
            expected.bank
        ) {
          throw new Error(
            "The Kids session does not match the selected age form.",
          );
        }

        sessionStorage.setItem(
          `innergeo-claim:kids:${sessionData.session_id}`,
          sessionData.claim_secret,
        );

        const itemsResponse =
          await fetch(
            `/api/sessions/${encodeURIComponent(
              sessionData.session_id,
            )}/items`,
            {
              cache: "no-store",
            },
          );

        const payload: ItemsResponse =
          await itemsResponse.json();

        const responseItems =
          Array.isArray(payload)
            ? payload
            : payload.items;

        const responseError =
          Array.isArray(payload)
            ? undefined
            : payload.error;

        if (!itemsResponse.ok) {
          throw new Error(
            responseError ??
              "Unable to load the Kids assessment items.",
          );
        }

        if (
          !Array.isArray(responseItems) ||
          responseItems.length !==
            expected.expectedCount
        ) {
          throw new Error(
            "The Kids assessment snapshot is incomplete.",
          );
        }

        const sortedItems =
          [...responseItems].sort(
            (a, b) =>
              a.master_order -
              b.master_order,
          );

        const itemIds =
          new Set(
            sortedItems.map(
              (item) => item.item_id,
            ),
          );

        if (
          itemIds.size !==
          expected.expectedCount
        ) {
          throw new Error(
            "The Kids assessment snapshot contains duplicate items.",
          );
        }

        if (!active) {
          return;
        }

        setSessionId(
          sessionData.session_id,
        );

        setItems(sortedItems);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Unable to start the Kids Interest Discovery assessment.",
        );

        setStatus("error");
      }
    }

    startAssessment();

    return () => {
      active = false;
    };
  }, [form, localQuestions]);

  useEffect(() => {
    if (status === "ready") {
      questionStartedAt.current =
        performance.now();
    }
  }, [currentIndex, status]);

  if (status === "loading") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf8f3] px-6 text-[#34283b]">
        <div className="max-w-xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
            InnerGeo Kids
          </p>
          <h1 className="mt-5 font-serif text-4xl">
            {isZh
              ? "正在准备兴趣探索…"
              : "Preparing Interest Discovery…"}
          </h1>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="grid min-h-screen place-items-center bg-[#fbf8f3] px-6 text-[#34283b]">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
            InnerGeo Kids
          </p>

          <h1 className="mt-5 font-serif text-4xl">
            {isZh
              ? "暂时无法开始测试"
              : "Unable to start the assessment"}
          </h1>

          <p className="mt-6 leading-7 text-[#716776]">
            {errorMessage}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/kids")
            }
            className="mt-8 rounded-full bg-[#5f456f] px-6 py-3 text-sm font-bold text-white"
          >
            {isZh
              ? "返回年龄选择"
              : "Return to age selection"}
          </button>
        </div>
      </main>
    );
  }

  const currentItem =
    items[currentIndex];

  const question =
    localQuestions[currentIndex];

  if (!currentItem || !question) {
    return null;
  }

  const selected =
    answers[currentItem.item_id];

  const selectedValue =
    selected?.value;

  const isFirst =
    currentIndex === 0;

  const isLast =
    currentIndex ===
    items.length - 1;

  const progress =
    ((currentIndex + 1) /
      items.length) *
    100;

  const hasVisual =
    hasKidsVisualAsset(
      question.visual,
    );

  function chooseAnswer(
    value: number,
    eventTimeStamp: number,
  ) {
    const startedAt =
      questionStartedAt.current ??
      eventTimeStamp;

    setSaveMessage("");

    setAnswers((current) => ({
      ...current,
      [currentItem.item_id]: {
        value,
        responseTimeMs:
          Math.max(
            0,
            Math.round(
              eventTimeStamp -
                startedAt,
            ),
          ),
      },
    }));
  }

  async function next() {
    if (
      selectedValue === undefined ||
      !sessionId ||
      isSaving
    ) {
      return;
    }

    const answer =
      answers[currentItem.item_id];

    if (!answer) {
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    setCompletionResult(null);

    try {
      const response =
        await fetch(
          `/api/sessions/${encodeURIComponent(
            sessionId,
          )}/answers`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              item_id:
                currentItem.item_id,
              value: answer.value,
              response_time_ms:
                answer.responseTimeMs,
            }),
          },
        );

      const payload:
        SaveAnswerResponse =
        await response.json();

      if (
        !response.ok ||
        payload.saved !== true
      ) {
        throw new Error(
          payload.error ??
            "Unable to save this answer.",
        );
      }

      if (isLast) {
        const completeResponse =
          await fetch(
            `/api/sessions/${encodeURIComponent(
              sessionId,
            )}/complete`,
            {
              method: "POST",
            },
          );

        const completePayload:
          CompleteResponse =
          await completeResponse.json();

        if (!completeResponse.ok) {
          throw new Error(
            completePayload.error ??
              "Unable to complete the Kids assessment.",
          );
        }

        const persistedResult =
          await fetchKidsResult(
            sessionId,
          );

        setCompletionResult(
          persistedResult,
        );

        sessionStorage.setItem(
          `innergeodessa-kids-result-${sessionId}`,
          JSON.stringify(
            persistedResult,
          ),
        );

        router.push(
          `/kids/result/${encodeURIComponent(
            sessionId,
          )}`,
        );

        return;
      }

      setCurrentIndex(
        (index) => index + 1,
      );
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "Unable to save the answer.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function previous() {
    if (
      isFirst ||
      isSaving
    ) {
      return;
    }

    setSaveMessage("");
    setCurrentIndex(
      (index) => index - 1,
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed] text-[#2d2631]">
      <header className="border-b border-[#ddd4df] bg-[#fffdf9]">
        <div className="mx-auto flex min-h-20 max-w-6xl items-center justify-between gap-6 px-6 md:px-10">
          <button
            type="button"
            onClick={() =>
              router.push("/")
            }
            className="font-serif text-xl font-bold tracking-[-0.04em]"
          >
            Inner
            <span className="italic text-[#7a568f]">
              Geo
            </span>
          </button>

          <div className="text-right">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.15em] text-[#786d7c]">
              {isZh
                ? FORM_INFO[form]
                    .titleZh
                : FORM_INFO[form]
                    .titleEn}
            </p>

            <p className="mt-1 text-xs text-[#8d8490]">
              {currentIndex + 1} /{" "}
              {items.length}
            </p>
          </div>
        </div>
      </header>

      <div className="h-1.5 bg-[#e8e0e8]">
        <div
          className="h-full bg-[#7a568f] transition-[width] duration-200"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <section className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-16">
        <article className="overflow-hidden rounded-[28px] border border-[#dfd6e1] bg-[#fffdf9] shadow-[0_16px_45px_rgba(68,50,85,0.07)]">
          {hasVisual ? (
            <div className="relative h-[clamp(240px,42vw,500px)] w-full bg-[#f2eee7]">
              <Image
                key={
                  question.visual
                    .displayPath
                }
                src={
                  question.visual
                    .displayPath
                }
                alt={
                  question.visual.alt[
                    locale
                  ]
                }
                fill
                priority
                sizes="(max-width: 768px) 100vw, 960px"
                className="object-contain p-4"
              />
            </div>
          ) : null}

          <div className="p-7 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b7297]">
              InnerGeo Kids ·{" "}
              {isZh
                ? "兴趣探索"
                : "Interest Discovery"}
            </p>

            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.18] tracking-[-0.03em]">
              {question.prompt[locale]}
            </h1>

            <div className="mt-10 border-t border-[#e0d8df] pt-7">
              <p className="mb-4 text-sm font-bold text-[#514756]">
                {
                  responseContract.prompt[
                    locale
                  ]
                }
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {answerOptions.map(
                  (option) => {
                    const active =
                      selectedValue ===
                      option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={(event) =>
                          chooseAnswer(
                            option.value,
                            event.timeStamp,
                          )
                        }
                        className={[
                          "min-h-20 rounded-2xl border px-5 py-4 text-left transition",
                          active
                            ? "border-[#644873] bg-[#644873] text-white shadow-md"
                            : "border-[#ddd4df] bg-[#faf7f2] text-[#403746] hover:border-[#9d83aa] hover:bg-white",
                        ].join(" ")}
                      >
                        <span className="block text-base font-semibold leading-6">
                          {getOptionLabel(
                            option,
                            locale,
                          )}
                        </span>

                        <span
                          className={[
                            "mt-2 block text-xs",
                            active
                              ? "text-white/70"
                              : "text-[#988e9b]",
                          ].join(" ")}
                        >
                          {option.value}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </div>
        </article>

        <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={
              isFirst ||
              isSaving
            }
            onClick={previous}
            className="rounded-full border border-[#d5cbd7] px-6 py-3 text-sm font-bold text-[#5c5161] disabled:cursor-not-allowed disabled:opacity-35"
          >
            {isZh
              ? "上一题"
              : "Previous"}
          </button>

          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            {saveMessage ? (
              <p className="max-w-lg text-sm text-[#a64a2c]">
                {saveMessage}
              </p>
            ) : null}

            <button
              type="button"
              disabled={
                selectedValue ===
                  undefined ||
                isSaving ||
                completionResult !== null
              }
              onClick={next}
              className="rounded-full bg-[#5f456f] px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#51395f] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSaving
                ? isZh
                  ? "正在保存…"
                  : "Saving…"
                : isLast
                  ? isZh
                    ? "完成并查看兴趣地图"
                    : "Complete & View Interest Map"
                  : isZh
                    ? "下一题"
                    : "Next"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-6 text-[#958b98]">
          {isZh
            ? "年龄组在本次测试期间保持锁定。若要选择其他年龄段，请结束当前测试后重新开始。"
            : "The age form remains locked during this assessment. Start a new assessment to use another age group."}
        </p>
      </section>
    </main>
  );
}
