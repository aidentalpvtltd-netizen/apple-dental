# Apple International Dental Project Markdown Latest

## Current State

- Workspace: `C:\Users\javva\dental`
- Current branch: `Latest-development`
- Worktree was clean immediately after creating this branch.
- `Latest-development` was created from `main`.
- Latest `main` commit before branch creation:
  - `3d4ac48 Add admin dashboard and patient tracking`
- Previous base commit:
  - `17f0a99 Build Apple International Dental site`

## Stack

- React + Vite frontend.
- Google Sheets + Google Apps Script temporary backend.
- Formspree still exists as optional notification fallback.

Main files:

- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `docs/google-sheets-booking-apps-script.js`
- `docs/GOOGLE_SHEETS_BOOKING.md`
- `PROJECT_HANDOFF_ADMIN_GOOGLE_SHEETS_2026-05-01_20-06-13.md`

Admin route:

```text
http://localhost:5173/admin
```

Public route:

```text
http://localhost:5173
```

## Environment

`.env.local` contains:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
VITE_BOOKING_ENDPOINT=https://script.google.com/macros/s/AKfycbywPFsfW1_pJvT5WoK88rQOap3bQZ_c3WrLCswUhr3-5ML8Y2AKM0-oPSeneeoETEqU_g/exec
```

`.env.example` contains:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
VITE_BOOKING_ENDPOINT=
VITE_INSTAGRAM_FEED_ENDPOINT=
```

## Public Booking System

Google Sheets is the temporary source of truth for appointment availability.

Public booking behavior:

- Reads booked slots from Google Sheets through Apps Script.
- Booked slots are greyed out on the website.
- Website bookings write back into Google Sheets.
- Availability refresh interval is 30 seconds.
- Submit flow does a final slot check before writing.
- Sundays are closed.
- Past dates are unavailable.
- Old random/simulated blocked slots were removed.
- All slots are available unless they are in Google Sheets as active bookings.

Local booking lock:

```js
localStorage.removeItem('appleInternationalDentalBookingRequest')
```

This only clears the browser/device duplicate booking lock. It does not delete Google Sheet bookings.

## Google Apps Script

Source file:

```text
docs/google-sheets-booking-apps-script.js
```

When changed:

1. Copy entire file into Google Apps Script.
2. Save.
3. Deploy -> Manage deployments -> Edit -> New version -> Deploy.
4. Reload Google Sheet.
5. Run:

```text
Booking Setup -> Format booking sheet
```

Script Properties needed:

```text
ADMIN_PASSWORD = your-secure-password
```

Apps Script actions:

- `availability`
- `availability-range`
- `admin-login`
- `admin-bookings`
- `admin-patients`
- `admin-history`
- `admin-create-booking`
- `admin-update-booking`
- regular website booking POST

The script uses `LockService` to reduce race conditions and prevent duplicate slot writes.

## Google Sheet Tabs

### Bookings

Columns:

```text
Timestamp
Source
Branch
Appointment Date
Time Slot
Treatment
Patient Name
Phone
Email
Referred By
Concern
Status
Booking ID
Patient ID
```

### Patients

Columns:

```text
Patient ID
Patient Name
Phone
Email
First Visit Date
Last Visit Date
Total Visits
Active Treatment
Current Status
Last Branch
Notes
```

Returning patients are matched by normalized phone number.

### Treatment History

Columns:

```text
History ID
Patient ID
Booking ID
Patient Name
Phone
Treatment
Branch
Appointment Date
Time Slot
Completed Date
Source
Final Notes
```

When a booking is marked:

```text
Treatment Completed
```

it is copied to `Treatment History`.

## Admin Dashboard

Route:

```text
/admin
```

The admin page is now the staff-facing frontend, while Google Sheets is the backend.

Admin tabs:

1. `New Walk-in`
2. `Bookings`
3. `Patients`
4. `Treatment History`

Admin features:

- Admin login via Apps Script password.
- Token stored in localStorage:

```js
appleInternationalDentalAdminSession
```

- New walk-in/manual booking from admin page.
- Slot conflict protection before saving manual booking.
- Bookings table with status dropdown.
- Patient record auto-create/update.
- Treatment history archive when status becomes `Treatment Completed`.
- Search bars in:
  - Bookings
  - Patients
  - Treatment History
- Search filters immediately on frontend by:
  - patient name
  - phone
  - email
  - booking ID
  - patient ID

Admin status options:

```text
Booked
Confirmed
Walk-in
Website
In Treatment
Treatment Completed
Cancelled
No Show
```

Status colors:

- Booked/active: green.
- Cancelled: red.
- No Show: grey.
- In Treatment: blue.
- Treatment Completed: green.

## Doctor Login Card

There is a decorative-only doctor login card on the admin page.

Current behavior:

- Frontend only.
- No backend.
- Right-side admin rail.
- Uses Apple Dental logo.
- No white logo tile/background.
- Contains:
  - Doctor portal
  - Doctor login
  - username field
  - password field
  - sign in button

The left admin header no longer shows the Apple logo; it only uses text branding:

```text
Apple International Dental
Admin dashboard
Appointment bookings
```

## Admin Layout Notes

Recent admin UI fixes:

- View website / Logout buttons are centered correctly.
- Tab order changed to:
  - New Walk-in
  - Bookings
  - Patients
  - Treatment History
- Tabs are compact and no longer stretch vertically.
- Summary cards were made compact/fixed-height.
- Booking ID and Patient ID are visible without relying on horizontal scroll where possible.
- Date column width improved.
- Admin content width expanded.
- Doctor login moved to right-side rail.

## Public Website UI Notes

Recent public UI changes:

- Mobile navbar improved:
  - brand + call top row
  - full-width booking CTA
  - compact nav below
  - Gallery hidden from mobile nav
- Mobile treatment cards set to 2-column layout.
- Treatment modal info grid stays 2-column on mobile.
- Mobile margins improved.
- Global contrast improved:
  - deeper text colors
  - stronger brand red
  - stronger cards/borders/shadows
- KPI changed to:

```text
22 years+
serving patients
```

## Branding / Contact

- Clinic name: `Apple International Dental`
- Current phone display: `+91 98490 24567`
- `tel:` href: `+919849024567`
- Default WhatsApp number: `919849024567`
- Email: `info@appleinternational.in`
- Brand red: `#FF0201`
- Logo asset: `public/logo.png`
- Hero image:

```text
public/hero/dental-hero-smile-exam.jpg
```

## Branches / Locations

Current branch list in website/admin:

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

All WhatsApp branch options currently use default WhatsApp number.

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

## Known Placeholder / Needs Real Data

Still needs real clinic data before final launch:

- Doctor names/photos/bios are placeholder.
- Instagram feed fallback content.
- Footer social links for Facebook/X/LinkedIn are placeholders.
- Branch-specific WhatsApp numbers.
- Branch spellings should be verified:
  - Suryaraopet
  - Mangalgiri
  - Rajamundry
- Contact address currently points to Vijayawada/Suryaraopeta.
- Phone number should be verified.
- Treatment descriptions should be reviewed by clinic.

## Commands

Run from:

```powershell
C:\Users\javva\dental
```

Useful commands:

```powershell
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
node --check docs\google-sheets-booking-apps-script.js
```

Recent checks have passed:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Git Notes

Important completed git actions:

- `main` was created earlier.
- Commit on `main`:

```text
17f0a99 Build Apple International Dental site
```

- Later commit on `main`:

```text
3d4ac48 Add admin dashboard and patient tracking
```

- New branch created after that:

```text
Latest-development
```

Current branch after latest branch creation:

```text
Latest-development
```

## Recommended Next Steps

1. Continue work on `Latest-development`.
2. If Apps Script changes, copy full `docs/google-sheets-booking-apps-script.js` into Google Apps Script and redeploy.
3. Test admin flows:
   - Login.
   - New Walk-in booking.
   - Confirm Bookings row.
   - Confirm Patients update.
   - Mark status `Treatment Completed`.
   - Confirm Treatment History row.
4. Test public slot greying after admin-created booking.
5. Replace doctor placeholders with real doctors or hide until data is available.
6. Later migration target:
   - Supabase Auth
   - `bookings`
   - `patients`
   - `treatment_history`
   - role-based admin/doctor/reception access

## Critical Reminder

The admin dashboard depends on the deployed Apps Script matching the local file:

```text
docs/google-sheets-booking-apps-script.js
```

If the deployed script is older than the local file, admin tabs like Patients, Treatment History, or New Walk-in may fail until redeployed.
