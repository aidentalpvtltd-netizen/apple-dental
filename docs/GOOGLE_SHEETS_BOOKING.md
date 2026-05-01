# Google Sheets Booking Setup

This temporary booking database uses a Google Sheet plus a Google Apps Script web app.

## Sheet Columns

Create a Google Sheet with a tab named `Bookings`. The script will create the tab and headers automatically if they do not exist.

Required headers:

```text
Timestamp, Source, Branch, Appointment Date, Time Slot, Treatment, Patient Name, Phone, Email, Referred By, Concern, Status, Booking ID
```

Manual walk-ins should be added as rows in the same tab:

- `Branch` must exactly match the website branch dropdown.
- `Appointment Date` should be `YYYY-MM-DD`.
- `Time Slot` must exactly match a website slot, for example `10:30 AM`.
- `Status` should be `Booked`, `Confirmed`, `Walk-in`, or `Website`.
- To free a slot, set `Status` to `Cancelled` or delete the row.

## Manual Entry Helpers

The Apps Script can format the Google Sheet so reception staff do not have to type every value manually.

After pasting or updating the script:

1. Reload the Google Sheet.
2. Open the `Booking Setup` menu.
3. Click `Format booking sheet`.

This adds:

- Source dropdown.
- Branch dropdown using the same branches as the website.
- Appointment date validation/date picker.
- Time slot dropdown using the website appointment slots.
- Row-specific time slot dropdowns that remove slots already booked for the selected branch/date.
- Treatment dropdown using the website treatment list.
- Status dropdown.
- `Patients` sheet creation.
- `Treatment History` sheet creation.
- Frozen/header formatting.

When staff start a manual row, the script also fills blank helper fields automatically:

- `Timestamp`
- `Source` as `Manual Walkin`
- `Status` as `Booked`
- `Booking ID`

If a staff member manually enters a branch/date/time that already has another active booking, the script clears that `Time Slot` cell and adds a note asking them to choose another available time.

## Apps Script

1. Open the Google Sheet.
2. Go to `Extensions` -> `Apps Script`.
3. Paste the code from `docs/google-sheets-booking-apps-script.js`.
4. Save.
5. Click `Deploy` -> `New deployment`.
6. Choose `Web app`.
7. Set `Execute as` to `Me`.
8. Set `Who has access` to `Anyone`.
9. Deploy and copy the web app URL.

## Website Environment

Add the deployed web app URL to `.env.local`:

```env
VITE_BOOKING_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the Vite dev server after changing `.env.local`.

## Admin Dashboard

The website includes a protected admin dashboard at:

```text
/admin
```

Before using it, set an admin password in Apps Script:

1. Open `Extensions` -> `Apps Script`.
2. Go to `Project Settings`.
3. Under `Script Properties`, add:

```text
ADMIN_PASSWORD = your-secure-password
```

4. Save.
5. Redeploy the Apps Script as a new version.

The admin dashboard uses this password to request a temporary session token from Apps Script. Patient booking rows are only returned when the token is valid.

The current dashboard supports:

- Admin login.
- Today/upcoming booking overview.
- Branch, date, treatment, and status filters.
- Website and manual booking visibility.
- New walk-in/manual booking entry from the admin page.
- Patients tab backed by the `Patients` Google Sheet.
- Treatment History tab backed by the `Treatment History` Google Sheet.
- Patient name, phone, email, concern, source, status, and booking ID display.
- Status updates from the admin table.
- Patient record updates by phone number.
- Automatic history archiving when a booking is marked `Treatment Completed`.

Patient records are stored in a `Patients` tab. The script matches returning patients by phone number, then keeps one patient row updated with first visit, last visit, total visits, current treatment, and current status.

Completed treatments are copied to the `Treatment History` tab. This gives the clinic a cleaner active booking view while keeping completed treatment records searchable.

## Behavior

- The website checks the Google Sheet for booked slots for the selected branch/date.
- Any slot already in the sheet is greyed out on the website.
- Website bookings are written back into the same sheet.
- The Apps Script uses a lock before writing, so two people cannot book the same slot at the same moment.
- If `VITE_BOOKING_ENDPOINT` is missing, the site keeps the older Formspree-only behavior.
