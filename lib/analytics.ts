/**
 * Enhanced analytics tracking library
 * Supports both Umami and Google Analytics 4
 */

// Google Analytics 4 helper
export const trackGA = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventParams);
  }
};

// Umami helper (existing)
export const trackUmami = (event: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && (window as any).umami) {
    (window as any).umami.track(event, data);
  }
};

// Track to both analytics platforms
export const track = (eventName: string, eventParams?: Record<string, any>) => {
  trackGA(eventName, eventParams);
  trackUmami(eventName, eventParams);
};

// Enhanced event tracking helpers
export const analytics = {
  // Page view tracking (automatic in GA4, manual for custom tracking)
  pageView: (url: string, title?: string) => {
    trackGA("page_view", {
      page_path: url,
      page_title: title || document.title,
    });
  },

  // Contact form events
  contactFormOpened: () => {
    track("contact_form_opened", {
      category: "engagement",
      label: "Contact Form",
    });
  },

  contactFormSubmitted: (success: boolean) => {
    track("contact_form_submitted", {
      category: "conversion",
      label: success ? "Success" : "Error",
      value: success ? 1 : 0,
    });
  },

  // CTA button clicks
  ctaClicked: (ctaName: string, location: string) => {
    track("cta_clicked", {
      category: "engagement",
      label: ctaName,
      location: location,
    });
  },

  // Link clicks (external links)
  externalLinkClicked: (url: string, linkText?: string) => {
    track("external_link_clicked", {
      category: "engagement",
      label: linkText || url,
      url: url,
    });
  },

  // Section views (scroll tracking)
  sectionViewed: (sectionName: string) => {
    track("section_viewed", {
      category: "engagement",
      label: sectionName,
    });
  },

  // Download events
  downloadStarted: (fileName: string, fileType: string) => {
    track("file_download", {
      category: "engagement",
      label: fileName,
      file_type: fileType,
    });
  },

  // Video interactions
  videoPlayed: (videoName: string) => {
    track("video_play", {
      category: "engagement",
      label: videoName,
    });
  },

  videoCompleted: (videoName: string) => {
    track("video_complete", {
      category: "engagement",
      label: videoName,
    });
  },

  // Search events (if you add search)
  searchPerformed: (searchTerm: string, resultsCount?: number) => {
    track("search", {
      category: "engagement",
      search_term: searchTerm,
      results_count: resultsCount,
    });
  },

  // Custom event
  custom: (eventName: string, params?: Record<string, any>) => {
    track(eventName, params);
  },
};



