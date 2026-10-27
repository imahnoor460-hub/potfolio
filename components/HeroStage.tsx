import HeroConsole from "@/components/HeroConsole";
import NetworkBackdrop from "@/components/NetworkBackdrop";

/** The hero's right side: the laptop terminal on a live, interactive agent network. */
export default function HeroStage() {
  return (
    <div className="relative py-14 sm:py-16">
      {/* Glow + live network (reacts to the pointer; see NetworkBackdrop) */}
      <div
        aria-hidden="true"
        className="bg-gradient-brand pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
      />
      <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 [mask-image:radial-gradient(ellipse_at_center,black_74%,transparent_100%)] sm:-inset-x-20 sm:-inset-y-16">
        <NetworkBackdrop />
      </div>

      {/* The laptop sits a little smaller than the column so the network shows around it. */}
      <div className="relative z-10 mx-auto w-[84%] sm:w-[78%]">
        <HeroConsole />
      </div>
    </div>
  );
}
