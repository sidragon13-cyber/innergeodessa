import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";
import { PaddleCheckoutButton } from "@/components/payment/paddle-checkout-button";

export const metadata: Metadata = {
  title: "Pricing | InnerGeo",
  description:
    "Explore InnerGeo free assessments and upcoming premium digital reports.",
};

export default function PricingPage() {
  return (
    <LegalPage
      eyebrow={{
        en: "Simple & Transparent",
        zh: "简单透明",
      }}
      title={{
        en: "Pricing",
        zh: "价格与服务",
      }}
      intro={{
        en: "InnerGeo currently offers core self-discovery assessments with free access. Premium reports and additional paid services will be introduced with clear pricing before purchase.",
        zh: "InnerGeo 当前提供核心自我探索测评的免费访问。高级报告及其他付费服务将在正式推出前明确展示价格和购买内容。",
      }}
      sections={{
        en: [
          {
            title: "Free access",
            content: (
              <>
                <p>
                  Users can explore eligible personality, career-interest, and
                  zodiac self-discovery experiences without purchasing a paid
                  report.
                </p>
                <p>
                  Eligible assessments may also be started anonymously without
                  creating an account.
                </p>
              </>
            ),
          },
          {
            title: "Premium reports",
            content: (
              <>
                <p>
                  Premium reports provide extended interpretation, deeper
                  personal insight, additional guidance, and enhanced
                  saved-report features.
                </p>
                <p>
                  Sandbox test price: USD $6.99 as a one-time purchase.
                </p>
                <PaddleCheckoutButton />
              </>
            ),
          },
          {
            title: "Subscriptions",
            content: (
              <p>
                InnerGeo may introduce optional subscription services in the
                future. Subscription pricing, billing intervals, renewal terms,
                cancellation options, and included features will be shown
                before purchase.
              </p>
            ),
          },
          {
            title: "No hidden charges",
            content: (
              <p>
                InnerGeo intends to present the applicable price and the scope
                of each paid product before checkout. Users will not be charged
                for a paid service without an explicit purchase action.
              </p>
            ),
          },
          {
            title: "Payments",
            content: (
              <p>
                Payments may be processed by authorized third-party payment
                providers. Available payment methods, currencies, and taxes may
                vary depending on location and payment provider.
              </p>
            ),
          },
        ],
        zh: [
          {
            title: "免费访问",
            content: (
              <>
                <p>
                  用户可以免费体验符合条件的人格、职业兴趣和星座自我探索功能，
                  无需购买付费报告。
                </p>
                <p>
                  符合条件的测评也可以匿名开始，无需先创建账户。
                </p>
              </>
            ),
          },
          {
            title: "高级报告",
            content: (
              <>
                <p>
                  高级报告提供更深入的解读、更多个人洞察、扩展指导以及
                  更完整的报告保存功能。
                </p>
                <p>
                  Sandbox 测试价格：USD $6.99，一次性购买。
                </p>
                <PaddleCheckoutButton />
              </>
            ),
          },
          {
            title: "未来订阅服务",
            content: (
              <p>
                InnerGeo 未来可能推出可选订阅服务。订阅价格、计费周期、续费条件、
                取消方式及包含功能将在购买前清楚展示。
              </p>
            ),
          },
          {
            title: "无隐藏收费",
            content: (
              <p>
                InnerGeo 将在结账前明确展示适用价格及所购买服务的具体内容。
                未经用户明确购买操作，不会收取付费服务费用。
              </p>
            ),
          },
          {
            title: "支付方式",
            content: (
              <p>
                支付可能由获得授权的第三方支付服务商处理。可用支付方式、币种及税费
                可能因用户所在地和支付服务商而有所不同。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
