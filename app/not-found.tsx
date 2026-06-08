import type { Metadata } from "next";
import { NotFoundView } from "@/components/views";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return <NotFoundView lang="en" />;
}
