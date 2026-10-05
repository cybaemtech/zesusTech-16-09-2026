import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Linkedin, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white text-slate-700">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_0.9fr_1.1fr_0.8fr_1.3fr] lg:gap-0">
        {/* Col 1: Brand */}
        <div className="lg:border-r lg:border-slate-100 lg:pr-8">
          <Link to="/" className="inline-flex items-center">
            <img
              src="/logo/logo.png"
              alt="ZensusTech Logo"
              className="h-13 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 text-base font-bold text-primary">Stronger Security. Smarter Operations.</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Next-generation cloud technology and digital solutions for growing businesses across India and the UK.
          </p>

          <div className="mt-6 flex items-center gap-4 text-slate-400">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-primary"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="transition-colors hover:text-primary"
            >
              <Twitter className="size-5" />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="transition-colors hover:text-primary"
            >
              <Youtube className="size-5" />
            </a>
          </div>
        </div>

        {/* Col 2: ZenAI-Ops */}
        <nav aria-label="ZenAI-Ops" className="lg:border-r lg:border-slate-100 lg:px-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">ZENAI-OPS</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <Link to="/zenops" className="inline-block transition-colors hover:text-primary">
                Intelligent Cloud Operations
              </Link>
            </li>
          </ul>
        </nav>

        {/* Col 3: Solutions */}
        <nav aria-label="Solutions" className="lg:border-r lg:border-slate-100 lg:px-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">SOLUTIONS</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {[
              "Cloud Migration",
              "Managed Cloud Services",
              "Cloud Security & Compliance",
              "DevOps & Automation",
              "Cost Optimization",
              "Application Modernization",
            ].map((item) => (
              <li key={item}>
                <Link to="/solutions" className="inline-block transition-colors hover:text-primary">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Col 4: Company */}
        <nav aria-label="Company" className="lg:border-r lg:border-slate-100 lg:px-6">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">COMPANY</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <Link to="/case-studies" className="inline-block transition-colors hover:text-primary">
                Case Studies
              </Link>
            </li>
            <li>
              <Link to="/industries" className="inline-block transition-colors hover:text-primary">
                Industries
              </Link>
            </li>
            <li>
              <Link to="/contact" className="inline-block transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Col 5: Contact */}
        <div className="lg:pl-8">
          <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">CONTACT</h2>
          <ul className="mt-4 space-y-4 text-sm text-slate-600">
            <li className="flex items-center gap-2.5">
              <Mail className="size-4.5 text-primary shrink-0" aria-hidden="true" />
              <a href="mailto:info@zensustech.com" className="transition-colors hover:text-primary font-medium text-slate-700">
                info@zensustech.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="size-4.5 text-primary shrink-0" aria-hidden="true" />
              <a href="tel:+919823101112" className="transition-colors hover:text-primary font-medium text-slate-700">
                +91 9823 10 11 12
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4.5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary">
                  India
                </span>
                <p className="mt-1 leading-relaxed text-slate-600">
                  13H Vidya Nagar, Pune, Maharashtra 411032
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4.5 text-primary shrink-0" aria-hidden="true" />
              <div>
                <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-primary">
                  UK
                </span>
                <p className="mt-1 leading-relaxed text-slate-600">
                  27 Old Gloucester Street, London, WC1N 3AX
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <p className="mx-auto max-w-7xl px-5 text-sm text-muted-foreground sm:px-8">
          © {new Date().getFullYear()} ZensusTech. ZenAI-Ops is a product of ZensusTech. Designed by{" "}
          <a className="font-bold text-primary hover:underline" href="https://www.cybaemtech.com/" target="_blank" rel="noreferrer">
            CybaemTech.
          </a>
        </p>
      </div>
    </footer>
  );
}
