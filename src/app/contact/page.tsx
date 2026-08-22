import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Contact | InnerGeo",
  description:
    "Contact InnerGeo for account, privacy, payment, refund, technical, or general support.",
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow={{
        en: "Support & Enquiries",
        zh: "支持与联系",
      }}
      title={{
        en: "Contact InnerGeo",
        zh: "联系 InnerGeo",
      }}
      intro={{
        en: "Contact us for account support, privacy questions, payment or refund enquiries, technical issues, or general questions about InnerGeo.",
        zh: "如需账户支持、隐私咨询、支付或退款处理、技术支持，或对 InnerGeo 有其他问题，可以通过本页面联系我们。",
      }}
      sections={{
        en: [
          {
            title: "General support",
            content: (
              <p>
                For general questions about InnerGeo, account access, saved
                results, reports, or platform features, contact our support
                team.
              </p>
            ),
          },
          {
            title: "Payment & refund support",
            content: (
              <p>
                For payment or refund enquiries, provide the email address
                associated with the transaction and sufficient purchase details
                to help us locate the payment. Never send full card numbers,
                passwords, or card security codes.
              </p>
            ),
          },
          {
            title: "Privacy requests",
            content: (
              <p>
                Privacy-related questions, account-data requests, or concerns
                about the processing of personal information may be submitted
                through the same support channel.
              </p>
            ),
          },
          {
            title: "Business operator",
            content: (
              <p>
                InnerGeo is operated by Kylin International Trading (Pty) Ltd,
                a company registered in South Africa.
              </p>
            ),
          },
          {
            title: "Support email",
            content: (
              <p>
                Email:{" "}
                <a href="mailto:support@innergeo.app">
                  support@innergeo.app
                </a>
              </p>
            ),
          },
          {
            title: "Phone & WhatsApp",
            content: (
              <p>
                Phone / WhatsApp:{" "}
                <a href="tel:+27740499999">
                  +27 74 049 9999
                </a>
              </p>
            ),
          },
          {
            title: "Response time",
            content: (
              <p>
                We aim to respond to support enquiries within two business
                days. Complex payment, security, or privacy matters may require
                additional time for investigation.
              </p>
            ),
          },
        ],
        zh: [
          {
            title: "一般支持",
            content: (
              <p>
                如对 InnerGeo、账户访问、保存结果、报告或平台功能有一般问题，
                可以联系我们的支持团队。
              </p>
            ),
          },
          {
            title: "支付与退款支持",
            content: (
              <p>
                如需处理支付或退款问题，请提供与交易关联的邮箱地址以及足以帮助我们
                定位付款的购买信息。请勿发送完整银行卡号、密码或银行卡安全码。
              </p>
            ),
          },
          {
            title: "隐私相关请求",
            content: (
              <p>
                如对个人信息处理、账户数据或隐私保护存在疑问，也可以通过同一支持渠道联系我们。
              </p>
            ),
          },
          {
            title: "运营主体",
            content: (
              <p>
                InnerGeo 由在南非注册的 Kylin International Trading (Pty) Ltd
                运营。
              </p>
            ),
          },
          {
            title: "客服邮箱",
            content: (
              <p>
                Email:{" "}
                <a href="mailto:support@innergeo.app">
                  support@innergeo.app
                </a>
              </p>
            ),
          },
          {
            title: "电话与 WhatsApp",
            content: (
              <p>
                Phone / WhatsApp:{" "}
                <a href="tel:+27740499999">
                  +27 74 049 9999
                </a>
              </p>
            ),
          },
          {
            title: "回复时间",
            content: (
              <p>
                我们计划在两个工作日内回复一般支持请求。涉及支付、安全或隐私核查的
                复杂问题可能需要更多处理时间。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
