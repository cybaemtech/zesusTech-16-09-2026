import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowDown,
  BadgeCheck,
  Building2,
  Coins,
  Cpu,
  DatabaseZap,
  FileCheck2,
  Gauge,
  KeyRound,
  Layers,
  Network,
  ScrollText,
  ShieldCheck,
  TrendingDown,
  Users,
  Workflow,
} from "lucide-react";
import { BackgroundAudio } from "@/components/site/BackgroundAudio";
import { Reveal } from "@/components/site/Reveal";
import { ArchitectureFlow, ZenOpsDiagram } from "@/components/site/ZenOpsDiagram";
import {
  CaseStudyCard,
  CtaBand,
  CtaLink,
  FeatureCard,
  FlowSteps,
  MetricCard,
  OutcomeCard,
  Section,
  SectionHead,
  StatCard,
} from "@/components/site/primitives";

const TITLE = "ZenAI-Ops by ZensusTech — Intelligent Cloud Operations, Security & Cost Platform";
const DESCRIPTION =
  "ZenAI-Ops gives growing businesses continuous visibility across Cloud security, operations, compliance and cost — without a large CloudOps or SecOps team.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const PAINS = [
  {
    icon: ShieldCheck,
    title: "Security Blind Spots",
    copy: "Unknown identities, suspicious activity, configuration weaknesses and security risks.",
  },
  {
    icon: TrendingDown,
    title: "Cloud Cost Leakage",
    copy: "Unused resources, overprovisioned infrastructure and uncontrolled cloud spending.",
  },
  {
    icon: ScrollText,
    title: "Compliance Pressure",
    copy: "Increasing audit requirements, customer questionnaires and evidence collection.",
  },
  {
    icon: Layers,
    title: "Operational Complexity",
    copy: "Too many resources, alerts, environments and operational dependencies.",
  },
];

const OUTCOMES = [
  {
    index: "01",
    icon: ShieldCheck,
    tag: "Secure",
    title: "Reduce risk before it becomes an incident",
    copy: "Identify security, identity and configuration risks before they become incidents.",
  },
  {
    index: "02",
    icon: Coins,
    tag: "Optimize",
    title: "Improve your Cloud economics",
    copy: "Discover cloud waste and continuously improve Cloud economics.",
  },
  {
    index: "03",
    icon: FileCheck2,
    tag: "Govern",
    title: "Stay ready for the next audit",
    copy: "Maintain visibility into policies, controls and compliance readiness.",
  },
  {
    index: "04",
    icon: Activity,
    tag: "Operate",
    title: "Run a more reliable environment",
    copy: "Identify operational issues and improve infrastructure reliability.",
  },
];

const AUDIENCES = [
  {
    icon: Cpu,
    title: "Cloud SaaS & Technology",
    problem: "Rapid Cloud growth and frequent deployments outpace security and operational review.",
    outcome: "Continuous security, cost and operational visibility across a fast-moving Cloud estate.",
  },
  {
    icon: Users,
    title: "Growing Mid-Market IT Teams",
    problem: "A meaningful Cloud environment run by a lean IT team with no dedicated CloudOps function.",
    outcome: "One intelligence layer that lets a small team cover far more Cloud surface area.",
  },
  {
    icon: FileCheck2,
    title: "Compliance-Driven Organizations",
    problem: "Audit requirements and customer security questionnaires arrive faster than evidence can be gathered.",
    outcome: "Governance and evidence visibility that supports audit and assessment readiness.",
  },
  {
    icon: Building2,
    title: "MSPs & Cloud Service Providers",
    problem: "Multiple customer Cloud estates reviewed manually, tenant by tenant.",
    outcome: "Consistent posture, cost and operational signals across the estates you manage.",
  },
];

const EVIDENCE_INPUTS = [
  "Cloud configuration",
  "Policy compliance",
  "Resource Graph",
  "Defender for Cloud",
  "Key Vault",
  "Encryption",
  "Backup",
];

const LIFECYCLE = [
  { title: "Discover", copy: "ZenAI-Ops identifies risk and opportunity across your Cloud environment." },
  { title: "Assess", copy: "ZensusTech experts validate the environment and prioritise what matters." },
  { title: "Remediate", copy: "Security, architecture, infrastructure and configuration improvements." },
  { title: "Modernize", copy: "Migration, modernization, DevOps and automation." },
  { title: "Operate", copy: "24×7 managed cloud services." },
];

const SERVICES = [
  { icon: Network, title: "Cloud Migration", copy: "Structured moves to Cloud, AWS or GCP." },
  { icon: Workflow, title: "Application Modernization", copy: "Re-architect applications for the cloud." },
  { icon: Gauge, title: "Managed Cloud Services", copy: "24×7 monitoring, management and optimization." },
  { icon: ShieldCheck, title: "Cloud Security & Compliance", copy: "Assessment, audit and data protection." },
  { icon: Coins, title: "Cost Optimization", copy: "Analysis, right-sizing and savings reporting." },
  { icon: DatabaseZap, title: "DevOps & Automation", copy: "CI/CD, IaC and cloud automation." },
];

function Home() {
  return (
    <>
      <BackgroundAudio />

      {/* HERO */}
      <section className="relative overflow-hidden surface-mesh">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.05fr_1fr]">
          <Reveal>
            <p className="eyebrow text-azure-bright">Intelligent Cloud Operations</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl lg:text-6xl">
              Is Your Cloud Environment Really Under Control?
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
              Your cloud grows faster than your ability to monitor, secure and optimize it.
            </p>
            <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-navy-foreground sm:text-lg">
              ZenAI-Ops gives growing businesses continuous visibility across Cloud security, operations,
              compliance and cost—without requiring a large CloudOps or SecOps team.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink to="/contact">Book Your Demo Today</CtaLink>
              <CtaLink to="/zenops" variant="onDark">
                Explore ZenAI-Ops
              </CtaLink>
            </div>
            <p className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy-foreground/60">
              <BadgeCheck className="size-4 text-azure-bright" aria-hidden="true" />
              Built for cloud-first growing businesses
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ZenOpsDiagram />
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — BUSINESS PAIN */}
      <Section tone="light">
        <SectionHead
          eyebrow="The problem"
          title="Your Cloud Environment Is Becoming a Business Risk."
          copy="As the estate grows, the gap between what is running and what your team can actually see keeps widening."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 80}>
              <FeatureCard icon={pain.icon} title={pain.title} copy={pain.copy} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="grid items-center gap-4 rounded-3xl border border-border bg-card p-8 shadow-soft md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <div className="rounded-2xl bg-secondary/70 p-5 text-center">
              <p className="text-sm font-extrabold">Complex Cloud Environment</p>
              <p className="mt-1 text-xs text-muted-foreground">Subscriptions, identities, workloads, policies</p>
            </div>
            <ArrowDown className="mx-auto size-5 rotate-0 text-primary md:-rotate-90" aria-hidden="true" />
            <div className="rounded-2xl bg-secondary/70 p-5 text-center">
              <p className="text-sm font-extrabold">Limited IT Capacity</p>
              <p className="mt-1 text-xs text-muted-foreground">Lean teams, competing priorities</p>
            </div>
            <ArrowDown className="mx-auto size-5 text-primary md:-rotate-90" aria-hidden="true" />
            <div className="rounded-2xl border border-primary/25 bg-accent/60 p-5 text-center">
              <p className="text-sm font-extrabold text-accent-foreground">Business Risk</p>
              <p className="mt-1 text-xs text-accent-foreground/75">Security, cost, compliance and downtime</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SECTION 3 — ZenAI-Ops VALUE */}
      <Section tone="white">
        <SectionHead
          eyebrow="The ZenAI-Ops layer"
          title="One Intelligent Layer Across Your Cloud Environment"
          copy="ZenAI-Ops brings scattered Cloud signals into a single operational picture and turns them into four business outcomes."
        />
        <Reveal className="mt-14">
          <ArchitectureFlow />
        </Reveal>
      </Section>

      {/* SECTION 4 — FOUR OUTCOMES */}
      <Section tone="light">
        <SectionHead eyebrow="Business outcomes" title="See. Understand. Act. Prove." align="left" />
        <div className="mt-12 grid gap-5">
          {OUTCOMES.map((o, i) => (
            <Reveal key={o.tag} delay={i * 70}>
              <OutcomeCard {...o} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 5 — WHY ZenAI-Ops */}
      <Section tone="white">
        <SectionHead
          eyebrow="Why ZenAI-Ops"
          title="You Don't Need More Cloud Tools. You Need Better Cloud Intelligence."
        />
        <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          <Reveal>
            <div className="rounded-3xl border border-border bg-background p-8">
              <p className="eyebrow text-muted-foreground">Traditional environment</p>
              <ul className="mt-5 space-y-3">
                {[
                  "Multiple dashboards",
                  "Manual reviews",
                  "Disconnected alerts",
                  "Spreadsheet-based evidence",
                  "Reactive operations",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-dashed border-border px-4 py-3 text-sm font-semibold text-muted-foreground"
                  >
                    <AlertTriangle className="size-4 shrink-0 text-warn" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100} className="flex justify-center">
            <svg viewBox="0 0 60 160" className="h-32 w-16 lg:h-40" aria-hidden="true">
              {[20, 50, 80, 110, 140].map((y) => (
                <path
                  key={y}
                  d={`M2 ${y} C 30 ${y}, 30 80, 58 80`}
                  fill="none"
                  stroke="oklch(0.575 0.198 258 / 0.55)"
                  strokeWidth="1.4"
                  strokeDasharray="5 7"
                  className="animate-dash"
                />
              ))}
            </svg>
          </Reveal>
          <Reveal delay={160}>
            <div className="rounded-3xl border border-primary/30 surface-navy p-8 shadow-glow">
              <p className="eyebrow text-azure-bright">ZenAI-Ops</p>
              <p className="mt-4 text-2xl font-extrabold text-navy-foreground">
                One operational intelligence layer
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">
                Unified visibility, prioritised issues and evidence in one place — so fragmented signals become
                decisions your team can act on.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Unified visibility", "Prioritisation", "Evidence", "Action"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-navy-foreground/15 px-3 py-1.5 text-xs font-bold text-navy-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 6 — TARGET CUSTOMER */}
      <Section tone="light">
        <SectionHead eyebrow="Who it's for" title="Built for Businesses Running on Cloud." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {AUDIENCES.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <article className="h-full rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <a.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-bold">{a.title}</h3>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-bold text-foreground">Problem: </span>
                  {a.problem}
                </p>
                <p className="mt-3 rounded-2xl border border-primary/20 bg-accent/60 p-4 text-sm font-semibold text-accent-foreground">
                  <span className="eyebrow block text-primary">ZenAI-Ops outcome</span>
                  <span className="mt-1.5 block">{a.outcome}</span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 7 — AUDIT EVIDENCE */}
      <Section tone="navy">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-10 animate-grid-drift" aria-hidden="true" />
        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-azure-bright">Cloud security & audit</p>
            <h2 className="mt-5 text-3xl font-extrabold text-navy-foreground sm:text-4xl md:text-5xl">
              Don't Just Enable Security. Be Ready to Prove It.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
              Security controls matter. Evidence matters too. ZenAI-Ops is designed to bring configuration, policy
              and protection signals together so security posture can be explained, not just enabled.
            </p>
            <CtaLink to="/contact" className="mt-8">
              Request a Sample Cloud Audit Report
            </CtaLink>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-navy-foreground/12 bg-navy-foreground/5 p-7">
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {EVIDENCE_INPUTS.map((item) => (
                  <li key={item} className="glass-panel flex items-center gap-2.5 px-3.5 py-3">
                    <KeyRound className="size-4 shrink-0 text-azure-bright" aria-hidden="true" />
                    <span className="text-xs font-bold text-navy-foreground/90">{item}</span>
                  </li>
                ))}
              </ul>
              <svg viewBox="0 0 300 40" className="mt-5 h-10 w-full" aria-hidden="true">
                {[40, 110, 190, 260].map((x) => (
                  <path
                    key={x}
                    d={`M${x} 2 C ${x} 24, 150 16, 150 38`}
                    fill="none"
                    stroke="oklch(0.655 0.175 255 / 0.5)"
                    strokeWidth="1.2"
                    strokeDasharray="5 7"
                    className="animate-dash"
                  />
                ))}
              </svg>
              <div className="rounded-2xl border border-azure/40 bg-navy-foreground/8 p-5 text-center shadow-glow">
                <p className="text-lg font-black uppercase tracking-[0.15em] text-navy-foreground">
                  Audit-ready evidence
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* SECTION 8 — ZENSUSTECH SERVICES */}
      <Section tone="white">
        <SectionHead
          eyebrow="Product plus expertise"
          title="When ZenAI-Ops Finds the Problem, ZensusTech Can Fix It."
          copy="Intelligence is only useful if someone can act on it. ZensusTech delivery teams turn findings into remediation, modernization and ongoing operations."
        />
        <div className="mt-14">
          <FlowSteps steps={LIFECYCLE} />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <FeatureCard icon={s.icon} title={s.title} copy={s.copy} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <CtaLink to="/solutions" variant="ghost">
            Talk to a Cloud Expert
          </CtaLink>
        </Reveal>
      </Section>

      {/* SECTION 9 — PROOF */}
      <Section tone="light" id="proof">
        <SectionHead eyebrow="Proof" title="A Delivery Track Record Behind the Platform" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal>
            <MetricCard value={5} suffix="+" label="Years Experience" />
          </Reveal>
          <Reveal delay={70}>
            <MetricCard value={150} suffix="+" label="Projects Delivered" />
          </Reveal>
          <Reveal delay={140}>
            <MetricCard value={98} suffix="%" label="Client Retention" />
          </Reveal>
          <Reveal delay={210}>
            <StatCard value="24×7" label="Support" />
          </Reveal>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Reveal>
            <CaseStudyCard region="UK Retail SMB" title="Cloud cost and resilience programme" results={["32% Cost Reduction", "99.9% Uptime", "4× Scalability"]} />
          </Reveal>
          <Reveal delay={80}>
            <CaseStudyCard region="India SaaS Startup" title="DevOps and delivery acceleration" results={["90% Faster Deployments", "75% Fewer Errors", "3× Team Productivity"]} />
          </Reveal>
          <Reveal delay={160}>
            <CaseStudyCard region="Manufacturing Firm" title="Managed cloud operations" results={["40% Cost Savings", "100% Compliance", "60% Faster Issue Resolution"]} />
          </Reveal>
        </div>
      </Section>

      {/* SECTION 10 — FINAL CTA */}
      <CtaBand
        eyebrow="Next step"
        title="Know Your Cloud Risk Before It Becomes Your Business Problem."
        copy="Start with a structured look at your environment — then decide what to fix first."
        primary={{ label: "Check My Cloud Environment", to: "/contact" }}
        secondary={{ label: "Book a ZenAI-Ops Demo", to: "/zenops" }}
      />

    </>
  );
}
