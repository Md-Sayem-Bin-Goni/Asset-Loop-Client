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
    <section id="why-choose-us" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#059669]/10 text-[#059669] dark:bg-[#059669]/20 dark:text-[#10B981]">
          The AssetLoop Advantage
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
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
              className="p-6 rounded-2xl bg-white dark:bg-gray-900/60 border border-gray-200/90 dark:border-gray-800 shadow-xs hover:shadow-xl hover:border-[#059669]/60 dark:hover:border-[#10B981]/50 hover:-translate-y-1.5 transition-all duration-300 space-y-4 group"
            >
              <div className="h-12 w-12 rounded-xl bg-[#059669]/10 dark:bg-[#059669]/20 text-[#059669] dark:text-[#10B981] group-hover:bg-[#059669] group-hover:text-white transition-colors flex items-center justify-center shadow-xs">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-base group-hover:text-[#059669] dark:group-hover:text-[#10B981] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed mt-1.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
