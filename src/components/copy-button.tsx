"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 2200);
        } catch {
          /* clipboard unavailable: the text stays visible to copy manually */
        }
      }}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-navy-900 px-5 text-sm font-bold text-navy-900 transition hover:bg-navy-900 hover:text-white"
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />}
      {copied ? "Copied" : label}
      <span className="sr-only" aria-live="polite">
        {copied ? "Mailing address copied to clipboard" : ""}
      </span>
    </button>
  );
}
