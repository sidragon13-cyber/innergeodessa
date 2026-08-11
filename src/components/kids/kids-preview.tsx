"use client";

import Image from "next/image";
import {
  useMemo,
  useState,
} from "react";

import {
  getKidsQuestionsForForm,
  hasKidsVisualAsset,
  type KidsForm,
} from "@/data/kids";

import {
  getKidsResponseContract,
} from "@/data/kids/schema";

type PreviewLanguage = "en" | "zh";

const FORM_INFO = {
  k68: {
    age: "6–8",
    titleEn: "Ages 6–8",
    titleZh: "6–8岁",
    descriptionEn:
      "Short, concrete interest questions designed for younger children.",
    descriptionZh:
      "适合低龄儿童的简短、具体兴趣探索题目。",
  },
  k912: {
    age: "9–12",
    titleEn: "Ages 9–12",
    titleZh: "9–12岁",
    descriptionEn:
      "More detailed interest questions for older children.",
    descriptionZh:
      "适合较大儿童的更完整兴趣探索题目。",
  },
} as const;

const DOMAIN_LABELS = {
  create: "Create",
  discover: "Discover",
  build: "Build",
  think: "Think",
  connect: "Connect",
  lead: "Lead",
  move: "Move",
  express: "Express",
} as const;

export function KidsPreview() {
  const [form, setForm] =
    useState<KidsForm | null>(null);

  const [language, setLanguage] =
    useState<PreviewLanguage>("zh");

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<number, number>>({});

  const [completed, setCompleted] =
    useState(false);

  const questions = useMemo(
    () =>
      form
        ? getKidsQuestionsForForm(form)
        : [],
    [form],
  );

  const question =
    questions[questionIndex];

  function chooseForm(
    selectedForm: KidsForm,
  ) {
    setForm(selectedForm);
    setQuestionIndex(0);
    setAnswers({});
    setCompleted(false);
  }

  function changeAgeGroup() {
    setForm(null);
    setQuestionIndex(0);
    setAnswers({});
    setCompleted(false);
  }

  function selectAnswer(
    value: number,
  ) {
    setAnswers((current) => ({
      ...current,
      [questionIndex]: value,
    }));
  }

  function goPrevious() {
    setQuestionIndex((current) =>
      Math.max(0, current - 1),
    );
  }

  function goNext() {
    if (
      answers[questionIndex] ===
      undefined
    ) {
      return;
    }

    if (
      questionIndex ===
      questions.length - 1
    ) {
      setCompleted(true);
      return;
    }

    setQuestionIndex(
      (current) => current + 1,
    );
  }

  const languageToggle = (
    <div
      style={{
        display: "flex",
        gap: 8,
      }}
    >
      <button
        type="button"
        onClick={() =>
          setLanguage("en")
        }
        style={languageButtonStyle(
          language === "en",
        )}
      >
        English
      </button>

      <button
        type="button"
        onClick={() =>
          setLanguage("zh")
        }
        style={languageButtonStyle(
          language === "zh",
        )}
      >
        中文
      </button>
    </div>
  );

  if (!form) {
    return (
      <main style={pageStyle}>
        <div style={containerStyle}>
          <header
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 20,
              marginBottom: 56,
            }}
          >
            <div>
              <div style={eyebrowStyle}>
                InnerGeo Kids
              </div>

              <h1 style={mainTitleStyle}>
                {language === "zh"
                  ? "选择孩子的年龄段"
                  : "Choose an age group"}
              </h1>
            </div>

            {languageToggle}
          </header>

          <div
            style={{
              maxWidth: 850,
              margin: "0 auto",
            }}
          >
            <p
              style={{
                margin:
                  "0 0 32px",
                color:
                  "var(--color-text-secondary, #6d746b)",
                fontSize: 18,
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              {language === "zh"
                ? "年龄段决定将使用哪一套兴趣探索题库。选择后进入对应测试。"
                : "The age group determines which Interest Discovery form will be used."}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 20,
              }}
            >
              {(
                [
                  "k68",
                  "k912",
                ] as const
              ).map(
                (candidateForm) => {
                  const info =
                    FORM_INFO[
                      candidateForm
                    ];

                  const count =
                    getKidsQuestionsForForm(
                      candidateForm,
                    ).length;

                  return (
                    <button
                      key={
                        candidateForm
                      }
                      type="button"
                      onClick={() =>
                        chooseForm(
                          candidateForm,
                        )
                      }
                      style={{
                        minHeight: 260,
                        padding: 32,
                        border:
                          "1px solid var(--color-border, #d9d2c7)",
                        borderRadius: 24,
                        background:
                          "var(--color-surface-raised, #fffdf9)",
                        color: "inherit",
                        textAlign: "left",
                        cursor: "pointer",
                        boxShadow:
                          "var(--shadow-card, 0 10px 30px rgba(32,35,29,.06))",
                      }}
                    >
                      <div
                        style={{
                          color:
                            "var(--color-accent, #a64a2c)",
                          fontSize: 13,
                          fontWeight: 700,
                          letterSpacing:
                            "0.12em",
                          textTransform:
                            "uppercase",
                        }}
                      >
                        {candidateForm ===
                        "k68"
                          ? "K68"
                          : "K912"}
                      </div>

                      <div
                        style={{
                          marginTop: 18,
                          fontFamily:
                            'Georgia, "Times New Roman", serif',
                          fontSize: 42,
                          lineHeight: 1.05,
                        }}
                      >
                        {language === "zh"
                          ? info.titleZh
                          : info.titleEn}
                      </div>

                      <p
                        style={{
                          margin:
                            "18px 0 28px",
                          color:
                            "var(--color-text-secondary, #6d746b)",
                          fontSize: 16,
                          lineHeight: 1.6,
                        }}
                      >
                        {language === "zh"
                          ? info.descriptionZh
                          : info.descriptionEn}
                      </p>

                      <strong>
                        {count}{" "}
                        {language === "zh"
                          ? "道题"
                          : "questions"}
                        {" →"}
                      </strong>
                    </button>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (completed) {
    return (
      <main style={pageStyle}>
        <div style={containerStyle}>
          <div
            style={{
              maxWidth: 720,
              margin:
                "100px auto 0",
              padding: 48,
              border:
                "1px solid var(--color-border, #d9d2c7)",
              borderRadius: 24,
              background:
                "var(--color-surface-raised, #fffdf9)",
              textAlign: "center",
            }}
          >
            <div style={eyebrowStyle}>
              Local Preview
            </div>

            <h1
              style={{
                ...mainTitleStyle,
                marginTop: 14,
              }}
            >
              {language === "zh"
                ? "本轮测试已完成"
                : "Preview completed"}
            </h1>

            <p
              style={{
                margin:
                  "24px auto",
                color:
                  "var(--color-text-secondary, #6d746b)",
                fontSize: 17,
                lineHeight: 1.6,
              }}
            >
              {language === "zh"
                ? `已回答 ${Object.keys(answers).length} / ${questions.length} 道题。本页面只用于本地视觉与交互测试，不计算结果。`
                : `${Object.keys(answers).length} / ${questions.length} questions answered. This local preview does not calculate a result.`}
            </p>

            <button
              type="button"
              onClick={
                changeAgeGroup
              }
              style={primaryButtonStyle}
            >
              {language === "zh"
                ? "返回年龄选择"
                : "Choose another age group"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!question) {
    return null;
  }

  const hasVisual =
    hasKidsVisualAsset(
      question.visual,
    );

  const selectedAnswer =
    answers[questionIndex];

  const responseContract =
    getKidsResponseContract(form);

  const answerOptions =
    responseContract.options;

  const progress =
    ((questionIndex + 1) /
      questions.length) *
    100;

  return (
    <main style={pageStyle}>
      <div style={containerStyle}>
        <header
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div>
            <div style={eyebrowStyle}>
              InnerGeo Kids
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 20,
                fontWeight: 700,
              }}
            >
              {language === "zh"
                ? FORM_INFO[form]
                    .titleZh
                : FORM_INFO[form]
                    .titleEn}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 12,
            }}
          >
            {languageToggle}

          </div>
        </header>

        <section
          style={{
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: 8,
              fontSize: 13,
              color:
                "var(--color-text-secondary, #6d746b)",
            }}
          >
            <strong>
              {language === "zh"
                ? `第 ${questionIndex + 1} 题 / 共 ${questions.length} 题`
                : `Question ${questionIndex + 1} of ${questions.length}`}
            </strong>

            <span>
              {
                DOMAIN_LABELS[
                  question.domain
                ]
              }
            </span>
          </div>

          <div
            style={{
              height: 6,
              overflow: "hidden",
              borderRadius: 999,
              background:
                "var(--color-background-subtle, #eee8dc)",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background:
                  "var(--color-accent, #a64a2c)",
                transition:
                  "width 180ms ease",
              }}
            />
          </div>
        </section>

        <article
          style={{
            overflow: "hidden",
            border:
              "1px solid var(--color-border, #d9d2c7)",
            borderRadius: 24,
            background:
              "var(--color-surface-raised, #fffdf9)",
            boxShadow:
              "var(--shadow-card, 0 10px 30px rgba(32,35,29,.06))",
          }}
        >
          {hasVisual && (
            <div
              style={{
                position:
                  "relative",
                width: "100%",
                height:
                  "clamp(260px, 43vw, 520px)",
                background:
                  "#f3efe6",
              }}
            >
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
                    language
                  ]
                }
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1120px"
                style={{
                  objectFit:
                    "contain",
                  padding: 14,
                }}
              />
            </div>
          )}

          <div
            style={{
              padding:
                "clamp(26px, 5vw, 52px)",
            }}
          >
            <div
              style={{
                marginBottom: 14,
                color:
                  "var(--color-accent, #a64a2c)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing:
                  "0.12em",
                textTransform:
                  "uppercase",
              }}
            >
              {
                DOMAIN_LABELS[
                  question.domain
                ]
              }
            </div>

            <h1
              style={{
                maxWidth: 900,
                margin: 0,
                fontFamily:
                  'Georgia, "Times New Roman", serif',
                fontSize:
                  form === "k68"
                    ? "clamp(30px, 4vw, 48px)"
                    : "clamp(27px, 3.6vw, 42px)",
                fontWeight: 400,
                lineHeight: 1.25,
                letterSpacing:
                  "-0.02em",
              }}
            >
              {
                question.prompt[
                  language
                ]
              }
            </h1>

            <div
              style={{
                marginTop: 38,
                paddingTop: 28,
                borderTop:
                  "1px solid var(--color-border, #d9d2c7)",
              }}
            >
              <div
                style={{
                  marginBottom: 16,
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {
                  responseContract.prompt[
                    language
                  ]
                }
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 10,
                }}
              >
                {answerOptions.map(
                  (option) => {
                    const active =
                      selectedAnswer ===
                      option.value;

                    return (
                      <button
                        key={
                          option.value
                        }
                        type="button"
                        onClick={() =>
                          selectAnswer(
                            option.value,
                          )
                        }
                        style={{
                          minHeight: 82,
                          border:
                            active
                              ? "2px solid var(--color-primary, #34483a)"
                              : "1px solid var(--color-border, #d9d2c7)",
                          borderRadius:
                            16,
                          padding:
                            "12px 10px",
                          background:
                            active
                              ? "var(--color-primary, #34483a)"
                              : "var(--color-surface, #faf8f3)",
                          color:
                            active
                              ? "var(--color-on-primary, #f8f5ed)"
                              : "inherit",
                          cursor:
                            "pointer",
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",
                            marginBottom:
                              6,
                            fontSize:
                              20,
                          }}
                        >
                          {
                            option.value
                          }
                        </strong>

                        <span
                          style={{
                            fontSize:
                              13,
                            lineHeight:
                              1.35,
                          }}
                        >
                          {
                            option.label[
                              language
                            ]
                          }
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            <details
              style={{
                marginTop: 30,
                color:
                  "var(--color-text-muted, #7c8279)",
                fontSize: 12,
              }}
            >
              <summary
                style={{
                  cursor:
                    "pointer",
                }}
              >
                Development metadata
              </summary>

              <div
                style={{
                  display:
                    "grid",
                  gap: 5,
                  marginTop: 12,
                  fontFamily:
                    "monospace",
                }}
              >
                <div>
                  {
                    question.sourceItemId
                  }
                </div>

                <div>
                  {
                    question.releaseId
                  }
                </div>

                <div>
                  visual:{" "}
                  {
                    question.visual
                      .support
                  }
                </div>
              </div>
            </details>
          </div>
        </article>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
            gap: 12,
            marginTop: 20,
          }}
        >
          <button
            type="button"
            disabled={
              questionIndex === 0
            }
            onClick={goPrevious}
            style={{
              minHeight: 50,
              border:
                "1px solid var(--color-border-strong, #b9b0a3)",
              borderRadius: 999,
              padding:
                "0 22px",
              background:
                "var(--color-surface, #faf8f3)",
              cursor:
                questionIndex === 0
                  ? "not-allowed"
                  : "pointer",
              opacity:
                questionIndex === 0
                  ? 0.4
                  : 1,
            }}
          >
            ←{" "}
            {language === "zh"
              ? "上一题"
              : "Previous"}
          </button>

          <button
            type="button"
            disabled={
              selectedAnswer ===
              undefined
            }
            onClick={goNext}
            style={{
              ...primaryButtonStyle,
              opacity:
                selectedAnswer ===
                undefined
                  ? 0.4
                  : 1,
              cursor:
                selectedAnswer ===
                undefined
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {questionIndex ===
            questions.length - 1
              ? language === "zh"
                ? "完成测试"
                : "Complete"
              : language === "zh"
                ? "下一题 →"
                : "Next →"}
          </button>
        </nav>
      </div>
    </main>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background:
    "var(--color-background, #f7f4ec)",
  color:
    "var(--color-text, #20231d)",
} as const;

const containerStyle = {
  width:
    "min(100% - 32px, 1080px)",
  margin: "0 auto",
  padding: "34px 0 64px",
} as const;

const eyebrowStyle = {
  color:
    "var(--color-text-secondary, #6d746b)",
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform:
    "uppercase" as const,
} as const;

const mainTitleStyle = {
  margin: "8px 0 0",
  fontFamily:
    'Georgia, "Times New Roman", serif',
  fontSize:
    "clamp(36px, 5vw, 56px)",
  fontWeight: 400,
  lineHeight: 1.05,
  letterSpacing: "-0.035em",
} as const;

const primaryButtonStyle = {
  minHeight: 50,
  border: 0,
  borderRadius: 999,
  padding: "0 24px",
  background:
    "var(--color-primary, #34483a)",
  color:
    "var(--color-on-primary, #f8f5ed)",
  fontWeight: 700,
} as const;

function languageButtonStyle(
  active: boolean,
) {
  return {
    minHeight: 40,
    border: active
      ? "1px solid var(--color-accent, #a64a2c)"
      : "1px solid var(--color-border, #d9d2c7)",
    borderRadius: 999,
    padding: "0 14px",
    background: active
      ? "var(--color-accent, #a64a2c)"
      : "transparent",
    color: active
      ? "white"
      : "inherit",
    cursor: "pointer",
  } as const;
}
