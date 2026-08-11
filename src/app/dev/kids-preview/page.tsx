import { notFound } from "next/navigation";

import { KidsPreview } from "@/components/kids/kids-preview";

export const dynamic = "force-dynamic";

export default function KidsPreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <KidsPreview />;
}
