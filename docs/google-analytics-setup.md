# Google Analytics 4 (GA4) Setup Guide

## ✅ Status: Configured & Ready

Google Analytics 4 has been integrated into the Fairways.Tech website with GDPR-compliant cookie consent management.

## 📊 Pricing

**Google Analytics 4 is FREE** for standard use cases:
- ✅ **Free tier**: Unlimited hits, standard features
- ✅ **Suitable for**: Small to medium businesses (up to 10M hits/month)
- ❌ **GA360 (Enterprise)**: $50k+/year - NOT needed for your use case

**Conclusion**: No payment required. GA4 free tier is perfect for your needs.

## 🔧 Setup Instructions

### Step 1: Create Google Analytics Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Admin"** (gear icon) → **"Create Property"**
4. Fill in:
   - Property name: `Fairways.Tech`
   - Reporting time zone: `Europe/Amsterdam` (or your preference)
   - Currency: `EUR` (or your preference)
5. Click **"Next"** → **"Create"**

### Step 2: Get Measurement ID

1. In your new property, go to **"Admin"** → **"Data Streams"**
2. Click **"Add stream"** → **"Web"**
3. Enter:
   - Website URL: `https://fairways.tech`
   - Stream name: `Fairways.Tech Website`
4. Click **"Create stream"**
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 3: Add Environment Variable

Add the Measurement ID to your `.env.local` file:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Important**: Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 4: Deploy

1. Add the same environment variable to your production environment (Vercel, etc.)
2. Deploy your changes
3. Visit your website and accept cookies
4. Check Google Analytics → **"Realtime"** to verify tracking is working

## 🎯 What's Tracked

### Automatic Tracking:
- ✅ **Page views** (all pages)
- ✅ **User sessions**
- ✅ **Traffic sources** (referrers, search engines)
- ✅ **Device & browser** information
- ✅ **Geographic location** (country, city)

### Enhanced Event Tracking:
- ✅ **Contact form opened** (`contact_form_opened`)
- ✅ **Contact form submitted** (`contact_form_submitted`)
- ✅ **CTA button clicks** (`cta_clicked`)
- ✅ **External link clicks** (`external_link_clicked`)
- ✅ **Section views** (`section_viewed`)

## 🔒 Privacy & GDPR Compliance

### Cookie Consent Integration:
- ✅ **Only loads when user accepts cookies** (via cookie banner)
- ✅ **Respects user choice** - doesn't load if declined
- ✅ **IP anonymization enabled** (`anonymize_ip: true`)
- ✅ **Secure cookies** (`SameSite=None;Secure`)

### Data Retention:
- **User-level data**: 14 months (GA4 default)
- **Aggregated data**: Indefinitely

### What Data is Collected:
- Page views, events, device info, location (city/country level)
- **NOT collected**: Personal names, emails, exact addresses
- **IP addresses**: Anonymized automatically

## 📈 Viewing Analytics

### Access Your Dashboard:
1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your **Fairways.Tech** property
3. View reports:
   - **Realtime**: See current visitors
   - **Reports**: Historical data, user behavior
   - **Engagement**: Page views, events, conversions

### Key Metrics to Monitor:
- **Users**: Total unique visitors
- **Sessions**: Total visits
- **Page views**: Which pages are most popular
- **Events**: Contact form submissions, CTA clicks
- **Traffic sources**: Where visitors come from
- **Geographic data**: Which countries/cities visit most

## 🛠️ Custom Event Tracking

### Using the Analytics Library:

```typescript
import { analytics } from "@/lib/analytics";

// Contact form opened
analytics.contactFormOpened();

// Contact form submitted
analytics.contactFormSubmitted(true); // true = success

// CTA clicked
analytics.ctaClicked("Start Partnership", "hero-section");

// External link clicked
analytics.externalLinkClicked("https://example.com", "Learn More");

// Custom event
analytics.custom("custom_event_name", {
  category: "engagement",
  label: "Custom Label",
  value: 1,
});
```

### Available Helper Functions:

- `analytics.contactFormOpened()` - Track when contact form opens
- `analytics.contactFormSubmitted(success)` - Track form submissions
- `analytics.ctaClicked(name, location)` - Track CTA button clicks
- `analytics.externalLinkClicked(url, linkText)` - Track external links
- `analytics.sectionViewed(sectionName)` - Track section visibility
- `analytics.downloadStarted(fileName, fileType)` - Track downloads
- `analytics.videoPlayed(videoName)` - Track video plays
- `analytics.custom(eventName, params)` - Custom events

## 🔍 Verification

### Test Tracking:
1. Visit your website
2. Accept cookies in the banner
3. Navigate to different pages
4. Click CTAs, open contact form
5. Go to Google Analytics → **"Realtime"**
6. You should see your activity appear within seconds

### Debug Mode (Development):
Add this to your browser console to see GA events:
```javascript
// Enable debug mode
gtag('config', 'G-XXXXXXXXXX', {
  debug_mode: true
});
```

## 📝 Files Modified

- ✅ `app/components/GoogleAnalytics.tsx` - GA4 loader component
- ✅ `lib/analytics.ts` - Enhanced analytics library
- ✅ `app/layout.tsx` - Added GoogleAnalytics component
- ✅ `app/components/CookieBanner.tsx` - Updated to mention GA
- ✅ `app/components/ContactCta.tsx` - Using enhanced tracking
- ✅ `app/components/ContactForm.tsx` - Using enhanced tracking
- ✅ `app/components/SiteChrome.tsx` - Using enhanced tracking

## 🚨 Troubleshooting

### GA4 Not Loading:
1. Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Verify user accepted cookies (check localStorage: `fw_cookie_consent_v1`)
3. Check browser console for errors
4. Verify Measurement ID format: `G-XXXXXXXXXX`

### Events Not Showing:
1. Wait 24-48 hours for events to appear in standard reports
2. Check **Realtime** reports for immediate verification
3. Verify events are being called (check browser console)
4. Ensure cookies are accepted

### Privacy Concerns:
- All IP addresses are anonymized automatically
- No personal data is collected
- Users can decline cookies to opt-out
- Complies with GDPR requirements

## 📚 Additional Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GDPR Compliance with GA4](https://support.google.com/analytics/answer/9019185)

## ✅ Next Steps

1. **Set up GA4 property** (if not done)
2. **Add Measurement ID** to `.env.local`
3. **Deploy to production** with environment variable
4. **Test tracking** by accepting cookies and navigating
5. **Monitor analytics** in Google Analytics dashboard

---

**Last Updated**: December 2025  
**Status**: ✅ Ready for production use



