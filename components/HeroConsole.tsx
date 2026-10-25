import { profile } from "@/data/cv";

/** Laptop mockup with a zsh session, restored from the original hero. */
export default function HeroConsole() {
  return (
    <div className="w-full [perspective:1200px]">
      <div className="mx-auto max-w-md transition-transform duration-500 [transform:rotateX(4deg)] hover:[transform:rotateX(0deg)]">
        {/* Screen / lid */}
        <div className="rounded-t-2xl border-[10px] border-b-0 border-[#1c1c1e] bg-[#1c1c1e] pb-1 shadow-2xl">
          <div className="flex justify-center py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
          <div className="overflow-hidden rounded-sm border border-black/40 bg-surface">
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-xs text-muted">mahnoor@portfolio — zsh</span>
            </div>
            <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
              <p>
                <span className="text-accent">$</span>{" "}
                <span className="text-foreground/90">whoami</span>
              </p>
              <p className="pl-4 text-muted">{profile.name}</p>
              <p className="mt-3">
                <span className="text-accent">$</span>{" "}
                <span className="text-foreground/90">cat focus.json</span>
              </p>
              <p className="pl-4 text-foreground/80">{"{"}</p>
              <p className="pl-8 text-foreground/80">
                <span className="text-accent-2">&quot;stack&quot;</span>: [
                <span className="text-muted">
                  &quot;Django&quot;, &quot;React&quot;, &quot;FastAPI&quot;, &quot;Next.js&quot;
                </span>
                ],
              </p>
              <p className="pl-8 text-foreground/80">
                <span className="text-accent-2">&quot;focus&quot;</span>:{" "}
                <span className="text-muted">&quot;AI &amp; agentic workflows&quot;</span>,
              </p>
              <p className="pl-8 text-foreground/80">
                <span className="text-accent-2">&quot;also_into&quot;</span>: [
                <span className="text-muted">&quot;Unity&quot;, &quot;Blender&quot;, &quot;3D Design&quot;</span>]
              </p>
              <p className="text-foreground/80">{"}"}</p>
              <p className="mt-3 flex items-center gap-1">
                <span className="text-accent">$</span>
                <span className="inline-block h-3.5 w-2 bg-accent animate-caret" />
              </p>
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div className="h-2 rounded-b-sm bg-gradient-to-b from-[#2c2c2e] to-[#141416]" />

        {/* Base / keyboard deck */}
        <div className="relative h-4 rounded-b-2xl bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] shadow-xl">
          <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-[#0a0a0a]" />
        </div>
      </div>

      {/* Reflection / shadow */}
      <div className="mx-auto mt-3 h-3 w-4/5 max-w-sm rounded-full bg-black/25 blur-md" />
    </div>
  );
}
