# Apple International Dental Website Handoff

## Project

- Workspace: `C:\Users\javva\dental`
- Branch: `development`
- Stack: React + Vite
- Package scripts:
  - `npm.cmd run dev`
  - `npm.cmd run build`
  - `npm.cmd run lint`
- Local dev server has been used at: `http://localhost:5173`

## Git

- Git repo initialized.
- Initial commit exists on `master`.
- Active work is on `development`.
- Current worktree has many uncommitted changes from the website buildout.

## Branding

- Clinic name: `Apple International Dental`
- Location: `Suryaraopeta, Governor Peta, Vijayawada, Andhra Pradesh 520002`
- Email: `info@appleinternational.in`
- Phone shown on site: `+91 98490 24567`
- Brand logo asset:
  - `public/logo.png`
- Favicon uses:
  - `/logo.png`
- Browser title:
  - `Apple International Dental | Dental Clinic in Vijayawada`

## Formspree

- Endpoint configured in `.env.local`:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
```

- `.env.local` is ignored because `.gitignore` includes `*.local`.
- `.env.example` also contains the Formspree endpoint.

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

Validation:

- Phone accepts exactly 10 digits only.
- Email uses email format validation.
- `Reffered by` accepts alphabets and spaces only.
- `Reffered by` is optional.
- Date cannot be earlier than current date through date input `min`.
- Request button is disabled until an available date and time slot are selected.

Booking anti-abuse:

- After successful booking, local browser is paused for about 24 hours.
- LocalStorage key:

```js
appleInternationalDentalBookingRequest
```

- To clear for demo/testing, run in browser console:

```js
localStorage.removeItem('appleInternationalDentalBookingRequest')
```

Appointment availability:

- Static frontend availability exists in `src/App.jsx`.
- Branches:
  - `Apple International Dental - Main Branch`
  - `Apple International Dental - Suryaraopeta`
  - `Apple International Dental - Governor Peta`
  - `Apple International Dental - Vijayawada Central`
- Slots:
  - `09:30 AM`
  - `10:30 AM`
  - `11:30 AM`
  - `12:30 PM`
  - `04:00 PM`
  - `05:00 PM`
  - `06:00 PM`
  - `07:00 PM`
- Fully booked and closed days are simulated per branch in `branchAvailability`.
- Native browser date calendars can only reliably grey out past dates with `min`; booked dates are shown/blocked through custom date chips and time-slot UI.

## Treatments

Treatment list:

- Root Canal Treatment
- Wisdom Tooth Removal
- Laser Dentistry
- Dental Fillings
- Dental Crown
- Dental Implants
- Dental Braces
- Clear Aligners
- Advanced Gum Treatment
- Kids Dentistry
- Dentures
- Mouth Ulcers

Treatment behavior:

- Each treatment card shows an image.
- Clicking a treatment opens a detail modal.
- Modal includes:
  - image
  - description
  - benefits
  - who needs it
  - approximate duration
  - `Book this treatment` CTA
- CTA closes the modal, selects the treatment, and scrolls to consultation form.
- Modal supports Escape-to-close and body scroll lock.

Treatment images copied into:

- `public/services/Advanced Gum Treatment.png`
- `public/services/Clear Aligners.png`
- `public/services/Dental Braces.png`
- `public/services/Dental Crown.png`
- `public/services/Dental Fillings.png`
- `public/services/Dental implants.png`
- `public/services/Dentures.png`
- `public/services/Kids Dentistry.png`
- `public/services/Laser Dentistry.png`
- `public/services/mouth ulcers.png`
- `public/services/Rootcanal.png`
- `public/services/Wisdom Tooth.png`

## Services Section

Comprehensive dental services section uses uploaded GIFs, not treatment images.

GIF assets:

- `public/service-gifs/Preventive Dentistry.gif`
- `public/service-gifs/Cosemtic Dentistry.gif`
- `public/service-gifs/Restorative Dentistry.gif`
- `public/service-gifs/Children and Orthodontic Care.gif`

Service cards:

- Preventive Dentistry
- Cosmetic Dentistry
- Restorative Dentistry
- Children & Orthodontic Care

Note: uploaded filename is intentionally `Cosemtic Dentistry.gif` with the typo, and code references that filename.

## Loading Screen

Loading screen added before the site appears.

Assets:

- Logo: `/logo.png`
- GIF: `/loading/dentistry.gif`

Behavior:

- Logo and GIF are displayed side by side.
- GIF is recolored toward bright red using CSS filter.
- Loader waits for major images to preload:
  - logo
  - loader GIF
  - hero image
  - treatment images
  - service GIFs
  - doctor images
  - gallery images
- Loader has a minimum and maximum wait time to avoid being stuck.

## Sections Added / Improved

- Hero section updated for Vijayawada.
- KPI cards updated.
- Comprehensive dental services.
- Treatment grid with images.
- Treatment detail modals.
- Consultation form with availability.
- Instagram/gallery strip.
- Doctors section.
- Patient testimonials section.
- FAQ section.
- Contact section with Google Maps embed.
- Footer updated for Vijayawada.

## Google Maps

Google Maps iframe uses:

```text
Suryaraopeta, Governor Peta, Vijayawada, Andhra Pradesh 520002
```

Iframe src is embedded in `src/App.jsx`.

## Testimonials

Four placeholder testimonials are present:

- Priya K. - Root Canal Treatment
- Rahul M. - Clear Aligners
- Anusha R. - Kids Dentistry
- Sandeep V. - Dental Implants

These should be replaced with real testimonials before launch.

## FAQ

FAQ section covers:

- treatment pain
- cost estimates
- appointment timing
- kids treatment
- braces vs clear aligners
- root canal fear

Layout:

- Desktop: two columns.
- Mobile: one column.
- Fixed issue where opening one FAQ visually stretched the adjacent FAQ by adding `align-items: start`.

## SEO

Updated in `index.html`:

- Title
- Meta description
- Meta keywords
- Robots
- Author
- Open Graph metadata
- Twitter metadata
- JSON-LD structured data with `@type: Dentist`

Structured data includes:

- clinic name
- address
- phone
- email
- areas served
- specialties
- services
- opening hours

## Design / UX Work Completed

- Red/white/blush/charcoal brand palette pass.
- Navbar hover color changed to subtle red.
- Header logo replaces old `LD` initials.
- Browser favicon updated to logo.
- Section reveal fade/slide animations added via `IntersectionObserver`.
- Reduced-motion support added.
- Mobile polish pass done.
- Additional mobile rhythm pass done for very small screens.
- Treatment image hover refined to avoid clipping.
- Doctor images are black-and-white by default and colorize on hover.
- Doctor images have slight hover zoom.
- FAQ section adjusted to fill desktop width.
- Button/focus/hover states improved.
- Treatment modal animation added.

## Known Placeholder Content

These should be replaced before real launch:

- Doctor names/photos/bios are placeholders.
- Instagram/gallery images are stock images.
- Testimonials are placeholders.
- Phone number should be verified.
- Branch names should be verified.
- Opening hours should be verified.
- Treatment descriptions should be reviewed by clinic.

## Potential Later Enhancements

User explicitly said these can be revisited later:

- Floating WhatsApp / call buttons
- Sticky mobile booking CTA
- Emergency dental CTA
- Clinic values / hygiene section
- Payment / insurance options
- Treatment process timeline
- First visit guide
- Doctor credentials section
- Privacy note under form
- Actual clinic photos
- Real doctor photos
- Real testimonials
- Icon style unification pass
- Image compression/performance optimization

## Important Commands

Run from `C:\Users\javva\dental`:

```powershell
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

Build and lint have been run repeatedly after changes and passed at the time this handoff was created.
