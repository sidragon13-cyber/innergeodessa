import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Refund Policy | InnerGeo",
  description:
    "InnerGeo refund policy for digital reports and other paid digital self-discovery services.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow={{
        en: "Purchases & Refunds",
        zh: "购买与退款",
      }}
      title={{
        en: "Refund Policy",
        zh: "退款政策",
      }}
      intro={{
        en: "This policy explains how refund requests are handled for InnerGeo digital reports and other paid digital services.",
        zh: "本政策说明 InnerGeo 数字报告及其他付费数字服务的退款申请和处理原则。",
      }}
      sections={{
        en: [
          {
            title: "1. Digital products",
            content: (
              <p>
                InnerGeo primarily provides digital services and digital
                content. Depending on the product, purchased content may be
                generated or made available shortly after successful payment.
              </p>
            ),
          },
          {
            title: "2. Before delivery",
            content: (
              <p>
                If payment is successfully completed but the purchased digital
                service has not been generated, delivered, or made accessible,
                you may contact InnerGeo to request investigation and, where
                appropriate, a refund.
              </p>
            ),
          },
          {
            title: "3. Technical failure",
            content: (
              <p>
                If a technical problem prevents delivery or reasonable access
                to a paid product, we may first attempt to restore access,
                regenerate the content, or otherwise correct the problem. If we
                cannot reasonably deliver the purchased service, a refund may
                be provided.
              </p>
            ),
          },
          {
            title: "4. Duplicate charges",
            content: (
              <p>
                Confirmed duplicate charges for the same intended transaction
                will be investigated and, where verified, the duplicate amount
                will normally be refunded.
              </p>
            ),
          },
          {
            title: "5. Delivered digital reports",
            content: (
              <p>
                Because personalized digital reports may be generated and
                delivered immediately, refunds are not normally available
                solely because a user disagrees with, dislikes, or does not
                identify with an assessment interpretation after the purchased
                content has been successfully generated and delivered, except
                where applicable law requires otherwise.
              </p>
            ),
          },
          {
            title: "6. Assessment expectations",
            content: (
              <p>
                A difference between a user&apos;s expectations and an
                assessment result does not by itself establish that the
                purchased digital service was defective.
              </p>
            ),
          },
          {
            title: "7. Future subscriptions",
            content: (
              <p>
                If InnerGeo introduces subscription services, the applicable
                price, billing interval, renewal conditions, cancellation
                method, and any subscription-specific refund terms will be
                presented before purchase.
              </p>
            ),
          },
          {
            title: "8. Payment-provider procedures",
            content: (
              <p>
                Payments and refunds may be processed through authorized
                payment providers. Processing times may depend on the relevant
                payment provider and financial institution.
              </p>
            ),
          },
          {
            title: "9. Consumer rights",
            content: (
              <p>
                Nothing in this Refund Policy is intended to exclude or limit
                consumer rights that cannot lawfully be excluded under
                applicable law.
              </p>
            ),
          },
          {
            title: "10. Requesting support",
            content: (
              <p>
                To request assistance with a purchase, use the InnerGeo Contact
                page and provide sufficient purchase information for us to
                locate the transaction. Do not send full card numbers or card
                security codes.
              </p>
            ),
          },
        ],
        zh: [
          {
            title: "1. 数字产品",
            content: (
              <p>
                InnerGeo 主要提供数字服务和数字内容。根据具体产品类型，购买内容
                可能在支付成功后较短时间内生成或开放访问。
              </p>
            ),
          },
          {
            title: "2. 尚未交付的服务",
            content: (
              <p>
                如果付款已经成功，但所购买的数字服务尚未生成、交付或开放访问，
                您可以联系 InnerGeo 要求核查，并在符合条件的情况下申请退款。
              </p>
            ),
          },
          {
            title: "3. 技术故障",
            content: (
              <p>
                如果由于技术问题导致用户无法获得或合理访问已经购买的产品，我们可能
                首先尝试恢复访问、重新生成相关内容或修复问题。如果无法合理完成所购买
                服务的交付，可以进行退款处理。
              </p>
            ),
          },
          {
            title: "4. 重复扣款",
            content: (
              <p>
                对于同一笔预期交易发生并经确认的重复扣款，我们将进行核查；确认后通常
                会退还重复收取的金额。
              </p>
            ),
          },
          {
            title: "5. 已交付的数字报告",
            content: (
              <p>
                由于个性化数字报告可能在购买后立即生成并交付，因此在内容已经成功生成
                和交付后，仅因用户不同意、不喜欢或认为自己与测评解读不一致，通常不构成
                退款理由；适用法律另有强制要求的除外。
              </p>
            ),
          },
          {
            title: "6. 对测评结果的合理预期",
            content: (
              <p>
                用户原有预期与测评结果之间存在差异，本身并不意味着所购买的数字服务存在缺陷。
              </p>
            ),
          },
          {
            title: "7. 未来订阅服务",
            content: (
              <p>
                如果 InnerGeo 未来推出订阅服务，相应的价格、计费周期、续费条件、
                取消方式以及订阅相关退款条款将在购买前明确展示。
              </p>
            ),
          },
          {
            title: "8. 支付服务商处理",
            content: (
              <p>
                付款和退款可能通过获得授权的支付服务商处理。退款到账时间可能取决于
                相关支付服务商和金融机构。
              </p>
            ),
          },
          {
            title: "9. 消费者权利",
            content: (
              <p>
                本退款政策无意排除或限制适用法律规定不得被合法排除的消费者权利。
              </p>
            ),
          },
          {
            title: "10. 申请购买支持",
            content: (
              <p>
                如需处理购买或退款问题，请通过 InnerGeo Contact 页面联系我们，并提供
                足以定位付款的购买信息。请勿发送完整银行卡号或银行卡安全码。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
