"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { profile } from "@/content/profile";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

type Status = "idle" | "sending" | "sent" | "error";

const budgets = ["Under £2k", "£2k — £5k", "£5k — £15k", "£15k+", "Not sure yet"];

const fieldClass =
  "w-full border border-rule bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors duration-300 placeholder:text-ink-muted focus:border-ink";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  const configured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current || !configured) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(SERVICE_ID!, TEMPLATE_ID!, formRef.current, {
        publicKey: PUBLIC_KEY!,
      });
      setStatus("sent");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="border border-rule p-8" role="status">
        <h2 className="font-display text-display-s">Thanks — that came through.</h2>
        <p className="mt-3 text-sm text-ink-soft">
          I read everything myself and usually reply within a day or two.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-6 font-mono text-xs text-ink-muted"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label mb-2 block">
            Your name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label htmlFor="email" className="label mb-2 block">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="company" className="label mb-2 block">
          Company <span className="normal-case tracking-normal opacity-60">(optional)</span>
        </label>
        <input id="company" name="company" type="text" autoComplete="organization" className={fieldClass} />
      </div>

      <fieldset>
        <legend className="label mb-3">Rough budget</legend>
        <div className="flex flex-wrap gap-2">
          {budgets.map((budget) => (
            <label
              key={budget}
              className="cursor-pointer border border-rule px-3 py-2 font-mono text-xs text-ink-soft transition-colors duration-300 hover:border-ink-muted has-[:checked]:border-accent has-[:checked]:text-accent"
            >
              <input type="radio" name="budget" value={budget} className="sr-only" />
              {budget}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="label mb-2 block">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={`${fieldClass} resize-y`}
          placeholder="What it is, who it's for, and where you've got to so far."
        />
      </div>

      {configured ? (
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-ink px-6 py-3.5 text-sm text-bg transition-opacity duration-300 hover:opacity-85 disabled:opacity-50 sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
      ) : (
        /* No keys configured — say so plainly rather than shipping a button
           that silently does nothing. */
        <p className="border border-rule px-4 py-3 text-sm text-ink-soft">
          The form isn&apos;t connected yet. Email me directly at{" "}
          <a href={`mailto:${profile.email}`} className="link-underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      {status === "error" ? (
        <p role="alert" className="text-sm text-accent">
          That didn&apos;t send. Try again, or email me directly at {profile.email}.
        </p>
      ) : null}
    </form>
  );
}
