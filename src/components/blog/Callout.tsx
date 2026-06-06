// Pull-out callout box. Used inside articles for referrals, warnings,
// not-a-diagnosis disclaimers. Variant determines the accent color.
import type { ReactNode } from "react";

type CalloutType = "info" | "referral" | "warning" | "not-a-diagnosis";

interface CalloutProps {
  type?: CalloutType;
  children: ReactNode;
}

const VARIANTS: Record<CalloutType, { borderClass: string; label: string }> = {
  info: { borderClass: "border-rule", label: "Note" },
  referral: { borderClass: "border-terra", label: "Behaviorist referral" },
  warning: { borderClass: "border-terra", label: "Heads up" },
  "not-a-diagnosis": {
    borderClass: "border-rule",
    label: "Not a diagnosis",
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const variant = VARIANTS[type] ?? VARIANTS.info;
  return (
    <aside
      className={`not-prose my-8 border rounded-2xl p-5 bg-paper-light ${variant.borderClass}`}
    >
      <p
        className="label mb-2"
        style={{ color: type === "referral" || type === "warning" ? "var(--terra)" : "var(--slate)" }}
      >
        {variant.label}
      </p>
      <div className="text-sm text-ink leading-relaxed">{children}</div>
    </aside>
  );
}
