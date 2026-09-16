import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  ChevronDown,
  CloudCog,
  Database,
  Factory,
  GitBranch,
  Layers,
  Lock,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ArchitectureFlow } from "@/components/site/ZenOpsDiagram";
import { CtaLink, MetricCard, Section, SectionHead, StatCard } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const TITLE = "Cloud & Cloud Case Studies — Measurable Business Outcomes | ZensusTech";
const DESCRIPTION =
  "Real cloud engagements from ZensusTech: 32% lower Cloud infrastructure cost, 90% faster deployments and 40% managed-cloud savings, with measurable business outcomes.";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/case-studies" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/case-studies" }],
  }),
  component: CaseStudiesPage,
});

type Study = {
  id: string;
  number: string;
  icon: LucideIcon;
  industry: string;
  title: string;
  subtitle: string;
  challengeLine: string;
  headline: { value: string; label: string };
  meta: { label: string; value: string }[];
  supporting: { value: string; label: string }[];
  context: string;
  challenge: string[];
  challengeClose: string;
  approachIntro: string;
  approach: { title: string; copy: string }[];
  technology: string[];
  results: { outcome: string; result: string }[];
  impact: string;
  perspective: string;
};

const STUDIES: Study[] = [
  {
    id: "cs-01",
    number: "Case Study 01",
    icon: ShoppingCart,
    industry: "Retail — United Kingdom",
    title: "Cloud Migration for a UK Retail SMB",
    subtitle: "32% Lower Infrastructure Cost. 99.9% Uptime. 4× Scalability.",
    challengeLine:
      "Legacy infrastructure was becoming expensive to maintain and could not scale through seasonal demand spikes.",
    headline: { value: "32%", label: "Lower infrastructure cost" },
    meta: [
      { label: "Industry", value: "Retail" },
      { label: "Location", value: "United Kingdom" },
      { label: "Engagement", value: "Cloud Migration" },
      { label: "Technology", value: "Microsoft Cloud" },
    ],
    supporting: [
      { value: "99.9%", label: "Uptime" },
      { value: "4×", label: "Scalability" },
      { value: "0", label: "Business disruption" },
    ],
    context:
      "A growing UK retail business was operating on legacy infrastructure that was becoming increasingly expensive to maintain.",
    challenge: [
      "High infrastructure and maintenance costs",
      "Limited scalability during seasonal demand spikes",
      "Increasing operational overhead",
      "Infrastructure constraints affecting business growth",
    ],
    challengeClose:
      "The existing environment needed to become more scalable without disrupting ongoing business operations.",
    approachIntro:
      "ZensusTech designed and executed a structured Cloud migration focused on creating a more scalable and resilient infrastructure foundation.",
    approach: [
      {
        title: "Assessment & Migration Planning",
        copy: "Evaluating the existing environment and developing a structured migration roadmap.",
      },
      { title: "Cloud Infrastructure", copy: "Deploying Cloud Virtual Machines to support the required workloads." },
      { title: "Database Migration", copy: "Migrating workloads to Cloud SQL Database." },
      { title: "Auto-Scaling", copy: "Configuring automatic scaling to respond to changing demand." },
    ],
    technology: ["Microsoft Cloud", "Cloud Virtual Machines", "Cloud SQL Database", "Auto-Scaling"],
    results: [
      { outcome: "Infrastructure cost", result: "32% reduction" },
      { outcome: "Availability", result: "99.9% uptime" },
      { outcome: "Scalability", result: "4× improvement" },
    ],
    impact:
      "The organization gained a more scalable cloud foundation capable of supporting seasonal growth while significantly reducing infrastructure costs.",
    perspective:
      "Migration is not simply about moving workloads. It is about creating an infrastructure foundation that can support the next stage of business growth.",
  },
  {
    id: "cs-02",
    number: "Case Study 02",
    icon: GitBranch,
    industry: "SaaS / Technology — India",
    title: "DevOps Automation for an India-Based SaaS Startup",
    subtitle: "From Manual Deployments to Faster, More Reliable Releases.",
    challengeLine:
      "Manual deployment processes created long release cycles and a high probability of deployment errors.",
    headline: { value: "90%", label: "Faster deployments" },
    meta: [
      { label: "Industry", value: "SaaS / Technology" },
      { label: "Location", value: "India" },
      { label: "Engagement", value: "DevOps & Automation" },
      { label: "Technology", value: "AWS, Terraform, Docker, Kubernetes" },
    ],
    supporting: [
      { value: "75%", label: "Fewer deployment errors" },
      { value: "3×", label: "Team productivity" },
      { value: "100%", label: "Repeatable provisioning" },
    ],
    context: "The SaaS company relied heavily on manual deployment processes.",
    challenge: [
      "Long deployment cycles",
      "Higher probability of deployment errors",
      "Delays in product releases",
      "Difficulty scaling development operations",
      "Limited automation across environments",
    ],
    challengeClose:
      "The business needed a repeatable deployment model that could support a growing engineering organization.",
    approachIntro: "ZensusTech implemented an automated DevOps operating model.",
    approach: [
      { title: "CI/CD Pipeline", copy: "Automated application build, testing and deployment workflows." },
      {
        title: "Infrastructure as Code",
        copy: "Introduced Terraform to create repeatable and consistent infrastructure provisioning.",
      },
      {
        title: "Containerization",
        copy: "Implemented Docker and Kubernetes to improve deployment consistency and scalability.",
      },
      { title: "Automated Testing", copy: "Integrated automated testing into the release pipeline." },
    ],
    technology: ["AWS", "Terraform", "Docker", "Kubernetes", "CI/CD", "Automated testing"],
    results: [
      { outcome: "Deployment speed", result: "90% faster" },
      { outcome: "Deployment errors", result: "75% fewer" },
      { outcome: "Team productivity", result: "3× improvement" },
    ],
    impact:
      "The organization moved from manual, error-prone releases toward an automated delivery model that allowed its development team to release software faster and operate more efficiently.",
    perspective:
      "The goal of DevOps automation is not simply faster deployments. It is giving engineering teams the confidence and repeatability to ship continuously.",
  },
  {
    id: "cs-03",
    number: "Case Study 03",
    icon: Factory,
    industry: "Manufacturing",
    title: "Managed Cloud Services for a Manufacturing Firm",
    subtitle: "40% Cost Savings. 100% Compliance. Faster Incident Resolution.",
    challengeLine:
      "A small internal IT team had to keep a business-critical cloud environment secure, performant and compliant.",
    headline: { value: "40%", label: "Cloud cost savings" },
    meta: [
      { label: "Industry", value: "Manufacturing" },
      { label: "Engagement", value: "Managed Cloud Services" },
      { label: "Focus", value: "Monitoring, Security, Optimization & Compliance" },
      { label: "Standard", value: "ISO 27001 aligned" },
    ],
    supporting: [
      { value: "100%", label: "Compliance outcome" },
      { value: "60%", label: "Faster issue resolution" },
      { value: "24×7", label: "Monitoring coverage" },
    ],
    context:
      "The organization had limited internal IT resources responsible for managing its cloud environment.",
    challenge: [
      "Limited operational resources",
      "Security concerns",
      "Performance issues",
      "Difficulty maintaining proactive monitoring",
      "Increasing compliance requirements",
    ],
    challengeClose:
      "The business needed a dependable operational model without significantly expanding its internal team.",
    approachIntro: "ZensusTech introduced a proactive managed-cloud operating model.",
    approach: [
      { title: "24×7 Monitoring", copy: "Continuous monitoring and alerting for critical systems." },
      { title: "Security Maintenance", copy: "Regular security patching and infrastructure updates." },
      { title: "Cost Optimization", copy: "Ongoing cloud-cost analysis and optimization recommendations." },
      {
        title: "Compliance Management",
        copy: "Support for compliance management aligned with ISO 27001 requirements.",
      },
    ],
    technology: ["Monitoring & alerting", "Patch management", "Cost optimization", "ISO 27001 controls"],
    results: [
      { outcome: "Cloud cost", result: "40% savings" },
      { outcome: "Compliance", result: "100%" },
      { outcome: "Issue resolution", result: "60% faster" },
    ],
    impact:
      "The organization gained a more proactive cloud-operating model, improved visibility into its environment and reduced the operational burden on its internal IT team.",
    perspective:
      "Managed services should not mean waiting for something to break. They should mean identifying risk, performance and cost issues before they become business problems.",
  },
];

const GLANCE = [
  { value: 32, suffix: "%", label: "Average cost reduction in the featured Cloud migration" },
  { value: 99.9, suffix: "%", label: "Uptime achieved in the featured retail migration" },
  { value: 90, suffix: "%", label: "Faster deployments in the featured SaaS DevOps engagement" },
  { value: 40, suffix: "%", label: "Cost savings in the featured managed-cloud engagement" },
  { value: 3, suffix: "×", label: "Team productivity improvement in the DevOps engagement" },
  { value: 100, suffix: "%", label: "Compliance outcome in the featured manufacturing engagement" },
];

const MATRIX = [
  {
    icon: TrendingDown,
    challenge: "Rising infrastructure costs",
    approach: "Cloud migration & optimization",
    outcome: "Lower cost",
  },
  { icon: Rocket, challenge: "Slow deployments", approach: "DevOps & automation", outcome: "Faster releases" },
  {
    icon: Activity,
    challenge: "Limited IT capacity",
    approach: "Managed cloud services",
    outcome: "Better operational coverage",
  },
  {
    icon: Lock,
    challenge: "Security & compliance pressure",
    approach: "Security & governance",
    outcome: "Improved control",
  },
  {
    icon: Layers,
    challenge: "Growing infrastructure demand",
    approach: "Cloud modernization",
    outcome: "Greater scalability",
  },
];

const WAITING = [
  "a cloud-cost spike",
  "a security issue",
  "an operational incident",
  "an audit request",
  "an infrastructure bottleneck",
];


function CaseStudiesPage() {
  const [openId, setOpenId] = useState<string | null>("cs-01");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden surface-navy py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-20 animate-grid-drift" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-azure/25 blur-3xl animate-float-slow" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-16 bottom-0 size-80 rounded-full bg-azure-bright/20 blur-3xl animate-float-slow" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal>
              <p className="eyebrow mb-4 text-azure-bright">Case Studies</p>
              <h1 className="text-4xl font-extrabold leading-[1.08] text-navy-foreground sm:text-5xl md:text-6xl">
                Real Cloud Problems.
                <span className="block text-azure-bright">Measurable Business Outcomes.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
                At ZensusTech, we don't measure success by technology deployed. We measure it by what changes for the
                business. From reducing cloud infrastructure costs and improving uptime to accelerating software
                delivery and strengthening compliance, our engagements are built around measurable outcomes.
              </p>
              <p className="mt-4 text-base font-semibold text-navy-foreground/90">
                Explore how businesses have transformed their cloud operations with ZensusTech.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaLink to="/contact">Check My Cloud Environment</CtaLink>
                <CtaLink to="/zenops" variant="onDark">
                  Book a ZenAI-Ops Demo
                </CtaLink>
              </div>
            </Reveal>

            <Reveal delay={120} className="relative">
              <div className="relative rounded-3xl border border-navy-foreground/12 bg-navy-foreground/5 p-8 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 rounded-3xl grid-backdrop opacity-25" aria-hidden="true" />
                <div className="relative space-y-4">
                  {[
                    { icon: CloudCog, value: "32%", label: "Cost Reduction", note: "UK retail Cloud migration" },
                    { icon: Rocket, value: "90%", label: "Faster Deployments", note: "SaaS DevOps automation" },
                    { icon: ShieldCheck, value: "40%", label: "Cost Savings", note: "Managed cloud services" },
                  ].map((item, i) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl border border-navy-foreground/12 bg-navy/40 p-5 animate-float-slow"
                      style={{ animationDelay: `${i * 700}ms` }}
                    >
                      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-azure/25 text-azure-bright">
                        <item.icon className="size-6" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-2xl font-extrabold text-navy-foreground">{item.value}</p>
                        <p className="text-sm font-bold text-azure-bright">{item.label}</p>
                        <p className="text-xs text-navy-foreground/60">{item.note}</p>
                      </div>
                      <span className="ml-auto size-2.5 rounded-full bg-azure-bright animate-pulse-node" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CASE STUDY CARDS */}
      <Section id="engagements">
        <SectionHead
          eyebrow="Featured engagements"
          title="Three Engagements. Three Measurable Outcomes."
          copy="Select a case study to expand the full story — context, challenge, approach, technology, implementation and results."
        />
        <div className="mt-14 space-y-6">
          {STUDIES.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <StudyCard study={s} open={openId === s.id} onToggle={() => setOpenId(openId === s.id ? null : s.id)} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* RESULTS AT A GLANCE */}
      <Section tone="navy">
        <SectionHead
          invert
          eyebrow="Results at a glance"
          title="What Changes When Cloud Operations Are Done Right?"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GLANCE.map((g, i) => (
            <Reveal key={g.label} delay={i * 70}>
              <MetricCard invert value={g.value} suffix={g.suffix} label={g.label} />
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-navy-foreground/55">
          These figures are drawn from the existing ZensusTech case-study material.
        </p>
      </Section>

      {/* COMMON PATTERN MATRIX */}
      <Section tone="white">
        <SectionHead
          eyebrow="What these case studies have in common"
          title="Different Industries. The Same Operating Challenges."
        />
        <div className="mt-14 overflow-hidden rounded-3xl border border-border shadow-soft">
          <div className="hidden grid-cols-[1.1fr_1.1fr_1fr] gap-4 bg-navy px-7 py-5 text-xs font-bold uppercase tracking-[0.14em] text-navy-foreground/70 md:grid">
            <span>Business challenge</span>
            <span>ZensusTech approach</span>
            <span>Business outcome</span>
          </div>
          {MATRIX.map((row, i) => (
            <div
              key={row.challenge}
              className={cn(
                "grid gap-3 px-7 py-6 md:grid-cols-[1.1fr_1.1fr_1fr] md:items-center",
                i % 2 ? "bg-background" : "bg-card",
              )}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <row.icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="font-bold text-foreground">{row.challenge}</span>
              </div>
              <span className="text-sm text-muted-foreground md:text-base">{row.approach}</span>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-sm font-bold text-primary">
                <ArrowRight className="size-3.5" aria-hidden="true" />
                {row.outcome}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* BRIDGE TO ZenAI-Ops */}
      <Section tone="mesh">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
        <SectionHead
          invert
          eyebrow="From case study to ZenAI-Ops"
          title="What If You Could See These Problems Before They Become Projects?"
          copy="The engagements above demonstrate what happens when cloud problems are identified and addressed. ZenAI-Ops takes that thinking one step further."
        />
        <div className="relative mt-14 grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-azure-bright">Instead of waiting for</p>
            <ul className="mt-5 space-y-3">
              {WAITING.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-3 rounded-xl border border-navy-foreground/12 bg-navy-foreground/5 px-5 py-3.5 text-navy-foreground/85"
                >
                  <span className="size-2 rounded-full bg-azure-bright animate-pulse-node" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-7 text-base leading-relaxed text-navy-foreground/75">
              ZenAI-Ops is designed to provide continuous intelligence across your Cloud environment so your team can
              identify what needs attention earlier.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink to="/contact">See What ZenAI-Ops Could Find in Your Cloud Environment</CtaLink>
              <CtaLink to="/zenops" variant="onDark">
                Book a ZenAI-Ops Demo
              </CtaLink>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <ArchitectureFlow />
          </Reveal>
        </div>
      </Section>

    </>
  );
}

function StudyCard({ study, open, onToggle }: { study: Study; open: boolean; onToggle: () => void }) {
  const Icon = study.icon;
  return (
    <article
      className={cn(
        "overflow-hidden rounded-3xl border bg-card transition-all duration-300",
        open ? "border-primary/40 shadow-elevated" : "border-border shadow-soft hover:-translate-y-0.5 hover:shadow-elevated",
      )}
    >
      <div className="grid gap-8 p-7 md:grid-cols-[1.35fr_1fr] md:p-9">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-primary">
              <Icon className="size-3.5" aria-hidden="true" />
              {study.industry}
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {study.number}
            </span>
          </div>
          <h3 className="mt-5 text-2xl font-extrabold text-foreground sm:text-3xl">{study.title}</h3>
          <p className="mt-2 text-base font-bold text-primary">{study.subtitle}</p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {study.challengeLine}
          </p>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-primary transition-colors hover:brightness-110"
          >
            {open ? "Close Case Study" : "View Case Study"}
            <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
          </button>
        </div>

        <div className="rounded-2xl surface-navy p-7">
          <p className="text-5xl font-extrabold text-azure-bright">{study.headline.value}</p>
          <p className="mt-2 text-sm font-semibold text-navy-foreground/75">{study.headline.label}</p>
          <div className="mt-6 grid gap-3 border-t border-navy-foreground/12 pt-5 sm:grid-cols-3">
            {study.supporting.map((m) => (
              <div key={m.label}>
                <p className="text-lg font-extrabold text-navy-foreground">{m.value}</p>
                <p className="text-xs text-navy-foreground/60">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-7 py-10 md:px-9">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.meta.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card px-5 py-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-sm font-bold text-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            <Block step="01" title="Client Context">
              <p className="text-base leading-relaxed text-muted-foreground">{study.context}</p>
            </Block>

            <Block step="02" title="The Challenge">
              <div className="grid gap-3 sm:grid-cols-2">
                {study.challenge.map((c) => (
                  <div
                    key={c}
                    className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-3.5 text-sm font-semibold text-foreground"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-destructive" aria-hidden="true" />
                    {c}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{study.challengeClose}</p>
            </Block>

            <Block step="03" title="The ZensusTech Approach">
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">{study.approachIntro}</p>
              <div className="grid gap-4 md:grid-cols-2">
                {study.approach.map((a, i) => (
                  <div key={a.title} className="relative rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <span className="text-xs font-extrabold tracking-[0.16em] text-primary">
                      STEP {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-base font-bold text-foreground">{a.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block step="04" title="Technology & Implementation">
              <div className="flex flex-wrap items-center gap-3">
                {study.technology.map((t, i) => (
                  <span key={t} className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/8 px-4 py-2.5 text-sm font-bold text-primary">
                      <Database className="size-4" aria-hidden="true" />
                      {t}
                    </span>
                    {i < study.technology.length - 1 ? (
                      <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
                    ) : null}
                  </span>
                ))}
              </div>
            </Block>

            <Block step="05" title="The Outcome">
              <div className="grid gap-4 sm:grid-cols-3">
                {study.results.map((r) => (
                  <StatCard key={r.outcome} value={r.result} label={r.outcome} />
                ))}
              </div>
            </Block>

            <Block step="06" title="Business Impact">
              <p className="text-base leading-relaxed text-muted-foreground">{study.impact}</p>
            </Block>
          </div>

          <figure className="mt-10 rounded-3xl surface-navy p-8">
            <p className="eyebrow text-azure-bright">ZensusTech Perspective</p>
            <blockquote className="mt-4 text-lg font-semibold leading-relaxed text-navy-foreground sm:text-xl">
              “{study.perspective}”
            </blockquote>
          </figure>
        </div>
      ) : null}
    </article>
  );
}

function Block({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="relative border-l-2 border-primary/20 pl-7">
      <span className="absolute -left-[0.72rem] top-0 inline-flex size-5.5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-extrabold text-primary-foreground">
        {step}
      </span>
      <h4 className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{title}</h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}
