import { Reveal } from "@/components/site/Reveal";
import { CtaLink } from "@/components/site/primitives";
import v1 from "@/assets/voice-1.webp";
import v2 from "@/assets/voice-2.webp";
import v3 from "@/assets/voice-3.webp";
import v4 from "@/assets/voice-4.webp";
import v5 from "@/assets/voice-5.webp";
import v6 from "@/assets/voice-6.webp";

// Arch layout: [src, alt, translateY (rem), scale]
const LEFT: Array<[string, string, number, number]> = [
  [v1, "Software engineer working at an office desk", 3.5, 0.82],
  [v2, "IT operations manager in a data center", 1, 0.95],
  [v6, "SaaS product leader in an open-plan office", -0.5, 1],
];

const RIGHT: Array<[string, string, number, number]> = [
  [v3, "Finance executive in a glass meeting room", -0.5, 1],
  [v5, "Retail operations lead reviewing stock on a tablet", 1, 0.95],
  [v4, "Manufacturing supervisor on the factory floor", 3.5, 0.82],
];

function Tile({ item, hideOnMobile }: { item: [string, string, number, number]; hideOnMobile?: boolean }) {
  const [src, alt, y, scale] = item;
  return (
    <div
      className={`${
        hideOnMobile ? "hidden sm:block " : ""
      }w-[clamp(4.25rem,17vw,8.5rem)] shrink-0 overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-transform duration-500 hover:-translate-y-1.5`}
      style={{ transform: `translateY(${y}rem) scale(${scale})` }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={512}
        height={640}
        className="aspect-[4/5] w-full object-cover"
      />
    </div>
  );
}

export function IndustryVoices() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-backdrop opacity-[0.07]" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Phones only fit four arches, so the smallest outer tiles drop out below sm. */}
        <div className="flex items-end justify-center gap-2 sm:gap-4">
          {LEFT.map((item, i) => (
            <Tile key={item[0]} item={item} hideOnMobile={i === 0} />
          ))}
          <div className="hidden w-[clamp(4.5rem,11vw,8.5rem)] shrink-0 sm:block" aria-hidden="true" />
          {RIGHT.map((item, i) => (
            <Tile key={item[0]} item={item} hideOnMobile={i === RIGHT.length - 1} />
          ))}
        </div>


        <Reveal className="relative mt-10 text-center sm:mt-4">
          <span className="eyebrow inline-flex rounded-full bg-secondary px-4 py-2 text-secondary-foreground">
            Industry voices
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold uppercase leading-[1.05] sm:text-4xl lg:text-5xl">
            Empowering Cloud Teams Across Every Industry
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            The same platform serves SaaS engineers, retail operators, plant supervisors and finance leaders — each
            with the visibility their environment demands.
          </p>
          <div className="mt-9 flex justify-center">
            <CtaLink to="/case-studies">Explore Client Case Studies</CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
