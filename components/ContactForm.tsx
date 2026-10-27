"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { profile } from "@/data/cv";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeaeovo";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-surface-2/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:bg-surface focus:outline-none focus:ring-4 focus:ring-accent/15";
  const labelClass = "mb-1.5 block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className={labelClass}>
          Subject
        </label>
        <input
          id="subject"
          name="_subject"
          type="text"
          placeholder="What's this about?"
          className={fieldClass}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What would you like to say?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-gradient-brand flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send size={16} />
              Send message
            </>
          )}
        </button>
      </div>

      {status === "success" && (
        <p className="mt-3 text-sm font-medium text-green-600 dark:text-green-400">
          Message sent — thanks for reaching out.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm font-medium text-red-500">
          Something went wrong. Try emailing me directly instead.
        </p>
      )}
      {status === "idle" && (
        <p className="mt-3 text-xs text-muted">
          Sends directly to {profile.email} — no email app required.
        </p>
      )}
    </form>
  );
}
