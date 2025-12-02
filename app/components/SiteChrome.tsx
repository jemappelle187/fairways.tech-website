"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ContactModal } from "./ContactModal";
import { track } from "@/lib/umami";

const sectionLinks = [
  { id: "hero", label: "Home" },
  { id: "solution", label: "Solution" },
  { id: "approach", label: "Approach" },
  { id: "compliance", label: "Reach" },
  { id: "partnerships", label: "Partnerships" },
  { id: "mission", label: "Mission" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/impact", label: "Impact & vision" },
  { href: "/team", label: "Team" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCompanyMobileOpen, setIsCompanyMobileOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const companyButtonRef = useRef<HTMLButtonElement>(null);
  const isHomePage = pathname === "/";

  // Handle hash navigation when page loads or route changes
  useEffect(() => {
    if (isHomePage && window.location.hash) {
      const hash = window.location.hash.substring(1); // Remove the #
      const element = document.getElementById(hash);
      if (element) {
        // Wait for page to be fully rendered, then scroll
        const scrollToSection = () => {
          const targetElement = document.getElementById(hash);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            setActiveSection(hash);
          } else {
            // Retry if element not found yet
            setTimeout(scrollToSection, 50);
          }
        };
        // Initial delay to ensure DOM is ready
        setTimeout(scrollToSection, 150);
      }
    } else if (isHomePage) {
      // Reset active section if no hash on homepage
      setActiveSection("hero");
    }
  }, [isHomePage, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only detect active section if we're on the homepage
      if (isHomePage) {
        const sections = sectionLinks.map((item) => item.id);
        const scrollPosition = window.scrollY + 100;

        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i]);
          if (element && element.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Close company dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        companyDropdownRef.current &&
        companyButtonRef.current &&
        !companyDropdownRef.current.contains(event.target as Node) &&
        !companyButtonRef.current.contains(event.target as Node)
      ) {
        setIsCompanyOpen(false);
      }
    };

    if (isCompanyOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isCompanyOpen]);

  // Close company dropdown on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsCompanyOpen(false);
        companyButtonRef.current?.focus();
      }
    };

    if (isCompanyOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isCompanyOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    // If we're on the homepage, scroll to the section
    if (isHomePage) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
        // Update URL hash without scrolling again
        window.history.pushState(null, "", `#${id}`);
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`/#${id}`);
    }
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    
    if (isHomePage) {
      // On homepage, scroll to CTA section
      const element = document.getElementById("cta");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "#cta");
      }
    } else {
      // On other pages, open the contact modal
      track("contact_modal_opened_from_header");
      setIsContactModalOpen(true);
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
            src="/images/logo/logo-fairways-forest.svg"
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
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded ${
                  activeSection === item.id && isHomePage
                    ? "font-semibold text-forest"
                    : "text-stone-800 hover:text-forest"
                }`}
              >
                {item.label}
                {activeSection === item.id && isHomePage && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
                )}
                {activeSection !== item.id && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-forest transition-all duration-300 hover:w-full" />
                )}
              </a>
            ))}
          </div>
          {/* Visual separator */}
          <div className="mx-3 h-4 w-px bg-slate-200" aria-hidden="true" />
          {/* Company dropdown */}
          <div className="relative">
            <button
              ref={companyButtonRef}
              onClick={() => setIsCompanyOpen(!isCompanyOpen)}
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
              aria-expanded={isCompanyOpen}
              aria-haspopup="menu"
              className={`relative transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded ${
                isCompanyOpen
                  ? "font-semibold text-forest"
                  : "text-stone-800 hover:text-forest"
              }`}
            >
              Company
              {isCompanyOpen && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-forest transition-all" />
              )}
            </button>
            {isCompanyOpen && (
              <div
                ref={companyDropdownRef}
                className="absolute right-0 mt-3 w-44 rounded-2xl border border-slate-200 bg-white/95 shadow-lg shadow-black/5 backdrop-blur-sm"
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}
              >
                {companyLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setIsCompanyOpen(false);
                      setIsMenuOpen(false);
                    }}
                    className="block px-4 py-2.5 text-sm text-slate-800 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          {/* CTA button */}
          <a
            href={isHomePage ? "#cta" : "#"}
            onClick={handleContactClick}
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
        <nav
          className={`fixed inset-x-0 z-40 border-t border-white/40 bg-white/95 backdrop-blur-md transition-all duration-300 md:hidden ${
            isScrolled ? "top-16" : "top-20"
          }`}
          style={{
            minHeight: `calc(100vh - ${isScrolled ? "64px" : "80px"})`,
          }}
        >
          <div className="flex min-h-full flex-col overflow-y-auto">
            <div className="flex flex-col gap-2 px-4 pt-4">
              {/* ON THIS PAGE */}
              <p className="mt-2 mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                On this page
              </p>

              {/* In-page section links */}
              {sectionLinks.map((item) => (
                <a
                  key={item.id}
                  href={isHomePage ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`block rounded-md py-2 text-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-forest/50 ${
                    activeSection === item.id && isHomePage
                      ? "bg-forest/10 text-forest font-semibold"
                      : "text-slate-900 hover:bg-slate-50 hover:text-forest"
                  }`}
                >
                  {item.label}
                </a>
              ))}

              {/* Divider */}
              <div className="my-4 h-px w-full bg-slate-200/60" aria-hidden="true" />

              {/* COMPANY GROUP — Accordion */}
              <div>
                <button
                  onClick={() => setIsCompanyMobileOpen(!isCompanyMobileOpen)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-md py-2 text-lg font-semibold text-slate-900 transition-all hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-forest/50"
                  aria-expanded={isCompanyMobileOpen}
                  aria-haspopup="menu"
                >
                  <span>Company</span>
                  <span
                    className={`transform transition-transform duration-200 ${
                      isCompanyMobileOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {isCompanyMobileOpen && (
                  <div className="mt-1 flex flex-col gap-1 pl-4">
                    {companyLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsCompanyMobileOpen(false);
                        }}
                        className="rounded-md py-2 text-base text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-forest/50"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Contact CTA */}
              <div className="mb-4 mt-6">
                <a
                  href={isHomePage ? "#cta" : "#"}
                  onClick={handleContactClick}
                  className="block w-full rounded-full bg-forest px-6 py-3 text-center font-semibold text-sand shadow-md transition-colors hover:bg-leaf focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Contact us
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </header>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-sand/95">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-end">
          <a
            href="/about"
            className="inline-flex hover:text-slate-700 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded"
          >
            About
          </a>
          <a
            href="/terms"
            className="inline-flex hover:text-slate-700 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded"
          >
            Terms &amp; Conditions
          </a>
          <a
            href="/disclaimer"
            className="inline-flex hover:text-slate-700 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded"
          >
            Disclaimer
          </a>
          <a
            href="/privacy"
            className="inline-flex hover:text-slate-700 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded"
          >
            Privacy Policy
          </a>
          <a
            href="/cookies"
            className="inline-flex hover:text-slate-700 hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 focus:rounded"
          >
            Cookie Policy
          </a>
        </div>
        <span className="text-[11px] text-slate-500 sm:text-xs">
          © {year} Fairways.Tech. All rights reserved.
        </span>
      </div>
    </footer>
  );
}


