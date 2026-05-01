const SHEET_NAME = 'Bookings'
const ACTIVE_STATUSES = new Set(['', 'booked', 'confirmed', 'walk-in', 'website'])
const MANUAL_SOURCE = 'Manual Walkin'
const BOOKING_ROW_LIMIT = 1000
const HEADERS = [
  'Timestamp',
  'Source',
  'Branch',
  'Appointment Date',
  'Time Slot',
  'Treatment',
  'Patient Name',
  'Phone',
  'Email',
  'Referred By',
  'Concern',
  'Status',
  'Booking ID',
]
const BRANCHES = [
  'Apple International Dental, Krishna Lanka, Vijayawada',
  'Apple International Dental, Suryaraopet, Vijayawada',
  'Apple International Dental, 1 Town, Vijayawada',
  'Apple International Dental, Mangalgiri',
  'Apple International Dental, Bangalore HSR Layout',
  'Apple International Dental, Srikakulam',
  'Apple International Dental, Eluru',
  'Apple International Dental, Anantapur',
  'Apple International Dental, Tirupati',
  'Apple International Dental, Rajamundry',
  'Apple International Dental, Madanapalli',
  'Apple International Dental, Nellore',
  'Apple International Dental, Vizag',
  'Apple International Dental, Ongole',
  'Apple International Dental, Bobbili',
  'Apple International Dental, Vizianagaram',
  'Apple International Dental, Guntur',
  'Apple International Dental, Hyderabad',
]
const TREATMENTS = [
  'Root Canal Treatment',
  'Wisdom Tooth Removal',
  'Laser Dentistry',
  'Teeth Whitening',
  'Dental Fillings',
  'Dental Crown',
  'Dental Implants',
  'Dental Braces',
  'Clear Aligners',
  'Advanced Gum Treatment',
  'Kids Dentistry',
  'Dentures',
  'Mouth Ulcers',
]
const APPOINTMENT_SLOTS = [
  '09:30 AM',
  '10:30 AM',
  '11:30 AM',
  '12:30 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
]
const SOURCES = ['Apple International Dental website', 'Website', MANUAL_SOURCE, 'Phone Booking', 'Reception Booking']
const STATUSES = ['Booked', 'Confirmed', 'Walk-in', 'Website', 'Cancelled', 'No Show']

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Booking Setup')
    .addItem('Format booking sheet', 'setupBookingSheet')
    .addToUi()
}

function setupBookingSheet() {
  const sheet = getBookingSheet()

  applyBookingSheetLayout(sheet)
}

function onEdit(event) {
  const range = event.range
  const sheet = range.getSheet()

  if (sheet.getName() !== SHEET_NAME || range.getRow() === 1) {
    return
  }

  completeManualBookingRow(sheet, range.getRow())
}

function doGet(event) {
  const params = event.parameter || {}
  const branch = params.branch || ''
  const startDate = params.startDate || params.date || ''
  const days = Number(params.days || 1)

  if (!branch || !startDate) {
    return jsonResponse({ ok: false, message: 'Branch and date are required.' })
  }

  const sheet = getBookingSheet()
  const bookings = getActiveBookings(sheet)

  if (params.action === 'availability-range') {
    const range = Array.from({ length: Math.max(1, days) }, (_, index) => {
      const date = addDays(startDate, index)

      return {
        date,
        bookedSlots: getBookedSlots(bookings, branch, date),
      }
    })

    return jsonResponse({ ok: true, days: range })
  }

  return jsonResponse({
    ok: true,
    date: startDate,
    bookedSlots: getBookedSlots(bookings, branch, startDate),
  })
}

function doPost(event) {
  const payload = parsePayload(event)
  const lock = LockService.getScriptLock()

  lock.waitLock(10000)

  try {
    const sheet = getBookingSheet()
    const branch = String(payload.branch || '').trim()
    const date = String(payload.date || '').trim()
    const timeSlot = String(payload.timeSlot || '').trim()

    if (!branch || !date || !timeSlot) {
      return jsonResponse({ ok: false, message: 'Branch, date, and time slot are required.' })
    }

    const bookings = getActiveBookings(sheet)
    const isBooked = getBookedSlots(bookings, branch, date).includes(timeSlot)

    if (isBooked) {
      return jsonResponse({
        ok: false,
        message: 'That slot is already booked. Please choose another available time.',
      })
    }

    const bookingId = `AID-${Date.now()}`

    sheet.appendRow([
      new Date(),
      payload.source || 'Website',
      branch,
      date,
      timeSlot,
      payload.treatmentName || payload.treatment || '',
      payload.name || '',
      payload.phone || '',
      payload.email || '',
      payload.referredBy || '',
      payload.concern || '',
      'Booked',
      bookingId,
    ])
    applyBookingSheetLayout(sheet)

    return jsonResponse({ ok: true, bookingId })
  } finally {
    lock.releaseLock()
  }
}

function parsePayload(event) {
  const contents = event.postData && event.postData.contents

  if (!contents) {
    return event.parameter || {}
  }

  try {
    return JSON.parse(contents)
  } catch (error) {
    return event.parameter || {}
  }
}

function getBookingSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME)

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS)
  }

  applyBookingSheetLayout(sheet)

  return sheet
}

function applyBookingSheetLayout(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length)
  const existingHeaders = headerRange.getValues()[0]
  const needsHeaders = HEADERS.some((header, index) => existingHeaders[index] !== header)

  if (needsHeaders) {
    headerRange.setValues([HEADERS])
  }

  sheet.setFrozenRows(1)
  headerRange.setFontWeight('bold').setBackground('#fff0f0')

  sheet.getRange(2, 1, BOOKING_ROW_LIMIT, 1).setNumberFormat('m/d/yyyy h:mm:ss')
  sheet.getRange(2, 4, BOOKING_ROW_LIMIT, 1).setNumberFormat('yyyy-mm-dd')
  sheet.getRange(2, 5, BOOKING_ROW_LIMIT, 1).setNumberFormat('hh:mm AM/PM')

  setDropdown(sheet, 2, SOURCES)
  setDropdown(sheet, 3, BRANCHES)
  setDateValidation(sheet, 4)
  setDropdown(sheet, 5, APPOINTMENT_SLOTS)
  setDropdown(sheet, 6, TREATMENTS)
  setDropdown(sheet, 12, STATUSES)
  refreshAllTimeSlotDropdowns(sheet)

  sheet.autoResizeColumns(1, HEADERS.length)
}

function setDropdown(sheet, column, values) {
  const validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build()

  sheet.getRange(2, column, BOOKING_ROW_LIMIT, 1).setDataValidation(validation)
}

function setDateValidation(sheet, column) {
  const validation = SpreadsheetApp.newDataValidation()
    .requireDate()
    .setAllowInvalid(false)
    .build()

  sheet.getRange(2, column, BOOKING_ROW_LIMIT, 1).setDataValidation(validation)
}

function completeManualBookingRow(sheet, rowNumber) {
  const rowRange = sheet.getRange(rowNumber, 1, 1, HEADERS.length)
  const row = rowRange.getValues()[0]
  const branch = String(row[2] || '').trim()
  const date = formatSheetDate(row[3])
  const timeSlot = formatSheetTime(row[4])

  if (!branch && !date && !timeSlot) {
    return
  }

  if (!row[0]) {
    sheet.getRange(rowNumber, 1).setValue(new Date())
  }

  if (!row[1]) {
    sheet.getRange(rowNumber, 2).setValue(MANUAL_SOURCE)
  }

  if (!row[11]) {
    sheet.getRange(rowNumber, 12).setValue('Booked')
  }

  if (!row[12]) {
    sheet.getRange(rowNumber, 13).setValue(`AID-${Date.now()}`)
  }

  updateTimeSlotDropdownForRow(sheet, rowNumber)
  preventDuplicateManualSlot(sheet, rowNumber, branch, date, timeSlot)
}

function preventDuplicateManualSlot(sheet, rowNumber, branch, date, timeSlot) {
  const timeCell = sheet.getRange(rowNumber, 5)

  if (!branch || !date || !timeSlot) {
    timeCell.setNote('').setBackground('#ffffff')
    return
  }

  const bookings = getActiveBookings(sheet)
  const duplicateCount = bookings.filter(
    (booking) => booking.branch === branch && booking.date === date && booking.timeSlot === timeSlot,
  ).length

  if (duplicateCount > 1) {
    timeCell
      .clearContent()
      .setNote('This slot is already booked for this branch/date. Choose another available time.')
      .setBackground('#ffe0e0')
    return
  }

  timeCell.setNote('').setBackground('#ffffff')
}

function refreshAllTimeSlotDropdowns(sheet) {
  const lastRow = Math.max(sheet.getLastRow(), 2)

  for (let rowNumber = 2; rowNumber <= lastRow; rowNumber += 1) {
    updateTimeSlotDropdownForRow(sheet, rowNumber)
  }
}

function updateTimeSlotDropdownForRow(sheet, rowNumber) {
  const row = sheet.getRange(rowNumber, 1, 1, HEADERS.length).getValues()[0]
  const branch = String(row[2] || '').trim()
  const date = formatSheetDate(row[3])
  const timeCell = sheet.getRange(rowNumber, 5)

  if (!branch || !date) {
    setCellDropdown(timeCell, APPOINTMENT_SLOTS)
    return
  }

  const currentSlot = formatSheetTime(row[4])
  const bookedSlots = getBookedSlotsForOtherRows(sheet, rowNumber, branch, date)
  const availableSlots = APPOINTMENT_SLOTS.filter((slot) => !bookedSlots.includes(slot))
  const dropdownSlots =
    currentSlot && APPOINTMENT_SLOTS.includes(currentSlot) && !availableSlots.includes(currentSlot)
      ? [currentSlot, ...availableSlots]
      : availableSlots

  setCellDropdown(timeCell, dropdownSlots.length ? dropdownSlots : ['No slots available'])
}

function getBookedSlotsForOtherRows(sheet, rowNumber, branch, date) {
  const values = sheet.getDataRange().getValues()

  return values
    .slice(1)
    .map((row, index) => ({
      rowNumber: index + 2,
      branch: String(row[2] || '').trim(),
      date: formatSheetDate(row[3]),
      timeSlot: formatSheetTime(row[4]),
      status: String(row[11] || '').trim().toLowerCase(),
    }))
    .filter(
      (booking) =>
        booking.rowNumber !== rowNumber &&
        booking.branch === branch &&
        booking.date === date &&
        ACTIVE_STATUSES.has(booking.status),
    )
    .map((booking) => booking.timeSlot)
    .filter(Boolean)
}

function setCellDropdown(cell, values) {
  const validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build()

  cell.setDataValidation(validation)
}

function getActiveBookings(sheet) {
  const values = sheet.getDataRange().getValues()
  const rows = values.slice(1)

  return rows
    .map((row) => ({
      branch: String(row[2] || '').trim(),
      date: formatSheetDate(row[3]),
      timeSlot: formatSheetTime(row[4]),
      status: String(row[11] || '').trim().toLowerCase(),
    }))
    .filter((booking) => ACTIVE_STATUSES.has(booking.status))
}

function getBookedSlots(bookings, branch, date) {
  return bookings
    .filter((booking) => booking.branch === branch && booking.date === date)
    .map((booking) => booking.timeSlot)
    .filter(Boolean)
}

function formatSheetDate(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd')
  }

  return String(value || '').trim()
}

function formatSheetTime(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'hh:mm a')
  }

  return String(value || '').trim()
}

function addDays(dateValue, days) {
  const parts = dateValue.split('-').map(Number)
  const date = new Date(parts[0], parts[1] - 1, parts[2])

  date.setDate(date.getDate() + days)

  return Utilities.formatDate(date, Session.getScriptTimeZone(), 'yyyy-MM-dd')
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
