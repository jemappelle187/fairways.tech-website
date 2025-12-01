"use client";

import { useState, useEffect } from "react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "solution", label: "Solution" },
  { id: "approach", label: "Approach" },
  { id: "compliance", label: "Reach" },
  { id: "partnerships", label: "Partnerships" },
  { id: "mission", label: "Mission" },
];

export default function MenuDemoPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-sand">
      {/* Demo Header */}
      <div className="sticky top-0 z-50 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight text-forest sm:text-2xl">
            Fairways.Tech
          </div>
          <nav className="hidden items-center gap-8 text-base font-medium tracking-wide md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`relative transition-all duration-300 ${
                  activeSection === item.id
                    ? "font-semibold text-forest"
                    : "text-stone-800 hover:text-forest"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
                )}
              </a>
            ))}
            <a
              href="/team"
              className={`transition-all duration-300 ${
                activeSection === "team"
                  ? "font-semibold text-forest"
                  : "text-stone-800 hover:text-forest"
              }`}
            >
              Team
            </a>
            <a
              href="#cta"
              className="ml-4 inline-flex items-center justify-center rounded-full bg-forest px-5 py-2 text-sm font-semibold text-sand shadow-md transition-all hover:bg-forest/90 hover:shadow-lg"
            >
              Partner With Us
            </a>
          </nav>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-stone transition hover:text-forest md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
              <span
                className={`block h-0.5 w-full bg-current transition-all ${
                  isMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-full bg-current transition-all ${
                  isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
        {isMenuOpen && (
          <nav className="fixed inset-x-0 top-20 z-40 border-t border-stone-200 bg-sand/98 backdrop-blur-md md:hidden">
            <div className="flex min-h-[calc(100vh-80px)] flex-col px-4 pb-6 pt-4">
              <nav className="flex-1 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                      activeSection === item.id
                        ? "bg-forest/10 text-forest font-semibold"
                        : "text-stone-800 hover:bg-stone-100 hover:text-forest"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="/team"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all ${
                    activeSection === "team"
                      ? "bg-forest/10 text-forest font-semibold"
                      : "text-stone-800 hover:bg-stone-100 hover:text-forest"
                  }`}
                >
                  Team
                </a>
              </nav>
              <div className="pt-4">
                <a
                  href="#cta"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full rounded-full border-2 border-forest bg-forest px-4 py-3 text-center text-sm font-semibold text-sand transition-all hover:bg-forest/90 hover:shadow-lg"
                >
                  Partner With Us
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Demo Content */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Option 1: Current Menu */}
          <section id="current" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">1. Current Menu (Baseline)</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-lg font-bold text-forest">Fairways.Tech</div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-stone-800 transition-colors hover:text-stone-900 hover:underline underline-offset-4"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 2: Enhanced Glass Morphism */}
          <section id="glass" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">2. Enhanced Glass Morphism</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 rounded-lg border border-white/40 bg-white/80 backdrop-blur-lg shadow-lg">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-lg font-bold text-forest">Fairways.Tech</div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-stone-800 transition-colors hover:text-forest"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 3: With CTA Button */}
          <section id="cta-button" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">3. With CTA Button</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-lg font-bold text-forest">Fairways.Tech</div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-stone-800 transition-colors hover:text-forest"
                      >
                        {item.label}
                      </a>
                    ))}
                    <a
                      href="#"
                      className="ml-2 rounded-full bg-forest px-4 py-1.5 text-xs font-semibold text-sand transition hover:bg-forest/90"
                    >
                      Partner With Us
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 4: Active Indicator */}
          <section id="active-indicator" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">4. Active Section Indicator</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-lg font-bold text-forest">Fairways.Tech</div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item, idx) => (
                      <a
                        key={item.id}
                        href="#"
                        className={`relative transition-all ${
                          idx === 1
                            ? "font-semibold text-forest"
                            : "text-stone-800 hover:text-forest"
                        }`}
                      >
                        {item.label}
                        {idx === 1 && (
                          <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest" />
                        )}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 5: Enhanced Typography */}
          <section id="typography" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">5. Enhanced Typography</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-xl font-bold tracking-tight text-forest">
                    Fairways.Tech
                  </div>
                  <nav className="hidden items-center gap-8 text-base font-medium tracking-wide md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-stone-800 transition-colors hover:text-forest"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 6: Smooth Hover Animations */}
          <section id="hover-animations" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">6. Smooth Hover Animations</h2>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm">
                <div className="flex h-16 items-center justify-between gap-8 px-4">
                  <div className="text-lg font-bold text-forest transition-transform hover:scale-105">
                    Fairways.Tech
                  </div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="relative text-stone-800 transition-all duration-300 hover:text-forest hover:scale-105"
                      >
                        {item.label}
                        <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest transition-all duration-300 hover:w-full" />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 7: Compact on Scroll */}
          <section id="compact-scroll" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">
              7. Compact Header on Scroll
            </h2>
            <p className="text-sm text-stone-600">
              Scroll down to see the header become more compact (h-16 → h-14)
            </p>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div
                className={`sticky top-4 z-10 border-b border-stone-200 bg-sand/95 backdrop-blur-sm transition-all duration-300 ${
                  isScrolled ? "h-14 shadow-md" : "h-16"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-8 px-4 transition-all duration-300 ${
                    isScrolled ? "h-14" : "h-16"
                  }`}
                >
                  <div
                    className={`font-bold text-forest transition-all duration-300 ${
                      isScrolled ? "text-lg" : "text-xl"
                    }`}
                  >
                    Fairways.Tech
                  </div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    {navItems.slice(0, 3).map((item) => (
                      <a
                        key={item.id}
                        href="#"
                        className="text-stone-800 transition-colors hover:text-forest"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Option 8: Premium Complete Package */}
          <section id="premium-complete" className="space-y-4">
            <h2 className="text-2xl font-semibold text-stone">8. Premium Complete Package</h2>
            <p className="text-sm text-stone-600">
              All enhancements combined: Glass morphism + CTA + Active indicator + Typography +
              Animations
            </p>
            <div className="rounded-lg border border-stone-200 bg-white p-4">
              <div className="sticky top-4 z-10 rounded-lg border border-white/40 bg-white/85 backdrop-blur-lg shadow-xl">
                <div className="flex h-16 items-center justify-between gap-8 px-6">
                  <div className="text-xl font-bold tracking-tight text-forest transition-transform hover:scale-105">
                    Fairways.Tech
                  </div>
                  <nav className="hidden items-center gap-8 text-base font-medium tracking-wide md:flex">
                    {navItems.slice(0, 3).map((item, idx) => (
                      <a
                        key={item.id}
                        href="#"
                        className={`relative transition-all duration-300 hover:scale-105 ${
                          idx === 1
                            ? "font-semibold text-forest"
                            : "text-stone-800 hover:text-forest"
                        }`}
                      >
                        {item.label}
                        {idx === 1 && (
                          <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
                        )}
                        {idx !== 1 && (
                          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest transition-all duration-300 hover:w-full" />
                        )}
                      </a>
                    ))}
                    <a
                      href="#"
                      className="ml-2 inline-flex items-center justify-center rounded-full bg-forest px-5 py-2 text-sm font-semibold text-sand shadow-md transition-all hover:bg-forest/90 hover:shadow-lg hover:scale-105"
                    >
                      Partner With Us
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          {/* Spacer for scroll demo */}
          <div className="h-screen" />
        </div>
      </div>
    </div>
  );
}


