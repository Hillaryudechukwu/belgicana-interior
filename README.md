# Belgicana Interior — interactive website

A Next.js 15 / React 19 / TypeScript website for **Belgicana Interior**, built from the supplied October 2026 website information questionnaire.

## Features
- Three.js / React Three Fiber interactive 3D room on the home page
- Scroll-triggered text reveals with Motion for React
- Animated services, project imagery, FAQs, mobile navigation and responsive layout
- Home, About, Services, Portfolio, For Organisations, Design for Wellbeing, FAQs, Contact
- Dedicated privacy, cookies and terms draft placeholder routes
- Contact form with server-side validation, SMTP integration, honeypot and basic rate-limiting
- Reduced-motion handling, semantic navigation and keyboard focus styles
- Static content centralised in `lib/content.ts`

## Getting started
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

### SMTP setup
Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `ENQUIRY_TO` and `ENQUIRY_FROM` in `.env.local`. If unset, contact form submissions return a clear **503** error and are not stored or sent. Configure mail delivery and spam controls before public launch. An in-memory limiter is included for basic local protection; use a shared persistent rate-limiter and CAPTCHA/Turnstile for production.

### Content/image notes
Photography is **illustrative inspiration** from Unsplash image endpoints and is not a portfolio of Belgicana completed projects. Replace with founder-approved licensed project images and clearly label any conceptual renderings. The 3D interior is an original code-built room illustration, not an actual Belgicana project.

No testimonials, credentials, prices, phone number, public email, social handles, legal entity details or domain names were invented. The brief says the founder must approve these.

The privacy, cookies and terms pages are **draft placeholders**; they must be approved/replaced before launch. Contact forms collect personal data, so a complete privacy notice is necessary before taking real enquiries. No tracking is installed by default.

## Page paths
`/`, `/about`, `/services`, `/portfolio`, `/organisations`, `/design-for-wellbeing`, `/contact`, `/faq`, `/privacy`, `/cookies`, `/terms`.

## Pre-launch checks
1. Confirm public brand/logo asset, legal name and trading status, contact email/phone, domain and service areas.
2. Review service text, scope and approved project images; confirm whether a public pricing page will be added.
3. Approve the Design for Wellbeing programme language, safeguarding/referral conditions and funding status.
4. Replace draft privacy/cookie/terms content and verify GDPR/cookie compliance.
5. Configure domain DNS, SMTP, SPF/DKIM/DMARC, TLS, persistent rate limiting, spam prevention, and test mail deliverability.
6. Verify keyboard navigation, image licensing, real-device performance and reduced-motion behaviour.
7. Run `npm run build`; test full enquiry flow in staging.

## Stack
Next.js / TypeScript / Tailwind CSS 4 / custom editorial CSS / Three.js / React Three Fiber / Drei / Motion for React / Lucide / Nodemailer.
