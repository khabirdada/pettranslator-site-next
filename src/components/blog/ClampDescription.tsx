"use client";

// 2-line clamp + "see more" toggle for category and tag page intros.
// Critical SEO note: the full text is ALWAYS in the DOM. We only hide it
// visually via CSS line-clamp. Never `display: none` — that risks cloaking.
// Google reads everything; users see 2 lines until they expand.
import { useState } from "react";

interface ClampDescriptionProps {
  children: React.ReactNode;
}

export function ClampDescription({ children }: ClampDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="mb-12">
      <div
        className={`text-slate text-base leading-relaxed max-w-prose ${
          expanded ? "" : "clamp-2"
        }`}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="mt-2 label text-terra hover:underline cursor-pointer"
      >
        {expanded ? "− Show less" : "+ See more"}
      </button>
    </div>
  );
}
