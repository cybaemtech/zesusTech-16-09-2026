import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  Factory,
  GaugeCircle,
  GraduationCap,
  Handshake,
  Landmark,
  LineChart,
  Lock,
  Quote,
  RefreshCw,
  Rocket,
  ServerCog,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";
import { Reveal, useCountUp } from "@/components/site/Reveal";
import { TrustNetwork } from "@/components/site/TrustNetwork";
import { CtaLink, MetricCard, Section, SectionHead, StatCard } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/trust")({
  head: () => ({
    meta: [
      { title: "Trust & Testimonials | ZensusTech Cloud Partner Proof" },
      {
        name: "description",
        content:
          "Customer testimonials, measurable Cloud case-study outcomes and the delivery philosophy behind ZensusTech — proof that cloud, security and operations are in safe hands.",
      },
      { property: "og:title", content: "Trust & Testimonials | ZensusTech" },
      {
        property: "og:description",
        content:
          "Customer voice, measurable outcomes and delivery discipline: how ZensusTech earns trust with Cloud operations, security and cost teams.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrustPage,
});

const TESTIMONIALS = [
  {
    quote:
      "ZensusTech transformed our cloud infrastructure completely. Their Cloud migration strategy was flawless, and the cost savings exceeded our expectations. The team's expertise and dedication are exceptional.",
    name: "Sourabh Tiwari",
    role: "Chief Technology Officer",
    company: "Codinker",
    category: "IT Services Company",
    needed: "Cloud migration",
    delivered: "Cloud transformation",
    changed: "Lower cost + improved scalability",
    outcomes: ["32% cost reduction", "99.9% uptime", "4× scalability"],
  },
  {
    quote:
      "The DevOps automation implementation by ZensusTech revolutionized our development process. Deployment times went from hours to minutes, and our team's productivity tripled. Highly recommended!",
    name: "Vijender Singh",
    role: "Founder & CEO",
    company: "ByteKode Labs",
    category: "SaaS Platform",
    needed: "DevOps automation",
    delivered: "CI/CD pipelines + release automation",
    changed: "Faster, more reliable delivery",
    outcomes: ["90% faster deployments", "75% fewer errors"],
  },
  {
    quote:
      "As a growing real estate platform, we needed reliable cloud infrastructure. ZensusTech provided 24/7 managed services that ensured our platform never went down during peak traffic. Outstanding support!",
    name: "Thejes Gowda",
    role: "Operations Director",
    company: "UrbanVistaa",
    category: "Real Estate Platform",
    needed: "Reliable managed cloud operations",
    delivered: "24×7 managed services + monitoring",
    changed: "Availability through peak traffic",
    outcomes: ["40% cost savings", "60% faster issue resolution"],
  },
] as const;

const PILLARS = [
  { n: "01", title: "Transparency", copy: "Clear communication from discovery through delivery." },
  {
    n: "02",
    title: "Security First",
    copy: "Security and governance are considered throughout the technology lifecycle.",
  },
  { n: "03", title: "Measurable Results", copy: "Focus on outcomes, not activity." },
  { n: "04", title: "Long-Term Partnership", copy: "Operate as an extension of the customer's team." },
  { n: "05", title: "Continuous Improvement", copy: "Cloud environments should continuously evolve." },
] as const;

const JOURNEY = [
  { title: "Discover", copy: "Understand the business and technology environment.", icon: Compass },
  { title: "Design", copy: "Define the right strategy and architecture.", icon: Sparkles },
  { title: "Deliver", copy: "Implement with minimal disruption.", icon: Rocket },
  { title: "Operate", copy: "Monitor and support continuously.", icon: ServerCog },
  { title: "Improve", copy: "Optimize performance, cost and security.", icon: RefreshCw },
] as const;

const OUTCOME_BLOCKS = [
  {
    title: "Security",
    question: "Can I trust my environment?",
    icon: ShieldCheck,
    items: ["Cloud security", "Threat detection", "Data protection", "Compliance"],
  },
  {
    title: "Continuity",
    question: "Can I trust my systems to stay available?",
    icon: GaugeCircle,
    items: ["Monitoring", "Backup", "Disaster Recovery", "Incident Response"],
  },
  {
    title: "Economics",
    question: "Can I trust my cloud spending?",
    icon: LineChart,
    items: ["Cost Analysis", "Optimization", "Budget Management", "Savings Reporting"],
  },
  {
    title: "Growth",
    question: "Can I trust my technology to scale?",
    icon: Rocket,
    items: ["Modernization", "DevOps", "Automation", "Scalable Architecture"],
  },
] as const;

const INDUSTRIES = [
  { name: "Retail & E-commerce", concern: "Peak-traffic reliability + cost control", icon: ShoppingBag },
  { name: "Manufacturing", concern: "Security + operational continuity + cost control", icon: Factory },
  { name: "SaaS & Technology", concern: "Release velocity + scalable architecture", icon: Rocket },
  { name: "Real Estate", concern: "Availability + 24×7 managed operations", icon: Landmark },
  { name: "Education", concern: "Scalable access + data protection", icon: GraduationCap },
  { name: "Financial Services", concern: "Compliance + governance evidence", icon: Lock },
] as const;

const PARTNERS = ["Codinker", "MR Enterprises", "ByteKode Labs", "UrbanVistaa", "Digitalnation247"] as const;

const PROBLEMS = [
  {
    key: "Security",
    concern: "Unclear exposure across Cloud workloads",
    capability: "Cloud security review + threat detection + governance",
    outcome: "Security and compliance posture made visible and enforceable",
  },
  {
    key: "Cost",
    concern: "Rising Cloud spend",
    capability: "Cost analysis + resource optimization",
    outcome: "32% Cost Reduction",
  },
  {
    key: "Availability",
    concern: "Downtime risk during peak traffic",
    capability: "24×7 managed services + proactive monitoring",
    outcome: "60% Faster Issue Resolution",
  },
  {
    key: "Compliance",
    concern: "No continuous evidence for audits",
    capability: "Policy baselines + governance reporting via ZenAI-Ops",
    outcome: "Continuous compliance evidence instead of quarterly snapshots",
  },
  {
    key: "Scale",
    concern: "Delivery slowed by manual release steps",
    capability: "DevOps automation + CI/CD pipelines",
    outcome: "90% Faster Deployments",
  },
] as const;

const ZENOPS_PILLARS = [
  { title: "See", copy: "Cloud visibility", icon: Eye },
  { title: "Understand", copy: "Risk intelligence", icon: BarChart3 },
  { title: "Act", copy: "Operational action", icon: Wrench },
  { title: "Prove", copy: "Governance & evidence", icon: BadgeCheck },
] as const;

function TrustPage() {
  return (
    <>
      <TrustHero />
      <ProofStrip />
      <TestimonialExperience />
      <TrustNumbers />
      <BeforeAfter />
      <WhyClientsStay />
      <TrustJourney />
      <TrustByOutcome />
      <ZenOpsBridge />
      <IndustryRail />
      <Partners />
      <ProblemMap />
      <ExecutiveTrust />
      <TestimonialWall />
      <FinalCta />
      <MobileCtaBar />
    </>
  );
}

function TrustHero() {
  return (
    <section className="surface-mesh relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-20 animate-grid-drift" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-azure-bright">Trust is built. Not claimed.</p>
          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl md:text-6xl">
            Businesses Don't Trust Technology.{" "}
            <span className="text-gradient-azure">They Trust Outcomes.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-foreground/75 sm:text-lg">
            Cloud infrastructure is too important to hand over to a vendor based only on a list of services.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-foreground/70">
            ZensusTech builds trust through measurable outcomes, transparent execution, dependable support and
            long-term technology partnerships.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaLink to="/contact">Talk to a Cloud Expert</CtaLink>
            <CtaLink to="/case-studies" variant="onDark">
              Explore Our Case Studies
            </CtaLink>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <TrustNetwork />
          <p className="mt-6 text-center text-sm text-navy-foreground/60">
            Trust is not one thing. It is the combination of many successful interactions.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProofStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-px px-0 sm:px-8 lg:grid-cols-4">
        {[
          { value: "5+", label: "Years Experience" },
          { value: "150+", label: "Projects Delivered" },
          { value: "98%", label: "Client Retention" },
          { value: "24×7", label: "Support" },
        ].map((m, i) => (
          <Reveal
            key={m.label}
            delay={i * 80}
            className="border-b border-border p-8 text-center last:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b-0"
          >
            <p className="text-3xl font-extrabold text-primary sm:text-4xl md:text-5xl">{m.value}</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">{m.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TestimonialExperience() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index]!;
  const total = TESTIMONIALS.length;

  const go = (dir: number) => setIndex((prev) => (prev + dir + total) % total);

  return (
    <Section tone="light">
      <SectionHead
        title="Don't Take Our Word for It."
        copy="Hear directly from the people responsible for technology, operations and business outcomes."
      />

      <Reveal className="mt-14">
        <figure className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-elevated sm:p-12">
          <Quote className="absolute right-8 top-8 size-20 text-accent" aria-hidden="true" />
          <div key={index} className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
            <blockquote className="max-w-4xl text-2xl font-extrabold leading-[1.25] tracking-tight text-foreground sm:text-3xl md:text-[2.6rem]">
              “{t.quote}”
            </blockquote>

            <figcaption className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-lg font-bold sm:text-xl">{t.name}</p>
                <p className="mt-1 text-sm font-semibold text-muted-foreground">{t.role}</p>
                <p className="mt-3 text-base font-extrabold text-primary">{t.company}</p>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">{t.category}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.outcomes.map((o) => (
                  <span
                    key={o}
                    className="rounded-full border border-primary/25 bg-accent px-3.5 py-1.5 text-xs font-bold text-accent-foreground"
                  >
                    {o}
                  </span>
                ))}
              </div>
            </figcaption>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "What they needed", value: t.needed },
                { label: "What ZensusTech delivered", value: t.delivered },
                { label: "What changed", value: t.changed },
              ].map((panel) => (
                <div key={panel.label} className="rounded-2xl border border-border bg-secondary/60 p-5">
                  <p className="eyebrow text-muted-foreground">{panel.label}</p>
                  <p className="mt-2 text-sm font-bold text-secondary-foreground">{panel.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-border pt-7">
            <p className="text-sm font-black tracking-[0.18em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="inline-flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
          <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </figure>
      </Reveal>
    </Section>
  );
}

function TrustNumbers() {
  const metrics = [
    { value: 32, suffix: "%", label: "Cost Reduction" },
    { value: 99.9, suffix: "%", label: "Uptime", literal: "99.9%" },
    { value: 90, suffix: "%", label: "Faster Deployments" },
    { value: 75, suffix: "%", label: "Fewer Errors" },
    { value: 40, suffix: "%", label: "Cost Savings" },
    { value: 60, suffix: "%", label: "Faster Issue Resolution" },
  ];
  return (
    <Section tone="navy">
      <SectionHead
        invert
        eyebrow="Trust has numbers"
        title="Trust Becomes More Credible When You Can Measure It."
        copy="Every figure below comes from a documented ZensusTech case study."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {metrics.map((m, i) => (
          <Reveal key={m.label} delay={i * 70}>
            {m.literal ? (
              <BigStat value={m.literal} label={m.label} />
            ) : (
              <BigCount value={m.value} suffix={m.suffix} label={m.label} />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function BigCount({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="glass-panel h-full p-7 text-center sm:p-9">
      <p className="text-4xl font-extrabold text-azure-bright sm:text-5xl md:text-6xl">
        <span ref={ref}>{current}</span>
        {suffix}
      </p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground/70">{label}</p>
    </div>
  );
}

function BigStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass-panel h-full p-7 text-center sm:p-9">
      <p className="text-4xl font-extrabold text-azure-bright sm:text-5xl md:text-6xl">{value}</p>
      <p className="mt-3 text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground/70">{label}</p>
    </div>
  );
}

function BeforeAfter() {
  return (
    <Section tone="white">
      <SectionHead
        eyebrow="Before → After"
        title="From Cloud Chaos to Operational Confidence."
        copy="Drag the slider to see how environments typically change across a ZensusTech engagement."
      />
      <Reveal className="mt-12">
        <BeforeAfterSlider />
      </Reveal>
    </Section>
  );
}

function WhyClientsStay() {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="rounded-3xl border border-primary/25 bg-card p-8 shadow-glow">
            <p className="text-5xl font-extrabold text-primary md:text-6xl">98%</p>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Client Retention
            </p>
          </div>
          <h2 className="mt-9 text-3xl font-extrabold sm:text-4xl">
            The First Project Builds Confidence. The Partnership Builds Trust.
          </h2>
        </Reveal>
        <ol className="grid gap-4">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.n} delay={i * 70}>
              <div className="flex gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated">
                <span className="text-sm font-black text-muted-foreground/50">{p.n}</span>
                <div>
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function TrustJourney() {
  return (
    <Section tone="white">
      <SectionHead eyebrow="Trust journey" title="How Every Engagement Runs." />
      <ol className="mt-14 grid gap-4 md:grid-cols-5">
        {JOURNEY.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 80} className="h-full">
            <div className="relative h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <p className="eyebrow mt-5 text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-10 text-center">
        <p className="text-xl font-extrabold sm:text-2xl">We don't disappear after deployment.</p>
      </Reveal>
    </Section>
  );
}

function TrustByOutcome() {
  const [active, setActive] = useState(0);
  return (
    <Section tone="light">
      <SectionHead
        eyebrow="Trust by business outcome"
        title="Executives Don't Buy Technology. They Buy Certainty."
      />
      <div className="mt-14 grid snap-x snap-mandatory auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto pb-4 md:grid-flow-row md:auto-cols-auto md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
        {OUTCOME_BLOCKS.map((b, i) => (
          <Reveal key={b.title} delay={i * 70} className="h-full snap-start">
            <button
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                "h-full w-full rounded-3xl border p-8 text-left transition-all duration-300",
                active === i
                  ? "border-primary/45 bg-card shadow-glow"
                  : "border-border bg-card shadow-soft hover:-translate-y-1",
              )}
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                <b.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold uppercase tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{b.question}</p>
              <ul className="mt-6 space-y-2">
                {b.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function ZenOpsBridge() {
  return (
    <Section tone="mesh">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
      <div className="relative">
        <SectionHead
          invert
          eyebrow="Trust, continuously"
          title="What If You Could See the Risk Before Your Customer Does?"
          copy="Trust should not depend on a quarterly review. ZenAI-Ops is designed to provide continuous intelligence across your Cloud environment, helping teams identify security, operational, compliance and cost concerns earlier."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ZENOPS_PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <div className="glass-panel h-full p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-azure/25 text-azure-bright">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-extrabold uppercase tracking-tight text-navy-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-navy-foreground/70">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-navy-foreground/70">
          <span>Customer trust</span>
          <ArrowRight className="size-4 text-azure-bright" aria-hidden="true" />
          <span>Continuous cloud intelligence</span>
          <ArrowRight className="size-4 text-azure-bright" aria-hidden="true" />
          <span className="text-azure-bright">ZenAI-Ops</span>
        </Reveal>
        <div className="mt-9 flex justify-center">
          <CtaLink to="/zenops">Explore ZenAI-Ops</CtaLink>
        </div>
      </div>
    </Section>
  );
}

function IndustryRail() {
  return (
    <Section tone="white">
      <SectionHead eyebrow="Trusted across business contexts" title="Different Industries. The Same Expectation." />
      <div className="mt-14 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-[45%] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-3 lg:overflow-visible">
        {INDUSTRIES.map((ind, i) => (
          <Reveal key={ind.name} delay={i * 60} className="h-full snap-start">
            <div className="group h-full rounded-2xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-elevated">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-primary">
                <ind.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{ind.name}</h3>
              <p className="mt-2 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                {ind.concern}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Partners() {
  return (
    <Section tone="light" className="py-14 md:py-16">
      <Reveal className="text-center">
        <p className="eyebrow text-muted-foreground">Businesses we've worked with</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {PARTNERS.map((p) => (
            <li
              key={p}
              className="text-lg font-extrabold tracking-tight text-muted-foreground/55 transition-all duration-300 hover:text-foreground sm:text-xl"
            >
              {p}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}

function ProblemMap() {
  const [active, setActive] = useState(1);
  const p = PROBLEMS[active]!;
  return (
    <Section tone="navy">
      <SectionHead invert eyebrow="Interactive trust map" title="Every Engagement Starts With a Business Problem." />
      <div className="mt-14 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal className="flex flex-wrap gap-2.5 lg:flex-col">
          {PROBLEMS.map((item, i) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={cn(
                "rounded-xl border px-5 py-3.5 text-sm font-bold transition-all duration-300 lg:w-full lg:text-left",
                active === i
                  ? "border-azure-bright/50 bg-azure/25 text-navy-foreground shadow-glow"
                  : "border-navy-foreground/12 bg-navy-foreground/5 text-navy-foreground/65 hover:bg-navy-foreground/10",
              )}
            >
              {item.key}
            </button>
          ))}
        </Reveal>
        <Reveal key={active} delay={40}>
          <div className="glass-panel grid gap-5 p-7 sm:p-9">
            {[
              { label: "Business concern", value: p.concern },
              { label: "ZensusTech capability", value: p.capability },
              { label: "Outcome", value: p.outcome, highlight: true },
            ].map((row) => (
              <div key={row.label}>
                <p className="eyebrow text-azure-bright">{row.label}</p>
                <p
                  className={cn(
                    "mt-2",
                    row.highlight
                      ? "text-2xl font-extrabold text-navy-foreground sm:text-3xl"
                      : "text-base font-semibold text-navy-foreground/80",
                  )}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function ExecutiveTrust() {
  const statements = [
    { title: "One Accountable Partner", copy: "Strategy, implementation and managed operations.", icon: Handshake },
    {
      title: "One Technology Journey",
      copy: "Migration → Modernization → Security → Optimization → Operations.",
      icon: Compass,
    },
    {
      title: "One Long-Term Relationship",
      copy: "A partner invested beyond the initial project.",
      icon: BadgeCheck,
    },
  ];
  return (
    <Section tone="white">
      <SectionHead
        align="left"
        title="You Don't Need Another Vendor. You Need a Technology Partner."
        copy="ZensusTech combines cloud expertise, security-first thinking and operational discipline to help growing businesses make technology a competitive advantage rather than an operational burden."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {statements.map((s, i) => (
          <Reveal key={s.title} delay={i * 80} className="h-full">
            <div className="h-full rounded-2xl border border-border bg-background p-7">
              <s.icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function TestimonialWall() {
  const [lead, ...rest] = TESTIMONIALS;
  return (
    <Section tone="light">
      <SectionHead eyebrow="In their words" title="The Full Record." />
      <div className="mt-14 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <Reveal className="h-full">
          <figure className="relative h-full overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-elevated sm:p-11">
            <Quote className="size-10 text-accent" aria-hidden="true" />
            <blockquote className="mt-6 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl md:text-3xl">
              “{lead!.quote}”
            </blockquote>
            <figcaption className="mt-8 border-t border-border pt-6 text-sm">
              <span className="block font-bold">{lead!.name}</span>
              <span className="block text-muted-foreground">{lead!.role}</span>
              <span className="mt-2 block font-extrabold text-primary">{lead!.company}</span>
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {lead!.category}
              </span>
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid gap-4">
          {rest.map((t, i) => (
            <Reveal key={t.company} delay={(i + 1) * 80} className="h-full">
              <figure className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft">
                <Quote className="size-7 text-accent" aria-hidden="true" />
                <blockquote className="mt-4 text-base font-bold leading-relaxed sm:text-lg">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4 text-sm">
                  <span className="block font-bold">{t.name}</span>
                  <span className="block text-muted-foreground">{t.role}</span>
                  <span className="mt-1.5 block font-extrabold text-primary">{t.company}</span>
                  <span className="block text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {t.category}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        <MetricCard value={150} suffix="+" label="Projects Delivered" />
        <MetricCard value={98} suffix="%" label="Client Retention" />
        <StatCard value="24×7" label="Managed Support" />
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <Section tone="mesh" className="pb-28 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="eyebrow text-azure-bright">Ready when you are</p>
        <h2 className="mt-5 text-3xl font-extrabold text-navy-foreground sm:text-4xl md:text-5xl">
          Trust Your Cloud to the People Who Think Beyond the Cloud.
        </h2>
        <p className="mt-6 text-base text-navy-foreground/75 sm:text-lg">
          Whether you need to secure Cloud, optimize cloud costs, modernize infrastructure, automate delivery or
          operate your environment with confidence, ZensusTech can help.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaLink to="/contact">Book a Free Cloud Assessment</CtaLink>
          <CtaLink to="/zenops" variant="onDark">
            Explore ZenAI-Ops
          </CtaLink>
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-sm italic text-navy-foreground/60">
          Trust is not a badge on the website. It is the outcome of everything you do after the customer says yes.
        </p>
      </div>
    </Section>
  );
}

function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur-xl lg:hidden">
      <Link
        to="/contact"
        className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground shadow-glow"
      >
        Book Free Assessment
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
