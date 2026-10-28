import type { Metadata } from "next";
import ModernDesignSystem from "@/design-system/page";

export const metadata: Metadata = {
  title: "Modern — Design System",
  description:
    "Modern is a bold design system: warm paper, uppercase type, colour blocks, 2px ink rules and soft-cornered icons. Live specification with icons, motion, illustration, transitions and case-study components."
};

export default function Page() {
  return <ModernDesignSystem />;
}
