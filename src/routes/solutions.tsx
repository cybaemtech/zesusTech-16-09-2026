import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Coins, DatabaseZap, Gauge, Globe2, Layers3, Mail, Network, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import {
  CloudPlatformCard,
  CtaBand,
  Section,
  SectionHead,
  ServiceCard,
} from "@/components/site/primitives";
import heroPoster from "@/assets/solutions-hero-poster.webp";


const TITLE = "Solutions — Cloud Migration, Managed Cloud, Security, DevOps & FinOps | ZensusTech";
const DESCRIPTION =
  "Use ZenAI-Ops to understand your cloud environment and ZensusTech expertise to transform it: migration, managed cloud services, security and compliance, DevOps, cost optimization and Microsoft 365.";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: SolutionsPage,
});

const SOLUTIONS = [
  {
    icon: Network,
    eyebrow: "Solution 01",
    title: "Cloud Migration & Modernization",
    copy: "Move legacy workloads to Cloud, AWS or GCP with structured planning, migration and post-migration validation.",
    capabilities: [
      "Cloud readiness",
      "Migration strategy",
      "Infrastructure modernization",
      "Hybrid / multi-cloud design",
      "Data migration",
      "Post-migration validation",
    ],
    cta: "Plan a Migration",
  },
  {
    icon: Gauge,
    eyebrow: "Solution 02",
    title: "Cloud Managed Services",
    copy: "24×7 cloud monitoring, management, security, FinOps and optimization; keeping your cloud secure, reliable, and cost-efficient while your team focuses on business priorities.",
    capabilities: [
      "24×7 monitoring",
      "Incident response",
      "Patch management",
      "Performance tuning",
      "Backup & disaster recovery",
      "Security monitoring",
      "Cost governance",
      "Health reporting",
    ],
    cta: "Talk to a Cloud Expert |  Get Your Cloud Assessment",
  },
  {
    icon: ShieldCheck,
    eyebrow: "Solution 03",
    title: "Cloud Security & Compliance",
    copy: "Security that goes beyond configuration with continuous assessment, threat detection, data protection, and built-in evidence readiness.",
    capabilities: [
      "Security assessment",
      "Compliance audit",
      "Threat detection",
      "Data protection",
      "Encryption",
      "Key management",
      "Evidence readiness",
    ],
    cta: "Request Cloud Audit Evidence Report",
  },
  {
    icon: DatabaseZap,
    eyebrow: "Solution 04",
    title: "DevOps & Automation",
    copy: "Accelerate delivery through automated CI/CD, reproducible infrastructure, and standardized release practices—reducing deployment risk and operational effort.",
    capabilities: [
      "CI/CD",
      "Infrastructure as Code",
      "Cloud automation",
      "Release management",
      "Kubernetes",
      "Configuration management",
    ],
    cta: "Talk to a Cloud Expert",
  },
  {
    icon: Coins,
    eyebrow: "Solution 05",
    title: "Cost Optimization / FinOps",
    copy: "Stay ahead of cloud costs with continuous analysis, proactive optimization, right-sizing, and predictive insights to prevent unexpected spend.",
    capabilities: ["Cost analysis", "Resource optimization", "Budget management", "Savings reporting"],
    cta: "Book Your Demo Today",
  },
  {
    icon: Mail,
    eyebrow: "Solution 06",
    title: "Microsoft 365",
    copy: "Move collaboration to Microsoft 365 with secure configuration and adoption support for your teams.",
    capabilities: [
      "Office 365 migration",
      "Teams deployment",
      "Security configuration",
      "User training",
    ],
    cta: "Talk to a Cloud Expert",
  },
];

function shouldSkipVideo() {
  if (typeof window === "undefined") return true;
  // Respect data-saver and slow connections: the poster image is enough.
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType && /(^|-)(2g|slow-2g)$/.test(conn.effectiveType)) return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loopsRef = useRef(0);
  // Only attach the video source on the client, after we know the network
  // and motion preferences allow it. Until then only the light poster loads.
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    setSrc("/media/solutions-hero.mp4");
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    // Try to start with audio on the first loop. Browsers block autoplay
    // with sound until the user has interacted with the page; if that
    // happens, fall back to muted so playback still starts.
    v.muted = false;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      {...(src ? { src } : {})}
      poster={heroPoster}
      autoPlay
      playsInline
      preload="metadata"
      aria-hidden="true"
      onEnded={() => {
        const v = videoRef.current;
        if (!v) return;
        loopsRef.current += 1;
        // From the second loop onward, mute and replay.
        v.muted = true;
        v.currentTime = 0;
        v.play().catch(() => {});
      }}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

const PLATFORM_PILLARS = [
  {
    icon: Sparkles,
    label: "ZenAiOps™",
    detail: "Product / platform",
  },
  {
    icon: Layers3,
    label: "Azure",
    detail: "Initial depth and strongest capability",
  },
  {
    icon: Globe2,
    label: "ZensusTech Services",
    detail: "Multi-cloud",
  },
] as const;

function PlatformPillars() {
  return (
    <div className="relative mx-auto mt-12 max-w-5xl" aria-label="Platform pillars">
      <div className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-10 hidden border-t border-dashed border-primary/35 md:block">
        <span className="absolute -top-px left-1/3 h-px w-1/4 animate-dash bg-primary/70" />
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-5">
        {PLATFORM_PILLARS.map(({ icon: Icon, label, detail }, index) => (
          <div key={label} className="relative text-center">
            <div
              className="relative mx-auto flex size-20 items-center justify-center rounded-full border border-primary/30 bg-accent text-primary shadow-glow"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              <span className="absolute inset-1 rounded-full border border-primary/20 animate-pulse-node" />
              <Icon className="relative z-10 size-7" strokeWidth={1.7} aria-hidden="true" />
            </div>
            <p className="mt-4 font-bold text-foreground">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SolutionsPage() {
  return (
    <>
      {/* On phones the section matches the video's 16:9 frame so the whole
          composition stays visible; larger screens keep the tall cinematic crop. */}
      <section className="relative aspect-video w-full overflow-hidden bg-navy sm:aspect-auto sm:h-[92vh]">
        <HeroVideo />
      </section>


      <Section tone="light">
        <div className="grid gap-6">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 50}>
              <ServiceCard {...s} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <SectionHead
          eyebrow="Platforms"
          title="ZenAiOps™ Is Azure Focused. ZensusTech Services Are Multi-Cloud."
          copy={
            <>
              <span>Built with Azure depth. Designed for the multi-cloud enterprise.</span>
              <br />
              <span>ZenAiOps™ is purpose-built for cloud operations, delivering deep visibility, automation, security, FinOps, and optimization across cloud environments. ZensusTech extends these capabilities across major cloud platforms, helping organizations securely manage, optimize, and transform their multi-cloud operations.</span>
            </>
          }
        />
        <PlatformPillars />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <CloudPlatformCard
              featured
              name="Microsoft Azure"
              role="ZENAIOPS™ + SERVICES"
              points={[
                "ZenAiOps™ + Services & ZenAiOps™ Intelligence Layer",
                "Security, identity and governance visibility",
                "Cost and operational optimization",
                "Azure Managed Services",
              ]}
            />
          </Reveal>
          <Reveal delay={80}>
            <CloudPlatformCard
              name="Amazon Web Services"
              role="ZensusTech services"
              points={["Migration and modernization", "Managed cloud services", "Security and compliance work", "Cost optimization"]}
            />
          </Reveal>
          <Reveal delay={160}>
            <CloudPlatformCard
              name="Google Cloud Platform"
              role="ZensusTech services"
              points={["Migration and modernization", "Managed cloud services", "DevOps and automation", "Cost optimization"]}
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand
        eyebrow="Next step"
        title="Find the Right Cloud Strategy for Your Business"
        primary={{ label: "Book Free Cloud Assessment", to: "/contact" }}
        secondary={{ label: "Explore ZenAI-Ops", to: "/zenops" }}
      />
    </>
  );
}
