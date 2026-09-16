import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "ZenAI-Ops", to: "/zenops" },
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "Case Studies", to: "/case-studies" },
  { label: "Trust", to: "/trust" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 backdrop-blur-xl shadow-soft"
          : "border-transparent bg-background/60 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link to="/" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <img
            src="/logo/logo.png"
            alt="ZensusTech Logo"
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-10" : "h-12"
            )}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "bg-accent text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:brightness-110"
          >
            Check My Cloud Environment
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-background px-5 pb-6 pt-3 lg:hidden">
          <nav aria-label="Mobile" className="grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-muted-foreground hover:bg-accent hover:text-foreground"
                activeProps={{ className: "bg-accent text-foreground" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground"
          >
            Check My Cloud Environment
          </Link>
        </div>
      ) : null}
    </header>
  );
}
