import { redirect } from "next/navigation";

import { KidsTest } from "@/components/kids/kids-test";
import type { KidsForm } from "@/data/kids";

interface KidsTestPageProps {
  searchParams: Promise<{
    form?: string | string[];
  }>;
}

export default async function KidsTestPage({
  searchParams,
}: KidsTestPageProps) {
  const params = await searchParams;

  const rawForm = Array.isArray(params.form)
    ? params.form[0]
    : params.form;

  if (
    rawForm !== "k68" &&
    rawForm !== "k912"
  ) {
    redirect("/kids");
  }

  const form: KidsForm = rawForm;

  return <KidsTest form={form} />;
}
