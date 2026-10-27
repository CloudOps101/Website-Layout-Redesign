"use client";

import { useId, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";

import { org } from "@/content/site";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const topics = ["Finding a program", "Partnership", "Donation or sponsorship", "Media or radio", "Something else"];

// Web3Forms access key (public by design: it can only deliver to the inbox it was created for).
// Without it, the form falls back to opening the visitor's email app.
const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

/**
 * Accessible contact form. Messages are delivered to PGCCDC's inbox through
 * Web3Forms; until a key is configured it opens the visitor's email app instead.
 */
export function ContactForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const topic = String(data.get("topic") || "");
    const message = String(data.get("message") || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address, like name@example.com.";
    if (message.length < 10) next.message = "Please tell us a little more (at least 10 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }

    // Spam bots fill in the hidden field; quietly pretend it worked
    if (data.get("botcheck")) {
      setSentTo(email);
      setStatus("sent");
      return;
    }

    if (!FORM_KEY) {
      const body = `${message}\n\n${name}\n${email}${phone ? `\n${phone}` : ""}`;
      window.location.href = `mailto:${org.email}?subject=${encodeURIComponent(`Website: ${topic}`)}&body=${encodeURIComponent(body)}`;
      setSentTo("");
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `New website message: ${topic}`,
          from_name: "PGCCDC website",
          name,
          email,
          phone: phone || "Not provided",
          topic,
          message,
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || !result.success) throw new Error(result.message || res.statusText);
      form.reset();
      setSentTo(email);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] bg-leaf-100 p-8">
        <CheckCircle2 aria-hidden className="size-10 text-leaf-700" />
        <h3 className="font-display text-2xl font-medium text-navy-900">Thank you for reaching out!</h3>
        {sentTo ? (
          <p className="text-ink-soft">
            Your message has been sent. We&apos;ll reply to <strong className="text-navy-900">{sentTo}</strong> as soon
            as we can.
          </p>
        ) : (
          <p className="text-ink-soft">
            Your email app should open with your message ready to send. If it didn&apos;t, email us directly at{" "}
            <a className="font-semibold text-blue-700 underline" href={`mailto:${org.email}`}>
              {org.email}
            </a>
            .
          </p>
        )}
        <button type="button" onClick={() => setStatus("idle")} className="min-h-11 font-bold text-blue-700 underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  const field =
    "mt-2 block w-full rounded-xl border-2 border-line bg-white px-4 py-3 text-base text-ink transition placeholder:text-ink-soft/70 focus:border-blue-600 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-blue-100 aria-[invalid=true]:border-red-600";
  const sending = status === "sending";

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6" aria-describedby={`${id}-req`} aria-busy={sending}>
      <p id={`${id}-req`} className="text-sm text-ink-soft">
        Fields marked <span aria-hidden className="font-bold text-red-700">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Full name" required error={errors.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${id}-name-err` : undefined} />
        </Field>
        <Field id={`${id}-email`} label="Email" required error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id}-email-err` : undefined} />
        </Field>
        <Field id={`${id}-phone`} label="Phone (optional)">
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={field} />
        </Field>
        <Field id={`${id}-topic`} label="How can we help?">
          <select id={`${id}-topic`} name="topic" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23002552%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-12`}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id={`${id}-message`} label="Message" required error={errors.message}>
        <textarea id={`${id}-message`} name="message" rows={6} className={field} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${id}-message-err` : undefined} />
      </Field>

      {/* Honeypot: hidden from people, irresistible to spam bots */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>
            Sorry, your message couldn&apos;t be sent. Please try again, or email us directly at{" "}
            <a className="font-semibold underline" href={`mailto:${org.email}`}>
              {org.email}
            </a>
            .
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-navy-900 px-7 font-bold text-white shadow-[0_10px_24px_-12px_rgb(0_37_82/0.8)] transition hover:-translate-y-0.5 hover:bg-blue-600 disabled:translate-y-0 disabled:cursor-wait disabled:opacity-75"
      >
        {sending ? (
          <>
            Sending… <Loader2 aria-hidden className="size-4 animate-spin" />
          </>
        ) : (
          <>
            Send message <Send aria-hidden className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-navy-900">
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-red-700">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-2 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
