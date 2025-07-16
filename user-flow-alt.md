# Job Seeker Assistant – Alternate User Flow (Funnel-Based Perspective)

This document reimagines the user journey by mapping every touch-point to the classic AARRR funnel (Acquisition, Activation, Retention, Revenue, Referral).  Where the first flow follows the UI structure, this alternative emphasizes **conversion psychology, progressive disclosure, and habit-forming loops**.

---

## 0. Acquisition: From Stranger → Visitor

| Channel | Hook | Landing Destination |
|---------|------|---------------------|
| SEO Blog "How I Sent 100 Tailored Applications in 1 Night" | In-article CTA banner | `/` (main landing) |
| LinkedIn Carousel Ad | "Stop Using Generic Resumes" | `/` (main landing) |
| Developer Conference Booth QR | Live demo video | `/` |



## 1. Main Landing Page (`/`)

1. **Above-the-Fold Hero**
   * Split-screen animation: left side shows a job board list, right side shows emails firing off with green check-marks.
   * Single input field: `Enter your email to get instant access` → starts magic-link sign-up (reduces friction).
2. **Social Proof Strip** (sticky as user scrolls)
   * Logos of hiring platforms + counters: "12 K users • 3 M personalized emails sent".
3. **Problem Agitation – Story Format**
4. **Live Counter Demo** (WebSocket) showing resumes converted in real-time.
5. **Pricing Teaser** (credit-based, see Section 4.4).
6. **Exit-Intent Modal** offering a free checklist if visitor tries to leave.

---

## 2. Activation: Visitor → New User

### 2.1 Magic-Link Sign-Up Flow
1. Email capture from hero CTA.
2. One-time link is sent; on click user is auto-logged-in.
3. **Welcome Dialog** (full-screen overlay) with progress bar (3 steps, avg. 2 min total).

### 2.2 3-Step Quick-Start Wizard
| Step | Key Action | Time Budget | UI Component |
|------|------------|-------------|--------------|
| 1 | Connect Google Sheet | 30 s | `<GoogleSheetInput>` with real-time validation |
| 2 | Pick a Template Bundle | 45 s | Gallery of *starter packs* (resume style + email matching) |
| 3 | Send Yourself a Test Email | 45 s | Uses the first row of sheet; delivers PDF + email to user’s inbox |
*Upon completion the user reaches the Dashboard with a confetti animation and **Activation Score 100%** badge.*

---

## 3. Retention: First Day Experience → Habit Loop

### 3.1 Dashboard (`/app/home`)
* **Daily Goal Widget** – “Send 5 tailored applications today” (gamification).
* **Streak Tracker** – consecutive days the user sent ≥ 1 application.
* **Insight Card** – AI suggests top 3 jobs to prioritize based on matching score.
* Notification panel promotes *Keyboard Shortcut Cheat-Sheet* after day 3.

### 3.2 Contextual Tips Engine
* Tip bubbles appear based on user behavior (e.g., hasn’t used *Customize* tab yet).
* Driven by a lightweight rule engine (`tip_config.json`).

### 3.3 Email Digest
* Every Monday 09:00 local: summary of last week’s sends, replies detected via IMAP, and a motivational quote.

---

## 4. Revenue: Converting Free Trial → Paid

### 4.1 Trial Mechanics
* 14-day or 100 outbound emails, whichever comes first.
* Usage meter displayed persistently in top nav.

### 4.2 Paywall Moments
1. Attempting to schedule a batch that exceeds remaining quota.
2. Trying to download analytics CSV (premium feature).

### 4.3 Pricing Page (`/pricing`)
* Toggle switch: Monthly ↔ Yearly (2 months free on yearly).
* All plans include unlimited resumes; higher tiers add *Custom Domains* for emails.

### 4.4 Credit Top-Ups
* Users can one-off purchase extra email credits without upgrading plan (reduces drop-off).

---

## 5. Referral: Turning Users → Ambassadors

1. **Share Your Success** modal pops up after user reaches 10 job interviews.
2. Each referral gives both parties +200 email credits.
3. Built-in tweet composer pre-fills: “🚀 Just automated my job hunt with @JobAssist – grab 200 free email credits here <ref-link>”.

---

## 6. Core In-App Routes (Re-Ordered for Efficiency)

| Route | Purpose | Key Component | Notes |
|-------|---------|---------------|-------|
| `/app/home` | Motivation & Stats | `<StatsCard>` `<InsightCard>` | Dynamic tips based on usage |
| `/app/jobs` | Sheet Browser & Filters | `<SheetHeaderSelector>` `<DataTable>` | Supports multi-sheet workbooks |
| `/app/templates` | Email Templates | `<EmailTemplateEditor>` | Version history enabled |
| `/app/resume` | Resume Builder | `<ResumeEditorLayout>` | Auto-save drafts every 5 s |
| `/app/batch/new` | Send Flow Wizard | `<BatchStepper>` | combines select → personalize → schedule |
| `/app/logs` | Batch History | `<MailLogsTable>` | Search & retry failed rows |
| `/app/settings` | Account & Billing | `<SettingsPane>` | Dark mode toggle |

---

## 7. Alternative Batch Send Flow (Single-Page Drawer)

Instead of a multi-page wizard (original flow), the *alternative* presents a right-side drawer that slides over the current page.

1. **Open Drawer** from any page via global "+ New Batch" button.
2. **Tabs inside Drawer**
   * **Jobs** – checkbox table
   * **Template** – radio list + preview
   * **Resume** – inline tweaks (drag reorder)
   * **Schedule** – date/time picker
3. **Sticky Footer** shows real-time cost in credits and Final CTA `Schedule X Emails`.

Benefits: user never loses page context, reducing cognitive load.

---

## 8. First 90-Day Journey Timeline

| Day Range | Key Emails & Events |
|-----------|---------------------|
| 0 | Magic link welcome • Quick-start wizard |
| 1–7 | Daily tip emails tailored to incomplete features |
| 8 | “Finish your profile” nudge (avatar upload) |
| 10 | Case-study email: “How Sarah got 3 offers in 2 weeks” |
| 13 | Trial day 14 reminder – 3-day grace period |
| 14 | Upgrade offer with 20 % discount |
| 30 | Milestone badge email: “You’ve sent 500 emails!” |
| 60 | Refer-a-friend spotlight |
| 90 | Annual plan upsell with bonus credits |

---

## 9. Exit Paths & Win-Back

* **Cancellation Survey** – capture reason, suggest downgrade instead of cancel.
* **Paused Plan** – keep user data, disable sending; one-click reactivate.
* **Win-Back Email** after 30 days with new feature announcement and coupon.

---

### Appendix A – Emotion Curve Checklist

| Stage | Desired Emotion | UI Trigger |
|-------|-----------------|------------|
| Discovery | Curiosity | Interactive playground |
| Activation | Delight | Confetti + instant test email |
| Growth | Confidence | Streak tracker & insights |
| Paywall | Justified | Usage meter transparency |
| Referral | Pride | Share success modal |

---

_End of alternative user-flow document._
