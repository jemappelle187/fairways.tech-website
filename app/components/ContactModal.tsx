"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ContactForm } from "./ContactForm";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we're in the browser before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormSuccess = () => {
    onClose();
    setShowToast(true);
  };

  useEffect(() => {
    if (!showToast) return;
    const timeout = setTimeout(() => {
      setShowToast(false);
    }, 7000);
    return () => clearTimeout(timeout);
  }, [showToast]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!mounted || typeof document === "undefined") return null;
  if (!isOpen && !showToast) return null;

  const modalContent = (
    <>
      {/* Premium modal with contact form */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-sm p-3 sm:p-4"
          onClick={(e) => {
            // Close when clicking backdrop
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <div className="relative w-full max-w-xl max-h-[90vh] sm:max-h-[90vh] my-auto transform rounded-2xl sm:rounded-3xl bg-white/95 shadow-2xl shadow-black/30 transition-all duration-200 flex flex-col overflow-hidden">
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-2 top-2 sm:right-3 sm:top-3 z-20 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-lg text-slate-500 shadow-sm transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              aria-label="Close contact form"
            >
              ×
            </button>

            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto overscroll-contain min-h-0">
              {/* Header */}
              <div className="border-b border-slate-100 px-4 pb-2 pt-4 sm:px-6 sm:pb-3 sm:pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-forest">
                  Community-driven agri–fintech
                </p>
                <h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900 md:text-xl">
                  Share a few details
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Tell us who you are and how you&apos;d like to collaborate.
                </p>
              </div>

              {/* Body: Custom contact form */}
              <div className="px-4 pb-4 pt-3 sm:px-6 sm:pb-6 sm:pt-4">
                <ContactForm onSuccess={handleFormSuccess} onClose={onClose} />
              </div>

              {/* Footer hint */}
              <div className="border-t border-slate-100 px-4 py-2 sm:px-6 sm:py-3">
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  By submitting, you agree that Fairways.Tech may contact you
                  about partnerships and product updates. Data is processed in
                  line with our privacy &amp; cookie statements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium success notification (after form submission) */}
      {showToast && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-md transform rounded-3xl bg-white/95 p-0 shadow-2xl shadow-black/30 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-center px-8 py-10 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center">
                <Image
                  src="/images/logo/master/fairways-master-logo.png"
                  alt="Fairways.Tech"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Message sent successfully
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-600">
                Thanks for reaching out. We&apos;ve received your details and will
                get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setShowToast(false)}
                className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(31,59,44,0.24)] transition hover:-translate-y-0.5 hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );

  // Render modal using portal to body level to avoid stacking context issues
  // This ensures the modal appears above all other content, including the header
  return document.body ? createPortal(modalContent, document.body) : null;
}
