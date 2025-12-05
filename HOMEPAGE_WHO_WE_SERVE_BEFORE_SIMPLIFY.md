# Homepage "Who we serve" Cards — BEFORE SIMPLIFICATION

**File:** `app/page.tsx`  
**Lines:** ~72-139 (partnershipCards array)  
**Date:** December 4, 2025

This is the complete content for the "Who we serve" cards BEFORE removing bullets.

---

## Original Card Structure (per card):

- Title
- Description (1 line)
- 3 Bullets

**Total:** 6 cards × 3 bullets = 18 bullets on homepage

---

## Full Card Data:

### 1. Banks & lenders
**Description:** Reduce risk and serve rural customers with real farm records – not assumptions.

**Bullets:**
- See verified farm records, crops and repayment history in one place.
- Use information that aligns with AML/CFT and local regulatory expectations.
- Finance inputs and services through controlled channels with clear audit trails.

---

### 2. Farmer groups & cooperatives
**Description:** Digitize member information and unlock group financing for stronger collective impact.

**Bullets:**
- Register members digitally with local agent support.
- Track group-level and member-level loans and repayments.
- Access finance as inputs, services and purchases — without cash disbursements.

---

### 3. Buyers & off-takers
**Description:** Source reliable, traceable volumes from farms you can verify and trust.

**Bullets:**
- See who grows your produce and where they farm.
- Use planting and harvest records to plan sourcing cycles.
- Meet traceability and quality standards more easily.

---

### 4. Development & impact partners
**Description:** Turn funding into measurable outcomes with real-time visibility into farmer results.

**Bullets:**
- Track funds from disbursement to on-farm outcomes.
- Monitor financial inclusion and livelihood changes over time.
- Access dashboards and exportable evidence for SDG and impact reporting.

---

### 5. Governments & regulators
**Description:** Gain transparency into rural finance flows and food-security trends.

**Bullets:**
- See anonymised trends in rural lending and repayment behaviour.
- Monitor inclusion levels and early stress signals in the system.
- Ensure rural finance flows follow AML/CFT and data-protection rules.

---

### 6. Knowledge partners
**Description:** Measure training impact with field-level evidence of what farmers actually do.

**Bullets:**
- See behaviour change and yield improvements after training.
- Link training programmes directly to farmer outcomes and practices.
- Validate programme effectiveness with transaction and harvest records.

---

## Problem:

18 bullets across 6 cards = **overwhelming scan on homepage**

- Visitors scanning homepage see walls of bullet points
- Key benefits get lost in the detail
- This depth belongs on `/about`, not homepage

---

## Target State:

**Title + Expanded Description (no bullets)**

Example for Banks & lenders:

**BEFORE:**
> Reduce risk and serve rural customers with real farm records – not assumptions.
> • See verified farm records...
> • Use information that aligns with AML/CFT...
> • Finance inputs and services...

**AFTER:**
> Reduce risk and serve rural customers with verified farm records, crops, and repayment history. Data aligns with AML/CFT standards so you can finance inputs and services through controlled, traceable channels.

**Impact per card:**
- ~55 words → ~35 words (36% reduction)
- More scannable (no bullets = cleaner visual)
- Key value still communicated

**Total impact:**
- 6 cards × 36% reduction = ~120 words removed
- Homepage feels less overwhelming
- Visitors can scan partner types in 10 seconds instead of 45 seconds

---

**END BACKUP**

