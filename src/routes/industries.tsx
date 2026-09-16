import { createFileRoute } from "@tanstack/react-router";
import { Banknote, Building, Cpu, Factory, GraduationCap, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { IndustryVoices } from "@/components/site/IndustryVoices";
import { CtaBand, IndustryCard, Section, SectionHead } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import splitImg from "@/assets/industries-split.webp";
import splitImgSmall from "@/assets/industries-split-800.webp";

const TITLE = "Industries & Cloud Use Cases — SaaS, Retail, Manufacturing, Finance | ZenAI-Ops";
const DESCRIPTION =
  "See how ZenAI-Ops and ZensusTech address real Cloud problems by industry: cost, security, compliance readiness, identity risk and operational visibility.";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/industries" },
    ],
    // The hero <img> itself carries fetchPriority="high" + a responsive
    // srcset, which is enough for the LCP without a duplicate preload fetch.
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

const INDUSTRIES = [
  {
    icon: Cpu,
    title: "SaaS & Technology",
    problem: "Rapid Cloud growth, complex environments, frequent deployments and security requirements.",
    zenops: ["Security", "Operational visibility", "Cost intelligence", "Governance"],
    zensustech: ["DevOps", "Cloud modernization", "Managed operations"],
  },
  {
    icon: ShoppingCart,
    title: "Retail & E-commerce",
    problem: "Seasonal demand, unpredictable traffic and cost pressure.",
    zenops: ["Operational health", "Cost visibility", "Security"],
    zensustech: ["Scalable infrastructure", "Cloud optimization", "Managed services"],
  },
  {
    icon: Factory,
    title: "Manufacturing",
    problem: "Business-critical infrastructure, limited IT resources and security concerns.",
    zenops: ["Monitoring", "Governance", "Cost optimization", "Security posture"],
    zensustech: ["Managed cloud services", "Security", "Backup / DR"],
  },
  {
    icon: Building,
    title: "Real Estate",
    problem: "Customer-facing digital platforms with growing infrastructure needs.",
    zenops: ["Availability", "Security", "Cost control"],
    zensustech: ["Cloud architecture", "Managed services", "Application modernization"],
  },
  {
    icon: GraduationCap,
    title: "Education",
    problem: "Digital platforms require scalable and reliable infrastructure.",
    zenops: ["Operational visibility", "Security", "Governance"],
    zensustech: ["Cloud transformation", "Managed services"],
  },
  {
    icon: Banknote,
    title: "Financial Services",
    problem: "Sensitive information, security requirements and compliance expectations.",
    zenops: ["Security", "Governance", "Audit visibility"],
    zensustech: ["Cloud security", "Compliance", "Managed operations"],
  },
];

const USE_CASES = [
  {
    q: "Is Cloud spending too much?",
    a: "ZenAI-Ops highlights idle resources, overprovisioned infrastructure and spend patterns that drift over time. ZensusTech cost optimization then handles right-sizing, budget governance and savings reporting.",
  },
  {
    q: "Are we actually secure?",
    a: "Security posture is assembled from configuration, exposure and protection signals rather than a single dashboard, so weaknesses become visible. ZensusTech security assessments and remediation follow up on what matters most.",
  },
  {
    q: "Are we audit-ready?",
    a: "ZenAI-Ops is designed to keep policy alignment, control visibility and supporting evidence in one place, so audits and customer security questionnaires do not start from scratch every time.",
  },
  {
    q: "Do we have risky identities?",
    a: "Identity and access intelligence surfaces privileged accounts, unusual sign-in behaviour and access sprawl — the areas most often exploited in cloud incidents.",
  },
  {
    q: "Do we have cloud blind spots?",
    a: "Unified Cloud visibility maps subscriptions, resources and configuration so untracked or forgotten workloads stop hiding between environments.",
  },
  {
    q: "Are operational issues being detected early?",
    a: "Operational intelligence watches health and reliability signals so degradation is noticed before users report it. ZensusTech managed services can own the response 24×7.",
  },
  {
    q: "Do we need more CloudOps capacity?",
    a: "If your team is stretched, ZenAI-Ops extends how much Cloud surface a small team can cover, and ZensusTech managed cloud services add capacity without hiring a specialist function.",
  },
];

function IndustriesPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Full-bleed hero background image — mirrored so cloud sits on the right */}
        <img
          src={splitImg}
          srcSet={`${splitImgSmall} 800w, ${splitImg} 1600w`}
          sizes="100vw"
          alt="Cloud cloud operations network with connected nodes and data flows"
          width={1600}
          height={1600}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-x-[-1] object-cover object-center"
        />
        {/* Legibility overlays: darken base + left-side gradient for text */}
        <div
          className="pointer-events-none absolute inset-0 bg-navy/55"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(6,26,58,0.92) 0%, rgba(6,26,58,0.45) 65%, rgba(6,26,58,0.15) 100%)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start justify-center px-5 py-24 sm:px-8 md:py-32">
          <div className="max-w-xl text-left">
            <Reveal>
              <p className="eyebrow text-azure-bright">Industries & use cases</p>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
                Built Around the Problems Growing Businesses Actually Face
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Business situation → cloud problem → ZenAI-Ops value → ZensusTech intervention.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="light">
        <div className="grid gap-5 lg:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.title} delay={i * 60}>
              <IndustryCard {...ind} />
            </Reveal>
          ))}
        </div>
      </Section>

      <IndustryVoices />

      <Section tone="white" id="use-cases">
        <SectionHead
          eyebrow="Use cases"
          title="What Problem Are You Trying to Solve?"
          copy="Pick the question that sounds like your environment."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-3">
          {USE_CASES.map((uc, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={uc.q} delay={i * 40}>
                <div
                  className={cn(
                    "rounded-2xl border bg-background transition-colors",
                    isOpen ? "border-primary/40 shadow-soft" : "border-border",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-bold sm:text-lg">{uc.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-primary transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen ? (
                    <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">{uc.a}</p>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Get My Cloud Health Check"
        copy="Tell us which question matters most and we'll start there."
        primary={{ label: "Book Your Demo Today", to: "/contact" }}
        secondary={{ label: "Book a ZenAI-Ops Demo", to: "/zenops" }}
      />
    </>
  );
}
