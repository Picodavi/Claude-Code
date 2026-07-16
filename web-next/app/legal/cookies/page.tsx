import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies · Picodavi",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPage docKey="cookies" />;
}
