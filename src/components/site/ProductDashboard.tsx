import { AlertTriangle, Coins, Fingerprint, FileWarning, ServerCog } from "lucide-react";
import { RiskIndicator } from "./primitives";

const SCORES = [
  { label: "Security", value: "Good", level: "ok" as const },
  { label: "Compliance", value: "86%", level: "warn" as const },
  { label: "Cost Efficiency", value: "78%", level: "warn" as const },
  { label: "Operational Health", value: "94%", level: "ok" as const },
  { label: "Critical Risks", value: "03", level: "risk" as const },
];

const FEED = [
  { icon: AlertTriangle, title: "Risk detected", copy: "Public network exposure on a storage account" },
  { icon: Coins, title: "Cost opportunity", copy: "Idle compute and unattached disks identified" },
  { icon: Fingerprint, title: "Identity anomaly", copy: "Privileged sign-in from an unusual location" },
  { icon: FileWarning, title: "Compliance gap", copy: "Missing evidence for an encryption control" },
  { icon: ServerCog, title: "Operational alert", copy: "Sustained CPU pressure on a production workload" },
];

/** Conceptual product visualization — illustrative values, not customer measurements. */
export function ProductDashboard() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-navy-foreground/12 surface-mesh p-6 shadow-elevated sm:p-8">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-azure-bright">Overall Cloud health</p>
          <p className="mt-2 text-5xl font-black text-navy-foreground">
            92 <span className="text-xl font-bold text-navy-foreground/50">/ 100</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <RiskIndicator label="Live signal ingest" level="ok" />
          <RiskIndicator label="3 critical risks" level="risk" />
        </div>
      </div>

      <dl className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {SCORES.map((s) => (
          <div key={s.label} className="glass-panel px-4 py-4">
            <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-navy-foreground/60">
              {s.label}
            </dt>
            <dd className="mt-2 flex items-center gap-2 text-xl font-extrabold text-navy-foreground">
              <span
                className={`size-2 rounded-full animate-pulse-node ${
                  s.level === "ok" ? "bg-ok" : s.level === "warn" ? "bg-warn" : "bg-risk"
                }`}
                aria-hidden="true"
              />
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="relative mt-4 grid gap-2.5 md:grid-cols-2">
        {FEED.map((item, i) => (
          <li
            key={item.title}
            className="glass-panel flex items-start gap-3 px-4 py-3.5 animate-float-slow"
            style={{ animationDelay: `${i * 380}ms` }}
          >
            <item.icon className="mt-0.5 size-4 shrink-0 text-azure-bright" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-navy-foreground">{item.title}</p>
              <p className="text-xs text-navy-foreground/65">{item.copy}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="relative mt-5 text-[0.7rem] text-navy-foreground/45">
        Conceptual product visualization. Values are illustrative and do not represent current customer
        measurements.
      </p>
    </div>
  );
}
