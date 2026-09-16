import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, useCountUp } from "./Reveal";

export function Section({
  children,
  className,
  tone = "light",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "light" | "white" | "navy" | "mesh";
  id?: string;
}) {
  const toneClass =
    tone === "navy"
      ? "surface-navy"
      : tone === "mesh"
        ? "surface-mesh"
        : tone === "white"
          ? "bg-card"
          : "bg-background";
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 md:py-28", toneClass, className)}>
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = "center",
  level = "h2",
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "center" | "left";
  level?: "h1" | "h2";
  invert?: boolean;
}) {
  const Heading = level;
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", invert ? "text-azure-bright" : "text-primary")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "text-3xl font-extrabold sm:text-4xl md:text-5xl",
          invert ? "text-navy-foreground" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {copy ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            invert ? "text-navy-foreground/75" : "text-muted-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
    </Reveal>
  );
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function CtaLink({
  to,
  children,
  variant = "primary",
  className,
  hash,
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "onDark";
  className?: string;
  hash?: string;
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110",
    ghost: "border border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent",
    onDark:
      "border border-navy-foreground/25 bg-navy-foreground/5 text-navy-foreground hover:bg-navy-foreground/12",
  } as const;
  return (
    <Link
      to={to}
      {...(hash ? { hash } : {})}
      className={cn(btnBase, variants[variant], className)}
    >
      {children}
      {variant === "primary" ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </Link>
  );
}

export function MetricCard({
  value,
  suffix = "",
  prefix = "",
  label,
  invert = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  invert?: boolean;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 text-center",
        invert ? "border-navy-foreground/12 bg-navy-foreground/5" : "border-border bg-card shadow-soft",
      )}
    >
      <p className={cn("text-3xl font-extrabold sm:text-4xl", invert ? "text-azure-bright" : "text-primary")}>
        <span ref={ref}>
          {prefix}
          {current}
        </span>
        {suffix}
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-semibold",
          invert ? "text-navy-foreground/70" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function StatCard({ value, label, invert = false }: { value: string; label: string; invert?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 text-center",
        invert ? "border-navy-foreground/12 bg-navy-foreground/5" : "border-border bg-card shadow-soft",
      )}
    >
      <p className={cn("text-2xl font-extrabold sm:text-3xl", invert ? "text-azure-bright" : "text-primary")}>
        {value}
      </p>
      <p
        className={cn(
          "mt-2 text-sm font-semibold",
          invert ? "text-navy-foreground/70" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  copy,
  invert = false,
  className,
}: {
  icon: LucideIcon;
  title: string;
  copy: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group h-full rounded-2xl border p-7 transition-all duration-300",
        invert
          ? "border-navy-foreground/12 bg-navy-foreground/5 hover:border-azure-bright/50"
          : "border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-elevated",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl",
          invert ? "bg-azure/25 text-azure-bright" : "bg-accent text-primary",
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className={cn("mt-5 text-lg font-bold", invert && "text-navy-foreground")}>{title}</h3>
      <p className={cn("mt-2 text-sm leading-relaxed", invert ? "text-navy-foreground/70" : "text-muted-foreground")}>
        {copy}
      </p>
    </div>
  );
}

export function OutcomeCard({
  icon: Icon,
  tag,
  title,
  copy,
  index,
}: {
  icon: LucideIcon;
  tag: string;
  title: string;
  copy: string;
  index: string;
}) {
  return (
    <div className="group grid gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated md:grid-cols-[auto_1fr_2fr] md:items-center">
      <span className="text-sm font-black text-muted-foreground/50">{index}</span>
      <div className="flex items-center gap-4">
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow text-primary">{tag}</p>
          <h3 className="mt-1 text-xl font-bold">{title}</h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{copy}</p>
    </div>
  );
}

export function ServiceCard({
  icon: Icon,
  eyebrow,
  title,
  copy,
  capabilities,
  cta,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  copy: string;
  capabilities: string[];
  cta?: string;
}) {
  return (
    <article className="grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-2 md:p-10">
      <div>
        <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-5 text-muted-foreground">{eyebrow}</p>
        <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{copy}</p>
        {cta ? (
          <CtaLink to="/contact" className="mt-6" variant="ghost">
            {cta}
          </CtaLink>
        ) : null}
      </div>
      <ul className="grid gap-3 self-center sm:grid-cols-2">
        {capabilities.map((item) => (
          <li key={item} className="flex items-start gap-2.5 rounded-xl bg-secondary/70 px-3.5 py-3">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm font-semibold text-secondary-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function IndustryCard({
  icon: Icon,
  title,
  problem,
  zenops,
  zensustech,
}: {
  icon: LucideIcon;
  title: string;
  problem: string;
  zenops: string[];
  zensustech: string[];
}) {
  return (
    <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
        <span className="font-bold text-foreground">Cloud problem: </span>
        {problem}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-primary/20 bg-accent/60 p-4">
          <p className="eyebrow text-primary">ZenAI-Ops value</p>
          <ul className="mt-2 space-y-1.5 text-sm font-semibold text-accent-foreground">
            {zenops.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/70 p-4">
          <p className="eyebrow text-muted-foreground">ZensusTech intervention</p>
          <ul className="mt-2 space-y-1.5 text-sm font-semibold text-secondary-foreground">
            {zensustech.map((z) => (
              <li key={z}>{z}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function CaseStudyCard({
  region,
  title,
  results,
}: {
  region: string;
  title: string;
  results: string[];
}) {
  return (
    <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
      <p className="eyebrow text-primary">{region}</p>
      <h3 className="mt-2 text-xl font-bold">{title}</h3>
      <ul className="mt-6 space-y-3">
        {results.map((r) => (
          <li key={r} className="flex items-center gap-3 border-t border-border pt-3 first:border-0 first:pt-0">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-base font-extrabold text-foreground">{r}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function TestimonialCard({
  quote,
  author,
  company,
}: {
  quote: string;
  author: string;
  company: string;
}) {
  return (
    <figure className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft">
      <blockquote className="text-base leading-relaxed text-foreground">“{quote}”</blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <span className="font-bold">{author}</span>
        <span className="block text-muted-foreground">{company}</span>
      </figcaption>
    </figure>
  );
}

export function CloudPlatformCard({
  name,
  role,
  points,
  featured = false,
}: {
  name: string;
  role: string;
  points: string[];
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "h-full rounded-3xl border p-8",
        featured ? "border-primary/40 bg-card shadow-glow" : "border-border bg-card shadow-soft",
      )}
    >
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="eyebrow mt-2 text-primary">{role}</p>
      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        {points.map((p) => (
          <li key={p} className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function RiskIndicator({
  label,
  level,
}: {
  label: string;
  level: "ok" | "warn" | "risk";
}) {
  const map = {
    ok: "bg-ok",
    warn: "bg-warn",
    risk: "bg-risk",
  } as const;
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-navy-foreground/15 bg-navy-foreground/5 px-3 py-1.5 text-xs font-bold text-navy-foreground/85">
      <span className={cn("size-2 rounded-full animate-pulse-node", map[level])} aria-hidden="true" />
      {label}
    </span>
  );
}

export function FlowSteps({
  steps,
  invert = false,
}: {
  steps: { title: string; copy: string }[];
  invert?: boolean;
}) {
  return (
    <ol className="grid gap-4 md:grid-cols-5">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={i * 70} className="h-full">
          <div
            className={cn(
              "relative h-full rounded-2xl border p-6",
              invert
                ? "border-navy-foreground/12 bg-navy-foreground/5"
                : "border-border bg-card shadow-soft",
            )}
          >
            <span className={cn("eyebrow", invert ? "text-azure-bright" : "text-primary")}>
              Step {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={cn("mt-3 text-lg font-bold", invert && "text-navy-foreground")}>{step.title}</h3>
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                invert ? "text-navy-foreground/70" : "text-muted-foreground",
              )}
            >
              {step.copy}
            </p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function CtaBand({
  eyebrow,
  title,
  copy,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  copy?: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <Section tone="mesh">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        {eyebrow ? <p className="eyebrow mb-4 text-azure-bright">{eyebrow}</p> : null}
        <h2 className="text-3xl font-extrabold text-navy-foreground sm:text-4xl md:text-5xl">{title}</h2>
        {copy ? <p className="mt-5 text-base text-navy-foreground/75 sm:text-lg">{copy}</p> : null}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaLink to={primary.to}>{primary.label}</CtaLink>
          {secondary ? (
            <CtaLink to={secondary.to} variant="onDark">
              {secondary.label}
            </CtaLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
