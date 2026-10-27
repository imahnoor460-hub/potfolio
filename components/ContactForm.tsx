"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xoeaeovo";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

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
    "w-full border-0 border-b-[1.5px] border-foreground/25 bg-transparent px-0 py-2 text-base text-foreground placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus:ring-0";
  const labelClass = "block font-mono text-[10px] uppercase tracking-[0.2em] text-muted";

  return (
    <form onSubmit={handleSubmit} className="text-left">
      <div className="grid gap-6 md:grid-cols-2">
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

      <div className="mt-6">
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="What would you like to say?"
          className={`${fieldClass} resize-none`}
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="btn-ink disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={15} />
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>
        {status === "success" && (
          <p className="text-sm font-medium text-accent-2">Thanks! Your message has been sent.</p>
        )}
        {status === "error" && (
          <p className="text-sm font-medium text-accent">Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
