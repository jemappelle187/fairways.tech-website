"use client";

import { useState, useEffect } from "react";
import { track } from "@/lib/umami";

type ContactFormData = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  emailVerify: string;
  phoneCountryCode: string;
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
    emailVerify: "",
    phoneCountryCode: "+31",
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

    // IP + geo lookup (using ipapi.co - was giving correct city in emails)
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

    // Validate email match
    if (formData.email !== formData.emailVerify) {
      setError("Email addresses do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: formData.phoneCountryCode + formData.phone,
          ...tracking,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      track("contact_form_submitted");
      onSuccess();
    } catch (err: any) {
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
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      {error && (
        <div role="alert" aria-live="polite" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
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
            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
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
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div>
          <label
            htmlFor="emailVerify"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Verify email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="emailVerify"
            name="emailVerify"
            required
            value={formData.emailVerify}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs font-medium text-slate-700 mb-1.5"
          >
            Phone (optional)
          </label>
          <div className="relative">
            <select
              id="phoneCountryCode"
              name="phoneCountryCode"
              value={formData.phoneCountryCode}
              onChange={handleChange}
              className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-10 border-0 bg-transparent text-xs sm:text-sm text-slate-600 focus:outline-none appearance-none pr-6 sm:pr-8"
              style={{ width: "auto" }}
            >
              <option value="+31">🇳🇱 +31</option>
              <option value="+233">🇬🇭 +233</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+39">🇮🇹 +39</option>
              <option value="+234">🇳🇬 +234</option>
              <option value="+254">🇰🇪 +254</option>
              <option value="+27">🇿🇦 +27</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                // Remove non-digits and limit based on country code (max 10 total including country code)
                const digitsOnly = e.target.value.replace(/\D/g, '');
                const countryCodeDigits = formData.phoneCountryCode.replace(/\D/g, '').length;
                const maxPhoneDigits = 10 - countryCodeDigits;
                const limited = digitsOnly.slice(0, maxPhoneDigits);
                setFormData((prev) => ({ ...prev, phone: limited }));
              }}
              placeholder="123456789"
              maxLength={10}
              className="w-full rounded-lg border border-slate-200 bg-white pl-20 sm:pl-24 pr-2 sm:pr-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
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
            className="w-full rounded-lg border border-slate-200 bg-white px-2 sm:px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
          >
            <option value="">Select a country</option>
            <option value="Ghana">🇬🇭 Ghana</option>
            <option value="Netherlands">🇳🇱 Netherlands</option>
            <option value="United Kingdom">🇬🇧 United Kingdom</option>
            <option value="United States">🇺🇸 United States</option>
            <option value="Germany">🇩🇪 Germany</option>
            <option value="France">🇫🇷 France</option>
            <option value="Italy">🇮🇹 Italy</option>
            <option value="Other">🌍 Other</option>
          </select>
        </div>
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
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest resize-none"
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
              <span className="mr-2 h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" aria-hidden="true" />
              <span>Sending...</span>
              <span className="sr-only">Please wait, sending your message</span>
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}

