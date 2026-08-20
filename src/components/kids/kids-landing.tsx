"use client";

import { useRouter } from "next/navigation";

import {
  SiteFooter,
  SiteHeader,
} from "@/components/home";
import { useLocale } from "@/components/locale";
import {
  getKidsQuestionsForForm,
  type KidsForm,
} from "@/data/kids";

const FORM_INFO = {
  k68: {
    ageEn: "Ages 6–8",
    ageZh: "6–8岁",
    descriptionEn:
      "Short, concrete questions for discovering the activities a younger child naturally wants to try.",
    descriptionZh:
      "通过简短、具体的题目，发现低龄儿童自然想尝试和接近的兴趣方向。",
  },
  k912: {
    ageEn: "Ages 9–12",
    ageZh: "9–12岁",
    descriptionEn:
      "A broader interest exploration for older children as preferences begin to become clearer.",
    descriptionZh:
      "随着兴趣偏好逐渐清晰，为较大儿童提供更完整的兴趣探索。",
  },
} as const;

export function KidsLanding() {
  const router = useRouter();
  const { locale } = useLocale();
  const isZh = locale === "zh";

  function start(form: KidsForm) {
    router.push(`/kids/test?form=${form}`);
  }

  return (
    <>
      <SiteHeader />

      <main className="min-h-[calc(100vh-80px)] bg-[#fbf8f3] text-[#29222e]">
        <section className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7a568f]">
            InnerGeo Kids · Interest Discovery
          </p>

          <h1 className="mt-5 max-w-4xl font-serif text-4xl font-normal leading-[1.08] tracking-[-0.04em] md:text-6xl">
            {isZh
              ? "发现孩子自然产生兴趣的方向。"
              : "Discover where a child’s curiosity naturally goes."}
          </h1>

          <p className="mt-6 text-sm font-bold tracking-[0.04em] text-[#6f4c80]">
            {isZh
              ? "发现兴趣，而不是判断孩子。"
              : "Discover interests, not labels."}
          </p>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#625968] md:text-lg">
            {isZh
              ? "InnerGeo Kids 不是职业预测，也不是能力诊断。它通过适龄问题建立一张兴趣地图，帮助家长和孩子从发现开始，再逐步探索与培养。"
              : "InnerGeo Kids is not a career prediction or ability diagnosis. It creates an age-appropriate interest map that supports a simple path: Discover, Explore, Cultivate."}
          </p>

          <div className="mt-14">
            <div className="mb-6">
              <p className="text-sm font-semibold text-[#4c4251]">
                {isZh
                  ? "请选择孩子的年龄段。开始后，本次测试的年龄组将保持锁定。"
                  : "Choose the child’s age group. Once the assessment begins, the form stays locked for that session."}
              </p>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-[#756d79]">
                {isZh
                  ? "如有需要，家长或老师可以陪同阅读和解释题意，请尽量让孩子根据自己的真实感受作出选择。"
                  : "If needed, parents or teachers may help read and explain the questions. Please let the child choose the answer that best reflects their own feelings."}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {(["k68", "k912"] as const).map(
                (form) => {
                  const info = FORM_INFO[form];
                  const count =
                    getKidsQuestionsForForm(form).length;

                  return (
                    <button
                      key={form}
                      type="button"
                      onClick={() => start(form)}
                      className="group min-h-72 rounded-[28px] border border-[#ded5e2] bg-white p-8 text-left shadow-[0_14px_45px_rgba(68,50,85,0.06)] transition hover:-translate-y-1 hover:border-[#aa8db8] hover:shadow-[0_18px_55px_rgba(68,50,85,0.1)] md:p-10"
                    >
                      <div className="flex items-start justify-between gap-6">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#f0e8f3] font-serif text-xl text-[#6f4c80]">
                          {form === "k68" ? "6–8" : "9–12"}
                        </span>

                        <span className="text-right text-xs font-bold uppercase tracking-[0.12em] text-[#9985a2]">
                          {count}{" "}
                          {isZh ? "道题" : "questions"}
                          <span className="mx-1.5">·</span>
                          {form === "k68"
                            ? isZh
                              ? "约 8–10 分钟"
                              : "about 8–10 min"
                            : isZh
                              ? "约 12–15 分钟"
                              : "about 12–15 min"}
                        </span>
                      </div>

                      <h2 className="mt-9 font-serif text-3xl tracking-[-0.03em] text-[#34283b]">
                        {isZh
                          ? info.ageZh
                          : info.ageEn}
                      </h2>

                      <p className="mt-4 max-w-xl leading-7 text-[#6b626f]">
                        {isZh
                          ? info.descriptionZh
                          : info.descriptionEn}
                      </p>

                      <div className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-[#6f4c80]">
                        <span>
                          {isZh
                            ? "开始兴趣探索"
                            : "Start Interest Discovery"}
                        </span>
                        <span
                          aria-hidden="true"
                          className="transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </div>
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-8 border-l-2 border-[#c8b4d1] pl-5">
            <p className="max-w-4xl text-sm leading-7 text-[#6b626f]">
              <strong className="font-semibold text-[#4c4251]">
                {isZh
                  ? "孩子不需要被定义，但值得被认真发现。"
                  : "A child does not need to be defined, but deserves to be understood."}
              </strong>{" "}
              {isZh
                ? "InnerGeo Kids 不判断天赋、能力或未来职业，而是帮助家长观察孩子当前愿意主动靠近、重复参与和继续探索的兴趣方向。"
                : "InnerGeo Kids does not judge talent, ability, or future careers. It helps families notice the activities a child currently chooses, repeats, and wants to explore further."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 border-t border-[#ded7df] pt-8 text-sm leading-7 text-[#756d79] md:grid-cols-3">
            <p>
              <strong className="block text-[#403746]">
                Discover
              </strong>
              {isZh ? "发现兴趣信号" : "Notice interest signals"}
            </p>

            <p>
              <strong className="block text-[#403746]">
                Explore
              </strong>
              {isZh ? "尝试更多可能" : "Try more possibilities"}
            </p>

            <p>
              <strong className="block text-[#403746]">
                Cultivate
              </strong>
              {isZh ? "逐步培养兴趣" : "Cultivate what persists"}
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
