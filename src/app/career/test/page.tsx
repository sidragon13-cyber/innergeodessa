"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  AssessmentAnswerScale,
  AssessmentNavigation,
  AssessmentProgress,
  AssessmentQuestion,
  AssessmentShell,
  type AssessmentAnswerOption,
  type AssessmentAnswerRecord,
  type AssessmentDisplayItem,
  type AssessmentViewStatus,
} from "@/components/assessment";
import {
  useLocale,
} from "@/components/locale";
import {
  getCareerTestDictionary,
} from "@/data/i18n";
import {
  riasecQuestionBank,
} from "@/data/assessment/questions/riasec";
import {
  fetchRiasecResult,
  type RiasecResultContract,
} from "@/data/career";

type ItemsResponse =
  | AssessmentDisplayItem[]
  | {
      count?: number;
      items?: AssessmentDisplayItem[];
      error?: string;
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
};

export default function CareerTestPage() {
  const router = useRouter();
  const { locale } = useLocale();
  const dictionary = getCareerTestDictionary(locale);
  const initialLocale = useRef(locale);
  const initialDictionary = useRef(dictionary);
  const answerOptions: readonly AssessmentAnswerOption[] =
    dictionary.answerOptions;
  const [items, setItems] = useState<AssessmentDisplayItem[]>([]);
  const [sessionId, setSessionId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, AssessmentAnswerRecord>
  >({});
  const questionStartedAt = useRef<number | null>(null);
  const [status, setStatus] =
    useState<AssessmentViewStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [completionResult, setCompletionResult] =
    useState<RiasecResultContract | null>(null);

  useEffect(() => {
    async function loadItems() {
      try {
        const sessionResponse = await fetch("/api/sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            consent: true,
            language: initialLocale.current,
            module: "riasec",
          }),
        });

        const sessionData: SessionResponse = await sessionResponse.json();

        if (!sessionResponse.ok || !sessionData.session_id) {
          throw new Error(
            sessionData.error ??
              initialDictionary.current.errors
                .createSession,
          );
        }

        const response = await fetch(
          `/api/sessions/${sessionData.session_id}/items`,
          { cache: "no-store" },
        );

        const data: ItemsResponse = await response.json();
        const responseItems = Array.isArray(data) ? data : data.items;
        const responseError = Array.isArray(data) ? undefined : data.error;

        if (!response.ok) {
          throw new Error(
            responseError ??
              initialDictionary.current.errors
                .loadItems,
          );
        }

        if (!Array.isArray(responseItems) || responseItems.length !== 36) {
          throw new Error(
            initialDictionary.current.errors
              .incompleteQuestionBank,
          );
        }

        const sortedItems = [...responseItems].sort(
          (first, second) => first.master_order - second.master_order,
        );

        setSessionId(sessionData.session_id);
        setItems(sortedItems);
        setStatus("ready");
      } catch (error) {
        setErrorMessage(
          error instanceof Error
            ? error.message
            : initialDictionary.current.errors
                .loadAssessment,
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
      <AssessmentShell
        status={status}
        errorMessage=""
        currentIndex={0}
        itemCount={0}
      >
        {null}
      </AssessmentShell>
    );
  }

  if (status === "error") {
    return (
      <AssessmentShell
        status={status}
        errorMessage={errorMessage}
        currentIndex={0}
        itemCount={0}
      >
        {null}
      </AssessmentShell>
    );
  }

  const currentItem = items[currentIndex];

  const localizedQuestion =
    riasecQuestionBank.find(
      (question) =>
        question.order === currentItem.master_order,
    );

  const currentWording =
    localizedQuestion?.prompt[locale] ??
    currentItem.wording;

  const selectedValue =
    answers[currentItem.item_id]?.value;
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === items.length - 1;

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
          data.error ??
            dictionary.errors.saveAnswer,
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
              dictionary.errors.generateResult,
          );
        }

        const persistedResult =
          await fetchRiasecResult(sessionId);

        setCompletionResult(persistedResult);
        setSaveMessage(
          dictionary.completion.successMessage,
        );

        sessionStorage.setItem(
          `innergeodessa-career-result-${sessionId}`,
          JSON.stringify(persistedResult),
        );

        router.push(`/career/result/${sessionId}`);
        return;
      }

      setCurrentIndex((index) => index + 1);
    } catch (error) {
      setSaveMessage(
        error instanceof Error
          ? error.message
          : dictionary.errors.saveAnswer,
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
    <AssessmentShell
      status={status}
      errorMessage={errorMessage}
      currentIndex={currentIndex}
      itemCount={items.length}
    >
      <AssessmentProgress
        currentIndex={currentIndex}
        itemCount={items.length}
      />
      <AssessmentQuestion
        eyebrow={dictionary.eyebrow}
        wording={currentWording}
      />
      <AssessmentAnswerScale
        options={answerOptions}
        selectedValue={selectedValue}
        onSelect={selectAnswer}
      />
      <AssessmentNavigation
        answeredCount={Object.keys(answers).length}
        itemCount={items.length}
        sessionId={sessionId}
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        hasSelectedAnswer={selectedValue !== undefined}
        isSaving={isSaving}
        isComplete={completionResult !== null}
        saveMessage={saveMessage}
        onPrevious={goToPreviousQuestion}
        onNext={goToNextQuestion}
        completionContent={
          completionResult ? (
            <div className="mt-8 border border-[#c8c2b5] bg-[#f7f4ec] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6d746b]">
                {dictionary.completion.eyebrow}
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-[#26372d]">
                {dictionary.completion.title}
              </h2>

              <pre className="mt-5 max-h-96 overflow-auto whitespace-pre-wrap break-words bg-white p-4 text-xs leading-6 text-[#34483a]">
                {JSON.stringify(completionResult, null, 2)}
              </pre>
            </div>
          ) : undefined
        }
      />
    </AssessmentShell>
  );
}
