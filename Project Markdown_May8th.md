# Project Markdown May8th

Workspace: `C:\Users\javva\dental`
Branch: `Latest-development`
Date: May 8, 2026
Timezone: Asia/Calcutta

## Critical User Instruction

- Do not commit or push unless the user explicitly asks.
- The user is frustrated by repeated visual regressions; verify visible frontend changes before claiming they are fixed.
- The website is deployed from the `Latest-development` branch.

## Project Overview

Apple International Dental website built with React + Vite.

Routes:
- `/` main website
- `/schemes` schemes page
- `/admin` admin dashboard

Temporary backend:
- Google Sheets + Apps Script in `docs/google-sheets-booking-apps-script.js`
- Razorpay secret must remain in Apps Script properties, never in frontend env.

## Recent Git Context

Latest known commits:

```text
5efefab Add dental schemes page
bd236b6 Lock admin dashboard to selected branch
5ed0574 Add branch carousel and updated clinic contacts
f5c6e66 Add consultation payment flow and responsive hero fixes
934efa1 Use 12-hour completed timestamps
4fbb4e5 Stack completed timestamp in history table
dafd1ef Fix treatment history timestamp column
3422085 Add Netlify deployment config
```

Known modified tracked files:
- `src/App.jsx`
- `src/App.css`

Known untracked/asset folders include:
- `public/badges`
- `public/brands`
- `public/decor`
- `public/hero`
- `public/loading`
- `public/payments`
- `public/schemes`
- `public/service-gifs`
- `public/services`
- `public/testimonials`
- `public/treatment-gifs`
- `public/treatment-videos`

## Header / Navbar

Top navigation categories:
- General Dentistry
- Cosmetic Dentistry
- Dental Implant Solutions
- Digital Dentistry
- Specialist Dentistry
- Schemes
- Blog

Dropdowns:

General Dentistry:
- Tooth Colored Fillings
- Cleaning and polishing
- Clips and Braces Treatment
- Aligners
- Crowns and Bridges
- Root Canal Treatment
- Complete Dentures
- Tooth Extractions
- Wisdom Molar Extraction
- Gingival Flap Surgery
- Frenectomy
- Night Guard
- Pit and Fissure Sealants
- Partial Dentures
- Over dentures
- Kids Dentistry

Cosmetic Dentistry:
- Dental Veneers
- Gingival Depigmentation
- Teeth Whitening
- 3D Smile Designing
- Smile Correction

Dental Implant Solutions:
- Single Tooth Implant
- Multiple Implants
- All on 4 implants
- Full mouth Implants
- Basal implants
- Keyhole implants
- Bone Grafting
- Soft Tissue Grafting

Digital Dentistry:
- CAD CAM Solutions
- Intra-Oral Scanning
- Digital Smile Design
- Digital Dental Implants
- Digital OPG and CBCT
- Central Digital Lab

Specialist Dentistry:
- Endodontics
- Full mouth Rehabilitation
- Periodontics
- Orthodontics
- Oral Surgery
- Pedodontics

Behavior:
- Top-level service categories use hover dropdowns.
- Schemes navigates to `/schemes`.
- Blog is present but not a real page yet.

Open issue:
- Navbar fixed/sticky behavior has been unstable.
- Latest attempted CSS likely includes fixed header and top padding on `.page-shell`; user complained about huge space above navbar and navbar still not behaving as expected.
- Re-check `src/App.css` before further navbar work.
- Dropdowns previously went behind hero image; z-index/header stacking may still need careful verification.

## Hero Section

Hero now uses a looping carousel/slideshow.

Images:
- Existing: `/hero/dental-hero-smile-exam.jpg`
- Added: `/hero/hero-crown-decay-check.png`
- Added: `/hero/hero-dental-treatment.webp`

Previously copied but no longer intended for use:
- `/hero/hero-smile-mirror.jpg`

Implementation notes:
- `heroImage = '/hero/dental-hero-smile-exam.jpg'`
- `heroImages = [heroImage, '/hero/hero-crown-decay-check.png', '/hero/hero-dental-treatment.webp']`
- `heroCarouselImages = [...heroImages, heroImages[0]]`
- CSS uses a four-slide track so after the third slide, the first appears from right to left instead of reverse-animating backward.
- Keyframe animation duration is around `24s`.

Hero copy:
- Eyebrow: `Apple International Dental`
- Badge text: `NABH ACCREDITED DENTAL HOSPITAL`
- Badge asset: `/badges/nabh-accredited-dental-hospital.png`
- Headline: `No.1 Trusted Dental Care in South India.`
- Body: `From routine cleanings and kids checkups to aligners, implants, and emergency dentistry, our dental clinics in Andhra Pradesh, Telangana and Karnataka offers complete care and services.`

Hero card sizing:
- User wanted the card smaller because it covered too much hero image.
- Latest CSS reduced `.hero-copy` max width/padding and reduced hero heading scale.

Hero info cards:
- Hours card text: `Mon - Sun: 10:00 am to 8:00 pm`
- Scheme cards:
  - CGHS and ECHS
  - EHS and ESIC
  - CAPF, CRPF, SCR, ABS
- Scheme cards should be red and prominent, except the Hours card remains white.
- Scheme cards link to `/schemes?scroll=scheme-list`.
- User says the clinic is the only dental clinic supporting these schemes and wants this to pop visually and matter for SEO.

## WhatsApp Launcher

Desired behavior:
- Fixed bottom-right.
- Visible the entire time.
- No small `Chat with us` hint popup.
- Branch menu should not show corrupted symbols/logos.

Implementation notes:
- Reusable `WhatsappLauncher` component exists in `src/App.jsx`.
- Root render wraps page with `<WhatsappLauncher />`.
- Old duplicate WhatsApp launchers were removed earlier, but verify with search if the issue returns.
- CSS should force bottom-right:

```css
.whatsapp-launcher {
  position: fixed;
  inset: auto 22px 22px auto !important;
  right: 22px !important;
  bottom: 22px !important;
  left: auto !important;
  z-index: 999;
}
```

Additional intended CSS:
- `.whatsapp-hint-arrow { display: none !important; }`
- `.whatsapp-menu a span:last-child { display: none; }`

## Removed Decorative Watermarks

User disliked background decorative watermarks.

Removed/disabled:
- Page-level `.page-shell::before`
- Page-level `.page-shell::after`
- Old decorative watermark images such as tooth/mirror/anatomy backgrounds

Assets may still exist but should not be used globally.

## Full-Width Sections

User asked these sections to be completely wide, without side blank space:
- Treatments section
- Brands section
- Instagram Feed section
- Why choose us section
- Visit the clinic/contact section

CSS full-bleed pattern was added:

```css
.treatment-section,
.brand-section,
.instagram-section,
.why-section,
.contact-section {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}
```

User asked to make red pop more, then asked to revert. Keep backgrounds close to the previous lighter look unless specifically changed again.

## Why Choose Us Background

User added image:
- Source: `C:\Users\javva\Downloads\dental-treatment.webp`
- Site asset: `/decor/dental-treatment.webp`

Desired behavior:
- Image only behind the Why Choose Us section.
- Image should be visible like the reference: soft/low opacity, readable text, not visible outside section.
- Image should feel like it has motion while scrolling.

Implementation notes:
- `.why-section` uses the image as section background.
- Desktop uses `background-attachment: fixed` for motion/parallax feel.
- Mobile should use normal scrolling if fixed attachment is problematic.

## Brands Section

User added image:
- Source: `C:\Users\javva\Downloads\Aligners and Implants.png`
- Site asset: `/brands/aligners-and-implants.png`

Desired behavior:
- Keep the current Brands section background, but use this image as the wide full-section background.
- Image should fill the entire Brands section.
- Image should not distract from text/cards.
- Remove the previous old background shape/circle.
- Supporting paragraph should be bold.

Brand section copy:
- Eyebrow: `Technology and material partners`
- Heading: `Premium brands used across lasers, implants, aligners, and digital dentistry.`
- Paragraph: `Our clinical teams work with globally recognized dental systems for precision imaging, implant planning, restorative care, laser dentistry, and aligner workflows.`
- Paragraph should be bold.

Brands:
- Dentsply Sirona: Digital dentistry
- Pioon Laser: Laser dentistry
- Nobel Biocare: Implant systems
- 3M: Restorative materials
- Carestream Dental: Digital imaging
- Straumann: Premium implants
- Osstem Implant: Implant dentistry
- Toothsi: Aligners

Assets:
- `/brands/3m.png`
- `/brands/carestream-dental.png`
- `/brands/dentsply-sirona.png`
- `/brands/nobel-biocare.png`
- `/brands/osstem-implant.png`
- `/brands/pioon-laser.png`
- `/brands/straumann.png`
- `/brands/toothsi.jpg`
- `/brands/aligners-and-implants.png`

Important cleanup:
- Old brand background circle/shape should be gone.
- `brand-panel::before` and `brand-panel::after` should not create the previous circular shape.

## Booking / Consultation Form

User asked to make only the consultation form section medium brown, then said revert it.

Current desired state:
- Brown background should be removed.
- Booking/consultation section should be back to its original light background.

Payment assets:
- `/payments/razorpay.svg`
- `/payments/razorpay.webp`

## Video Testimonials

Added after Brands section and before Instagram section.

Assets:
- `/testimonials/testimonial-1.mp4`
- `/testimonials/testimonial-2.mp4`
- `/testimonials/testimonial-3.mp4`
- `/testimonials/testimonial-4.mp4`
- `/testimonials/testimonial-5.mp4`

Behavior:
- Autoplay muted loop.
- Desktop shows three visible videos in carousel.
- Hover pauses.
- Sound toggle available.
- Default sound off.

Heading:
- `Real patient stories from our Clinics.`

Google review line:
- `★★★★★ 4.8 Stars (1.5K+ Google Reviews)`

Earlier fade overlays/cards around this were removed/refined.

## Schemes Page

Route:
- `/schemes`

Schemes:
- CGHS
- ECHS
- EHS
- CAPF
- CRPF
- SCR
- ESIC
- ABS

Assets:
- `/schemes/aarogya-bhadratha.jpg`
- `/schemes/capf.jpg`
- `/schemes/cghs.jpg`
- `/schemes/crpf.png`
- `/schemes/echs.jpg`
- `/schemes/ehs.png`
- `/schemes/esic.png`
- `/schemes/south-central-railway.jpg`

Behavior:
- `/schemes?scroll=scheme-list` scrolls to `#scheme-list` after a delay.
- Header Schemes nav should go to `/schemes`, not auto-scroll.
- Hero was changed to structured scheme logo collage rather than dental photo.
- Scheme grid uses logo frames and two-column card layout.
- WhatsApp launcher should also show on this page because it is root-level.

## Admin Dashboard

Already pushed in commit:
- `bd236b6 Lock admin dashboard to selected branch`

Behavior:
- `/admin` asks staff to choose branch before login.
- Dashboard is locked to selected branch.
- Bookings/patients/history branch-filtered.
- Walk-in bookings are forced to logged-in branch.
- Apps Script enforces branch session server-side.

Important:
- Apps Script must be manually redeployed for backend branch enforcement to go live.

## Branch / Contact Section

Already pushed in commit:
- `5ed0574 Add branch carousel and updated clinic contacts`

Notes:
- Branch carousel in contact section.
- 20 branch rows came from spreadsheet with phone-bearing entries.
- User mentioned there should be 23 branches, but available spreadsheet/contact source had 20 phone-bearing rows.
- Footer/contact Hours may still have older text such as `Mon-Sat, 9:00 AM - 8:00 PM`; user specifically changed the hero Hours card only.

## Useful Commands

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
node --check docs\google-sheets-booking-apps-script.js
git status --short
git branch --show-current
git log -8 --oneline
```

Known environment note:
- `rg` once failed with Access denied in this environment; use PowerShell `Select-String` if needed.
- `git status --short` once failed due Windows sandbox `CreateProcessWithLogonW failed: 5`; rerun if needed.
- Starting Vite dev server may need escalation due `spawn EPERM`.

## Verification History

Repeated checks after frontend changes:
- `npm.cmd run lint` passed.
- `npm.cmd run build` passed.

For this markdown handoff only, no app build is required.

## Immediate Open Items

1. Verify current navbar CSS and fix the sticky/top-spacing issue cleanly.
2. Verify hero dropdowns appear above the carousel/image.
3. Verify WhatsApp launcher appears fixed bottom-right on all pages and never bottom-left.
4. Verify the Brands old background circle is fully gone.
5. Verify hero carousel loops forward from the third slide into the first slide.
6. Verify scheme cards in hero are prominent but not covering too much hero image.

