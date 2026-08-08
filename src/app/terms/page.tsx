import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service | InnerGeo",
  description:
    "Terms governing the use of InnerGeo personality, career-interest, zodiac, account, report, and related self-discovery services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow={{
        en: "Terms & Responsible Use",
        zh: "服务条款与合理使用",
      }}
      title={{
        en: "Terms of Service",
        zh: "服务条款",
      }}
      intro={{
        en: "These Terms explain the conditions that apply when you access or use InnerGeo, including our assessments, reports, account features, and paid digital services.",
        zh: "本服务条款说明您访问或使用 InnerGeo 时适用的基本条件，包括测评、报告、账户功能以及付费数字服务。",
      }}
      sections={{
        en: [
          {
            title: "1. About InnerGeo",
            content: (
              <p>
                InnerGeo provides digital self-discovery experiences including
                personality assessments, career-interest assessments, zodiac
                and chart-related experiences, generated reports, and related
                reflection tools.
              </p>
            ),
          },
          {
            title: "2. Acceptance of these Terms",
            content: (
              <p>
                By accessing or using InnerGeo, you agree to these Terms and
                applicable policies. If you do not agree, you should not use
                the service.
              </p>
            ),
          },
          {
            title: "3. Self-discovery, not diagnosis",
            content: (
              <>
                <p>
                  InnerGeo is designed for self-exploration, reflection,
                  education, and informational purposes.
                </p>
                <p>
                  InnerGeo does not provide medical, psychiatric,
                  psychological, therapeutic, diagnostic, legal, financial, or
                  other regulated professional advice.
                </p>
                <p>
                  Results should not be used as a substitute for professional
                  evaluation or as the sole basis for important health,
                  employment, education, financial, or life decisions.
                </p>
              </>
            ),
          },
          {
            title: "4. Personality and career assessments",
            content: (
              <p>
                Personality and career-interest results describe patterns
                derived from the answers submitted to the relevant assessment.
                They do not guarantee personality traits, professional
                suitability, employment outcomes, academic success, or future
                performance.
              </p>
            ),
          },
          {
            title: "5. Zodiac experiences",
            content: (
              <p>
                Zodiac, astrology, and chart-related content is provided as a
                symbolic self-reflection and entertainment experience. It
                should not be interpreted as scientific, medical, financial,
                legal, or professional prediction.
              </p>
            ),
          },
          {
            title: "6. Anonymous use and accounts",
            content: (
              <>
                <p>
                  Eligible InnerGeo assessments may be started without an
                  account. Certain features, including saved results or future
                  paid services, may require an account or verified email
                  address.
                </p>
                <p>
                  Users are responsible for maintaining the security of their
                  account credentials and for activity performed through their
                  account.
                </p>
              </>
            ),
          },
          {
            title: "7. Accuracy of information",
            content: (
              <p>
                Where a feature depends on information supplied by you,
                including assessment responses or birth details, the quality
                and relevance of the resulting output may depend on the
                accuracy and completeness of that information.
              </p>
            ),
          },
          {
            title: "8. Paid digital services",
            content: (
              <>
                <p>
                  InnerGeo may offer paid digital reports, enhanced
                  interpretations, subscriptions, or other digital services.
                  Prices and the scope of a purchase will be displayed before
                  payment.
                </p>
                <p>
                  Payments may be processed by authorized third-party payment
                  providers and may also be subject to their applicable terms.
                </p>
              </>
            ),
          },
          {
            title: "9. Refunds",
            content: (
              <p>
                Refund eligibility for paid services is governed by the
                InnerGeo Refund Policy and applicable consumer law.
              </p>
            ),
          },
          {
            title: "10. Acceptable use",
            content: (
              <p>
                You may not misuse InnerGeo, interfere with its operation,
                attempt unauthorized access, circumvent security or payment
                controls, use automated systems to abuse the service, or use
                InnerGeo in violation of applicable law or the rights of
                others.
              </p>
            ),
          },
          {
            title: "11. Intellectual property",
            content: (
              <p>
                InnerGeo software, design, branding, assessment structures,
                report formats, original written content, graphics, and other
                protected materials remain the property of their respective
                rights holders.
              </p>
            ),
          },
          {
            title: "12. Service availability",
            content: (
              <p>
                We work to maintain reliable access but cannot guarantee that
                InnerGeo will always operate without interruption, delay,
                maintenance, technical failure, or third-party disruption.
              </p>
            ),
          },
          {
            title: "13. Changes to the service",
            content: (
              <p>
                InnerGeo may improve, modify, add, or discontinue features as
                the platform develops.
              </p>
            ),
          },
          {
            title: "14. Limitation and responsibility",
            content: (
              <p>
                To the extent permitted by applicable law, InnerGeo is not
                responsible for losses or outcomes arising from unreasonable
                reliance on assessment results, symbolic interpretations, or
                other informational content provided through the platform.
              </p>
            ),
          },
          {
            title: "15. Contact",
            content: (
              <p>
                Questions concerning these Terms can be submitted through the
                InnerGeo Contact page.
              </p>
            ),
          },
        ],
        zh: [
          {
            title: "1. 关于 InnerGeo",
            content: (
              <p>
                InnerGeo 提供数字化自我探索体验，包括人格测评、职业兴趣测评、
                星座及星盘相关体验、生成式报告和相关反思工具。
              </p>
            ),
          },
          {
            title: "2. 接受本条款",
            content: (
              <p>
                访问或使用 InnerGeo 即表示您同意本服务条款以及适用的相关政策。
                如果您不同意相关条款，请停止使用本服务。
              </p>
            ),
          },
          {
            title: "3. 自我探索，而非诊断",
            content: (
              <>
                <p>
                  InnerGeo 旨在用于自我探索、个人反思、教育及信息参考。
                </p>
                <p>
                  InnerGeo 不提供医疗、精神科、心理治疗、心理诊断、法律、金融
                  或其他受监管的专业意见。
                </p>
                <p>
                  测评结果不应替代专业评估，也不应作为健康、就业、教育、财务
                  或其他重大人生决策的唯一依据。
                </p>
              </>
            ),
          },
          {
            title: "4. 人格与职业兴趣测评",
            content: (
              <p>
                人格和职业兴趣结果根据用户提交的测评回答分析相关模式，并不保证
                特定人格特征、职业适配性、就业结果、学业成功或未来表现。
              </p>
            ),
          },
          {
            title: "5. 星座体验",
            content: (
              <p>
                星座、占星和星盘相关内容作为象征性自我反思及娱乐体验提供，不应被
                解释为科学、医学、金融、法律或其他专业预测。
              </p>
            ),
          },
          {
            title: "6. 匿名使用与账户",
            content: (
              <>
                <p>
                  符合条件的 InnerGeo 测评无需账户即可开始。部分功能，例如长期保存
                  结果或未来的部分付费服务，可能要求创建账户或验证邮箱。
                </p>
                <p>
                  用户有责任保护自己的账户凭据，并对通过其账户进行的活动承担相应责任。
                </p>
              </>
            ),
          },
          {
            title: "7. 用户提供信息的准确性",
            content: (
              <p>
                当某项功能依赖用户提供的信息时，例如测评回答、出生日期、出生时间
                或出生地点，输出结果的质量和相关性可能受到这些信息准确性与完整性的影响。
              </p>
            ),
          },
          {
            title: "8. 付费数字服务",
            content: (
              <>
                <p>
                  InnerGeo 未来可能提供付费数字报告、增强解读、订阅或其他数字服务。
                  价格及购买内容将在付款前向用户展示。
                </p>
                <p>
                  支付可能由获得授权的第三方支付服务商处理，并同时受到相关支付服务商
                  适用条款的约束。
                </p>
              </>
            ),
          },
          {
            title: "9. 退款",
            content: (
              <p>
                付费服务的退款资格按照 InnerGeo 退款政策及适用消费者法律执行。
              </p>
            ),
          },
          {
            title: "10. 合理使用",
            content: (
              <p>
                用户不得滥用 InnerGeo、干扰平台运行、尝试未经授权的访问、绕过安全
                或支付机制，或以违反适用法律及他人权利的方式使用 InnerGeo。
              </p>
            ),
          },
          {
            title: "11. 知识产权",
            content: (
              <p>
                InnerGeo 的软件、设计、品牌、测评结构、报告格式、原创文字、图形
                及其他受保护内容的相关权利归其合法权利人所有。
              </p>
            ),
          },
          {
            title: "12. 服务可用性",
            content: (
              <p>
                我们将努力保持服务稳定，但无法保证 InnerGeo 永远不会出现中断、延迟、
                维护、技术故障或第三方服务中断。
              </p>
            ),
          },
          {
            title: "13. 服务变化",
            content: (
              <p>
                随着平台发展，InnerGeo 可能改进、调整、新增或停止部分功能。
              </p>
            ),
          },
          {
            title: "14. 责任边界",
            content: (
              <p>
                在适用法律允许的范围内，对于因不合理依赖测评结果、象征性解读
                或平台提供的其他信息内容而产生的损失或结果，InnerGeo 不承担相应责任。
              </p>
            ),
          },
          {
            title: "15. 联系我们",
            content: (
              <p>
                如对本服务条款存在疑问，可以通过 InnerGeo Contact 页面联系我们。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
