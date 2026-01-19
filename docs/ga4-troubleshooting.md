# Google Analytics 4 Troubleshooting Guide

## Issue: "Geen gegevens ontvangen" (No data received)

If Google Analytics shows "No data received" after deployment, follow these steps:

## Step 1: Verify Environment Variable

### Check in Browser Console:
1. Open your website
2. Open browser console (F12)
3. Run this command:
   ```javascript
   // Check if GA is loaded
   console.log('gtag exists:', typeof window.gtag !== 'undefined');
   console.log('dataLayer exists:', typeof window.dataLayer !== 'undefined');
   
   // Check if scripts are loaded
   const scripts = Array.from(document.querySelectorAll('script[src*="googletagmanager"]'));
   console.log('GA scripts found:', scripts.length);
   scripts.forEach(s => console.log('Script:', s.src));
   ```

### Check Network Tab:
1. Open DevTools → Network tab
2. Accept cookies on your site
3. Look for requests to:
   - `googletagmanager.com/gtag/js?id=G-MG34VECOY3`
   - `google-analytics.com/g/collect` (data collection)

## Step 2: Verify Cookie Consent

1. Open browser console
2. Check localStorage:
   ```javascript
   localStorage.getItem('fw_cookie_consent_v1')
   ```
   Should return: `"accepted"`

3. If it's not "accepted":
   - Clear it: `localStorage.removeItem('fw_cookie_consent_v1')`
   - Refresh page
   - Accept cookies again

## Step 3: Check Console Logs

After accepting cookies, you should see:
```
[GoogleAnalytics] Consent accepted, loading GA4
[GoogleAnalytics] GA4 initialized with ID: G-MG34VECOY3
```

If you see:
```
[GoogleAnalytics] No NEXT_PUBLIC_GA_MEASUREMENT_ID found
```
→ The environment variable isn't set correctly.

## Step 4: Verify Environment Variable in Production

### For Vercel:
1. Go to your Vercel project
2. Settings → Environment Variables
3. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists
4. Value should be: `G-MG34VECOY3`
5. **Important**: Make sure it's set for "Production" environment
6. **Redeploy** after adding/changing env vars

### For Local Development:
1. Check `.env.local` file:
   ```bash
   cat .env.local | grep GA
   ```
   Should show: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-MG34VECOY3`

2. **Restart dev server** after changing `.env.local`

## Step 5: Test GA4 Manually

If automatic loading isn't working, test manually in browser console:

```javascript
// Check if gtag is available
if (typeof window.gtag === 'undefined') {
  // Load script manually
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-MG34VECOY3';
  document.head.appendChild(script);
  
  script.onload = () => {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-MG34VECOY3', {
      page_path: window.location.pathname,
      anonymize_ip: true,
    });
    console.log('GA4 loaded manually');
    
    // Send a test event
    gtag('event', 'test_event', {
      event_category: 'test',
      event_label: 'manual_test'
    });
  };
} else {
  // GA already loaded, send test event
  window.gtag('event', 'test_event', {
    event_category: 'test',
    event_label: 'test_from_console'
  });
  console.log('Test event sent');
}
```

## Step 6: Check Ad Blockers

- **Disable ad blockers** (uBlock Origin, AdBlock Plus, etc.)
- **Try incognito/private mode**
- Some browsers block GA by default

## Step 7: Wait for Data

- **Realtime reports**: Should show data within seconds
- **Standard reports**: Can take 24-48 hours to populate
- Check **Realtime** → **Overview** for immediate verification

## Common Issues

### Issue: Environment variable not available
**Solution**: 
- Next.js requires rebuild after adding env vars
- Vercel: Add env var → Redeploy
- Local: Add to `.env.local` → Restart dev server

### Issue: Scripts not loading
**Solution**:
- Check browser console for errors
- Verify network requests to googletagmanager.com
- Check if ad blockers are blocking

### Issue: Consent not detected
**Solution**:
- Clear localStorage: `localStorage.removeItem('fw_cookie_consent_v1')`
- Refresh and accept cookies again
- Check console for consent logs

### Issue: Data delayed
**Solution**:
- Realtime reports show immediately
- Standard reports take 24-48 hours
- This is normal for GA4

## Verification Checklist

- [ ] Environment variable set in Vercel (Production)
- [ ] Environment variable set in `.env.local` (local dev)
- [ ] Site redeployed after adding env var
- [ ] Cookies accepted (check localStorage)
- [ ] No ad blockers active
- [ ] Console shows GA4 initialization logs
- [ ] Network tab shows requests to googletagmanager.com
- [ ] Realtime reports checked (not just standard reports)

## Still Not Working?

1. **Check Vercel build logs** for any errors
2. **Check browser console** for JavaScript errors
3. **Verify Measurement ID** matches exactly: `G-MG34VECOY3`
4. **Try manual test** (Step 5 above)
5. **Check GA4 DebugView** (if available in your account)

---

**Last Updated**: December 2025



