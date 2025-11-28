"use client";

import { useState, useEffect } from "react";
import { track } from "@/lib/umami";

type ContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  message: string;
};

type TrackingData = {
  ip: string;
  geoCountry: string;
  geoCity: string;
  device: string;
  browser: string;
  userAgent: string;
  referrer: string;
};

type ContactFormProps = {
  onSuccess: () => void;
  onClose: () => void;
};

export function ContactForm({ onSuccess, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const [tracking, setTracking] = useState<TrackingData>({
    ip: "",
    geoCountry: "",
    geoCity: "",
    device: "",
    browser: "",
    userAgent: "",
    referrer: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tracking data on mount
  useEffect(() => {
    // Device + browser detection
    if (typeof window !== "undefined") {
      const ua = window.navigator.userAgent || "";
      const lower = ua.toLowerCase();

      let device = "desktop";
      if (/ipad|tablet/.test(lower)) device = "tablet";
      else if (/mobile|iphone|android/.test(lower)) device = "mobile";

      let browser = "other";
      if (/edg\//.test(lower)) browser = "edge";
      else if (/chrome\//.test(lower)) browser = "chrome";
      else if (/safari\//.test(lower) && !/chrome\//.test(lower))
        browser = "safari";
      else if (/firefox\//.test(lower)) browser = "firefox";
      else if (/opr\//.test(lower)) browser = "opera";

      setTracking((prev) => ({
        ...prev,
        device,
        browser,
        userAgent: ua,
        referrer: document.referrer || "",
      }));
    }

    // IP + geo lookup
    const fetchIp = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) return;
        const data = await res.json();

        setTracking((prev) => ({
          ...prev,
          ip: data.ip ?? "",
          geoCountry: data.country_name ?? "",
          geoCity: data.city ?? "",
        }));
      } catch {
        // silently ignore
      }
    };

    fetchIp();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      console.log("[ContactForm] Submitting form:", { formData, tracking });
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...tracking,
        }),
      });

      console.log("[ContactForm] Response status:", response.status);
      const result = await response.json();
      console.log("[ContactForm] Response data:", result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      track("contact_form_submitted");
      onSuccess();
    } catch (err: any) {
      console.error("[ContactForm] Error:", err);
      setError(err.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            First name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Last name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="block text-xs font-medium text-slate-700 mb-1.5"
        >
          Company or organisation
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Phone (optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="country"
          className="block text-xs font-medium text-slate-700 mb-1.5"
        >
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
        >
          <option value="">Select a country</option>
          <option value="Ghana">Ghana</option>
          <option value="Netherlands">Netherlands</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Italy">Italy</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-slate-700 mb-1.5"
        >
          How would you like to collaborate? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest resize-none"
          placeholder="Tell us about your interest in Fairways.Tech..."
        />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-slate-500 hover:text-slate-700 transition"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2 h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              Sending...
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}

