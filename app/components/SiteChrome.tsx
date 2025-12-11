"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ContactModal } from "./ContactModal";
import { track } from "@/lib/umami";

const menuLinks = [
  { href: "/about", label: "About" },
  { href: "/impact", label: "Impact & Vision" },
  { href: "/team", label: "Team" },
];

const languages = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "nl", label: "Nederlands", flag: "🇳🇱" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu and language dropdown on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isLangDropdownOpen) setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen, isLangDropdownOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangDropdownOpen && !target.closest('[aria-label="Select language"]') && !target.closest('.language-dropdown')) {
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangDropdownOpen]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    track("contact_modal_opened_from_header");
    setIsContactModalOpen(true);
  };

  return (
    <>
      {/* Skip to main content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-forest focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
      >
        Skip to main content
      </a>
      
      <header
        className={`sticky top-0 z-40 rounded-b-lg border-b border-white/40 bg-white/80 backdrop-blur-lg shadow-xl transition-all duration-300 ${
          isScrolled ? "h-16 shadow-md" : "h-20"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? "h-16" : "h-20"
          }`}
        >
          {/* Logo - Far left aligned */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0 -ml-4 sm:-ml-6 lg:-ml-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo/logo-fairways-forest.svg"
              alt="Fairways.Tech"
              className={`transition-all duration-300 hover:scale-105 ${
                isScrolled ? "h-8 w-8" : "h-10 w-10 sm:h-12 sm:w-12"
              }`}
            />
            <div
              className={`font-bold tracking-tight text-forest transition-all duration-300 hover:scale-105 ${
                isScrolled ? "text-lg" : "text-lg sm:text-xl lg:text-2xl"
              }`}
            >
              Fairways.Tech
            </div>
          </a>

          {/* Desktop: Menu items in navbar */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center" aria-label="Main navigation">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                  pathname === link.href
                    ? "bg-forest/10 text-forest"
                    : "text-slate-700 hover:text-forest hover:bg-gradient-to-b hover:from-forest/8 hover:to-forest/5 hover:shadow-[0_0_12px_rgba(31,75,44,0.3)] hover:-translate-y-0.5 hover:scale-[1.02] hover:tracking-wide after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:w-0 after:bg-forest after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="sr-only"> (current page)</span>
                )}
              </a>
            ))}
          </nav>

          {/* Right side: Language selector + CTA button (desktop) / Hamburger (mobile) */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 -mr-4 sm:-mr-6 lg:-mr-8">
            {/* Language selector dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-forest hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                aria-label="Select language"
                aria-expanded={isLangDropdownOpen}
              >
                <span className="text-base" aria-hidden="true">{languages.find(l => l.code === currentLanguage)?.flag}</span>
                <span className="uppercase">{currentLanguage}</span>
                <svg
                  className={`h-4 w-4 transition-transform ${
                    isLangDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Language dropdown menu */}
              {isLangDropdownOpen && (
                <div className="language-dropdown absolute right-0 top-full mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-xl z-50" role="menu">
                  <div className="py-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLanguage(lang.code);
                          setIsLangDropdownOpen(false);
                          // TODO: Implement actual language switching logic
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-forest focus:ring-inset ${
                          currentLanguage === lang.code
                            ? "bg-forest/5 text-forest font-semibold"
                            : "text-slate-700 hover:bg-slate-50 hover:text-forest"
                        }`}
                        role="menuitem"
                        aria-label={`Switch to ${lang.label}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base" aria-hidden="true">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </span>
                        {currentLanguage === lang.code && (
                          <svg
                            className="h-4 w-4 text-forest"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact CTA button - Desktop only */}
            <a
              href="#contact"
              onClick={handleContactClick}
              className="hidden lg:inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
            >
              Start a partnership
            </a>

            {/* Hamburger menu button - Mobile only */}
            <button
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsLangDropdownOpen(false);
              }}
              className="lg:hidden p-2 text-stone transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded-lg"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <div className="flex h-6 w-6 flex-col justify-center gap-1.5">
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Dropdown Menu - Mobile only */}
        {isMenuOpen && (
          <div
            className="lg:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-lg"
            style={{
              minHeight: `calc(100vh - ${isScrolled ? "64px" : "80px"})`,
            }}
          >
            <div className="mx-auto max-w-6xl px-6 py-8">
              <nav className="flex flex-col gap-2" aria-label="Main navigation">
                {menuLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`min-h-[44px] flex items-center rounded-lg px-4 py-3 text-lg font-semibold transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 ${
                      pathname === link.href
                        ? "bg-forest/5 text-forest"
                        : "text-slate-900 hover:text-forest"
                    }`}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="sr-only"> (current page)</span>
                    )}
                  </a>
                ))}
              </nav>

              {/* Mobile Contact button */}
              <div className="mt-6">
                <a
                  href="#contact"
                  onClick={handleContactClick}
                  className="flex w-full items-center justify-center rounded-full bg-forest px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
                >
                  Start a partnership
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sand/95">
      {/* Social Media Icons - Above divider */}
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-6 py-4">
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/company/fairways-tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            aria-label="LinkedIn"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/fairways.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            aria-label="Instagram"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
            </svg>
          </a>
          <a
            href="https://x.com/FairwaysTech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            aria-label="X (Twitter)"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61584711954996"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            aria-label="Facebook"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@fairways.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 transition hover:text-forest focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 rounded"
            aria-label="YouTube"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-stone-200"></div>

      {/* Links and Copyright */}
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex flex-col items-center gap-3 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 sm:justify-start">
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
      </div>
    </footer>
  );
}
