"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type AssessmentItem = {
  item_id: string;
  wording: string;
  master_order: number;
};

type ItemsResponse = {
  count: number;
  items: AssessmentItem[];
  error?: string;
};

type AnswerRecord = {
  value: number;
  responseTimeMs: number;
};

type SessionResponse = {
  session_id: string;
  started_at?: string;
  question_bank_version?: string;
  error?: string;
};

type SaveAnswerResponse = {
  saved?: boolean;
  error?: string;
};

type CompleteResponse = {
  error?: string;
  [key: string]: unknown;
};

const answerOptions = [
  { value: 1, label: "Strongly disagree" },
  { value: 2, label: "Disagree" },
  { value: 3, label: "Neither agree nor disagree" },
  { value: 4, label: "Agree" },
  { value: 5, label: "Strongly agree" },
];

export default function PersonalityTestPage() {
  const router = useRouter();
  const [items, setItems] = useState<AssessmentItem[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const questionStartedAt = useRef<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [completionResult, setCompletionResult] =
    useState<CompleteResponse | null>(null);

  useEffect(() => {
    async function loadItems() {
      try {
        const sessionResponse = await fetch("/api/sessions", {
          method: "POST",
        });

        const sessionData: SessionResponse = await sessionResponse.json();

        if (!sessionResponse.ok || !sessionData.session_id) {
          throw new Error(
            sessionData.error ?? "Unable to create assessment session.",
          );
        }

        const response = await fetch(
          `/api/sessions/${sessionData.session_id}/items`,
          { cache: "no-store" },
        );

        const data: ItemsResponse = await response.json();

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to load assessment items.");
        }

        if (!Array.isArray(data.items) || data.count !== 72) {
          throw new Error("The assessment did not return all 72 questions.");
        }

        const sortedItems = [...data.items].sort(
          (first, second) => first.master_order - second.master_order,
        );

        setSessionId(sessionData.session_id);
        setItems(sortedItems);
        setStatus("ready");
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "The assessment could not be loaded.",
        );
        setStatus("error");
      }
    }

    loadItems();
  }, []);

  useEffect(() => {
    if (status === "ready") {
      questionStartedAt.current = performance.now();
    }
  }, [currentIndex, status]);

  if (status === "loading") {
    return (
      <main className="min-h-screen p-20">
        <h1 className="text-4xl">Loading assessment…</h1>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-screen p-20">
        <h1 className="mb-4 text-4xl">Unable to load assessment</h1>
        <p>{errorMessage}</p>
      </main>
    );
  }

  const currentItem = items[currentIndex];
  const selectedValue = answers[currentItem.item_id]?.value;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === items.length - 1;
  const progress = ((currentIndex + 1) / items.length) * 100;

  function selectAnswer(
    value: number,
    eventTimeStamp: number,
  ) {
    setSaveMessage("");
    const startedAt =
      questionStartedAt.current ?? eventTimeStamp;

    const responseTimeMs = Math.max(
      0,
      Math.round(eventTimeStamp - startedAt),
    );

    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentItem.item_id]: {
        value,
        responseTimeMs,
      },
    }));
  }

  async function goToNextQuestion() {
    if (
      selectedValue === undefined ||
      !sessionId ||
      isSaving
    ) {
      return;
    }

    const answer = answers[currentItem.item_id];

    if (!answer) {
      return;
    }

    setIsSaving(true);
    setSaveMessage("");
    setCompletionResult(null);

    try {
      const response = await fetch(
        `/api/sessions/${sessionId}/answers`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item_id: currentItem.item_id,
            value: answer.value,
            response_time_ms: answer.responseTimeMs,
          }),
        },
      );

      const data: SaveAnswerResponse = await response.json();

      if (!response.ok || data.saved !== true) {
        throw new Error(
          data.error ?? "The answer could not be saved.",
        );
      }

      if (isLastQuestion) {
        const completeResponse = await fetch(
          `/api/sessions/${sessionId}/complete`,
          {
            method: "POST",
          },
        );

        const completeData: CompleteResponse =
          await completeResponse.json();

        if (!completeResponse.ok) {
          throw new Error(
            completeData.error ??
              "The assessment result could not be generated.",
          );
        }

        setCompletionResult(completeData);
        setSaveMessage(
          "Assessment completed and result generated successfully.",
        );

        sessionStorage.setItem(
          `innergeodessa-result-${sessionId}`,
          JSON.stringify(completeData),
        );

        router.push(`/personality/result/${sessionId}`);
        return;
      }

      setCurrentIndex((index) => index + 1);
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : "The answer could not be saved.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function goToPreviousQuestion() {
    if (isFirstQuestion) {
      return;
    }

    setCurrentIndex((index) => index - 1);
  }

  return (
    <main className="min-h-screen bg-[#f1eee5] text-[#20231d]">
      <header className="border-b border-black/20">
        <div className="mx-auto flex min-h-20 w-[min(100%-40px,1000px)] items-center justify-between">
          <span className="font-serif text-xl font-bold">
            Inner<span className="italic text-[#a64a2c]">Geodessa</span>
          </span>

          <span className="text-xs font-bold uppercase tracking-[0.16em]">
            Question {currentIndex + 1} of {items.length}
          </span>
        </div>
      </header>

      <section className="mx-auto w-[min(100%-40px,760px)] py-16 md:py-24">
        <div className="mb-14 h-px bg-black/15">
          <div
            className="h-px bg-[#a64a2c] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#a64a2c]">
          Personality assessment
        </p>

        <h1 className="mb-12 font-serif text-4xl leading-tight md:text-5xl">
          {currentItem.wording}
        </h1>

        <div className="grid gap-3">
          {answerOptions.map((option) => {
            const selected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={(event) =>
                  selectAnswer(option.value, event.timeStamp)
                }
                className={`flex min-h-16 items-center justify-between border px-5 text-left transition ${
                  selected
                    ? "border-[#a64a2c] bg-[#a64a2c] text-[#f1eee5]"
                    : "border-black/20 hover:border-[#a64a2c]"
                }`}
              >
                <span>{option.label}</span>
                <span className="text-sm">{option.value}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-black/20 pt-8">
          <button
            type="button"
            onClick={goToPreviousQuestion}
            disabled={isFirstQuestion}
            className="min-h-12 px-5 text-xs font-bold uppercase tracking-[0.14em] disabled:opacity-30"
          >
            ← Previous
          </button>

          <div className="text-center text-xs text-black/50">
            <p>
              Answered {Object.keys(answers).length} of {items.length}
            </p>
            <p className="mt-1">
              Session {sessionId.slice(0, 8)}…
            </p>
          </div>

          <button
            type="button"
            onClick={goToNextQuestion}
            disabled={
              selectedValue === undefined ||
              isSaving ||
              completionResult !== null
            }
            className="min-h-12 bg-[#34483a] px-6 text-xs font-bold uppercase tracking-[0.14em] text-[#f1eee5] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isSaving
              ? isLastQuestion
                ? "Generating result…"
                : "Saving…"
              : completionResult
                ? "Assessment complete"
                : isLastQuestion
                  ? "Save final answer"
                  : "Next question →"}
          </button>
        </div>

        {completionResult && (
          <div className="mt-8 border border-[#c8c2b5] bg-[#f7f4ec] p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d746b]">
              Assessment Complete
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#26372d]">
              Result generated successfully
            </h2>

            <pre className="mt-5 max-h-96 overflow-auto whitespace-pre-wrap break-words bg-white p-4 text-xs leading-6 text-[#34483a]">
              {JSON.stringify(completionResult, null, 2)}
            </pre>
          </div>
        )}

        {saveMessage && (
          <p
            className={`mt-5 text-center text-sm ${
              saveMessage.startsWith("Final")
                ? "text-[#34483a]"
                : "text-[#a64a2c]"
            }`}
          >
            {saveMessage}
          </p>
        )}
      </section>
    </main>
  );
}
