import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand, Section } from "@/components/site/primitives";

const TITLE = "Book an Cloud Assessment — ZenAI-Ops & ZensusTech Cloud Experts";
const DESCRIPTION =
  "Tell us about your Cloud environment and challenges across security, compliance, cost and operations. We'll help identify the right next step.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const CONTACT_CHANNELS = [
  { icon: Mail, label: "Email", value: "varadmule17@gmail.com", href: "mailto:varadmule17@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 9823101112", href: "tel:+919823101112" },
  { icon: MessageCircle, label: "WhatsApp", value: "+91 9823101112", href: "https://wa.me/919823101112" },
];

const OFFICE_LOCATIONS = [
  {
    country: "India",
    addressLine1: "13H Vidya Nagar,",
    addressLine2: "Pune, Maharashtra 411032",
    mapUrl: "https://maps.google.com/?q=13H+Vidya+Nagar+Pune+Maharashtra+411032",
    flag: (
      <div className="relative size-6 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-xs">
        <svg viewBox="0 0 36 36" className="size-full">
          <rect fill="#FF9933" width="36" height="12" />
          <rect fill="#FFFFFF" y="12" width="36" height="12" />
          <rect fill="#138808" y="24" width="36" height="12" />
          <circle fill="#000080" cx="18" cy="18" r="4" />
          <circle fill="#FFFFFF" cx="18" cy="18" r="2.8" />
          <circle fill="#000080" cx="18" cy="18" r="1.2" />
        </svg>
      </div>
    ),
  },
  {
    country: "UK",
    addressLine1: "27 Old Gloucester Street,",
    addressLine2: "London, WC1N 3AX",
    mapUrl: "https://maps.google.com/?q=27+Old+Gloucester+Street+London+WC1N+3AX",
    flag: (
      <div className="relative size-6 shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-xs">
        <svg viewBox="0 0 60 60" className="size-full">
          <clipPath id="uk-flag-clip">
            <circle cx="30" cy="30" r="30" />
          </clipPath>
          <g clipPath="url(#uk-flag-clip)">
            <rect width="60" height="60" fill="#012169" />
            <path d="M0,0 L60,60 M60,0 L0,60" stroke="#fff" strokeWidth="10" />
            <path d="M0,0 L60,60 M60,0 L0,60" stroke="#C8102E" strokeWidth="5" />
            <path d="M30,0 V60 M0,30 H60" stroke="#fff" strokeWidth="16" />
            <path d="M30,0 V60 M0,30 H60" stroke="#C8102E" strokeWidth="10" />
          </g>
        </svg>
      </div>
    ),
  },
];

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden surface-mesh">
        <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-15 animate-grid-drift" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-4xl px-5 py-20 text-center sm:px-8 md:py-24">
          <Reveal>
            <p className="eyebrow text-azure-bright">Book assessment</p>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] text-navy-foreground sm:text-5xl">
              Let's Find Out What Your Cloud Environment Is Hiding.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground/70 sm:text-lg">
              Tell us about your Cloud environment and the business challenges you're facing. We'll help identify
              the right next step.
            </p>
          </Reveal>
        </div>
      </section>

      <Section tone="light">
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <div className="grid gap-4">
              {/* Contact Channels */}
              {CONTACT_CHANNELS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7"
                >
                  <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <c.icon className="size-7" aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {c.label}
                    </p>
                    <a
                      href={c.href}
                      className="mt-1 block text-base font-bold text-foreground transition-colors hover:text-primary"
                    >
                      {c.value}
                    </a>
                  </div>
                </div>
              ))}

              {/* Locations Section matching design */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-7">
                <div className="flex items-center gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="size-6" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      LOCATIONS
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-slate-600">
                      Our offices across the globe.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-3.5 sm:grid-cols-2">
                  {OFFICE_LOCATIONS.map((loc) => (
                    <a
                      key={loc.country}
                      href={loc.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-background/80 p-4 transition-all duration-200 hover:border-primary/50 hover:bg-background hover:shadow-soft"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          {loc.flag}
                          <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary">
                            {loc.country}
                          </span>
                        </div>

                        <div className="mt-3.5 text-sm font-semibold leading-snug text-slate-800">
                          <p>{loc.addressLine1}</p>
                          <p>{loc.addressLine2}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* What happens next */}
              <div className="rounded-2xl border border-primary/25 bg-accent/60 p-6">
                <p className="text-sm font-bold text-accent-foreground">What happens next</p>
                <ol className="mt-3 space-y-2 text-sm text-accent-foreground/85">
                  <li>1. We review your environment details.</li>
                  <li>2. We scope a focused Cloud assessment.</li>
                  <li>3. You get a prioritised view of risk, cost and gaps.</li>
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Your Cloud Environment Shouldn't Be a Black Box."
        primary={{ label: "Book My Cloud Assessment", to: "/contact" }}
        secondary={{ label: "Talk to a ZenAI-Ops Expert", to: "/zenops" }}
      />
    </>
  );
}
