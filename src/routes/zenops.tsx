import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  Coins,
  Eye,
  FileCheck2,
  Fingerprint,
  Gauge,
  Lightbulb,
  ScrollText,
  ShieldCheck,
  Target,
  Users,
  Wrench,
} from "lucide-react";
import { ProductDashboard } from "@/components/site/ProductDashboard";
import { Reveal } from "@/components/site/Reveal";
import {
  CtaBand,
  CtaLink,
  FeatureCard,
  Section,
  SectionHead,
} from "@/components/site/primitives";

const TITLE = "ZenAI-Ops — Intelligent Cloud Operations, Security, Compliance & Cost Platform";
const DESCRIPTION =
  "ZenAI-Ops unifies Cloud security, identity, cost, compliance and operational signals into one intelligence layer: see, understand, act and prove.";

export const Route = createFileRoute("/zenops")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/zenops" },
    ],
    links: [{ rel: "canonical", href: "/zenops" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ZenAI-Ops",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Cloud",
          description: DESCRIPTION,
          brand: { "@type": "Brand", name: "ZensusTech" },
        }),
      },
    ],
  }),
  component: ZenOpsPage,
});

const PILLARS = [
  { icon: Eye, tag: "See", title: "Unified Cloud visibility", copy: "Bring subscriptions, resources, identities and configuration into a single operational picture." },
  { icon: Lightbulb, tag: "Understand", title: "Contextual intelligence and prioritization", copy: "Separate noise from the issues that actually carry security, cost or reliability weight." },
  { icon: Wrench, tag: "Act", title: "Action-oriented response", copy: "Turn findings into a prioritised remediation and operational response plan." },
  { icon: FileCheck2, tag: "Prove", title: "Governance and audit evidence", copy: "Support governance, compliance narratives and evidence readiness with less manual effort." },
];

const CAPABILITIES = [
  { icon: Gauge, title: "Cloud Visibility", copy: "Subscriptions, resources, configuration and environment structure in one view." },
  { icon: ShieldCheck, title: "Security Intelligence", copy: "Posture weaknesses, exposure and risky configuration surfaced continuously." },
  { icon: Fingerprint, title: "Identity & Access Intelligence", copy: "Privileged access, unusual sign-in behaviour and identity sprawl signals." },
  { icon: Coins, title: "Cost Intelligence", copy: "Waste, idle capacity and optimization opportunities across the estate." },
  { icon: ScrollText, title: "Compliance & Governance", copy: "Policy alignment, control visibility and evidence for audits and questionnaires." },
  { icon: Activity, title: "Operational Intelligence", copy: "Health, reliability and operational issues detected earlier." },
];

const PERSONAS = [
  { role: "For CTOs", promise: "Know whether your cloud environment is becoming a business risk." },
  { role: "For IT Heads", promise: "Manage more Cloud complexity without continuously adding people." },
  { role: "For Security Leaders", promise: "Identify risks and improve compliance visibility." },
  { role: "For DevOps Teams", promise: "Move from reactive monitoring to proactive operations." },
];

function ZenOpsPage() {
  return (
    <>
      <section className="relative overflow-hidden surface-mesh">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-8 md:py-28">
          <Reveal>
            <p className="eyebrow text-azure-bright">ZenAI-Ops — Intelligent Cloud Operations</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl lg:text-6xl">
              One Intelligence Layer for Your Entire Cloud Environment.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
              ZenAI-Ops continuously brings together the signals that matter across Cloud security, operations,
              governance and cost—so your team can see what matters, understand why it matters and act faster.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <CtaLink to="/contact">Book a ZenAI-Ops Demo</CtaLink>
              <CtaLink to="/contact" variant="onDark">
                Request Cloud Health Check
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="light">
        <SectionHead
          eyebrow="Product visualization"
          title="A Command Center for Your Cloud Estate"
          copy="A conceptual view of how ZenAI-Ops presents health, risk, cost and compliance signals side by side."
        />
        <Reveal className="mt-14">
          <ProductDashboard />
        </Reveal>
      </Section>

      <Section tone="white">
        <SectionHead eyebrow="Product architecture" title="See. Understand. Act. Prove." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal key={p.tag} delay={i * 70}>
              <div className="h-full rounded-3xl border border-border bg-background p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="eyebrow mt-5 text-primary">{p.tag}</p>
                <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <SectionHead
          eyebrow="Capability matrix"
          title="Six Capabilities, One Operational Picture"
          copy="Capabilities describe how ZenAI-Ops is positioned to support your Cloud environment."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <FeatureCard icon={c.icon} title={c.title} copy={c.copy} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHead eyebrow="Built for your role" title="What ZenAI-Ops Means for Your Team" invert />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PERSONAS.map((p, i) => (
            <Reveal key={p.role} delay={i * 70}>
              <div className="h-full rounded-3xl border border-navy-foreground/12 bg-navy-foreground/5 p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-azure/25 text-azure-bright">
                    {p.role.includes("CTO") ? (
                      <Target className="size-5" aria-hidden="true" />
                    ) : p.role.includes("Security") ? (
                      <ShieldCheck className="size-5" aria-hidden="true" />
                    ) : p.role.includes("DevOps") ? (
                      <Activity className="size-5" aria-hidden="true" />
                    ) : (
                      <Users className="size-5" aria-hidden="true" />
                    )}
                  </span>
                  <p className="eyebrow text-azure-bright">{p.role}</p>
                </div>
                <p className="mt-5 text-lg font-bold text-navy-foreground">{p.promise}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        eyebrow="Assessment"
        title="What Would ZenAI-Ops Find in Your Cloud Environment?"
        copy="We'll walk your environment with you and show where the risk, waste and gaps are concentrated."
        primary={{ label: "Book My Cloud Assessment", to: "/contact" }}
        secondary={{ label: "Talk to a Cloud Expert", to: "/solutions" }}
      />
    </>
  );
}
