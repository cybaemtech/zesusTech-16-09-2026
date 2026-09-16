import { Activity, Coins, FileCheck2, Fingerprint, Server, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const SIGNALS: { label: string; icon: LucideIcon }[] = [
  { label: "Security", icon: ShieldCheck },
  { label: "Identity", icon: Fingerprint },
  { label: "Cost", icon: Coins },
  { label: "Compliance", icon: FileCheck2 },
  { label: "Operations", icon: Activity },
  { label: "Infrastructure", icon: Server },
];

const OUTPUTS = ["Secure", "Optimize", "Govern", "Operate"];

/**
 * Signature brand visual: Cloud signals converging into the ZenAI-Ops
 * intelligence layer, then resolving into four business outcomes.
 * Conceptual illustration — not live customer data.
 */
export function ZenOpsDiagram() {
  return (
    <div className="relative rounded-3xl border border-navy-foreground/12 surface-mesh p-6 shadow-elevated sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid-backdrop rounded-3xl opacity-20 animate-grid-drift" aria-hidden="true" />

      <div className="relative flex items-center justify-between gap-3">
        <p className="eyebrow text-azure-bright">Cloud environment signals</p>
        <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-navy-foreground/70">
          <span className="size-1.5 rounded-full bg-ok animate-pulse-node" aria-hidden="true" />
          Continuous
        </span>
      </div>

      <ul className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {SIGNALS.map((signal, i) => (
          <li
            key={signal.label}
            className="glass-panel flex items-center gap-2.5 px-3 py-2.5 animate-float-slow"
            style={{ animationDelay: `${i * 420}ms` }}
          >
            <signal.icon className="size-4 shrink-0 text-azure-bright" aria-hidden="true" />
            <span className="text-xs font-bold text-navy-foreground/90">{signal.label}</span>
          </li>
        ))}
      </ul>

      <svg
        viewBox="0 0 400 70"
        className="relative mt-4 h-16 w-full"
        role="img"
        aria-label="Cloud signals converging into the ZenAI-Ops intelligence layer"
      >
        {[40, 120, 200, 280, 360].map((x) => (
          <path
            key={x}
            d={`M${x} 2 C ${x} 40, 200 30, 200 66`}
            fill="none"
            stroke="oklch(0.655 0.175 255 / 0.55)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            className="animate-dash"
          />
        ))}
      </svg>

      <div className="relative rounded-2xl border border-azure/40 bg-navy-foreground/8 p-5 text-center shadow-glow">
        <p className="text-2xl font-black tracking-tight text-navy-foreground">ZenAI-Ops</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-azure-bright">
          Secure • Optimize • Govern • Operate
        </p>
        <p className="mt-3 text-xs text-navy-foreground/60">Intelligence layer across your Cloud estate</p>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {OUTPUTS.map((out, i) => (
          <div
            key={out}
            className="glass-panel px-3 py-3 text-center"
            style={{ animationDelay: `${i * 200}ms` }}
          >
            <span className="text-xs font-black uppercase tracking-widest text-navy-foreground">{out}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureFlow() {
  const cloudLayer = ["Subscriptions", "VMs", "Storage", "SQL", "Identity", "Networking", "Applications"];
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
      <p className="eyebrow text-muted-foreground">Cloud layer</p>
      <ul className="mt-4 flex flex-wrap gap-2.5">
        {cloudLayer.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-border bg-secondary/70 px-3.5 py-2 text-xs font-bold text-secondary-foreground"
          >
            {item}
          </li>
        ))}
      </ul>

      <svg viewBox="0 0 400 48" className="mt-6 h-12 w-full" aria-hidden="true">
        {[60, 140, 200, 260, 340].map((x) => (
          <path
            key={x}
            d={`M${x} 2 C ${x} 30, 200 20, 200 46`}
            fill="none"
            stroke="oklch(0.575 0.198 258 / 0.45)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            className="animate-dash"
          />
        ))}
      </svg>

      <div className="rounded-2xl surface-navy p-6 text-center">
        <p className="eyebrow text-azure-bright">ZenAI-Ops intelligence layer</p>
        <p className="mt-2 text-lg font-bold text-navy-foreground">
          Correlates security, identity, cost, compliance and operational signals
        </p>
      </div>

      <svg viewBox="0 0 400 48" className="mt-6 h-12 w-full" aria-hidden="true">
        {[70, 160, 240, 330].map((x) => (
          <path
            key={x}
            d={`M200 2 C 200 26, ${x} 20, ${x} 46`}
            fill="none"
            stroke="oklch(0.575 0.198 258 / 0.45)"
            strokeWidth="1.2"
            strokeDasharray="5 7"
            className="animate-dash"
          />
        ))}
      </svg>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["Secure", "Optimize", "Govern", "Operate"].map((out) => (
          <div
            key={out}
            className="rounded-2xl border border-primary/25 bg-accent/60 py-4 text-center text-sm font-black uppercase tracking-widest text-accent-foreground"
          >
            {out}
          </div>
        ))}
      </div>
    </div>
  );
}
