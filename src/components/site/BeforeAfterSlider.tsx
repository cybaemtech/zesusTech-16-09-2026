import { useState } from "react";

const BEFORE = [
  "Manual processes",
  "Legacy infrastructure",
  "Limited visibility",
  "Reactive issue handling",
  "Rising operational cost",
  "Deployment delays",
];

const AFTER = [
  "Cloud visibility",
  "Automated operations",
  "Improved scalability",
  "Proactive monitoring",
  "Optimized costs",
  "Faster delivery",
];

/** Draggable comparison between cloud chaos and operational confidence (abstract, no screenshots). */
export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-8">
      {/* Phones: the clipped overlay collides with itself at one column, so the
          two states are stacked instead. Slider from sm upwards. */}
      <div className="grid gap-4 sm:hidden">
        <div className="rounded-2xl border border-border bg-muted p-5">
          <p className="eyebrow text-muted-foreground">Before — cloud chaos</p>
          <ul className="mt-4 grid gap-2.5">
            {BEFORE.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary px-3.5 py-3 text-sm font-semibold text-muted-foreground"
              >
                <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="surface-navy relative overflow-hidden rounded-2xl border border-border p-5">
          <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-25" aria-hidden="true" />
          <div className="relative">
            <p className="eyebrow text-azure-bright">After — operational confidence</p>
            <ul className="mt-4 grid gap-2.5">
              {AFTER.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-azure-bright/30 bg-azure/20 px-3.5 py-3 text-sm font-bold text-navy-foreground"
                >
                  <span className="size-2 shrink-0 rounded-full bg-ok" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <div className="relative overflow-hidden rounded-2xl border border-border">
          {/* AFTER layer (base) */}
          <div className="surface-navy relative p-6 sm:p-9">
            <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-25 animate-grid-drift" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow text-azure-bright">After — operational confidence</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {AFTER.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-azure-bright/30 bg-azure/20 px-3.5 py-3 text-sm font-bold text-navy-foreground"
                  >
                    <span className="size-2 shrink-0 rounded-full bg-ok animate-pulse-node" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BEFORE layer (clipped) */}
          <div
            className="absolute inset-0 bg-muted p-6 sm:p-9"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden={pos < 8}
          >
            <p className="eyebrow text-muted-foreground">Before — cloud chaos</p>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {BEFORE.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary px-3.5 py-3 text-sm font-semibold text-muted-foreground"
                >
                  <span className="size-2 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-azure-bright"
            style={{ left: `${pos}%` }}
            aria-hidden="true"
          />
        </div>

        <label className="mt-6 block">
          <span className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
            <span>Cloud chaos</span>
            <span>Operational confidence</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Drag between cloud chaos and operational confidence"
            className="mt-3 h-2 w-full cursor-ew-resize appearance-none rounded-full bg-secondary accent-primary"
          />
        </label>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        A general transformation framework based on our delivery patterns — not a guarantee that every engagement
        achieves every outcome.
      </p>
    </div>
  );
}
