"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/components/account";
import { useLocale } from "@/components/locale";
import { Button, ButtonLink } from "@/components/ui";

export interface ReportIdentityGateProps {
  children: ReactNode;
  returnTo: string;
}

export function ReportIdentityGate({
  children,
  returnTo,
}: ReportIdentityGateProps) {
  const { locale } = useLocale();
  const { status, user, error, refreshUser } = useAuth();

  const isChinese = locale === "zh";

  if (status === "loading") {
    return (
      <GatePage
        eyebrow={isChinese ? "完整报告" : "Full report"}
        title={isChinese ? "正在确认账户状态…" : "Confirming your account…"}
        message={
          isChinese
            ? "正在检查你的登录与邮箱验证状态。"
            : "We are checking your sign-in and email verification status."
        }
      />
    );
  }

  if (error) {
    return (
      <GatePage
        eyebrow={isChinese ? "账户服务" : "Account service"}
        title={
          isChinese
            ? "暂时无法确认账户状态"
            : "We could not confirm your account"
        }
        message={
          isChinese
            ? "请重新加载账户状态后再打开完整报告。"
            : "Refresh your account status before opening the full report."
        }
        actions={
          <Button
            type="button"
            onClick={() => {
              void refreshUser();
            }}
          >
            {isChinese ? "重新加载" : "Try again"}
          </Button>
        }
      />
    );
  }

  if (status === "unauthenticated" || !user) {
    const loginHref = `/account/login?next=${encodeURIComponent(returnTo)}`;
    const registerHref = `/account/register?next=${encodeURIComponent(
      returnTo,
    )}`;

    return (
      <GatePage
        eyebrow={isChinese ? "完整报告" : "Full report"}
        title={
          isChinese ? "登录后查看完整报告" : "Sign in to view the full report"
        }
        message={
          isChinese
            ? "免费结果仍可直接查看。完整分析、打印和保存 PDF 需要匿名邮箱账户。"
            : "Your free result remains available. A private email account is required for the full analysis, printing, and PDF saving."
        }
        actions={
          <>
            <ButtonLink href={loginHref}>
              {isChinese ? "登录" : "Sign in"}
            </ButtonLink>

            <ButtonLink href={registerHref} variant="secondary">
              {isChinese ? "注册匿名账户" : "Create account"}
            </ButtonLink>
          </>
        }
      />
    );
  }

  if (!user.emailVerified) {
    const verifyHref = `/account/verify-email?next=${encodeURIComponent(
      returnTo,
    )}`;

    return (
      <GatePage
        eyebrow={isChinese ? "邮箱验证" : "Email verification"}
        title={
          isChinese ? "验证邮箱后查看完整报告" : "Verify your email to continue"
        }
        message={
          isChinese
            ? "你的测试结果可以保留在匿名账户中，但完整报告、打印与 PDF 功能需要先完成邮箱验证。"
            : "Your assessment can remain in your anonymous account, but the full report, printing, and PDF features require email verification."
        }
        actions={
          <>
            <ButtonLink href={verifyHref}>
              {isChinese ? "验证邮箱" : "Verify email"}
            </ButtonLink>

            <ButtonLink href="/account" variant="secondary">
              {isChinese ? "返回账户" : "Back to account"}
            </ButtonLink>
          </>
        }
      />
    );
  }

  return children;
}

function GatePage({
  eyebrow,
  title,
  message,
  actions,
}: {
  eyebrow: string;
  title: string;
  message: string;
  actions?: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--color-background)] px-6 py-20 text-[var(--color-text)]">
      <section className="mx-auto max-w-3xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-8 shadow-sm md:p-12">
        <p className="ig-label text-[var(--color-accent)]">{eyebrow}</p>

        <h1 className="ig-heading-1 mt-4">{title}</h1>

        <p className="ig-body ig-reading-width mt-5 text-[var(--color-text-secondary)]">
          {message}
        </p>

        {actions ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div>
        ) : null}
      </section>
    </main>
  );
}
