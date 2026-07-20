"use client";

import {
  useState,
  useEffect,
  useRef,
  Suspense,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/umami";
import { ContactCta } from "./components/ContactCta";
import { CookieBanner } from "./components/CookieBanner";
import {
  ChevronLeft,
  ChevronRight,
  Leaf,
  Landmark,
  Users2,
  Store,
  GraduationCap,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { Header, Footer } from "./components/SiteChrome";
import SdgLogosOnly from "@/app/components/SdgLogosOnly";

const solutionVisualItems = [
  {
    src: "/images/digital_farmer2.jpg",
    alt: "Local farmer using a digital device in the field",
    lines: ["DIGITAL FARM", "PROFILES"],
    sizeClass: "h-44 w-44"
  },
  {
    src: "/images/value_chain_qr2.jpg",
    alt: "Fresh produce with QR code for traceability",
    lines: ["VALUE-CHAIN", "TRACEABILITY"],
    sizeClass: "h-40 w-40"
  },
  {
    src: "/images/compliance_first2.jpg",
    alt: "Handshake symbolising compliant finance",
    lines: ["COMPLIANCE-FIRST", "FINANCE"],
    sizeClass: "h-36 w-36"
  }
];

// Keeps the real metric in the DOM, then animates only once the card is visible.
function Counter({
  target,
  suffix = "+",
  prefix = "",
  animate = false,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  animate?: boolean;
}) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!animate) {
      setValue(target);
      return;
    }

    let start = 0;
    const duration = 2000; // ms – slower, more premium
    const frames = 80;
    const increment = target / frames;

    let frame = 0;
    const interval = setInterval(() => {
      frame += 1;
      start += increment;
      if (frame >= frames) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.round(start));
      }
    }, duration / frames);

    return () => clearInterval(interval);
  }, [animate, target]);

  return (
    <>
      {prefix}
      {value}
      {suffix}
    </>
  );
}

const partnershipCards = [
  {
    title: "Banks & lenders",
    description: "Expand rural portfolios with trusted records and clearer visibility into real farm activity.",
    icon: Landmark,
    emoji: "🏦"
  },
  {
    title: "Farmer groups & cooperatives",
    description: "Strengthen group performance with shared records and better access to fair, timely finance.",
    icon: Users2,
    emoji: "🤝"
  },
  {
    title: "Buyers & off-takers",
    description: "Source more reliably with stronger visibility from farm activity to market outcomes.",
    icon: Store,
    emoji: "🧺"
  },
  {
    title: "Development & impact partners",
    description: "Track inclusion and livelihoods with credible signals tied to real agricultural activity.",
    icon: Globe2,
    emoji: "🌍"
  },
  {
    title: "Governments & regulators",
    description: "Gain clearer visibility into rural finance trends and progress across underserved communities.",
    icon: ShieldCheck,
    emoji: "🏛️"
  },
  {
    title: "Knowledge partners",
    description: "Connect training and advisory work to practical outcomes in farm and market performance.",
    icon: GraduationCap,
    emoji: "🎓"
  }
];

const photoStorySlides = [
  {
    src: "/images/slideshow/last-mile-field-access.jpg",
    alt: "Fairways.Tech team walking along a rural field path",
    label: "Last-mile access",
    title: "We follow the road until the road ends.",
    caption:
      "Reaching remote production areas gives us context that spreadsheets alone cannot reveal.",
    position: "center",
  },
  {
    src: "/images/slideshow/farmer-dialogue-on-site.jpg",
    alt: "Fairways.Tech team speaking with a farmer at his rural home",
    label: "Farmer dialogue",
    title: "Local knowledge leads the conversation.",
    caption:
      "We listen first, so each record reflects real livelihoods, constraints, and ambitions.",
    position: "center",
  },
  {
    src: "/images/slideshow/community-field-day.jpg",
    alt: "Farmers and field partners gathered for a community field day",
    label: "Community alignment",
    title: "Impact grows when communities shape the process.",
    caption:
      "Farmers, field partners, and local leaders build shared understanding before systems are introduced.",
    position: "center",
  },
  {
    src: "/images/slideshow/rural-production-landscape.jpg",
    alt: "Remote rural production landscape during the dry season",
    label: "Ground realities",
    title: "Every season changes what is possible.",
    caption:
      "Climate, distance, and infrastructure directly influence production and access to finance.",
    position: "center",
  },
  {
    src: "/images/slideshow/water-access-assessment.jpg",
    alt: "Fairways.Tech assessing a dry water structure in a rural farming area",
    label: "Water access",
    title: "Constraints become visible when you stand beside them.",
    caption:
      "Field evidence turns hidden barriers into practical priorities for partners and investment.",
    position: "center",
  },
  {
    src: "/images/slideshow/plot-level-field-review.jpg",
    alt: "Field partners reviewing conditions at an agricultural plot",
    label: "Plot validation",
    title: "Each field tells a different financing story.",
    caption:
      "Plot-level observation connects local conditions with more responsible, informed decisions.",
    position: "center",
  },
  {
    src: "/images/slideshow/field-assessment-active-farmland.jpg",
    alt: "Fairways.Tech team assessing active farmland in a remote growing area",
    label: "Field intelligence",
    title: "Observation becomes evidence institutions can use.",
    caption:
      "Real activity is translated into trusted signals without losing the realities behind the data.",
    position: "center",
  },
  {
    src: "/images/slideshow/mechanisation-readiness.jpg",
    alt: "Fairways.Tech reviewing agricultural machinery with local partners",
    label: "Production readiness",
    title: "We identify what can unlock the next stage of growth.",
    caption:
      "Capacity, equipment, and operating conditions reveal where well-placed support can create momentum.",
    position: "center",
  },
  {
    src: "/images/slideshow/rural-site-visit-logistics.jpg",
    alt: "Field team beside a vehicle during a remote rural site visit",
    label: "Operational commitment",
    title: "Reliable insight requires real presence.",
    caption:
      "The work includes the distance, the difficult access, and the practical effort behind every verified record.",
    position: "center",
  },
  {
    src: "/images/slideshow/walking-the-value-chain.jpg",
    alt: "Fairways.Tech and local partners walking through a remote agricultural landscape",
    label: "Forward together",
    title: "Local insight becomes a path to scalable rural finance.",
    caption:
      "When communities and institutions share a trusted view of reality, progress can travel further.",
    position: "50% 68%",
  },
];

const homeGlassCardClass =
  "group flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/[0.06] bg-gradient-to-b from-white/[0.10] via-white/[0.04] to-white/[0.12] px-5 py-5 text-center shadow-[0_14px_34px_rgba(15,23,42,0.30)] ring-1 ring-white/5 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/30 hover:shadow-[0_20px_44px_rgba(15,23,42,0.38)] sm:px-6 sm:py-6";

const homeReachCardClass =
  "group relative flex h-full min-h-[280px] overflow-hidden rounded-2xl border border-white/35 bg-white/5 shadow-[0_14px_34px_rgba(15,23,42,0.16)] ring-1 ring-white/5 backdrop-blur-xl transition-all duration-700 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(15,23,42,0.24)]";

const homeReachImageShellClass =
  "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl will-change-transform transition-transform duration-700 ease-out group-hover:scale-[1.025] group-hover:brightness-105";

const homeDarkOverlayStyle = {
  background:
    "linear-gradient(rgba(0,0,0,0.52), rgba(0,0,0,0.52))",
};

function VideoHero() {
  return (
    <section id="video-hero" className="relative overflow-hidden md:py-20 md:min-h-[700px]">
      {/* Hero image - Fairways.Tech with farmers in Upper West region, Ghana */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-upper-west-farmers.png"
        alt="Fairways.Tech team with farmers in Upper West region, Ghana"
        className="relative z-0 w-full h-auto object-contain md:absolute md:inset-0 md:h-full md:w-full md:object-cover"
      />
      {/* Centered logo watermark - deters copying/reuse */}
      <div
        className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo/master/fairways-master-logo-drop-bg-black.png"
          alt=""
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] opacity-40 select-none"
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </div>
      {/* Dark overlay - hidden on mobile/tablet, visible on desktop */}
      <div className="absolute inset-0 z-0 bg-black/30 hidden md:block" />

      {/* Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-sand via-sand/40 to-transparent" />
      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent via-sand/10 to-sand" />
    </section>
  );
}

function PhotoStorySlideshow() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [autoplayCycle, setAutoplayCycle] = useState(0);
  const swipeStartX = useRef<number | null>(null);
  const slide = photoStorySlides[activeSlide];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % photoStorySlides.length);
    }, 7200);

    return () => clearInterval(interval);
  }, [autoplayCycle]);

  const restartAutoplayCycle = () => {
    setAutoplayCycle((current) => current + 1);
  };

  const showPrevious = () => {
    restartAutoplayCycle();
    setActiveSlide((current) =>
      current === 0 ? photoStorySlides.length - 1 : current - 1
    );
  };

  const showNext = () => {
    restartAutoplayCycle();
    setActiveSlide((current) => (current + 1) % photoStorySlides.length);
  };

  const showSlide = (index: number) => {
    restartAutoplayCycle();
    setActiveSlide(index);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;

    const swipeDistance = event.changedTouches[0].clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(swipeDistance) < 48) return;
    if (swipeDistance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  };

  return (
    <section
      id="field-stories"
      aria-labelledby="field-stories-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-sand px-6 py-16 text-stone sm:py-20 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-sand via-sand/80 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-sand/80 to-sand"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
            Field stories
          </p>
          <h2
            id="field-stories-heading"
            className="mx-auto mt-3 max-w-2xl text-2xl font-semibold leading-tight text-stone sm:text-3xl"
          >
            Where trust is built before finance begins.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-700">
            Follow the work from remote access and first conversations to field
            evidence that helps institutions act with confidence.
          </p>
        </div>

        <div className="space-y-5">
          <div
            className="relative min-h-[28rem] touch-pan-y select-none overflow-hidden rounded-xl bg-forest shadow-[0_24px_70px_rgba(31,41,55,0.18)] ring-1 ring-black/5 sm:min-h-[34rem]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={() => {
              swipeStartX.current = null;
            }}
          >
            {photoStorySlides.map((item, index) => (
              <Image
                key={item.src}
                src={item.src}
                alt={index === activeSlide ? item.alt : ""}
                fill
                sizes="(min-width: 1024px) 68vw, 100vw"
                priority={index === 0}
                quality={82}
                className={`object-cover transition-all duration-700 ease-out ${
                  index === activeSlide
                    ? "scale-100 opacity-100"
                    : "scale-[1.025] opacity-0"
                }`}
                style={{ objectPosition: item.position }}
                aria-hidden={index !== activeSlide}
              />
            ))}
            <div
              className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">
                  {slide.label}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {slide.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                  {slide.caption}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/18 text-white shadow-[0_12px_30px_rgba(0,0,0,0.20)] backdrop-blur-md transition hover:bg-white/28 focus:outline-none focus:ring-2 focus:ring-white/70 sm:inline-flex"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/45 bg-white/18 text-white shadow-[0_12px_30px_rgba(0,0,0,0.20)] backdrop-blur-md transition hover:bg-white/28 focus:outline-none focus:ring-2 focus:ring-white/70 sm:inline-flex"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center gap-3 sm:flex sm:justify-center">
            <button
              type="button"
              onClick={showPrevious}
              className="inline-flex h-11 w-11 items-center justify-center text-forest/70 transition-colors hover:text-forest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/35 sm:hidden"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center justify-center gap-1.5">
              {photoStorySlides.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => showSlide(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeSlide
                      ? "w-8 bg-forest"
                      : "w-3 bg-stone/20 hover:bg-stone/40"
                  }`}
                  aria-label={`Show ${item.label}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={showNext}
              className="inline-flex h-11 w-11 items-center justify-center text-forest/70 transition-colors hover:text-forest focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-forest/35 sm:hidden"
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function ViaTracker() {
  const searchParams = useSearchParams();
  const via = searchParams.get("via");

  useEffect(() => {
    if (via) {
      track(`via_${via}`);
    }
  }, [via]);

  return null;
}

// Custom hook for fade-in animations on scroll
function useFadeInOnScroll() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkInitialVisibility = (el: HTMLDivElement | null) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 0;
      const isInView = rect.top < viewportHeight * 0.9 && rect.bottom > -50;
      if (isInView) {
        setTimeout(() => setIsVisible(true), 100);
        return true;
      }
      return false;
    };

    let teardown: (() => void) | undefined;

    const setup = () => {
      const element = ref.current;
      if (!element) return;

      if (checkInitialVisibility(element)) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      observer.observe(element);
      teardown = () => observer.disconnect();
    };

    // Defer until after layout so refs are attached and getBoundingClientRect is accurate
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(setup);
    });

    return () => {
      cancelAnimationFrame(raf);
      teardown?.();
    };
  }, []);

  return { ref, isVisible };
}

export default function HomePageClient() {
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  
  // Fade-in hooks for each section
  const reachCardsFade = useFadeInOnScroll();
  const partnershipCardsFade = useFadeInOnScroll();
  const approachCardsFade = useFadeInOnScroll();
  const whyWeExistFade = useFadeInOnScroll();
  const ourSolutionFade = useFadeInOnScroll();
  const atGlanceFade = useFadeInOnScroll();
  const sdgFade = useFadeInOnScroll();
  const ourMissionFade = useFadeInOnScroll();

  useEffect(() => {
    if (!statsRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsInView(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <ViaTracker />
      </Suspense>
      <Header />
      <main id="main-content" className="flex flex-col gap-20 pb-20">
        <VideoHero />

        {/* Plain-language overview for visitors, search, and AI systems */}
        <section
          id="platform-overview"
          className="border-t border-stone-200/40 bg-sand px-6 py-12 sm:py-16"
          aria-labelledby="platform-overview-heading"
        >
          <div
            ref={atGlanceFade.ref}
            className={`mx-auto max-w-3xl text-center text-base leading-relaxed text-slate-800 transition-all duration-700 ease-out sm:text-lg ${
              atGlanceFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
              At a glance
            </p>
            <h2
              id="platform-overview-heading"
              className="mt-2 text-xl font-semibold text-stone sm:text-2xl"
            >
              Trusted rails between farms and finance
            </h2>
            <div className="mt-6 space-y-4">
            <p
              className={`transition-all duration-700 ease-out ${
                atGlanceFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: atGlanceFade.isVisible ? "120ms" : "0ms" }}
            >
              <strong>Fairways.Tech</strong> is an impact-driven digital infrastructure platform for agricultural financing.
            </p>
            <p
              className={`transition-all duration-700 ease-out ${
                atGlanceFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: atGlanceFade.isVisible ? "240ms" : "0ms" }}
            >
              We help banks, cooperatives, and market partners work with smallholder farmers through trusted, structured visibility across agricultural value chains.
            </p>
            <p
              className={`transition-all duration-700 ease-out ${
                atGlanceFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: atGlanceFade.isVisible ? "360ms" : "0ms" }}
            >
              Built in emerging markets, on local field and market realities, where the work is hardest.
            </p>
            <p
              className={`pt-1 text-sm text-slate-700 transition-all duration-700 ease-out sm:text-base ${
                atGlanceFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: atGlanceFade.isVisible ? "480ms" : "0ms" }}
            >
              <a
                href="/about"
                className="inline-flex items-center justify-center gap-1 font-medium text-forest hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
              >
                Learn more about Fairways.Tech
                <span aria-hidden="true">↗</span>
              </a>
            </p>
            </div>
          </div>
        </section>

        <PhotoStorySlideshow />
        
        {/* WHY WE EXIST */}
        <section id="why" aria-labelledby="why-heading" className="relative overflow-hidden bg-sand px-6 py-16 sm:py-20">
          <div
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
            style={{ backgroundImage: "url('/images/female-farmers-inclusive.png')" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sand/60 via-sand/50 to-sand/65"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sand via-sand/60 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-sand/40 to-sand"
            aria-hidden="true"
          />
          <div className="relative z-10 mx-auto max-w-4xl" ref={whyWeExistFade.ref}>
            <div className={`text-center ${
              whyWeExistFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
            }`}>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                Why we exist
              </p>
              <h2 id="why-heading" className="mt-2 text-2xl font-semibold text-stone sm:text-3xl">
                The gap between farmers and finance isn&apos;t ability, it&apos;s visibility.
              </h2>
            </div>
            <div className={`mt-8 space-y-6 text-base leading-relaxed text-slate-800 sm:text-lg ${
              whyWeExistFade.isVisible ? 'fade-in-up-delay-1' : 'fade-in-hidden'
            }`}>
              <p className="mx-auto mb-4 max-w-3xl text-center">
                Millions of smallholder farmers produce real value but remain invisible to formal finance. Banks and buyers often can&apos;t see who is reliable, which fields are productive, or where money actually goes.
              </p>
              <ul className="space-y-3 text-base leading-relaxed text-slate-800 sm:text-lg">
                <li className={`text-center ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-2' : 'fade-in-hidden'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Farmers struggle</strong>
                  </div>
                  <p className="mt-1">
                    To secure inputs and services on fair terms, especially at the moments they need them most.
                  </p>
                </li>
                <li className={`text-center ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-3' : 'fade-in-hidden'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Banks see rural lending</strong>
                  </div>
                  <p className="mt-1">
                    As too risky and too expensive, because they lack clear, trusted records of performance.
                  </p>
                </li>
                <li className={`text-center ${
                  whyWeExistFade.isVisible ? 'fade-in-up-delay-4' : 'fade-in-hidden'
                }`}>
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Value chains stay informal</strong>
                  </div>
                  <p className="mt-1">
                    With no shared record of who produced what, when, and under which conditions.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-20">
          {/* SOLUTION - ORIGINAL WITH CIRCLES (BACKUP - COMMENTED OUT)
          <section id="solution-circles-backup" className="bg-sand px-6 py-24 sm:py-28 lg:px-24">
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col gap-y-12 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
                <div className="max-w-xl lg:max-w-2xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                    Our solution
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    A shared digital infrastructure
                    <br />
                    for scalable farming.
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-700 sm:text-[15px]">
                    Fairways.Tech is a community-driven agri-fintech ecosystem that
                    transforms fragmented farm activity into trusted, structured data.
                    We capture field, crop, and transaction flows to unlock finance
                    and markets for smallholder farmers, enabling banks and partners
                    to serve rural communities with confidence.
                  </p>
                  <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-slate-800">
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Digital farm profiles</strong> linking fields,
                        seasons, crops and performance.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Transparent value-chain flows</strong> from input
                        provision to harvest and sale.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                    <Leaf
  className="mt-0.5 h-5 w-5 shrink-0 text-forest"
  strokeWidth={2.4}
/>
                      <span>
                        <strong>Compliance-first rails</strong> that make risk
                        visible for local financial institutions.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-10 flex flex-col items-center gap-8 text-center lg:mt-0 lg:items-end lg:gap-10 lg:text-left">
                  {solutionVisualItems.map((item) => (
                    <div
                      key={item.alt}
                      className="flex flex-wrap items-center justify-center gap-4 text-center lg:flex-nowrap lg:justify-start lg:gap-6 lg:text-left"
                    >
                      <div
                        className={`relative ${item.sizeClass} overflow-hidden rounded-full shadow-xl ring-1 ring-black/5`}
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[11px] font-medium uppercase leading-tight tracking-[0.16em] text-slate-500">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          END BACKUP */}

          {/* SOLUTION - VIDEO VERSION (ACTIVE) */}
          <section id="solution" aria-labelledby="solution-heading" className="bg-sand px-6 py-24 sm:py-28 lg:px-24">
            <div className="mx-auto max-w-4xl" ref={ourSolutionFade.ref}>
              <div className={`text-center ${
                ourSolutionFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
              }`}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                  Our solution
                </p>
                <h2 id="solution-heading" className="mt-3 text-2xl font-semibold text-stone sm:text-3xl">
                  From farm activity to trusted finance.
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-800 sm:text-lg">
                  Digital infrastructure that turns farm activity into trusted records, so banks and partners can confidently finance inputs and services.
                </p>
              </div>
              <ul className={`mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-slate-800 sm:text-lg ${
                ourSolutionFade.isVisible ? 'fade-in-up-delay-1' : 'fade-in-hidden'
              }`}>
                <li
                  className={`text-center transition-all duration-700 ease-out ${
                    ourSolutionFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: ourSolutionFade.isVisible ? "220ms" : "0ms" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Verified farmer profiles</strong>
                  </div>
                  <p className="mt-1">
                    Trusted profiles that make farmer identity and production history visible over time.
                  </p>
                </li>
                <li
                  className={`text-center transition-all duration-700 ease-out ${
                    ourSolutionFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: ourSolutionFade.isVisible ? "340ms" : "0ms" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Farm-to-market tracking</strong>
                  </div>
                  <p className="mt-1">
                    Clear value-chain visibility from production to market activity.
                  </p>
                </li>
                <li
                  className={`text-center transition-all duration-700 ease-out ${
                    ourSolutionFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: ourSolutionFade.isVisible ? "460ms" : "0ms" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Leaf
                      className="h-5 w-5 shrink-0 text-forest"
                      strokeWidth={2.4}
                    />
                    <strong>Institution-ready records</strong>
                  </div>
                  <p className="mt-1">
                    Structured, traceable information that institutions can review within their own standards.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* WHO WE SERVE */}
<section
  id="partnerships"
  aria-labelledby="partnerships-heading"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-20"
>
  {/* Vegetables background */}
  <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/images/farmer_holds_vegetables.webp')] bg-cover bg-center" />

  {/* Dark overlay so text + cards stand out, similar to CTA */}
  <div className="pointer-events-none absolute inset-0 z-0 bg-black/25" />

  {/* Top sand fade – smooth transition from page background */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade into sand, like hero/approach/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-10 px-6 md:px-8">
    <div className="mx-auto max-w-3xl text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
        Partners across the food system
      </p>
      <h2 id="partnerships-heading" className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Who we serve
      </h2>
      <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-white/85 leading-relaxed">
        These partnerships connect farmers, finance, and markets in one trusted ecosystem.
      </p>
    </div>

    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={partnershipCardsFade.ref}>
      {partnershipCards.map((card, index) => {
        return (
          <div
            key={card.title}
            className={`${homeGlassCardClass} ${
              partnershipCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: partnershipCardsFade.isVisible ? `${index * 100}ms` : '0ms' }}
          >
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-white/85 leading-relaxed">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>

    <div className="mt-8 text-center text-sm text-white/80">
      <p className="mb-2">
        See how this connects into our governance and data model.
      </p>
      <a
        href="/about"
        className="inline-flex items-center gap-1 font-medium text-white hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
      >
        Learn more about Fairways.Tech
        <span aria-hidden="true">↗</span>
      </a>
    </div>
  </div>
</section>

          {/* SDG logos-only section — Our focus */}
          <section aria-labelledby="home-sdg-logos" className="mt-4 bg-sand px-6 py-12">
            <div
              ref={sdgFade.ref}
              className={`mx-auto max-w-6xl transition-all duration-700 ease-out ${
                sdgFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <SdgLogosOnly
                title="8 Goals. 1 Mission."
                subtitle="Our focus on eight UN Sustainable Development Goals."
                animateIn={sdgFade.isVisible}
                list={[
                  { id: 1, label: "No Poverty", file: "/images/sdg/sdg-1-no-poverty.svg", short: "Increase incomes and economic resilience for smallholder farmers" },
                  { id: 2, label: "Zero Hunger", file: "/images/sdg/sdg-2-zero-hunger.svg", short: "Increase productivity & incomes for smallholder farmers" },
                  { id: 3, label: "Good Health and Well-being", file: "/images/sdg/sdg-3-good-health.svg", short: "Improve food safety and reduce foodborne illness" },
                  { id: 5, label: "Gender Equality", file: "/images/sdg/sdg-5-gender-equality.svg", short: "Support women-led farm businesses to scale" },
                  { id: 8, label: "Decent Work & Economic Growth", file: "/images/sdg/sdg-8-decent-work.svg", short: "Formalize farm businesses & expand access to financial services" },
                  { id: 9, label: "Industry, Innovation & Infrastructure", file: "/images/sdg/sdg-9-industry-infrastructure.svg", short: "Finance cold-chain and processing infrastructure" },
                  { id: 10, label: "Reduced Inequalities", file: "/images/sdg/sdg-10-reduced-inequalities.svg", short: "Reduce inequalities in market access and value distribution" },
                  { id: 12, label: "Responsible Consumption & Production", file: "/images/sdg/sdg-12-responsible-production.svg", short: "Cut food waste and improve supply-chain transparency" },
                ]}
              />
              <p className="text-sm text-center text-gray-600 mt-6">
                <a
                  href="/impact"
                  className="inline-flex items-center gap-1 font-medium text-forest hover:underline underline-offset-4 focus:outline-none focus:ring-2 focus:ring-forest/60 focus:ring-offset-2"
                >
                  Learn more about our impact
                  <span aria-hidden="true">↗</span>
                </a>
              </p>
            </div>
          </section>

          {/* OUR APPROACH */}
        <section
  id="approach"
  aria-labelledby="approach-heading"
  className="relative scroll-mt-24 overflow-hidden bg-[#f4efe5] py-16 sm:py-20"
>
  {/* Wet leaf background video */}
  <div className="pointer-events-none absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
      className="h-full w-full object-cover"
    >
      <source src="/videos/wetleaf_backgroundvideo.mp4" type="video/mp4" />
    </video>
  </div>

  {/* Dark overlay similar to hero/CTA so text reads well */}
  <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent" />

  {/* Top sand fade – soft roll-in from sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#f4efe5] via-[#f4efe5]/40 to-transparent" />

  {/* Bottom fade to blend into sand, like hero/CTA */}
  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#f4efe5]/35 to-[#f4efe5]" />

  <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 md:px-8">
    {/* centered heading */}
    <div className="mx-auto max-w-3xl text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
        Our approach
      </p>
      <h2 id="approach-heading" className="mt-2 text-xl font-semibold text-white sm:text-2xl">
        Clear. Compliant. Community-driven.
      </h2>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={approachCardsFade.ref}>
      <div className={`${homeGlassCardClass} ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Real activity
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Captured consistently, building a trusted history over time.
        </p>
      </div>
      <div className={`${homeGlassCardClass} ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '150ms' : '0ms' }}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Infrastructure
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Structured records that institutions can use within their existing standards.
        </p>
      </div>
      <div className={`${homeGlassCardClass} ${
        approachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: approachCardsFade.isVisible ? '300ms' : '0ms' }}>
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase">
          Local partners
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85">
          Guiding farmers to stay connected to transparent, reliable systems.
        </p>
      </div>
    </div>
    <div className="mt-8 text-center text-sm text-white/80">
      <p>
        See the outcomes this approach makes possible for farmers, institutions, and food systems.
      </p>
    </div>
  </div>
</section>

          {/* AT A GLANCE / NUMBERS */}
          <section
            id="compliance"
            aria-labelledby="reach-heading"
            className="bg-sand py-16 sm:py-20"
            ref={statsRef}
          >
            <div className="mx-auto max-w-6xl space-y-8 px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                  Reach
                </p>
                <h2 id="reach-heading" className="mt-2 text-xl font-semibold text-stone sm:text-2xl">
                  Where Fairways.Tech is active
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-700 sm:text-[15px]">
                  We&apos;re growing a network of farmers, local partners, and financial institutions across priority regions, with strong roots in Ghana and the Netherlands.
                </p>
              </div>

              <div className="grid items-stretch gap-6 sm:grid-cols-3" ref={reachCardsFade.ref}>
                {/* COUNTRIES */}
                <div className={`${homeReachCardClass} ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}>
                  {/* Background image */}
                  <div className={homeReachImageShellClass}>
                    <Image
                      src="/images/reach-countries-card-v2.png"
                      alt=""
                      fill
                      className="h-full w-full object-cover opacity-90"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      priority
                      unoptimized
                      aria-hidden
                    />
                  </div>
                  {/* Dark overlay for text contrast */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
                    style={homeDarkOverlayStyle}
                    aria-hidden="true"
                  />
                  {/* Content */}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <div className="mb-4 flex min-h-[4.5rem] w-full items-center justify-center sm:min-h-[5rem]">
                      <p className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase drop-shadow-sm">
                        COUNTRIES
                      </p>
                    </div>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                      <Counter target={2} suffix="+" animate={statsInView} />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-white/95 drop-shadow-sm">
                      Growing network across Africa, Asia, Europe and Latin America, expanding
                      trusted systems, so farmers can access finance regardless of location.
                    </p>
                  </div>
                </div>

                {/* FARMERS */}
                <div className={`${homeReachCardClass} ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: reachCardsFade.isVisible ? '150ms' : '0ms' }}>
                  {/* Background image */}
                  <div className={homeReachImageShellClass}>
                    <Image
                      src="/images/reach-farmers-card.png"
                      alt=""
                      fill
                      className="h-full w-full object-cover object-[25%_center] opacity-90"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      priority
                      unoptimized
                      aria-hidden
                    />
                  </div>
                  {/* Dark overlay for text contrast */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
                    style={homeDarkOverlayStyle}
                    aria-hidden="true"
                  />
                  {/* Content */}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <div className="mb-4 flex min-h-[4.5rem] w-full items-center justify-center sm:min-h-[5rem]">
                      <p className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase drop-shadow-sm">
                        FARMERS
                      </p>
                    </div>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                      <Counter target={21} suffix="K" animate={statsInView} />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-white/95 drop-shadow-sm">
                      We widen inclusion by reaching more farmers as our network scales.
                    </p>
                  </div>
                </div>

                {/* COMMUNITY AGENTS */}
                <div className={`${homeReachCardClass} ${
                  reachCardsFade.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: reachCardsFade.isVisible ? '300ms' : '0ms' }}>
                  {/* Background image */}
                  <div className={homeReachImageShellClass}>
                    <Image
                      src="/images/community-agents-field.png"
                      alt=""
                      fill
                      className="h-full w-full object-cover opacity-90"
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      priority
                      unoptimized
                      aria-hidden
                    />
                  </div>
                  {/* Dark overlay for text contrast */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] rounded-2xl"
                    style={homeDarkOverlayStyle}
                    aria-hidden="true"
                  />
                  {/* Content */}
                  <div className="relative z-10 flex h-full w-full flex-col items-center justify-start px-8 py-10 text-center transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
                    <div className="mb-4 flex min-h-[4.5rem] w-full items-center justify-center sm:min-h-[5rem]">
                      <p className="text-lg sm:text-xl font-semibold tracking-tight text-white uppercase drop-shadow-sm">
                        COMMUNITY AGENTS
                      </p>
                    </div>
                    <p className="mb-5 text-6xl sm:text-7xl font-bold tracking-tight text-white drop-shadow-md">
                      <Counter target={30} suffix="+" animate={statsInView} />
                    </p>
                    <p className="text-base font-semibold leading-relaxed text-white/95 drop-shadow-sm">
                      Cooperatives and local field agents connecting farms to our digital platform, ensuring every farmer record is real, active and up to date.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MISSION */}
          <section id="mission" aria-labelledby="mission-heading" className="bg-sand py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-6 lg:px-8" ref={ourMissionFade.ref}>
              <div className={`text-center ${
                ourMissionFade.isVisible ? 'fade-in-up' : 'fade-in-hidden'
              }`}>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-forest">
                  Our mission
                </p>
                <h2 id="mission-heading" className="mt-2 text-2xl font-semibold text-stone sm:text-3xl">
                  Building trust between farms and finance.
                </h2>
              </div>
              <div className="mx-auto mt-8 max-w-2xl space-y-6 text-center text-base leading-relaxed text-slate-800 sm:text-lg">
                <p
                  className={`transition-all duration-700 ease-out ${
                    ourMissionFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: ourMissionFade.isVisible ? "180ms" : "0ms" }}
                >
                  We believe farmers deserve finance that respects their work, and institutions deserve data they can trust.
                </p>
                <p
                  className={`transition-all duration-700 ease-out ${
                    ourMissionFade.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: ourMissionFade.isVisible ? "320ms" : "0ms" }}
                >
                  That is why we bridge the field and formal standards: visibility where rural communities need it, evidence where institutions need it, without guesswork.
                </p>
              </div>
            </div>
          </section>

          <Suspense fallback={<div className="h-64" />}>
            <ContactCta />
          </Suspense>
        </div>
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
