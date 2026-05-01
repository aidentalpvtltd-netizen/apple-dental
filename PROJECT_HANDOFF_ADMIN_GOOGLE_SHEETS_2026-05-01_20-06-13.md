# Apple International Dental Website Handoff - Admin + Google Sheets - 2026-05-01 20:06

## Workspace / Git

- Workspace: `C:\Users\javva\dental`
- Current working branch during this handoff: `codex/may-1st`
- Main committed branch exists: `main`
- Last committed main commit:
  - `17f0a99 Build Apple International Dental site`
- Current branch has many uncommitted changes after that commit.
- Do not assume changes are committed unless checked with `git status`.

## Project Stack

- React + Vite
- Main files:
  - `src/App.jsx`
  - `src/App.css`
  - `src/index.css`
  - `docs/google-sheets-booking-apps-script.js`
  - `docs/GOOGLE_SHEETS_BOOKING.md`
- Dev server URL:
  - `http://localhost:5173`
- Admin page:
  - `http://localhost:5173/admin`

## Environment

`.env.local` already contains:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
VITE_BOOKING_ENDPOINT=https://script.google.com/macros/s/AKfycbywPFsfW1_pJvT5WoK88rQOap3bQZ_c3WrLCswUhr3-5ML8Y2AKM0-oPSeneeoETEqU_g/exec
```

`.env.example` includes:

```env
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/mgorqdnz
VITE_BOOKING_ENDPOINT=
VITE_INSTAGRAM_FEED_ENDPOINT=
```

## Google Sheets Booking System

Google Sheets is currently used as the temporary booking database.

Website behavior:

- Public booking form reads availability from Google Sheets through Apps Script.
- Website bookings automatically write to the `Bookings` sheet.
- Manual/admin bookings also write to the `Bookings` sheet.
- Booked slots are greyed out on the public site.
- Availability refresh interval was changed from 60 seconds to 30 seconds.
- Final submit still does a last-minute availability check to avoid double booking.

Important:

- Clearing this localStorage key only removes the device booking lock:

```js
localStorage.removeItem('appleInternationalDentalBookingRequest')
```

- It does not remove bookings from Google Sheets.

## Google Apps Script

Current Apps Script source is in:

```text
docs/google-sheets-booking-apps-script.js
```

When changed, the user must:

1. Copy the full file contents into Google Apps Script.
2. Save.
3. Deploy -> Manage deployments -> Edit -> New version -> Deploy.
4. Reload Google Sheet.
5. Run `Booking Setup -> Format booking sheet` if sheet structure/dropdowns changed.

Script features:

- Creates/formats `Bookings` sheet.
- Creates/formats `Patients` sheet.
- Creates/formats `Treatment History` sheet.
- Adds dropdowns for:
  - Source
  - Branch
  - Date validation
  - Time Slot
  - Treatment
  - Status
- Auto-fills manual sheet rows with:
  - Timestamp
  - Source
  - Status
  - Booking ID
  - Patient ID
- Prevents duplicate active slot bookings.
- Time values from Sheets are formatted back to website labels like `10:30 AM`.
- Uses `LockService` for write operations.

Admin Apps Script actions:

- `admin-login`
- `admin-bookings`
- `admin-patients`
- `admin-history`
- `admin-create-booking`
- `admin-update-booking`

Admin security:

- Admin password is stored in Apps Script Script Properties:

```text
ADMIN_PASSWORD = your-secure-password
```

- Apps Script returns a temporary token.
- Token is stored in browser localStorage under:

```js
appleInternationalDentalAdminSession
```

## Google Sheet Tabs

### Bookings

Headers:

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

Headers:

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

Patient matching:

- Current implementation matches returning patients by normalized phone number.

### Treatment History

Headers:

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

When admin changes a booking status to:

```text
Treatment Completed
```

The script copies that booking into `Treatment History`.

## Admin Dashboard

Route:

```text
/admin
```

Admin page now acts as staff-facing frontend for Google Sheets.

Admin tabs:

1. `New Walk-in`
2. `Bookings`
3. `Patients`
4. `Treatment History`

Admin features:

- Login with Apps Script password.
- Summary cards:
  - active bookings
  - today
  - website
  - manual / clinic
- New walk-in/manual booking form.
- Booking filters:
  - date range
  - branch
  - treatment
  - status
- Search bars in:
  - Bookings
  - Patients
  - Treatment History
- Search filters immediately on frontend by patient name and related identifiers:
  - name
  - phone
  - email
  - booking ID
  - patient ID
- Booking table includes status dropdown.
- Status color behavior:
  - active/booked statuses: green
  - `Cancelled`: red
  - `No Show`: grey
  - `In Treatment`: blue
  - `Treatment Completed`: green

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

## Doctor Login Card

User requested a decorative-only doctor login card.

Current behavior:

- It is on the right-side admin rail.
- It is frontend-only.
- No backend.
- Contains:
  - Apple Dental logo
  - `Doctor portal`
  - `Doctor login`
  - username field
  - password field
  - sign in button
- Apple Dental logo was removed from the admin header left side.
- Plus symbol was replaced with Apple Dental logo.
- White logo background tile was removed.

## Admin Layout / UI Notes

Recent admin layout fixes:

- `View website` and `Logout` buttons were flex-centered.
- Admin tabs no longer stretch vertically.
- Tab order changed to:
  - New Walk-in
  - Bookings
  - Patients
  - Treatment History
- Summary cards were made compact/fixed-height so filtering/searching does not make the top area feel oversized.
- Bookings table was adjusted so Booking ID and Patient ID are visible without horizontal scroll where possible.
- Admin topbar includes text:
  - Apple International Dental
  - Admin dashboard
  - Appointment bookings
- Doctor login moved to right rail and styled decoratively.

## Public Website UI Changes After Main Commit

Uncommitted public UI/design changes include:

- Mobile header refined:
  - brand + call top row
  - full-width booking CTA
  - compact nav below
  - Gallery hidden from mobile nav
- Treatment cards kept as 2 columns on mobile.
- Treatment modal info grid kept 2 columns on mobile.
- Mobile margins increased.
- General contrast pass:
  - stronger text colors
  - deeper CTA reds
  - stronger borders/shadows
  - less flat card surfaces
- KPI changed:

```text
22 years+
serving patients
```

## Public Booking Availability

Public booking availability now:

- Past dates unavailable.
- Sundays unavailable.
- All other slots are available unless booked in Google Sheets.
- Old simulated/random blocked slots were removed.
- Google Sheets is the source of truth.

## Current Known Placeholder Data

Still placeholder / needs real clinic data:

- Doctor names/photos/bios are placeholder.
- Instagram feed fallback content.
- Footer Facebook/X/LinkedIn links.
- Branch-specific WhatsApp numbers.
- Some branch spellings may need verification:
  - Suryaraopet
  - Mangalgiri
  - Rajamundry
- Contact address still Vijayawada/Suryaraopeta.
- Phone should be verified.

## Commands Used / Checks

Recent checks repeatedly passed:

```powershell
npm.cmd run lint
npm.cmd run build
node --check docs\google-sheets-booking-apps-script.js
```

The latest changes before this handoff also passed:

```powershell
npm.cmd run lint
npm.cmd run build
```

## Important Next Steps

1. If Apps Script changed since last paste, copy full updated:

```text
docs/google-sheets-booking-apps-script.js
```

into Google Apps Script and redeploy as a new version.

2. Ensure Script Property exists:

```text
ADMIN_PASSWORD = your-secure-password
```

3. Run in Google Sheet:

```text
Booking Setup -> Format booking sheet
```

4. Test admin flows:

- Login at `/admin`.
- Create booking from `New Walk-in`.
- Confirm it appears in `Bookings`.
- Confirm it creates/updates `Patients`.
- Change status to `Treatment Completed`.
- Confirm it appears in `Treatment History`.
- Confirm completed/cancelled/no-show bookings do not block public appointment slots.

5. Before final launch:

- Replace placeholder doctor data or provide real doctor info.
- Verify all branch/contact details.
- Replace social placeholders.
- Decide whether admin doctor login should become real or remain decorative.

## Notes For Future Supabase Migration

Google Sheets is temporary backend. Later Supabase can replace:

- Bookings tab -> `bookings` table
- Patients tab -> `patients` table
- Treatment History tab -> `treatment_history` table
- Admin session via Apps Script -> Supabase Auth
- Role control:
  - admin
  - doctor
  - receptionist

The admin UI was intentionally shaped like an app so the backend can be swapped later.
