"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  "aria-hidden"?: string | boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "none" | "metadata" | "auto";
  children?: React.ReactNode;
}

export function LazyVideo({
  src,
  className = "",
  style,
  ariaLabel,
  "aria-hidden": ariaHidden,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "none",
  children,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);

  // IntersectionObserver for lazy loading and scroll-based pause
  useEffect(() => {
    if (typeof window === "undefined" || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isIntersecting = entry.isIntersecting;
          setIsInView(isIntersecting);

          // Load video when about to enter viewport (with 200px margin)
          if (!shouldLoad && isIntersecting) {
            setShouldLoad(true);
          }

          // Pause/resume based on viewport visibility
          if (video && shouldLoad) {
            if (isIntersecting && isTabVisible) {
              video.play().catch(() => {
                // Ignore play() errors (e.g., autoplay restrictions)
              });
            } else {
              video.pause();
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "200px", // Start loading 200px before entering viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoad, isTabVisible]);

  // Page Visibility API for tab switching
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsTabVisible(isVisible);

      if (videoRef.current && shouldLoad) {
        if (isVisible && isInView) {
          // Tab is visible and video is in viewport - resume
          videoRef.current.play().catch(() => {
            // Ignore play() errors
          });
        } else {
          // Tab is hidden - pause
          videoRef.current.pause();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldLoad, isInView]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ ...style, display: shouldLoad ? "block" : "none" }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      preload={shouldLoad ? "auto" : "none"}
    >
      {shouldLoad && <source src={src} type="video/mp4" />}
      {children}
    </video>
  );
}
