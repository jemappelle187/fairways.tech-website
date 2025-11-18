const navItems = [
  { id: "hero", label: "Hero" },
  { id: "the-problem", label: "The Problem" },
  { id: "our-solution", label: "Our Solution" },
  { id: "how-it-works", label: "How It Works" },
  { id: "compliance", label: "Compliance" },
  { id: "impact", label: "Impact" },
  { id: "mission", label: "Mission" },
  { id: "call-to-action", label: "Call to Action" }
];

const problemPoints = [
  "No digital records of fields, inputs, crop cycles, or yields",
  "Banks charge 30–35% interest due to high perceived risk",
  "Lack of transparent value chains",
  "No consistent access to market prices",
  "Financing is not designed for farming realities"
];

const solutionFeatures = [
  {
    title: "Digital Farm Profiles",
    description:
      "Accurate, verified farm data: acreage, crops, inputs, performance."
  },
  {
    title: "Transparent Value Chains & Market Access",
    description:
      "Traceability from farm to buyer with verified quality and delivery insights."
  },
  {
    title: "Lower-Risk, Responsible Financing",
    description:
      "Data-backed risk insights enabling banks and development partners to safely support farmers."
  }
];

const howItWorksSteps = [
  "Onboarding & Registration (community agent-led)",
  "Mapping & Data Capture (fields, horticulture conditions, inputs)",
  "Season Planning (transparent cost & yield projections)",
  "Community-Based Financing (data-backed & risk-reduced)",
  "Harvest Verification (volume + quality)",
  "Delivery & Settlement (buyer payments settle finance; farmers receive balance)",
  "Scaling Over Time (each season builds a credit history)"
];

const complianceFrameworks = [
  "EU AML/CFT",
  "Wwft / AMLD / AMLR",
  "FATF digital ID & financial inclusion",
  "EU DORA & GDPR",
  "Ghanaian supervisory expectations"
];

const complianceBenefits = [
  "Verified identities & community onboarding",
  "Clear, audit-ready transaction flows",
  "Risk-reduced lending",
  "Secure, resilient infrastructure",
  "Full traceability for banks and development partners"
];

const impactAreas = [
  {
    title: "For Farmers",
    benefits: [
      "Fair, scalable finance",
      "Better season planning",
      "Stronger negotiation power",
      "A digital track record for growth"
    ]
  },
  {
    title: "For Buyers",
    benefits: [
      "Reliable, transparent supply",
      "Quality-linked sourcing",
      "Easier export traceability"
    ]
  },
  {
    title: "For Banks",
    benefits: [
      "Clear agricultural risk visibility",
      "Audit-ready compliance",
      "New, data-backed lending opportunities"
    ]
  },
  {
    title: "For Development Partners",
    benefits: [
      "Measurable, data-driven impact",
      "Transparent flow-of-funds",
      "Strong alignment with sustainability goals"
    ]
  }
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-forest/10 bg-sand/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
            Fairways.Tech
          </div>
          <nav className="hidden gap-5 text-sm font-medium text-stone sm:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-full px-3 py-1 text-stone/90 transition hover:bg-forest/10 hover:text-forest"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#call-to-action"
            className="rounded-full border border-forest/30 px-3 py-1 text-sm font-semibold text-forest transition hover:bg-forest hover:text-sand"
          >
            Partner With Us
          </a>
        </div>
        <nav className="flex gap-2 overflow-x-auto border-t border-forest/10 px-4 py-2 text-xs font-medium text-stone/90 sm:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="whitespace-nowrap rounded-full bg-white/60 px-3 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="mx-auto flex max-w-5xl flex-col gap-20 px-4 pb-20 pt-12 sm:px-6 lg:px-8">
        <section
          id="hero"
          className="rounded-3xl bg-white/80 p-8 shadow-lg shadow-forest/5 ring-1 ring-forest/10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf">
            Community-Driven Agri–Fintech
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-stone sm:text-4xl lg:text-5xl lg:leading-tight">
            Digital infrastructure empowering farmers to scale.
          </h1>
          <p className="mt-6 text-lg text-stone/80">
            Fairways.Tech is a community-driven agri-fintech ecosystem helping
            smallholder farmers and horticultural producers grow beyond survival
            by unlocking fair, compliant, and scalable access to finance,
            markets, and data.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-stone">
            {["Community-first", "Compliance-first", "Built for agri & horticulture"].map(
              (quality) => (
                <span
                  key={quality}
                  className="rounded-full border border-forest/20 px-4 py-1"
                >
                  {quality}
                </span>
              )
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#call-to-action"
              className="rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-sand transition hover:bg-leaf"
            >
              Partner With Us
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-forest/40 px-6 py-3 text-sm font-semibold text-forest transition hover:bg-forest/10"
            >
              Learn How It Works
            </a>
          </div>
        </section>

        <section id="the-problem" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">The Challenge</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              The Problem
            </h2>
          </div>
          <p className="text-stone/80">
            Farming has the potential to scale — but farmers lack the tools and
            trust systems that financial institutions require.
          </p>
          <ul className="space-y-3 rounded-2xl bg-white/80 p-6 text-stone/90 shadow ring-1 ring-forest/5">
            {problemPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-clay" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-stone">
            Result: Farmers can produce more, but cannot grow beyond survival
            levels.
          </p>
        </section>

        <section id="our-solution" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">A Trusted Ecosystem</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              Our Solution
            </h2>
          </div>
          <p className="text-stone/80">
            A community-driven digital ecosystem for scalable agriculture.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {solutionFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white/80 p-5 shadow ring-1 ring-forest/5"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-stone/80">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <p className="text-stone font-semibold">
            We don’t replace local relationships — we strengthen them with
            trusted data and compliant rails.
          </p>
        </section>

        <section id="how-it-works" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">Field to Finance</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              How It Works
            </h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-2">
            {howItWorksSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl bg-white/80 p-5 shadow ring-1 ring-forest/5"
              >
                <span className="text-3xl font-semibold text-leaf">
                  {index + 1}
                </span>
                <p className="text-sm text-stone/80">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="compliance" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">Integrity First</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              Compliance-First by Design
            </h2>
          </div>
          <p className="text-stone/80">
            Regulatory integrity is a precondition for farmer scalability.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-5 shadow ring-1 ring-forest/5">
              <h3 className="text-lg font-semibold text-stone">
                Fairways.Tech aligns with:
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-stone/80">
                {complianceFrameworks.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white/80 p-5 shadow ring-1 ring-forest/5">
              <h3 className="text-lg font-semibold text-stone">
                Our compliance-first design ensures:
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-stone/80">
                {complianceBenefits.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-lg font-semibold text-stone">
            When compliance risk goes down, the cost of capital goes down —
            enabling farmers to scale.
          </p>
        </section>

        <section id="impact" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">Shared Value</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              Impact & Benefits
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {impactAreas.map((area) => (
              <div
                key={area.title}
                className="rounded-2xl bg-white/80 p-5 shadow ring-1 ring-forest/5"
              >
                <h3 className="text-lg font-semibold text-stone">
                  {area.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-stone/80">
                  {area.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-clay" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="mission" className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-leaf">Community Philosophy</p>
            <h2 className="mt-2 text-2xl font-semibold text-stone">
              Mission & Philosophy
            </h2>
          </div>
          <div className="space-y-4 rounded-3xl bg-forest/90 p-8 text-sand shadow-lg">
            <p>
              Fairways.Tech is built with and for farming communities. We
              empower them with trusted digital tools to grow responsibly.
            </p>
            <p>
              We bridge global regulatory integrity with local agricultural
              inclusion, enabling a transparent, scalable, community-first
              agri-fintech ecosystem.
            </p>
          </div>
        </section>

        <section
          id="call-to-action"
          className="rounded-3xl border border-forest/20 bg-white/90 p-8 text-center shadow-lg"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-leaf">
            Let’s scale farming communities together.
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-stone">
            Call to Action
          </h2>
          <p className="mt-4 text-stone/80">
            Whether you’re a bank, buyer, regulator, cooperative, or development
            partner — Fairways.Tech is ready to collaborate.
          </p>
          <p className="mt-6 text-lg font-semibold text-forest">
            Contact: info@fairways.tech
          </p>
        </section>
      </main>
    </>
  );
}

