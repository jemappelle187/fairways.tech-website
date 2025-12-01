"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "hero", label: "Home" },
  { id: "solution", label: "Solution" },
  { id: "approach", label: "Approach" },
  { id: "compliance", label: "Reach" },
  { id: "partnerships", label: "Partnerships" },
  { id: "mission", label: "Mission" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section based on scroll position
      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 rounded-b-lg border-b border-white/40 bg-white/80 backdrop-blur-lg shadow-xl transition-all duration-300 ${
        isScrolled ? "h-16 shadow-md" : "h-20"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 transition-all duration-300 ${
          isScrolled ? "h-16" : "h-20"
        }`}
      >
        <a href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-fairways-forest.svg"
            alt="Fairways.Tech"
            className={`transition-all duration-300 hover:scale-105 ${
              isScrolled ? "h-8 w-8" : "h-12 w-12 sm:h-14 sm:w-14"
            }`}
          />
          <div
            className={`font-bold tracking-tight text-forest transition-all duration-300 hover:scale-105 ${
              isScrolled ? "text-xl" : "text-xl sm:text-2xl"
            }`}
          >
            Fairways.Tech
          </div>
        </a>
        <nav className="hidden items-center gap-6 text-base font-medium tracking-wide md:flex">
          {/* Section anchors grouped together */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded ${
                  activeSection === item.id
                    ? "font-semibold text-forest"
                    : "text-stone-800 hover:text-forest"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
                )}
                {activeSection !== item.id && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest transition-all duration-300 hover:w-full" />
                )}
              </a>
            ))}
          </div>
          {/* Visual separator */}
          <div className="h-6 w-px bg-stone-300" aria-hidden="true" />
          {/* Standalone pages */}
          <div className="flex items-center gap-6">
            <a
              href="/impact"
              onClick={() => setIsMenuOpen(false)}
              className="relative transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded text-stone-800 hover:text-forest"
            >
              Impact
            </a>
            <a
              href="/team"
              onClick={() => setIsMenuOpen(false)}
              className={`relative transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded ${
                activeSection === "team"
                  ? "font-semibold text-forest"
                  : "text-stone-800 hover:text-forest"
              }`}
            >
              Team
              {activeSection === "team" && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
              )}
              {activeSection !== "team" && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest transition-all duration-300 hover:w-full" />
              )}
            </a>
          </div>
          {/* CTA button */}
          <a
            href="#cta"
            onClick={(e) => handleNavClick(e, "cta")}
            className="ml-2 inline-flex items-center justify-center rounded-full bg-forest px-5 py-2 text-sm font-semibold text-sand shadow-md transition-all hover:bg-forest/90 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
          >
            Contact us
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
        <nav className="fixed inset-x-0 top-20 z-40 border-t border-white/40 bg-white/95 backdrop-blur-md md:hidden">
          <div className="flex min-h-[calc(100vh-80px)] flex-col px-4 pb-6 pt-4">
            <nav className="flex-1 space-y-2 overflow-y-auto">
              {/* Section anchors grouped */}
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                    activeSection === item.id
                      ? "bg-forest/10 text-forest font-semibold"
                      : "text-slate-900 hover:bg-slate-100 hover:text-forest"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {/* Visual separator */}
              <div className="my-3 border-t border-slate-200" aria-hidden="true" />
              {/* Standalone pages */}
              <a
                href="/impact"
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium transition-all text-slate-900 hover:bg-slate-100 hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                Impact
              </a>
              <a
                href="/team"
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-all focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                  activeSection === "team"
                    ? "bg-forest/10 text-forest font-semibold"
                    : "text-slate-900 hover:bg-slate-100 hover:text-forest"
                }`}
              >
                Team
              </a>
            </nav>
            <div className="pt-4">
              <a
                href="#cta"
                onClick={(e) => handleNavClick(e, "cta")}
                className="block w-full rounded-full border-2 border-forest bg-forest px-4 py-3 text-center text-sm font-semibold text-sand transition-all hover:bg-forest/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                Contact us
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-sand/95">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-4 text-xs text-slate-500 sm:flex-row">
        <span>© {year} Fairways.Tech. All rights reserved.</span>
        <div className="flex flex-wrap gap-4">
          <a
            href="/about"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            About
          </a>
          <a
            href="/terms"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/disclaimer"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Disclaimer
          </a>
          <a
            href="/privacy"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <a
            href="/cookies"
            className="hover:text-slate-700 hover:underline underline-offset-4"
          >
            Cookie Policy
          </a>
        </div>
      </div>
    </footer>
  );
}


