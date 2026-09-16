import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const NODES = [
  { label: "Security", status: "ok" },
  { label: "Reliability", status: "ok" },
  { label: "Performance", status: "warn" },
  { label: "Cost Efficiency", status: "ok" },
  { label: "Compliance", status: "ok" },
  { label: "Support", status: "ok" },
  { label: "Scalability", status: "warn" },
  { label: "Partnership", status: "ok" },
] as const;

const statusColor = { ok: "bg-ok", warn: "bg-warn" } as const;

/** Abstract trust network: ZensusTech at the centre, trust nodes illuminating on scroll. */
export function TrustNetwork() {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(0);
  // Pull the ring in on phones so the widest pills ("Cost Efficiency") stay on screen.
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = 1 - (rect.top + rect.height * 0.35) / vh;
      const clamped = Math.max(0, Math.min(1, progress + 0.35));
      setLit(Math.round(clamped * NODES.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const R = compact ? 36 : 38;

  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-[34rem]">

      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx="50" cy="50" r={R} fill="none" stroke="currentColor" className="text-azure-bright/15" strokeWidth="0.3" />
        <circle cx="50" cy="50" r={R * 0.62} fill="none" stroke="currentColor" className="text-azure-bright/10" strokeWidth="0.3" />
        {NODES.map((node, i) => {
          const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * R;
          const y = 50 + Math.sin(angle) * R;
          const active = i < lit;
          return (
            <line
              key={node.label}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth={active ? 0.5 : 0.25}
              strokeDasharray="2 3"
              className={cn(
                "transition-all duration-700",
                active ? "text-azure-bright/70 animate-dash" : "text-navy-foreground/15",
              )}
            />
          );
        })}
      </svg>

      <div className="absolute left-1/2 top-1/2 w-[9.5rem] -translate-x-1/2 -translate-y-1/2 sm:w-auto">
        <div className="glass-panel flex flex-col items-center px-4 py-4 text-center shadow-glow sm:px-6 sm:py-5">
          <span className="eyebrow text-azure-bright">Trust core</span>
          <span className="mt-1 text-base font-extrabold tracking-tight text-navy-foreground sm:text-lg">
            ZENSUSTECH
          </span>
          <span className="mt-1 text-[0.62rem] font-semibold text-navy-foreground/60 sm:text-[0.68rem]">
            {lit}/{NODES.length} signals live
          </span>
        </div>
      </div>


      {NODES.map((node, i) => {
        const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + Math.cos(angle) * R;
        const top = 50 + Math.sin(angle) * R;
        const active = i < lit;
        return (
          <div
            key={node.label}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2 py-1 text-[0.55rem] font-bold transition-all duration-700 sm:px-3 sm:py-1.5 sm:text-xs",
              active
                ? "border-azure-bright/45 bg-azure/25 text-navy-foreground opacity-100 shadow-glow"
                : "border-navy-foreground/12 bg-navy-foreground/5 text-navy-foreground/45 opacity-70",
            )}
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  active ? cn(statusColor[node.status], "animate-pulse-node") : "bg-navy-foreground/30",
                )}
              />
              {node.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
