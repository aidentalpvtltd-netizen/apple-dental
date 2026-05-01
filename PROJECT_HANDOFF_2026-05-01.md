# Apple International Dental Website Handoff - 2026-05-01

## Project Context

- Workspace: `C:\Users\javva\dental`
- Active branch: `development`
- Stack: React + Vite
- Main files:
  - `src/App.jsx`
  - `src/App.css`
  - `src/index.css`
  - `index.html`
- Existing handoff file remains untouched:
  - `PROJECT_HANDOFF.md`
- This file was created as the newer handoff snapshot.

## Commands

Run from `C:\Users\javva\dental`:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

Recent checks have repeatedly passed with:

```powershell
npm.cmd run build
npm.cmd run lint
```

## Git / Worktree

Current worktree still has many uncommitted website buildout changes.

Observed status at handoff time:

```text
 M README.md
 M index.html
 M src/App.css
 M src/App.jsx
 M src/index.css
?? .env.example
?? PROJECT_HANDOFF.md
?? public/hero/
?? public/loading/
?? public/logo.png
?? public/service-gifs/
?? public/services/
?? public/treatment-gifs/
?? public/treatment-videos/
```

## Branding

- Clinic name: `Apple International Dental`
- Current phone display: `+91 98490 24567`
- `tel:` phone href: `+919849024567`
- Default WhatsApp number: `919849024567`
- Email: `info@appleinternational.in`
- Main brand red: `#FF0201`
- Logo asset: `public/logo.png`
- Favicon uses `/logo.png`

## Environment Variables

`.env.example` includes:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
VITE_INSTAGRAM_FEED_ENDPOINT=
```

`VITE_INSTAGRAM_FEED_ENDPOINT` is a placeholder for a future backend/feed-service endpoint that returns Instagram media. Do not expose Meta API tokens directly in frontend code.

## Hero Section

Current hero image:

```text
public/hero/dental-hero-smile-exam.jpg
```

Source was copied from:

```text
C:\Users\javva\Downloads\portrait of young smiling blond good-looking woman on dental examination, treating teeth in professional orthodontic clinic (1)-1.jpg
```

The previous hero image `public/hero/dental-hero-checkup.jpg` was removed.

Hero behavior/design:

- Full-cover dental patient image.
- Text and CTAs protected by a left-side white gradient.
- Right-side info cards are aligned away from the main face area.
- Removed the older "Comfort-first visits" floating card.

## KPI Cards

Current KPI values:

- `22+` - years serving patients
- `33 lakh+` - patients treated across routine and advanced care
- `7 days` - consultations and emergency visits available
- `13` - core treatments under one roof

## Branches

The branch list is used by both:

- Consultation form branch dropdown.
- WhatsApp branch picker.

Current branches:

- Apple International Dental, Krishna Lanka, Vijayawada
- Apple International Dental, Suryaraopet, Vijayawada
- Apple International Dental, 1 Town, Vijayawada
- Apple International Dental, Mangalgiri
- Apple International Dental, Bangalore HSR Layout
- Apple International Dental, Srikakulam
- Apple International Dental, Eluru
- Apple International Dental, Anantapur
- Apple International Dental, Tirupati
- Apple International Dental, Rajamundry
- Apple International Dental, Madanapalli
- Apple International Dental, Nellore
- Apple International Dental, Vizag
- Apple International Dental, Ongole
- Apple International Dental, Bobbili
- Apple International Dental, Vizianagaram
- Apple International Dental, Guntur
- Apple International Dental, Hyderabad

All WhatsApp branch options currently use the default WhatsApp number. Later, replace `branchContacts` entries with branch-specific numbers.

## Appointment Availability

Current availability is still simulated in frontend code.

- Appointment slots:
  - `09:30 AM`
  - `10:30 AM`
  - `11:30 AM`
  - `12:30 PM`
  - `04:00 PM`
  - `05:00 PM`
  - `06:00 PM`
  - `07:00 PM`
- `branchAvailability` is generated for all branches.
- Sundays are closed.
- Some simulated weekdays/slots are blocked per branch.

Future real availability should come from the clinic's database software when integration details are available.

## Consultation Form

Current fields:

- Treatment dropdown
- Branch dropdown
- Full name
- Phone number
- Email address
- Reffered by
- Preferred date
- Time slot
- Concern textarea

Validation/behavior:

- Phone: exactly 10 digits.
- Email: native `type="email"` validation; fragile regex was removed.
- Reffered by: alphabets and spaces only, optional.
- Date cannot be earlier than current date.
- Concern textarea max: 100 words.
- Live word count shown as `x/100 words`.
- Submit disabled until available date and time slot are selected.
- After successful booking, this device is paused for about 24 hours.
- LocalStorage key:

```js
appleInternationalDentalBookingRequest
```

Clear demo lock:

```js
localStorage.removeItem('appleInternationalDentalBookingRequest')
```

## Treatments

Current treatment list:

- Root Canal Treatment
- Wisdom Tooth Removal
- Laser Dentistry
- Teeth Whitening
- Dental Fillings
- Dental Crown
- Dental Implants
- Dental Braces
- Clear Aligners
- Advanced Gum Treatment
- Kids Dentistry
- Dentures
- Mouth Ulcers

Treatment cards:

- Card image appears in the treatment grid.
- Card button says `Learn more`.
- Clicking the card or `Learn more` opens the treatment detail modal.
- The modal still has `Book this treatment`.
- `Book this treatment` closes the modal, selects the treatment, and scrolls to the consultation form.
- Modal supports Escape-to-close and body scroll lock.

## Treatment Images

Current treatment image assets include:

```text
public/services/Advanced Gum Treatment.png
public/services/Clear Aligners.png
public/services/Dental Braces.png
public/services/Dental Crown.png
public/services/Dental Fillings.png
public/services/Dental implants.png
public/services/Dentures.png
public/services/Kids Dentistry.png
public/services/Laser Dentistry.png
public/services/mouth ulcers.png
public/services/Rootcanal.png
public/services/Teeth Whitening.png
public/services/Wisdom Tooth.png
```

Teeth Whitening card uses:

```text
public/services/Teeth Whitening.png
```

## Treatment Modal Videos

MP4 videos copied into:

```text
public/treatment-videos/Clear Aligners.mp4
public/treatment-videos/Dental Fillings.mp4
public/treatment-videos/Dental Implants.mp4
public/treatment-videos/Rootcanal.mp4
public/treatment-videos/Teeth Whitening.mp4
```

Mapped to:

- Root Canal Treatment - `Rootcanal.mp4`
- Dental Implants - `Dental Implants.mp4`
- Teeth Whitening - `Teeth Whitening.mp4`
- Clear Aligners - `Clear Aligners.mp4`
- Dental Fillings - `Dental Fillings.mp4`

Video modal behavior:

- Videos appear only after opening a treatment modal.
- Videos autoplay, loop, muted, plays inline.
- Browser controls/timeline/settings are hidden by removing the `controls` attribute.
- `preload="metadata"` is used.

Note: `ffmpeg` and `ffprobe` are not installed in this environment, so videos were not re-encoded. MP4 was kept instead of converting to GIF for performance.

## Treatment Modal GIFs

GIFs copied into:

```text
public/treatment-gifs/wisdom-teeth.gif
public/treatment-gifs/Dentures.gif
public/treatment-gifs/dental crown.gif
public/treatment-gifs/Dental braces.gif
```

Mapped to:

- Wisdom Tooth Removal - `wisdom-teeth.gif`
- Dentures - `Dentures.gif`
- Dental Crown - `dental crown.gif`
- Dental Braces - `Dental braces.gif`

GIFs appear only in the modal. They are not used as grid previews because the braces GIF is large.

## WhatsApp Launcher

Bottom-right floating WhatsApp launcher:

- Circular WhatsApp logo button.
- Opens a branch picker popup.
- Popup header says `Whatsapp us`.
- Popup has a close `x` button in the top-right.
- Each branch opens WhatsApp with a prefilled message.
- Current prefilled message:

```text
Hello Apple International Dental, I would like to enquire about an appointment at {branch}.
```

Attention hint behavior:

- Starts 6 seconds after the loader is finished.
- Repeats every 6 seconds.
- Shows `Chat with us ->` hint and bounces the WhatsApp button briefly.
- Does not show while the branch popup is open.
- Disabled for reduced-motion users.

## Navbar Call Button

Navbar has:

- `Call now` button using `tel:+919849024567`.
- `Book now` button linking to the booking form.

## Instagram Section

Current Instagram profile:

```text
https://www.instagram.com/appleinternational_dental/
```

Current behavior:

- Header shows `@appleinternational_dental`.
- Has an Instagram-style `Follow` button.
- Footer Instagram icon links to the same profile.
- Cards still use fallback local/static content unless `VITE_INSTAGRAM_FEED_ENDPOINT` is provided.

Important note:

- A true live Instagram feed cannot be pulled directly from a static React frontend without Meta API access or a third-party feed widget.
- Future live feed options:
  - Meta Instagram Graph API with a backend/serverless endpoint.
  - Third-party widget such as Elfsight, LightWidget, or SnapWidget.
  - Manual upload of latest post images/permalinks.

## Why Apple International Dental Section

The old Patient Stories section was removed.

It was replaced with:

```text
Why Apple International Dental
```

Cards:

1. World Class Treatment
   - Only Asian member of the Royal Society of Medicine, UK
   - Globally certified partners
   - Premium materials and cutting-edge tools
   - Advanced tech: laser dentistry and 3D intraoral scanning

2. Doctor-Led Patient Care
   - Helpline managed by 50+ dentists
   - 1300+ doctors delivering consistent care
   - Treatments reviewed for quality assurance
   - Structured post-treatment follow-up plans

3. 22 Years Of Experience
   - 1300+ experienced dental specialists
   - 31 lakh+ successful root canal treatments
   - 50,000+ implants placed with precision
   - 20,000+ completed orthodontic treatments

4. Unmatched Safety Standards
   - 10X safety protocols across all clinics
   - AI-powered sterilization (AIPS from USA)
   - 4-step process ensuring deep sterilization
   - Spotless, safe, and hygienic environment

## Services Section

Service cards use GIF assets:

```text
public/service-gifs/Preventive Dentistry.gif
public/service-gifs/Cosemtic Dentistry.gif
public/service-gifs/Restorative Dentistry.gif
public/service-gifs/Children and Orthodontic Care.gif
```

Note: `Cosemtic Dentistry.gif` intentionally has the typo in the filename and the code references that exact filename.

## Loading Screen

Assets:

```text
public/logo.png
public/loading/dentistry.gif
```

Loader behavior:

- Displays logo and dentistry GIF.
- GIF recolored toward bright red using CSS filter.
- Preloads major images:
  - logo
  - loader GIF
  - hero image
  - treatment images
  - service GIFs
  - doctor images
  - gallery fallback images
- Uses minimum and maximum wait time to avoid flashing/sticking.

## Footer

Footer includes:

- Brand text.
- Internal links:
  - Services
  - Booking
  - Doctors
  - Contact
- Social icons:
  - Instagram
  - Facebook
  - X
  - LinkedIn

Instagram icon links to:

```text
https://www.instagram.com/appleinternational_dental/
```

Other social links are still generic placeholders and should be replaced with real clinic URLs.

## Contact Section

Contact info currently shows:

- Address: `Suryaraopeta, Governor Peta, Vijayawada, Andhra Pradesh 520002`
- Phone: `+91 98490 24567`
- Email: `info@appleinternational.in`
- Hours: `Mon-Sat, 9:00 AM - 8:00 PM`

Google Maps iframe query uses the Vijayawada address above.

## Known Placeholders / Needs Real Data

Replace before launch:

- Doctor names/photos/bios are placeholders.
- Instagram feed posts are fallback/placeholder until feed endpoint or real images are supplied.
- Testimonials were removed; no real patient stories section exists now.
- Phone number should be verified.
- Branch-specific WhatsApp numbers should be added.
- Branch names/spellings should be verified:
  - `Suryaraopet`
  - `Mangalgiri`
  - `Rajamundry`
- Opening hours should be verified.
- Treatment descriptions should be reviewed by clinic.
- Footer Facebook/X/LinkedIn links are placeholders.
- Contact address currently still points to Vijayawada/Suryaraopeta while branch list is multi-location.

## Future Backend / Integration Notes

Appointment slots:

- Current frontend availability is simulated.
- For real walk-ins/manual bookings and capacity per doctor/branch/treatment, integrate with the clinic database software later.
- Suggested API response shape:

```js
{
  "10:30 AM": { "booked": 2, "capacity": 4, "available": true },
  "11:30 AM": { "booked": 2, "capacity": 2, "available": false }
}
```

Instagram live feed:

- Needs Meta API access via a backend endpoint or a third-party widget.
- Do not place Meta access tokens directly in frontend `.env` variables exposed to Vite.

## Current Asset Folders Added

```text
public/hero/
public/loading/
public/logo.png
public/service-gifs/
public/services/
public/treatment-gifs/
public/treatment-videos/
```

