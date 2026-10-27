"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, X } from "lucide-react";

export default function ResumePreview() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          // Plain left-click opens the in-page preview; modified clicks, keyboard
          // users and crawlers still get the real /resume.pdf via the href.
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }
          event.preventDefault();
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <FileText size={16} />
        View CV
      </a>

      {/* Portal to <body> so no section's stacking context can paint over it. */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <div
              className="tile flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="font-display text-sm font-semibold text-foreground">Mahnoor Iftikhar — CV</p>
                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="bg-gradient-brand flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white"
                  >
                    <Download size={14} />
                    Download
                  </a>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close preview"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <iframe src="/resume.pdf" title="Resume preview" className="h-full w-full flex-1 bg-surface-2" />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
