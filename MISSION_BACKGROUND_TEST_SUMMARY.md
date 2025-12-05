# Mission Section — Background Image Test ✅

**Date:** December 5, 2025  
**Goal:** Test leaf_background.png as background for "Our mission" section

---

## ✅ IMPLEMENTATION

### Background Image Added:

```tsx
<section id="mission" className="relative overflow-hidden py-16 sm:py-20">
  {/* Background image */}
  <div className="pointer-events-none absolute inset-0">
    <Image
      src="/images/leaf_background.png"
      alt=""
      fill
      className="object-cover"
      priority={false}
    />
  </div>
  
  {/* Overlay for text readability */}
  <div className="pointer-events-none absolute inset-0 bg-sand/60" />
  
  {/* Content (relative z-10) */}
  <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8">
    <!-- text content -->
  </div>
</section>
```

**Technical details:**
- ✅ Image fills entire section (`fill`, `object-cover`)
- ✅ Overlay at 60% sand color (`bg-sand/60`) for text readability
- ✅ Content sits above with `relative z-10`
- ✅ No card wrapper (clean, like "Why we exist")

---

## 🎨 VISUAL STRUCTURE

**Layers (bottom to top):**
1. **Leaf background image** (full section coverage)
2. **Sand overlay** (60% opacity - ensures text readable)
3. **Content** (label, header, 2 paragraphs)

---

## 🧪 TEST ON LOCALHOST:3000

### Visual Checks:

**1. Background visibility:**
- ✅ Can you see the leaf image behind the text?
- ✅ Is it subtle or overpowering?
- ✅ Does the sand overlay make it feel natural?

**2. Text readability:**
- ✅ Label "Our mission" clearly visible?
- ✅ Header "Building trust..." readable?
- ✅ Both paragraphs have good contrast?
- ✅ No text feels washed out?

**3. Overall aesthetic:**
- ✅ Does it add visual interest?
- ✅ Or does it distract from the message?
- ✅ Does it feel premium/natural?
- ✅ Does it flow well from "Reach" section above?

**4. Mobile:**
- ✅ Background scales properly?
- ✅ Text still readable at mobile sizes?
- ✅ No performance issues (image loads fast)?

---

## 🎨 OVERLAY ADJUSTMENT OPTIONS

**If text is too hard to read, increase overlay opacity:**

```tsx
// Current:
<div className="pointer-events-none absolute inset-0 bg-sand/60" />

// Stronger overlay (more readable):
<div className="pointer-events-none absolute inset-0 bg-sand/75" />

// Even stronger:
<div className="pointer-events-none absolute inset-0 bg-sand/85" />
```

---

**If background is too subtle, decrease overlay:**

```tsx
// Lighter overlay (more image visible):
<div className="pointer-events-none absolute inset-0 bg-sand/45" />

// Very light:
<div className="pointer-events-none absolute inset-0 bg-sand/30" />
```

---

**If you want gradient overlay (like other sections):**

```tsx
// Gradient fade (top lighter, bottom darker):
<div className="pointer-events-none absolute inset-0 bg-gradient-to-b 
     from-sand/40 via-sand/60 to-sand/75" />
```

---

## 💭 ALTERNATIVE: Remove Background

If the leaf background doesn't add enough value, we can simply remove it:

```tsx
<section id="mission" className="bg-sand py-16 sm:py-20">
  <!-- Just text, no background image -->
</section>
```

**Sometimes simple is better** - especially for mission statements.

---

## 🎯 MY OPINION

**I'd test these 3 options:**
1. **Current (sand/60 overlay)** - balanced
2. **No background at all** - clean, like "Why we exist"
3. **Lighter overlay (sand/45)** - more leaf visible

**Which feels most premium and trustworthy to you?**

---

**TEST NOW:** Go to localhost:3000 and see what you think! 🎨

Let me know if you want to:
- ✅ Keep it as is
- 🔧 Adjust overlay opacity
- 🎨 Try gradient overlay
- ❌ Remove background entirely

