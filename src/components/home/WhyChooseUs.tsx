import { BadgeDollarSign, ShieldCheck, CalendarClock, Lock } from "lucide-react";

const benefits = [
  {
    title: "Affordable Rental Prices",
    desc: "Save up to 70% compared to purchasing new machinery. Pay only for the exact days you work.",
    icon: BadgeDollarSign,
  },
  {
    title: "Verified Equipment Owners",
    desc: "Every listing undergoes admin verification so you get well-maintained, authentic gear.",
    icon: ShieldCheck,
  },
  {
    title: "Flexible Rental Periods",
    desc: "Choose Daily, Weekly, or Monthly rental plans tailored to your project timeline.",
    icon: CalendarClock,
  },
  {
    title: "Secure Online Payments",
    desc: "Powered by Stripe Checkout with instant digital receipts and transparent pricing.",
    icon: Lock,
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">
          The AssetLoop Advantage
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-1">
          Why Choose AssetLoop?
        </h2>
        <p className="text-sm text-[var(--muted-foreground)] mt-2">
          Built to empower contractors, creators, farmers, and event organizers across Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-3"
            >
              <div className="h-11 w-11 rounded-xl bg-[#059669]/10 text-[#059669] flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base">{item.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}