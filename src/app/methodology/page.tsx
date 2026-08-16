import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title:
    "Methodology & Use Boundaries | InnerGeo",
  description:
    "How InnerGeo assessments, interest exploration and paid digital reports are designed, interpreted and used, including clear service boundaries.",
};

export default function MethodologyPage() {
  return (
    <LegalPage
      pageClassName="methodology-page"
      eyebrow={{
        en: "Methodology & Use Boundaries",
        zh: "方法与使用边界",
      }}
      title={{
        en: "How InnerGeo is designed, interpreted and used",
        zh: "InnerGeo 如何设计、解释与使用",
      }}
      titleLines={{
        en: [
          "How InnerGeo is designed,",
          "interpreted and used",
        ],
        zh: [
          "InnerGeo 如何设计、",
          "解释与使用",
        ],
      }}
      updated={{
        en: "16 August 2026",
        zh: "2026年8月16日",
      }}
      intro={{
        en: "InnerGeo is an online self-discovery and digital assessment platform. This page explains what our different experiences are designed to explore, how results should be interpreted, and the boundaries of our digital reports and services.",
        zh: "InnerGeo 是一个在线自我探索与数字测评平台。本页面说明不同探索产品的设计目的、测评结果应如何理解，以及数字报告和平台服务的使用边界。",
      }}
      sections={{
        en: [
          {
            title: "1. Platform purpose",
            content: (
              <>
                <p>
                  InnerGeo helps users explore personality preferences,
                  career interests, children&apos;s interests and other
                  self-reflection themes through online assessments and
                  guided digital experiences.
                </p>
                <p>
                  The platform is designed to support self-understanding,
                  interest discovery and direction exploration. It does
                  not make education, career or life decisions on behalf
                  of the user.
                </p>
              </>
            ),
          },
          {
            title: "2. Structured assessments",
            content: (
              <>
                <p>
                  Personality, Career Interests and Kids Interests are
                  presented as structured assessment experiences. Their
                  results organize responses into interpretable patterns
                  that can be used as starting points for reflection and
                  further exploration.
                </p>
                <p>
                  Results describe preferences, interests and patterns
                  reflected in the answers provided. They do not measure
                  intelligence, rank personal worth or establish a fixed
                  definition of who a person is.
                </p>
              </>
            ),
          },
          {
            title: "3. Interpreting personality results",
            content: (
              <p>
                Personality results describe preferences that may appear
                across areas such as energy, information processing,
                decision-making and approach to daily life. These patterns
                may be influenced by context, experience, roles and life
                stage and should not be treated as permanently fixed
                traits.
              </p>
            ),
          },
          {
            title: "4. Career and interest exploration",
            content: (
              <p>
                Career-interest results help identify activities,
                environments and fields that may be more naturally
                engaging. They provide exploration clues and reference
                points; they are not hiring decisions, admissions
                judgments, professional qualification assessments or
                individualized licensed professional advice.
              </p>
            ),
          },
          {
            title: "5. Kids Interests",
            content: (
              <>
                <p>
                  The current Kids Interests experience is designed for
                  children aged 6–12 and is intended to help parents
                  understand areas where a child may show more curiosity,
                  interest or willingness to engage.
                </p>
                <p>
                  Results should be considered together with everyday
                  observation. They are not used for early selection,
                  talent certification, intelligence ranking, ability
                  grading or predictions of future development.
                </p>
              </>
            ),
          },
          {
            title: "6. Zodiac Interests",
            content: (
              <p>
                Zodiac Interests is a separate interest-exploration
                experience. It is not part of InnerGeo&apos;s structured
                assessment system and should not be interpreted as a
                scientific, medical or psychological assessment. It is
                designed for interest exploration, entertainment and
                personal reflection.
              </p>
            ),
          },
          {
            title: "7. Digital reports and paid products",
            content: (
              <>
                <p>
                  Users may choose to purchase in-depth digital reports
                  after completing eligible assessment experiences. These
                  reports provide expanded interpretation, personal
                  insights and direction-oriented reference based on the
                  applicable assessment result.
                </p>
                <p>
                  Paid digital reports are digital information products.
                  They are not medical care, psychotherapy, legal advice,
                  financial advice or another regulated professional
                  service.
                </p>
              </>
            ),
          },
          {
            title: "8. What results should not be used for",
            content: (
              <ul>
                <li>Medical, psychological or mental-health diagnosis.</li>
                <li>Measuring intelligence or personal worth.</li>
                <li>Predicting future performance or life outcomes.</li>
                <li>
                  Making a hiring, admissions or professional licensing
                  decision by itself.
                </li>
                <li>
                  Replacing professional advice where qualified or
                  regulated advice is required.
                </li>
              </ul>
            ),
          },
          {
            title: "9. Privacy, payments and user rights",
            content: (
              <p>
                For more information about personal information,
                purchases, refunds and platform terms, review our{" "}
                <Link href="/privacy">Privacy Policy</Link>,{" "}
                <Link href="/terms">Terms of Service</Link> and{" "}
                <Link href="/refund-policy">Refund Policy</Link>. For
                questions, contact us through the{" "}
                <Link href="/contact">Contact page</Link>.
              </p>
            ),
          },
        ],
        zh: [
          {
            title: "1. 平台目的",
            content: (
              <>
                <p>
                  InnerGeo 通过在线测评和引导式数字体验，帮助用户探索人格偏好、
                  职业兴趣、儿童兴趣以及其他与自我理解相关的主题。
                </p>
                <p>
                  平台的主要目的，是帮助用户理解自己、发现兴趣并探索可能的方向。
                  InnerGeo 不替用户作出教育、职业或人生决定。
                </p>
              </>
            ),
          },
          {
            title: "2. 结构化测评",
            content: (
              <>
                <p>
                  人格、职业兴趣与儿童兴趣属于 InnerGeo 的结构化测评体验。
                  系统根据用户的回答整理出可以解释的偏好、兴趣和模式，
                  作为进一步理解与探索的起点。
                </p>
                <p>
                  结果描述的是回答中呈现出的倾向与模式，不用于衡量智力、
                  判断个人价值，也不把一个人固定定义为某一种不可改变的类型。
                </p>
              </>
            ),
          },
          {
            title: "3. 人格结果如何理解",
            content: (
              <p>
                人格结果帮助理解在能量获取、信息处理、决策和生活方式等方面
                呈现出的偏好。相关倾向可能受到情境、经历、角色和人生阶段的影响，
                因此不应被理解为永久固定的个人特质。
              </p>
            ),
          },
          {
            title: "4. 职业与兴趣探索",
            content: (
              <p>
                职业兴趣结果用于识别更容易引发兴趣和投入的活动类型、环境与领域，
                为进一步探索提供线索和参考。相关内容不构成招聘决定、录取判断、
                职业资格评估，也不属于个别化的受监管专业咨询服务。
              </p>
            ),
          },
          {
            title: "5. 儿童兴趣测评",
            content: (
              <>
                <p>
                  当前儿童兴趣测评面向 6–12 岁儿童，主要帮助家长理解孩子在哪些
                  活动、话题或探索方向上更容易表现出好奇、兴趣和主动投入。
                </p>
                <p>
                  结果应结合日常观察综合理解，不用于早期选拔、天赋鉴定、
                  智力排名、能力评级或未来发展预测。
                </p>
              </>
            ),
          },
          {
            title: "6. Zodiac Interests",
            content: (
              <p>
                Zodiac Interests 是独立的兴趣探索体验，不属于 InnerGeo
                的结构化测评体系，也不应被理解为科学、医学或心理测评。
                其用途是兴趣探索、娱乐参考与个人反思。
              </p>
            ),
          },
          {
            title: "7. 数字报告与付费产品",
            content: (
              <>
                <p>
                  完成符合条件的测评后，用户可以选择购买更深入的数字报告。
                  报告基于相应测评结果，提供扩展解释、个人洞察与方向参考。
                </p>
                <p>
                  付费数字报告属于在线交付的数字信息产品，不等同于医疗服务、
                  心理治疗、法律意见、财务建议或其他受监管的专业服务。
                </p>
              </>
            ),
          },
          {
            title: "8. 测评结果不适合用于什么",
            content: (
              <ul>
                <li>医学、心理或精神健康诊断。</li>
                <li>衡量智力或判断个人价值。</li>
                <li>预测未来表现或人生结果。</li>
                <li>单独作为招聘、录取或职业资格决定的依据。</li>
                <li>
                  在需要合格或受监管专业服务时替代专业人员的意见。
                </li>
              </ul>
            ),
          },
          {
            title: "9. 隐私、支付与用户权利",
            content: (
              <p>
                关于个人信息、购买、退款和平台使用规则，请参阅{" "}
                <Link href="/privacy">隐私政策</Link>、{" "}
                <Link href="/terms">服务条款</Link>和{" "}
                <Link href="/refund-policy">退款政策</Link>。
                如需进一步帮助，可通过{" "}
                <Link href="/contact">联系我们</Link>页面联系 InnerGeo。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
