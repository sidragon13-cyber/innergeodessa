import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | InnerGeo",
  description:
    "Learn how InnerGeo handles account information, assessment data, zodiac inputs, payments, and anonymous use.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow={{
        en: "Privacy & User Control",
        zh: "隐私与用户控制",
      }}
      title={{
        en: "Privacy Policy",
        zh: "隐私政策",
      }}
      intro={{
        en: "InnerGeo is designed around data minimization, user choice, and responsible self-discovery. This policy explains what information may be processed when you use our assessments, account features, and paid digital services.",
        zh: "InnerGeo 以数据最小化、用户选择权和负责任的自我探索为基本原则。本政策说明您使用测评、账户功能以及付费数字服务时，我们可能处理哪些信息。",
      }}
      sections={{
        en: [
          {
            title: "1. Our approach to privacy",
            content: (
              <>
                <p>
                  InnerGeo aims to collect and process only the information
                  reasonably necessary to provide the services a user chooses
                  to use.
                </p>
                <p>
                  Eligible assessments may be started anonymously without
                  creating an InnerGeo account.
                </p>
              </>
            ),
          },
          {
            title: "2. Information you choose to provide",
            content: (
              <>
                <p>
                  Depending on the features you use, you may provide
                  information including an email address, assessment responses,
                  saved assessment results, and information voluntarily entered
                  for zodiac or chart-related features.
                </p>
                <p>
                  Zodiac features may require information such as date of birth,
                  time of birth, and place of birth when those details are
                  necessary to perform a calculation requested by you.
                </p>
              </>
            ),
          },
          {
            title: "3. Anonymous assessments",
            content: (
              <p>
                An account is not required to begin eligible assessments.
                Anonymous use may provide fewer persistence, recovery, or
                account-based features than registered use.
              </p>
            ),
          },
          {
            title: "4. Accounts and email verification",
            content: (
              <p>
                If you choose to create an account, InnerGeo may process your
                email address and related account information for registration,
                authentication, email verification, account access, security,
                and linking eligible saved results to your account.
              </p>
            ),
          },
          {
            title: "5. Assessment information",
            content: (
              <>
                <p>
                  Assessment responses and generated results are processed to
                  provide the self-discovery experience you request and to
                  support relevant account features where applicable.
                </p>
              </>
            ),
          },
          {
            title: "6. Technical and security information",
            content: (
              <p>
                Our systems may process limited technical information necessary
                to operate and protect the service, such as server logs,
                browser or device information, network information, request
                timestamps, and security-related events.
              </p>
            ),
          },
          {
            title: "7. Payments",
            content: (
              <>
                <p>
                  Paid InnerGeo services may be processed by authorized
                  third-party payment providers. InnerGeo does not intend to
                  directly store full payment-card numbers or card security
                  codes.
                </p>
                <p>
                  We may receive limited transaction information needed to
                  confirm a purchase, provide purchased services, handle
                  support, prevent fraud, or maintain financial records.
                </p>
              </>
            ),
          },
          {
            title: "8. How information is used",
            content: (
              <p>
                Information may be used to deliver assessments and reports,
                operate accounts, save eligible results, provide customer
                support, maintain security, prevent abuse, process purchases,
                comply with legal obligations, and improve the reliability of
                InnerGeo services.
              </p>
            ),
          },
          {
            title: "9. Selling personal information",
            content: (
              <p>
                InnerGeo does not sell users&apos; personal information or
                assessment responses as a commercial data product. We also do
                not intend to sell advertising profiles based on individual
                assessment results.
              </p>
            ),
          },
          {
            title: "10. Service providers",
            content: (
              <p>
                InnerGeo may use carefully selected service providers for
                infrastructure, hosting, security, email delivery, payment
                processing, analytics, or other operational functions. Such
                providers may process information only as necessary to perform
                their services and subject to applicable obligations.
              </p>
            ),
          },
          {
            title: "11. Data retention and user control",
            content: (
              <p>
                Information is retained only for as long as reasonably
                necessary for the purposes described in this policy, including
                account operation, security, legal obligations, dispute
                resolution, and legitimate business records. Available account
                and privacy controls may evolve as InnerGeo develops.
              </p>
            ),
          },
          {
            title: "12. Important assessment boundary",
            content: (
              <p>
                InnerGeo provides personality, career-interest, zodiac, and
                related self-discovery experiences. InnerGeo does not provide
                medical, psychiatric, psychological, diagnostic, therapeutic,
                or other healthcare services. Assessment results should not be
                treated as professional diagnosis or medical advice.
              </p>
            ),
          },
          {
            title: "13. Changes to this policy",
            content: (
              <p>
                We may update this Privacy Policy as InnerGeo develops, legal
                requirements change, or new services are introduced. The
                current version will be published on this page with its latest
                update date.
              </p>
            ),
          },
          {
            title: "14. Contact",
            content: (
              <p>
                Questions about privacy, account information, or data requests
                can be submitted through the InnerGeo Contact page.
              </p>
            ),
          },
        ],

        zh: [
          {
            title: "1. 我们的隐私原则",
            content: (
              <>
                <p>
                  InnerGeo
                  仅在合理必要的范围内收集和处理用户主动选择使用相关服务所需要的信息。
                </p>
                <p>符合条件的测评可以匿名开始，无需创建 InnerGeo 账户。</p>
              </>
            ),
          },
          {
            title: "2. 您主动提供的信息",
            content: (
              <>
                <p>
                  根据您选择使用的功能，您可能会提供邮箱地址、测评回答、保存的测评结果，以及为星座或星盘相关功能主动输入的信息。
                </p>
                <p>
                  当完成您主动请求的星座或星盘计算确有必要时，相关功能可能需要出生日期、出生时间和出生地点等信息。
                </p>
              </>
            ),
          },
          {
            title: "3. 匿名测评",
            content: (
              <p>
                用户无需注册账户即可开始符合条件的测评。与注册用户相比，匿名使用可能无法获得部分结果长期保存、恢复或账户关联功能。
              </p>
            ),
          },
          {
            title: "4. 账户与邮箱验证",
            content: (
              <p>
                如果您选择创建账户，InnerGeo
                可能处理您的邮箱地址及相关账户信息，用于注册、身份验证、邮箱验证、账户访问、安全保护，以及将符合条件的测评结果关联至您的账户。
              </p>
            ),
          },
          {
            title: "5. 测评信息",
            content: (
              <>
                <p>
                  测评回答和生成结果用于提供您主动请求的自我探索体验，并在适用情况下支持账户中的结果保存等功能。
                </p>
              </>
            ),
          },
          {
            title: "6. 技术与安全信息",
            content: (
              <p>
                为正常运行和保护服务，我们的系统可能处理有限的必要技术信息，例如服务器日志、浏览器或设备信息、网络信息、请求时间以及与安全有关的事件。
              </p>
            ),
          },
          {
            title: "7. 支付信息",
            content: (
              <>
                <p>
                  InnerGeo
                  的付费服务可以由获得授权的第三方支付服务商处理。InnerGeo
                  不计划直接保存完整银行卡号或银行卡安全码。
                </p>
                <p>
                  为确认购买、交付已购买服务、提供支持、防止欺诈或维护必要财务记录，我们可能接收有限的交易信息。
                </p>
              </>
            ),
          },
          {
            title: "8. 信息的使用方式",
            content: (
              <p>
                信息可能用于提供测评和报告、运行账户、保存符合条件的结果、客户支持、安全保护、防止滥用、处理购买、履行法律义务以及提高
                InnerGeo 服务的可靠性。
              </p>
            ),
          },
          {
            title: "9. 不出售个人信息",
            content: (
              <p>
                InnerGeo
                不会将用户个人信息或测评回答作为商业数据产品出售，也不计划基于个人测评结果出售广告画像。
              </p>
            ),
          },
          {
            title: "10. 第三方服务商",
            content: (
              <p>
                InnerGeo
                可能使用经过选择的基础设施、托管、安全、邮件发送、支付处理、分析或其他运营服务商。相关服务商仅应在提供相应服务所必要的范围内处理信息，并受适用义务约束。
              </p>
            ),
          },
          {
            title: "11. 数据保留与用户控制",
            content: (
              <p>
                我们仅在本政策所述目的合理需要的期限内保留信息，包括账户运行、安全、法律义务、争议处理及必要商业记录。随着
                InnerGeo
                的发展，我们将继续完善账户和隐私控制功能。
              </p>
            ),
          },
          {
            title: "12. 测评服务的重要边界",
            content: (
              <p>
                InnerGeo
                提供人格、职业兴趣、星座及相关自我探索体验，不提供医疗、精神科、心理诊断、治疗或其他医疗健康服务。任何测评结果均不应被视为专业诊断或医疗建议。
              </p>
            ),
          },
          {
            title: "13. 政策更新",
            content: (
              <p>
                随着 InnerGeo
                的发展、法律要求变化或新服务推出，我们可能更新本隐私政策。当前有效版本及最后更新日期将公布在本页面。
              </p>
            ),
          },
          {
            title: "14. 联系我们",
            content: (
              <p>
                有关隐私、账户信息或数据请求的问题，可以通过 InnerGeo
                的 Contact 页面联系我们。
              </p>
            ),
          },
        ],
      }}
    />
  );
}
