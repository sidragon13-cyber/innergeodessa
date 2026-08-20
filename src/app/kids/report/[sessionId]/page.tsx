"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "next/navigation";

import {
  useLocale,
} from "@/components/locale";

import {
  fetchKidsResult,
} from "@/data/kids/result";

import {
  buildK68ReportFacts,
} from "@/data/kids/report/facts";

import {
  generateK68ProfessionalReport,
  type GeneratedK68ProfessionalReport,
} from "@/data/kids/report/generator";

import {
  K68ProfessionalReportDocument,
} from "./professional-report-document";
import { buildK912ReportFacts } from "@/data/kids/report/k912/facts";
import { generateK912ProfessionalReport, type GeneratedK912ProfessionalReport } from "@/data/kids/report/k912/generator";
import { K912ProfessionalReportDocument } from "./k912-professional-report-document";

type KidsProfessionalReport = GeneratedK68ProfessionalReport | GeneratedK912ProfessionalReport;

type AccessState =
  | "loading"
  | "unlocked"
  | "locked"
  | "unauthenticated"
  | "error";

export default function KidsProfessionalReportPage() {
  const params =
    useParams<{
      sessionId: string;
    }>();

  const sessionId =
    typeof params.sessionId === "string"
      ? params.sessionId
      : "";

  const { locale } = useLocale();
  const isZh = locale === "zh";

  const [
    accessState,
    setAccessState,
  ] =
    useState<AccessState>(
      "loading",
    );

  const [
    report,
    setReport,
  ] =
    useState<
      KidsProfessionalReport | null
    >(null);

  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );

  const [
    loading,
    setLoading,
  ] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadReportAccess() {
      if (!sessionId) {
        if (!cancelled) {
          setAccessState("error");
        }
        return;
      }

      setAccessState("loading");

      try {
        const response = await fetch(
          `/api/account/report-access/kids/${encodeURIComponent(
            sessionId,
          )}`,
          {
            method: "GET",
            cache: "no-store",
          },
        );

        if (cancelled) {
          return;
        }

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          setAccessState("unauthenticated");
          return;
        }

        if (!response.ok) {
          setAccessState("error");
          return;
        }

        const access = (await response.json()) as {
          canViewFullReport?: boolean;
        };

        setAccessState(
          access.canViewFullReport
            ? "unlocked"
            : "locked",
        );
      } catch {
        if (!cancelled) {
          setAccessState("error");
        }
      }
    }

    void loadReportAccess();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  useEffect(() => {
    if (accessState !== "unlocked") {
      return;
    }

    let cancelled = false;

    setReport(null);
    setError(null);
    setLoading(true);

    async function loadReport() {
      if (!sessionId) {
        if (!cancelled) {
          setError(
            "Missing Kids assessment session.",
          );
          setLoading(false);
        }

        return;
      }

      try {
        const result =
          await fetchKidsResult(
            sessionId,
          );

        const generated = result.ageForm === "K912"
          ? generateK912ProfessionalReport(buildK912ReportFacts(result))
          : generateK68ProfessionalReport(buildK68ReportFacts(result));

        if (!cancelled) {
          setReport(
            generated,
          );
          setError(null);
        }
      } catch (cause) {
        if (!cancelled) {
          setError(
            cause instanceof Error
              ? cause.message
              : "Unable to generate the Kids Professional Report.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadReport();

    return () => {
      cancelled = true;
    };
  }, [accessState, sessionId]);

  if (accessState === "loading") {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ded8cd] bg-white p-8">
          <h1 className="font-serif text-3xl text-[#453c48]">
            {isZh
              ? "正在验证报告权限"
              : "Checking Report Access"}
          </h1>
          <p className="mt-5 leading-7 text-[#756d72]">
            {isZh
              ? "请稍候，我们正在确认这份儿童完整专业报告是否已经解锁。"
              : "Please wait while we confirm whether this Kids Professional Report is unlocked."}
          </p>
        </div>
      </main>
    );
  }

  if (accessState === "unauthenticated") {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ded8cd] bg-white p-8">
          <h1 className="font-serif text-3xl text-[#453c48]">
            {isZh
              ? "需要账户验证"
              : "Account Required"}
          </h1>
          <p className="mt-5 leading-7 text-[#756d72]">
            {isZh
              ? "完整专业报告仅向已登录、完成邮箱验证并拥有该测试结果的用户开放。"
              : "The full Professional Report is available only to signed-in, email-verified users who own this assessment result."}
          </p>
        </div>
      </main>
    );
  }

  if (accessState === "locked") {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ded8cd] bg-white p-8">
          <h1 className="font-serif text-3xl text-[#453c48]">
            {isZh
              ? "完整专业报告尚未解锁"
              : "Professional Report Locked"}
          </h1>
          <p className="mt-5 leading-7 text-[#756d72]">
            {isZh
              ? "你仍然可以查看基础测试结果。购买并解锁这份报告后，完整内容才会在这里开放。"
              : "You can still view the Basic Result. The complete report will become available here after this report is purchased and unlocked."}
          </p>
        </div>
      </main>
    );
  }

  if (accessState === "error") {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ded8cd] bg-white p-8">
          <h1 className="font-serif text-3xl text-[#453c48]">
            {isZh
              ? "无法验证报告权限"
              : "Report Access Unavailable"}
          </h1>
          <p className="mt-5 leading-7 text-[#756d72]">
            {isZh
              ? "暂时无法确认这份报告的访问权限，请稍后重新尝试。"
              : "We could not verify access to this report. Please try again shortly."}
          </p>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm text-[#756d72]">
            Generating your InnerGeo Kids Professional Report…
          </p>
        </div>
      </main>
    );
  }

  if (
    error ||
    !report
  ) {
    return (
      <main className="min-h-screen bg-[#f7f4ef] px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-[28px] border border-[#ded8cd] bg-white p-8">
          <h1 className="font-serif text-3xl text-[#453c48]">
            Kids Professional Report
          </h1>

          <p className="mt-5 leading-7 text-[#756d72]">
            {error ??
              "The report could not be generated."}
          </p>
        </div>
      </main>
    );
  }

  return report.reportVersion === "K912-PROFESSIONAL-REPORT-V1"
    ? <K912ProfessionalReportDocument report={report} />
    : <K68ProfessionalReportDocument report={report} />;
}
