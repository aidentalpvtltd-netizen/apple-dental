const SHEET_NAME = 'Bookings'
const PATIENTS_SHEET_NAME = 'Patients'
const HISTORY_SHEET_NAME = 'Treatment History'
const ACTIVE_STATUSES = new Set(['', 'booked', 'confirmed', 'walk-in', 'website', 'in treatment'])
const COMPLETED_STATUS = 'Treatment Completed'
const MANUAL_SOURCE = 'Manual Walkin'
const BOOKING_ROW_LIMIT = 1000
const ADMIN_PASSWORD_PROPERTY = 'ADMIN_PASSWORD'
const ADMIN_SESSION_TOKEN_PROPERTY = 'ADMIN_SESSION_TOKEN'
const ADMIN_SESSION_EXPIRES_PROPERTY = 'ADMIN_SESSION_EXPIRES'
const ADMIN_SESSION_BRANCH_PROPERTY = 'ADMIN_SESSION_BRANCH'
const RAZORPAY_KEY_ID_PROPERTY = 'RAZORPAY_KEY_ID'
const RAZORPAY_KEY_SECRET_PROPERTY = 'RAZORPAY_KEY_SECRET'
const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000
const CONSULTATION_FEE_AMOUNT = 300
const CONSULTATION_FEE_SUBUNITS = CONSULTATION_FEE_AMOUNT * 100
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
  'Patient ID',
  'Payment Method',
  'Payment Status',
  'Payment Amount',
  'Payment ID',
  'Payment Order ID',
]
const PATIENT_HEADERS = [
  'Patient ID',
  'Patient Name',
  'Phone',
  'Email',
  'First Visit Date',
  'Last Visit Date',
  'Total Visits',
  'Active Treatment',
  'Current Status',
  'Last Branch',
  'Notes',
]
const HISTORY_HEADERS = [
  'History ID',
  'Patient ID',
  'Booking ID',
  'Patient Name',
  'Phone',
  'Treatment',
  'Branch',
  'Appointment Date',
  'Time Slot',
  'Completed Date',
  'Source',
  'Final Notes',
]
const BRANCHES = [
  'Apple International Dental, Ongole',
  'Apple International Dental, Nellore',
  'Apple International Dental, Gajuwaka, Visakhapatnam',
  'Apple International Dental, Madanapalle',
  'Apple International Dental, Nakkal Road, Vijayawada',
  'Apple International Dental, One Town (Panja), Vijayawada',
  'Apple International Dental, Srikakulam',
  'Apple International Dental, Guntur',
  'Apple International Dental, Dwaraka Nagar, Visakhapatnam',
  'Apple International Dental, Tirupati',
  'Apple International Dental, Anantapur',
  'Apple International Dental, Rajamundry',
  'Apple International Dental, Mangalagiri',
  'Apple International Dental, Krishna Lanka, Vijayawada',
  'Apple International Dental, Gachibowli, Hyderabad',
  'Apple International Dental, Habsiguda, Hyderabad',
  'Apple International Dental, Vanasthalipuram, Hyderabad',
  'Apple International Dental, Kondapur, Hyderabad',
  'Apple International Dental, Champapet, Hyderabad',
  'Apple International Dental, HSR Layout, Bengaluru',
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
const STATUSES = [
  'Booked',
  'Confirmed',
  'Walk-in',
  'Website',
  'In Treatment',
  COMPLETED_STATUS,
  'Cancelled',
  'No Show',
]

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Booking Setup')
    .addItem('Format booking sheet', 'setupBookingSheet')
    .addToUi()
}

function setupBookingSheet() {
  const sheet = getBookingSheet()

  applyBookingSheetLayout(sheet)
  getPatientsSheet()
  getHistorySheet()
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
    if (payload.action === 'admin-login') {
      return handleAdminLogin(payload)
    }

    if (payload.action === 'admin-bookings') {
      return handleAdminBookings(payload)
    }

    if (payload.action === 'admin-patients') {
      return handleAdminPatients(payload)
    }

    if (payload.action === 'admin-history') {
      return handleAdminHistory(payload)
    }

    if (payload.action === 'admin-create-booking') {
      return handleAdminCreateBooking(payload)
    }

    if (payload.action === 'admin-update-booking') {
      return handleAdminUpdateBooking(payload)
    }

    if (payload.action === 'create-payment-order') {
      return handleCreatePaymentOrder(payload)
    }

    if (payload.action === 'verify-payment') {
      return handleVerifyPayment(payload)
    }

    const sheet = getBookingSheet()
    const branch = String(payload.branch || '').trim()
    const date = String(payload.date || '').trim()
    const timeSlot = String(payload.timeSlot || '').trim()

    if (!branch || !date || !timeSlot) {
      return jsonResponse({ ok: false, message: 'Branch, date, and time slot are required.' })
    }

    const bookingId = `AID-${Date.now()}`
    const patientId = upsertPatientRecord({
      patientName: payload.name || '',
      phone: payload.phone || '',
      email: payload.email || '',
      date,
      treatment: payload.treatmentName || payload.treatment || '',
      branch,
      status: 'Booked',
      notes: payload.concern || '',
      bookingId,
    })

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
      patientId,
      payload.paymentMethod || 'Online payment',
      payload.paymentStatus || 'Paid',
      payload.paymentAmount || CONSULTATION_FEE_AMOUNT,
      payload.paymentId || '',
      payload.paymentOrderId || '',
    ])
    applyBookingSheetLayout(sheet)

    return jsonResponse({ ok: true, bookingId })
  } finally {
    lock.releaseLock()
  }
}

function handleAdminLogin(payload) {
  const configuredPassword = PropertiesService.getScriptProperties().getProperty(
    ADMIN_PASSWORD_PROPERTY,
  )
  const password = String(payload.password || '')
  const branch = String(payload.branch || '').trim()

  if (!configuredPassword) {
    return jsonResponse({
      ok: false,
      message: 'Admin password is not configured in Apps Script properties.',
    })
  }

  if (password !== configuredPassword) {
    return jsonResponse({ ok: false, message: 'Invalid admin password.' })
  }

  if (!BRANCHES.includes(branch)) {
    return jsonResponse({ ok: false, message: 'Select a valid branch before signing in.' })
  }

  const token = Utilities.getUuid()
  const expiresAt = Date.now() + ADMIN_SESSION_DURATION_MS
  const properties = PropertiesService.getScriptProperties()

  properties.setProperty(ADMIN_SESSION_TOKEN_PROPERTY, token)
  properties.setProperty(ADMIN_SESSION_EXPIRES_PROPERTY, String(expiresAt))
  properties.setProperty(ADMIN_SESSION_BRANCH_PROPERTY, branch)

  return jsonResponse({
    ok: true,
    token,
    expiresAt,
    branch,
  })
}

function handleAdminBookings(payload) {
  if (!isValidAdminToken(payload.token)) {
    return jsonResponse({ ok: false, message: 'Admin session expired. Please log in again.' })
  }

  const sheet = getBookingSheet()
  const values = sheet.getDataRange().getValues()
  const startDate = String(payload.startDate || '').trim()
  const endDate = String(payload.endDate || '').trim()
  const branchFilter = getAdminSessionBranch()
  const statusFilter = String(payload.status || '').trim().toLowerCase()
  const treatmentFilter = String(payload.treatment || '').trim()

  const bookings = values
    .slice(1)
    .map((row) => ({
      timestamp: formatSheetTimestamp(row[0]),
      source: String(row[1] || '').trim(),
      branch: String(row[2] || '').trim(),
      date: formatSheetDate(row[3]),
      timeSlot: formatSheetTime(row[4]),
      treatment: String(row[5] || '').trim(),
      patientName: String(row[6] || '').trim(),
      phone: String(row[7] || '').trim(),
      email: String(row[8] || '').trim(),
      referredBy: String(row[9] || '').trim(),
      concern: String(row[10] || '').trim(),
      status: String(row[11] || '').trim() || 'Booked',
      bookingId: String(row[12] || '').trim(),
      patientId: String(row[13] || '').trim(),
      paymentMethod: String(row[14] || '').trim(),
      paymentStatus: String(row[15] || '').trim(),
      paymentAmount: String(row[16] || '').trim(),
      paymentId: String(row[17] || '').trim(),
      paymentOrderId: String(row[18] || '').trim(),
    }))
    .filter((booking) => booking.branch && booking.date && booking.timeSlot)
    .filter((booking) => !startDate || booking.date >= startDate)
    .filter((booking) => !endDate || booking.date <= endDate)
    .filter((booking) => !branchFilter || booking.branch === branchFilter)
    .filter((booking) => !statusFilter || booking.status.toLowerCase() === statusFilter)
    .filter((booking) => !treatmentFilter || booking.treatment === treatmentFilter)
    .sort((a, b) => `${a.date} ${a.timeSlot}`.localeCompare(`${b.date} ${b.timeSlot}`))

  return jsonResponse({ ok: true, bookings })
}

function handleAdminPatients(payload) {
  if (!isValidAdminToken(payload.token)) {
    return jsonResponse({ ok: false, message: 'Admin session expired. Please log in again.' })
  }

  const branchFilter = getAdminSessionBranch()
  const values = getPatientsSheet().getDataRange().getValues()
  const patients = values
    .slice(1)
    .map((row) => ({
      patientId: String(row[0] || '').trim(),
      patientName: String(row[1] || '').trim(),
      phone: normalizePhone(row[2]),
      email: String(row[3] || '').trim(),
      firstVisitDate: formatSheetDate(row[4]),
      lastVisitDate: formatSheetDate(row[5]),
      totalVisits: Number(row[6] || 0),
      activeTreatment: String(row[7] || '').trim(),
      currentStatus: String(row[8] || '').trim(),
      lastBranch: String(row[9] || '').trim(),
      notes: String(row[10] || '').trim(),
    }))
    .filter((patient) => patient.patientId && patient.phone)
    .filter((patient) => !branchFilter || patient.lastBranch === branchFilter)
    .sort((a, b) => b.lastVisitDate.localeCompare(a.lastVisitDate))

  return jsonResponse({ ok: true, patients })
}

function handleAdminHistory(payload) {
  if (!isValidAdminToken(payload.token)) {
    return jsonResponse({ ok: false, message: 'Admin session expired. Please log in again.' })
  }

  const branchFilter = getAdminSessionBranch()
  const values = getHistorySheet().getDataRange().getValues()
  const history = values
    .slice(1)
    .map((row) => ({
      historyId: String(row[0] || '').trim(),
      patientId: String(row[1] || '').trim(),
      bookingId: String(row[2] || '').trim(),
      patientName: String(row[3] || '').trim(),
      phone: normalizePhone(row[4]),
      treatment: String(row[5] || '').trim(),
      branch: String(row[6] || '').trim(),
      date: formatSheetDate(row[7]),
      timeSlot: formatSheetTime(row[8]),
      completedDate: formatSheetTimestamp(row[9]),
      source: String(row[10] || '').trim(),
      finalNotes: String(row[11] || '').trim(),
    }))
    .filter((item) => item.historyId)
    .filter((item) => !branchFilter || item.branch === branchFilter)
    .sort((a, b) => b.completedDate.localeCompare(a.completedDate))

  return jsonResponse({ ok: true, history })
}

function handleCreatePaymentOrder(payload) {
  const properties = PropertiesService.getScriptProperties()
  const keyId = properties.getProperty(RAZORPAY_KEY_ID_PROPERTY)
  const keySecret = properties.getProperty(RAZORPAY_KEY_SECRET_PROPERTY)

  if (!keyId || !keySecret) {
    return jsonResponse({
      ok: false,
      message: 'Razorpay keys are not configured in Apps Script properties.',
    })
  }

  const amount = Number(payload.amount || CONSULTATION_FEE_SUBUNITS)

  if (amount !== CONSULTATION_FEE_SUBUNITS) {
    return jsonResponse({ ok: false, message: 'Invalid consultation fee amount.' })
  }

  const receipt = `AID-CONSULT-${Date.now()}`
  const response = UrlFetchApp.fetch('https://api.razorpay.com/v1/orders', {
    method: 'post',
    contentType: 'application/json',
    headers: {
      Authorization: `Basic ${Utilities.base64Encode(`${keyId}:${keySecret}`)}`,
    },
    payload: JSON.stringify({
      amount,
      currency: 'INR',
      receipt,
      notes: {
        patient_name: payload.name || '',
        phone: payload.phone || '',
        branch: payload.branch || '',
        source: payload.source || '',
      },
    }),
    muteHttpExceptions: true,
  })
  const statusCode = response.getResponseCode()
  const result = JSON.parse(response.getContentText() || '{}')

  if (statusCode < 200 || statusCode >= 300) {
    return jsonResponse({
      ok: false,
      message: result.error && result.error.description
        ? result.error.description
        : 'Unable to create payment order.',
    })
  }

  return jsonResponse({
    ok: true,
    keyId,
    orderId: result.id,
    amount: result.amount,
    currency: result.currency,
  })
}

function handleVerifyPayment(payload) {
  const keySecret = PropertiesService.getScriptProperties().getProperty(RAZORPAY_KEY_SECRET_PROPERTY)
  const orderId = String(payload.orderId || '').trim()
  const paymentId = String(payload.paymentId || '').trim()
  const signature = String(payload.signature || '').trim()

  if (!keySecret) {
    return jsonResponse({ ok: false, message: 'Razorpay secret is not configured.' })
  }

  if (!orderId || !paymentId || !signature) {
    return jsonResponse({ ok: false, message: 'Payment verification details are missing.' })
  }

  const expectedSignature = toHexSignature(
    Utilities.computeHmacSha256Signature(`${orderId}|${paymentId}`, keySecret),
  )

  if (expectedSignature !== signature) {
    return jsonResponse({ ok: false, message: 'Payment verification failed.' })
  }

  return jsonResponse({ ok: true })
}

function handleAdminCreateBooking(payload) {
  if (!isValidAdminToken(payload.token)) {
    return jsonResponse({ ok: false, message: 'Admin session expired. Please log in again.' })
  }

  const sheet = getBookingSheet()
  const branch = getAdminSessionBranch()
  const date = String(payload.date || '').trim()
  const timeSlot = String(payload.timeSlot || '').trim()
  const treatment = String(payload.treatmentName || payload.treatment || '').trim()
  const patientName = String(payload.name || '').trim()
  const phone = normalizePhone(payload.phone)

  if (!branch || !date || !timeSlot || !patientName || !phone) {
    return jsonResponse({
      ok: false,
      message: 'Patient name, phone, branch, date, and time slot are required.',
    })
  }

  const bookingId = `AID-${Date.now()}`
  const patientId = upsertPatientRecord({
    patientName,
    phone,
    email: payload.email || '',
    date,
    treatment,
    branch,
    status: payload.status || 'Booked',
    notes: payload.concern || '',
    bookingId,
  })

  sheet.appendRow([
    new Date(),
    payload.source || MANUAL_SOURCE,
    branch,
    date,
    timeSlot,
    treatment,
    patientName,
    phone,
    payload.email || '',
    payload.referredBy || '',
    payload.concern || '',
    payload.status || 'Booked',
    bookingId,
    patientId,
    payload.paymentMethod || MANUAL_SOURCE,
    payload.paymentStatus || 'Paid',
    payload.paymentAmount || CONSULTATION_FEE_AMOUNT,
    payload.paymentId || '',
    payload.paymentOrderId || '',
  ])
  applyBookingSheetLayout(sheet)

  return jsonResponse({ ok: true, bookingId, patientId })
}

function handleAdminUpdateBooking(payload) {
  if (!isValidAdminToken(payload.token)) {
    return jsonResponse({ ok: false, message: 'Admin session expired. Please log in again.' })
  }

  const bookingId = String(payload.bookingId || '').trim()
  const status = String(payload.status || '').trim()
  const notes = String(payload.notes || '').trim()

  if (!bookingId || !status) {
    return jsonResponse({ ok: false, message: 'Booking ID and status are required.' })
  }

  const sheet = getBookingSheet()
  const values = sheet.getDataRange().getValues()
  const rowIndex = values.findIndex((row, index) => index > 0 && String(row[12] || '').trim() === bookingId)

  if (rowIndex < 1) {
    return jsonResponse({ ok: false, message: 'Booking not found.' })
  }

  const rowNumber = rowIndex + 1
  const sessionBranch = getAdminSessionBranch()
  const bookingBranch = String(values[rowIndex][2] || '').trim()

  if (sessionBranch && bookingBranch !== sessionBranch) {
    return jsonResponse({ ok: false, message: 'This booking belongs to another branch.' })
  }

  sheet.getRange(rowNumber, 12).setValue(status)

  if (notes) {
    sheet.getRange(rowNumber, 11).setValue(notes)
  }

  const booking = getBookingFromRow(sheet.getRange(rowNumber, 1, 1, HEADERS.length).getValues()[0])
  const patientId = ensureBookingPatientId(sheet, rowNumber, booking)

  upsertPatientRecord({
    ...booking,
    patientId,
    status,
    notes: notes || booking.concern,
  })

  if (status === COMPLETED_STATUS) {
    archiveCompletedTreatment({
      ...booking,
      patientId,
      status,
      concern: notes || booking.concern,
    })
  }

  refreshAllTimeSlotDropdowns(sheet)

  return jsonResponse({ ok: true })
}

function isValidAdminToken(token) {
  const properties = PropertiesService.getScriptProperties()
  const savedToken = properties.getProperty(ADMIN_SESSION_TOKEN_PROPERTY)
  const expiresAt = Number(properties.getProperty(ADMIN_SESSION_EXPIRES_PROPERTY) || 0)
  const branch = String(properties.getProperty(ADMIN_SESSION_BRANCH_PROPERTY) || '').trim()

  return Boolean(token && savedToken && branch && token === savedToken && expiresAt > Date.now())
}

function getAdminSessionBranch() {
  return String(
    PropertiesService.getScriptProperties().getProperty(ADMIN_SESSION_BRANCH_PROPERTY) || '',
  ).trim()
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

function getPatientsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet =
    spreadsheet.getSheetByName(PATIENTS_SHEET_NAME) || spreadsheet.insertSheet(PATIENTS_SHEET_NAME)

  ensureHeaders(sheet, PATIENT_HEADERS)
  sheet.setFrozenRows(1)
  sheet.getRange(1, 1, 1, PATIENT_HEADERS.length).setFontWeight('bold').setBackground('#f0fff4')
  sheet.autoResizeColumns(1, PATIENT_HEADERS.length)

  return sheet
}

function getHistorySheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  const sheet =
    spreadsheet.getSheetByName(HISTORY_SHEET_NAME) || spreadsheet.insertSheet(HISTORY_SHEET_NAME)

  ensureHeaders(sheet, HISTORY_HEADERS)
  sheet.setFrozenRows(1)
  sheet.getRange(1, 1, 1, HISTORY_HEADERS.length).setFontWeight('bold').setBackground('#f6f7f8')
  sheet.autoResizeColumns(1, HISTORY_HEADERS.length)

  return sheet
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers)
    return
  }

  const headerRange = sheet.getRange(1, 1, 1, headers.length)
  const existingHeaders = headerRange.getValues()[0]
  const needsHeaders = headers.some((header, index) => existingHeaders[index] !== header)

  if (needsHeaders) {
    headerRange.setValues([headers])
  }
}

function applyBookingSheetLayout(sheet) {
  ensureHeaders(sheet, HEADERS)
  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length)

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

  if (!row[14]) {
    sheet.getRange(rowNumber, 15).setValue('Cash received')
  }

  if (!row[15]) {
    sheet.getRange(rowNumber, 16).setValue('Paid')
  }

  if (!row[16]) {
    sheet.getRange(rowNumber, 17).setValue(CONSULTATION_FEE_AMOUNT)
  }

  const latestRow = sheet.getRange(rowNumber, 1, 1, HEADERS.length).getValues()[0]
  const booking = getBookingFromRow(latestRow)
  const patientId = ensureBookingPatientId(sheet, rowNumber, booking)

  upsertPatientRecord({
    ...booking,
    patientId,
  })

  if (booking.status === COMPLETED_STATUS) {
    archiveCompletedTreatment({
      ...booking,
      patientId,
    })
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

function getBookingFromRow(row) {
  return {
    timestamp: formatSheetTimestamp(row[0]),
    source: String(row[1] || '').trim(),
    branch: String(row[2] || '').trim(),
    date: formatSheetDate(row[3]),
    timeSlot: formatSheetTime(row[4]),
    treatment: String(row[5] || '').trim(),
    patientName: String(row[6] || '').trim(),
    phone: normalizePhone(row[7]),
    email: String(row[8] || '').trim(),
    referredBy: String(row[9] || '').trim(),
    concern: String(row[10] || '').trim(),
    status: String(row[11] || '').trim() || 'Booked',
    bookingId: String(row[12] || '').trim(),
    patientId: String(row[13] || '').trim(),
    paymentMethod: String(row[14] || '').trim(),
    paymentStatus: String(row[15] || '').trim(),
    paymentAmount: String(row[16] || '').trim(),
    paymentId: String(row[17] || '').trim(),
    paymentOrderId: String(row[18] || '').trim(),
  }
}

function ensureBookingPatientId(sheet, rowNumber, booking) {
  if (booking.patientId) {
    return booking.patientId
  }

  const patientId = upsertPatientRecord(booking)

  if (patientId) {
    sheet.getRange(rowNumber, 14).setValue(patientId)
  }

  return patientId
}

function upsertPatientRecord(booking) {
  const phone = normalizePhone(booking.phone)

  if (!phone) {
    return booking.patientId || ''
  }

  const sheet = getPatientsSheet()
  const values = sheet.getDataRange().getValues()
  const existingIndex = values.findIndex((row, index) => index > 0 && normalizePhone(row[2]) === phone)
  const patientId = booking.patientId || (existingIndex > 0 ? String(values[existingIndex][0] || '') : `PAT-${Date.now()}`)
  const totalVisits = countPatientVisits(phone, booking.bookingId)
  const nextRow = [
    patientId,
    booking.patientName || (existingIndex > 0 ? values[existingIndex][1] : ''),
    phone,
    booking.email || (existingIndex > 0 ? values[existingIndex][3] : ''),
    existingIndex > 0 ? values[existingIndex][4] || booking.date : booking.date,
    booking.date,
    totalVisits,
    booking.status === COMPLETED_STATUS ? '' : booking.treatment,
    booking.status || 'Booked',
    booking.branch,
    booking.notes || booking.concern || (existingIndex > 0 ? values[existingIndex][10] : ''),
  ]

  if (existingIndex > 0) {
    sheet.getRange(existingIndex + 1, 1, 1, PATIENT_HEADERS.length).setValues([nextRow])
  } else {
    sheet.appendRow(nextRow)
  }

  return patientId
}

function countPatientVisits(phone, bookingId = '') {
  const bookings = getBookingSheet().getDataRange().getValues().slice(1)
  const matchingBookings = bookings.filter((row) => normalizePhone(row[7]) === phone)
  const includesCurrentBooking = matchingBookings.some(
    (row) => bookingId && String(row[12] || '').trim() === bookingId,
  )

  return matchingBookings.length + (bookingId && !includesCurrentBooking ? 1 : 0)
}

function archiveCompletedTreatment(booking) {
  if (!booking.bookingId) {
    return
  }

  const historySheet = getHistorySheet()
  const values = historySheet.getDataRange().getValues()
  const alreadyArchived = values.some(
    (row, index) => index > 0 && String(row[2] || '').trim() === booking.bookingId,
  )

  if (alreadyArchived) {
    return
  }

  historySheet.appendRow([
    `HIS-${Date.now()}`,
    booking.patientId || '',
    booking.bookingId,
    booking.patientName || '',
    normalizePhone(booking.phone),
    booking.treatment || '',
    booking.branch || '',
    booking.date || '',
    booking.timeSlot || '',
    new Date(),
    booking.source || '',
    booking.concern || '',
  ])
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

function formatSheetTimestamp(value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss')
  }

  return String(value || '').trim()
}

function toHexSignature(bytes) {
  return bytes
    .map((byte) => {
      const normalizedByte = byte < 0 ? byte + 256 : byte

      return (`0${normalizedByte.toString(16)}`).slice(-2)
    })
    .join('')
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').trim()
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
