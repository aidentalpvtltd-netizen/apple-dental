# Project Markdown May8th 2nd

Workspace: `C:\Users\javva\dental`
Branch: `Latest-development`
Date: May 8, 2026
Timezone: Asia/Calcutta

## Current Git State

Important instruction:
- Do not push unless the user explicitly asks.
- A local commit was created on `Latest-development`.

Latest local commit:

```text
18ee6bc Update dental site visuals and WhatsApp menu
```

Recent commits:

```text
18ee6bc Update dental site visuals and WhatsApp menu
5efefab Add dental schemes page
bd236b6 Lock admin dashboard to selected branch
```

No push was done after commit `18ee6bc`.

Current uncommitted working tree state after the commit:

```text
 D PROJECT_HANDOFF.md
 D PROJECT_HANDOFF_2026-05-01.md
 D PROJECT_HANDOFF_ADMIN_GOOGLE_SHEETS_2026-05-01_20-06-13.md
 D Project_Markdown_Latest.md
?? Clinic_Backend_Platform_Build_Plan.docx
?? docx_render_check/
?? public/decor/tooth-anatomy.jpg
?? public/decor/tooth-mirror.webp
?? public/hero/hero-smile-mirror.jpg
```

Notes:
- These deletions/untracked files were not touched after the commit.
- The committed handoff file from the previous step is `Project Markdown_May8th.md`.
- This new file is `Project_markdown_May8th_2nd.md`.

## Project Overview

Apple International Dental website built with React + Vite.

Routes:
- `/` main website
- `/schemes` schemes page
- `/admin` admin dashboard

Temporary backend:
- Google Sheets + Apps Script in `docs/google-sheets-booking-apps-script.js`
- Razorpay secret must remain in Apps Script properties, never in frontend env.

Useful commands:

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

## Last Verified Checks

Before local commit `18ee6bc`, these passed:

```text
npm.cmd run lint
npm.cmd run build
```

Build output included:

```text
dist/index.html
dist/assets/index-BhaapErz.css
dist/assets/index-C95me3sX.js
```

## Latest Fix: WhatsApp Branch Text

Problem:
- WhatsApp branch menu showed blank rounded rows.
- Rows were still clickable, but branch names were invisible.

Cause:
- CSS rule `.whatsapp-menu a span:last-child { display: none; }` hid the only span inside each branch row.

Fix:
- Added `className="whatsapp-branch-label"` to the branch text wrapper in `src/App.jsx`.
- Replaced fragile span selector with `.whatsapp-menu a .whatsapp-branch-label`.
- Removed the bad `span:last-child` hiding rule.
- Forced readable text colors for branch labels.

Files changed and committed:
- `src/App.jsx`
- `src/App.css`

Desired WhatsApp behavior:
- Button fixed bottom-right.
- Visible all the time.
- No small `Chat with us` popup.
- Branch list should show readable branch names.
- Branch clicks open WhatsApp links for the selected clinic.

## Header / Navbar

Top navigation categories:
- General Dentistry
- Cosmetic Dentistry
- Dental Implant Solutions
- Digital Dentistry
- Specialist Dentistry
- Schemes
- Blog

Service dropdowns:
- General Dentistry: Tooth Colored Fillings, Cleaning and polishing, Clips and Braces Treatment, Aligners, Crowns and Bridges, Root Canal Treatment, Complete Dentures, Tooth Extractions, Wisdom Molar Extraction, Gingival Flap Surgery, Frenectomy, Night Guard, Pit and Fissure Sealants, Partial Dentures, Over dentures, Kids Dentistry.
- Cosmetic Dentistry: Dental Veneers, Gingival Depigmentation, Teeth Whitening, 3D Smile Designing, Smile Correction.
- Dental Implant Solutions: Single Tooth Implant, Multiple Implants, All on 4 implants, Full mouth Implants, Basal implants, Keyhole implants, Bone Grafting, Soft Tissue Grafting.
- Digital Dentistry: CAD CAM Solutions, Intra-Oral Scanning, Digital Smile Design, Digital Dental Implants, Digital OPG and CBCT, Central Digital Lab.
- Specialist Dentistry: Endodontics, Full mouth Rehabilitation, Periodontics, Orthodontics, Oral Surgery, Pedodontics.

Open caution:
- Navbar fixed/sticky behavior has been a sensitive issue.
- Before changing it again, inspect current `src/App.css` and verify in browser.
- Dropdowns previously went behind hero image; z-index should be checked if nav is touched.

## Hero Section

Hero carousel images:
- `/hero/dental-hero-smile-exam.jpg`
- `/hero/hero-crown-decay-check.png`
- `/hero/hero-dental-treatment.webp`

Implementation:
- `heroImage = '/hero/dental-hero-smile-exam.jpg'`
- `heroImages = [heroImage, '/hero/hero-crown-decay-check.png', '/hero/hero-dental-treatment.webp']`
- `heroCarouselImages = [...heroImages, heroImages[0]]`
- Duplicate first slide is used so the first slide comes from right to left after the last slide instead of reverse-animating backward.

Hero copy:
- Eyebrow: `Apple International Dental`
- Badge: `NABH ACCREDITED DENTAL HOSPITAL`
- Badge asset: `/badges/nabh-accredited-dental-hospital.png`
- Headline: `No.1 Trusted Dental Care in South India.`
- Body: `From routine cleanings and kids checkups to aligners, implants, and emergency dentistry, our dental clinics in Andhra Pradesh, Telangana and Karnataka offers complete care and services.`

Hero card:
- Reduced size to avoid covering too much hero image.
- `.hero-copy` max width and padding were reduced.
- Hero headline scale was reduced.

Hero info cards:
- Hours: `Mon - Sun: 10:00 am to 8:00 pm`
- Scheme cards:
  - `CGHS and ECHS`
  - `EHS and ESIC`
  - `CAPF, CRPF, SCR, ABS`
- Scheme cards should be red/prominent.
- Hours card should remain white.
- Scheme cards link to `/schemes?scroll=scheme-list`.

## Full-Width Sections

These sections were made full width:
- Treatments
- Brands
- Instagram Feed
- Why Choose Us
- Visit the Clinic / Contact

Pattern used:

```css
width: 100vw;
margin-left: calc(50% - 50vw);
margin-right: calc(50% - 50vw);
```

User requested stronger red backgrounds, then asked to revert. Current intent is a softer/light background except for specific image-backed sections.

## Why Choose Us Background

Asset:
- `/decor/dental-treatment.webp`

Desired behavior:
- Image only behind Why Choose Us section.
- Soft visibility like reference image.
- Text remains readable.
- Image feels like it has motion while scrolling.

Implementation:
- Background image applied only to `.why-section`.
- Desktop uses fixed background attachment/parallax-style behavior.
- Mobile should not rely on fixed background if it causes issues.

## Brands Section

Background asset:
- `/brands/aligners-and-implants.png`

Desired behavior:
- Image fills entire Brands section.
- Current section background should remain, but old previous decorative shape/circle must be removed.
- Image should not distract from text.

Brand section copy:
- Eyebrow: `Technology and material partners`
- Heading: `Premium brands used across lasers, implants, aligners, and digital dentistry.`
- Supporting paragraph: `Our clinical teams work with globally recognized dental systems for precision imaging, implant planning, restorative care, laser dentistry, and aligner workflows.`
- Supporting paragraph should be bold.

Brands:
- Dentsply Sirona: Digital dentistry
- Pioon Laser: Laser dentistry
- Nobel Biocare: Implant systems
- 3M: Restorative materials
- Carestream Dental: Digital imaging
- Straumann: Premium implants
- Osstem Implant: Implant dentistry
- Toothsi: Aligners

Brand assets committed:
- `/brands/3m.png`
- `/brands/aligners-and-implants.png`
- `/brands/carestream-dental.png`
- `/brands/dentsply-sirona.png`
- `/brands/nobel-biocare.png`
- `/brands/osstem-implant.png`
- `/brands/pioon-laser.png`
- `/brands/straumann.png`
- `/brands/toothsi.jpg`

## Booking / Consultation

User asked to make consultation form section medium brown, then asked to revert.

Current desired state:
- Brown background removed.
- Booking/consultation section should use original light background.

Payment assets committed:
- `/payments/razorpay.svg`
- `/payments/razorpay.webp`

## Video Testimonials

Added between Brands and Instagram.

Assets committed:
- `/testimonials/testimonial-1.mp4`
- `/testimonials/testimonial-2.mp4`
- `/testimonials/testimonial-3.mp4`
- `/testimonials/testimonial-4.mp4`
- `/testimonials/testimonial-5.mp4`

Behavior:
- Autoplay muted loop.
- Desktop carousel shows three visible videos.
- Hover pauses.
- Sound toggle available.
- Default sound off.

Heading:
- `Real patient stories from our Clinics.`

Review line:
- `★★★★★ 4.8 Stars (1.5K+ Google Reviews)`

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

Scheme assets committed:
- `/schemes/aarogya-bhadratha.jpg`
- `/schemes/capf.jpg`
- `/schemes/cghs.jpg`
- `/schemes/crpf.png`
- `/schemes/echs.jpg`
- `/schemes/ehs.png`
- `/schemes/esic.png`
- `/schemes/south-central-railway.jpg`

Behavior:
- `/schemes?scroll=scheme-list` scrolls to `#scheme-list`.
- Header Schemes nav should go to `/schemes` normally.
- Scheme page has WhatsApp launcher because launcher is rendered at root.

SEO/user priority:
- Scheme support must be very visible.
- User says Apple International Dental is the only dental clinic supporting these schemes, so CGHS/ECHS/EHS/ESIC/CAPF/CRPF/SCR/ABS should remain prominent.

## Admin Dashboard

Already committed earlier:
- `bd236b6 Lock admin dashboard to selected branch`

Behavior:
- `/admin` asks staff to choose branch before login.
- Dashboard is locked to selected branch.
- Bookings/patients/history are branch-filtered.
- Walk-in bookings are forced to logged-in branch.
- Apps Script enforces branch session server-side.

Important:
- Apps Script must be manually redeployed for backend branch enforcement to go live.

## Branch / Contact Section

Already committed earlier:
- `5ed0574 Add branch carousel and updated clinic contacts`

Notes:
- Branch carousel exists in contact section.
- 20 phone-bearing branch rows were used from available data.
- User previously mentioned there should be 23 branches, but source data had 20 phone-bearing rows.

## Open Items

1. Verify WhatsApp branch labels visually in browser after latest fix.
2. Verify WhatsApp button is bottom-right and always visible.
3. Verify navbar/header behavior; user was unhappy with previous sticky attempts.
4. Verify dropdown menus appear above hero carousel.
5. Verify Brands section no longer shows old circular/shape background.
6. Verify hero carousel loops forward correctly.
7. Decide whether to delete or keep untracked unused assets:
   - `public/decor/tooth-anatomy.jpg`
   - `public/decor/tooth-mirror.webp`
   - `public/hero/hero-smile-mirror.jpg`

