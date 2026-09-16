import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";


const COMPANY_SIZES = ["1–20", "21–50", "51–100", "101–250", "251–500", "500+"];
const CLOUDS = ["Microsoft Cloud", "AWS", "Google Cloud", "Hybrid / Multi-cloud", "On-premises", "Not sure"];
const CLOUD_SIZE = [
  "1 subscription",
  "2–5 subscriptions",
  "6–15 subscriptions",
  "15+ subscriptions",
  "Not sure",
];
const CHALLENGES = [
  "Security",
  "Compliance",
  "Cloud Costs",
  "Cloud Operations",
  "Identity / Access",
  "Infrastructure Visibility",
  "Migration",
  "Modernization",
  "DevOps",
  "Managed Services",
  "Other",
];

const fieldClass =
  // 16px on phones so iOS Safari doesn't zoom the viewport when a field is focused.
  "w-full rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-ring/30 sm:text-sm";
const labelClass = "mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const res = await fetch("/mail.php", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      
      if (!res.ok || data.success === false) {
        throw new Error(data.error || data.message || "Failed to submit request.");
      }
      
      setSubmissionId(data.id || "Success");
      toast.success(data.message || "Assessment request submitted successfully! Check your inbox.");
      setSubmitted(true);
      form.reset();
    } catch (err: unknown) {
      console.error("Form submit error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to submit request.");
    } finally {
      setIsSubmitting(false);
    }
  }



  return (
    <form
      suppressHydrationWarning
      className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-extrabold">Let's Start With Your Environment</h2>
      <p className="mt-2 text-sm text-muted-foreground">Fields marked * are required.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="fullName">
            Full Name*
          </label>
          <input
            id="fullName"
            name="fullName"
            required
            suppressHydrationWarning
            className={fieldClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Business Email*
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            suppressHydrationWarning
            className={fieldClass}
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            suppressHydrationWarning
            className={fieldClass}
            placeholder="+91 …"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            Company Name*
          </label>
          <input
            id="company"
            name="company"
            required
            suppressHydrationWarning
            className={fieldClass}
            placeholder="Company"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="role">
            Job Role
          </label>
          <input
            id="role"
            name="role"
            suppressHydrationWarning
            className={fieldClass}
            placeholder="CTO, IT Head, DevOps…"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="size">
            Company Size
          </label>
          <select
            id="size"
            name="size"
            suppressHydrationWarning
            className={fieldClass}
            defaultValue=""
          >
            <option value="">Select</option>
            {COMPANY_SIZES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="cloud">
            Current Cloud Platform
          </label>
          <select
            id="cloud"
            name="cloud"
            suppressHydrationWarning
            className={fieldClass}
            defaultValue=""
          >
            <option value="">Select</option>
            {CLOUDS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="cloudSize">
            Cloud Environment Size
          </label>
          <select
            id="cloudSize"
            name="cloudSize"
            suppressHydrationWarning
            className={fieldClass}
            defaultValue=""
          >
            <option value="">Select</option>
            {CLOUD_SIZE.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="challenge">
            Primary Challenge
          </label>
          <select
            id="challenge"
            name="challenge"
            suppressHydrationWarning
            className={fieldClass}
            defaultValue=""
          >
            <option value="">Select</option>
            {CHALLENGES.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            suppressHydrationWarning
            className={fieldClass}
            placeholder="Tell us what you're trying to solve in your Cloud environment"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        suppressHydrationWarning
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-glow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            <span>Submitting Request...</span>
          </>
        ) : (
          <span>Book My Cloud Assessment</span>
        )}
      </button>
    </form>
  );
}
