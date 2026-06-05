/* global process */

import crypto from 'node:crypto'
import {
  ACTIVE_STATUSES,
  ADMIN_SESSION_DURATION_MS,
  COMPLETED_STATUS,
  CONSULTATION_FEE_AMOUNT,
  ONLINE_CONSULTATION_FEE_AMOUNT,
  archiveCompletedTreatment,
  createId,
  ensureSchema,
  getBranchFilter,
  jsonResponse,
  mapBookingRow,
  mapHistoryRow,
  mapPatientRow,
  mapSupportChatRow,
  mapSupportMessageRow,
  normalizePhone,
  parseJsonBody,
  query,
  requireSession,
  toDateValue,
  upsertPatient,
} from './_database.js'

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

const jsonError = (statusCode, message) => jsonResponse(statusCode, { ok: false, message })

const normalizeStatus = (status) => String(status || 'Booked').trim() || 'Booked'

const getActiveStatusValues = () => Array.from(ACTIVE_STATUSES)

const createSessionToken = () => crypto.randomBytes(24).toString('hex')

const getPayload = (event) => {
  if (event.httpMethod === 'GET') {
    return Object.fromEntries(new URLSearchParams(event.rawQuery || ''))
  }

  return parseJsonBody(event)
}

const handleAvailability = async (payload) => {
  const branch = String(payload.branch || '').trim()
  const date = String(payload.date || '').trim()

  if (!branch || !date) {
    return jsonResponse(200, { ok: true, bookedSlots: [] })
  }

  const result = await query(
    `SELECT time_slot
       FROM bookings
      WHERE branch = $1
        AND appointment_date = $2
        AND LOWER(status) = ANY($3::text[])`,
    [branch, date, getActiveStatusValues()],
  )

  return jsonResponse(200, {
    ok: true,
    bookedSlots: result.rows
      .map((row) => row.time_slot)
      .filter((slot) => APPOINTMENT_SLOTS.includes(slot)),
  })
}

const handleAvailabilityRange = async (payload) => {
  const branch = String(payload.branch || '').trim()
  const startDate = String(payload.startDate || '').trim()
  const days = Math.max(1, Math.min(30, Number(payload.days || 8)))

  if (!branch || !startDate) {
    return jsonResponse(200, { ok: true, days: [] })
  }

  const endDate = new Date(startDate)
  endDate.setDate(endDate.getDate() + days - 1)

  const result = await query(
    `SELECT appointment_date, time_slot
       FROM bookings
      WHERE branch = $1
        AND appointment_date BETWEEN $2 AND $3
        AND LOWER(status) = ANY($4::text[])`,
    [branch, startDate, toDateValue(endDate), getActiveStatusValues()],
  )
  const slotsByDate = new Map()

  result.rows.forEach((row) => {
    const date = toDateValue(row.appointment_date)
    const slots = slotsByDate.get(date) || []
    slots.push(row.time_slot)
    slotsByDate.set(date, slots)
  })

  const responseDays = Array.from({ length: days }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + index)
    const value = toDateValue(date)

    return {
      date: value,
      bookedSlots: slotsByDate.get(value) || [],
    }
  })

  return jsonResponse(200, { ok: true, days: responseDays })
}

const createBooking = async (payload) => {
  const branch = String(payload.branch || '').trim()
  const date = String(payload.date || '').trim()
  const timeSlot = String(payload.timeSlot || '').trim()
  const treatment = String(payload.treatmentName || payload.treatment || '').trim()
  const patientName = String(payload.name || payload.patientName || '').trim()
  const phone = normalizePhone(payload.phone)

  if (!branch || !date || !timeSlot || !patientName || !phone) {
    throw new Error('Patient name, phone, branch, date, and time slot are required.')
  }

  const duplicateResult = await query(
    `SELECT booking_id
       FROM bookings
      WHERE branch = $1
        AND appointment_date = $2
        AND time_slot = $3
        AND LOWER(status) = ANY($4::text[])
      LIMIT 1`,
    [branch, date, timeSlot, getActiveStatusValues()],
  )

  if (duplicateResult.rows.length) {
    throw new Error('This slot was just booked. Please choose another available time.')
  }

  const bookingId = createId('AID')
  const status = normalizeStatus(payload.status)
  const paymentMethod = String(payload.paymentMethod || 'Pay at clinic').trim()
  const paymentStatus =
    String(payload.paymentStatus || '').trim() ||
    (paymentMethod.toLowerCase().includes('online') ? 'Paid online' : 'Payment due at clinic')
  const paymentAmount =
    payload.paymentAmount || (paymentMethod.toLowerCase().includes('online')
      ? ONLINE_CONSULTATION_FEE_AMOUNT
      : CONSULTATION_FEE_AMOUNT)
  const patientId = await upsertPatient({
    bookingId,
    patientName,
    phone,
    email: payload.email || '',
    date,
    treatment,
    branch,
    status,
    notes: payload.concern || '',
  })

  await query(
    `INSERT INTO bookings (
      booking_id, patient_id, source, branch, appointment_date, time_slot, treatment,
      patient_name, phone, email, referred_by, concern, status, payment_method,
      payment_status, payment_amount, payment_id, payment_order_id, payment_signature
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
    [
      bookingId,
      patientId,
      payload.source || 'Apple International Dental website',
      branch,
      date,
      timeSlot,
      treatment,
      patientName,
      phone,
      payload.email || '',
      payload.referredBy || '',
      payload.concern || '',
      status,
      paymentMethod,
      paymentStatus,
      Number(paymentAmount || 0),
      payload.paymentId || '',
      payload.paymentOrderId || '',
      payload.paymentSignature || '',
    ],
  )

  await upsertPatient({
    bookingId,
    patientId,
    patientName,
    phone,
    email: payload.email || '',
    date,
    treatment,
    branch,
    status,
    notes: payload.concern || '',
    persisted: true,
  })

  return { bookingId, patientId }
}

const handleAdminLogin = async (payload) => {
  const role = payload.role === 'super' ? 'super' : 'branch'
  const expectedPassword =
    role === 'super' ? process.env.SUPER_ADMIN_PASSWORD : process.env.ADMIN_PASSWORD

  if (!expectedPassword) {
    return jsonError(500, `${role === 'super' ? 'Super admin' : 'Admin'} password is not configured.`)
  }

  if (String(payload.password || '') !== expectedPassword) {
    return jsonError(401, 'Incorrect admin password.')
  }

  const branch = role === 'super' ? '' : String(payload.branch || '').trim()
  const token = createSessionToken()
  const expiresAt = new Date(Date.now() + ADMIN_SESSION_DURATION_MS)

  await query(
    `INSERT INTO admin_sessions (token, branch, role, expires_at)
     VALUES ($1,$2,$3,$4)`,
    [token, branch, role, expiresAt],
  )

  return jsonResponse(200, {
    ok: true,
    token,
    branch,
    role,
    expiresAt: expiresAt.getTime(),
  })
}

const handleAdminBookings = async (payload) => {
  const session = await requireSession(payload.token)
  const startDate = String(payload.startDate || '').trim()
  const endDate = String(payload.endDate || '').trim()
  const branchFilter = getBranchFilter(session, payload.branch)
  const statusFilter = String(payload.status || '').trim().toLowerCase()
  const treatmentFilter = String(payload.treatment || '').trim()
  const params = []
  const where = ['1=1']

  if (startDate) {
    params.push(startDate)
    where.push(`appointment_date >= $${params.length}`)
  }

  if (endDate) {
    params.push(endDate)
    where.push(`appointment_date <= $${params.length}`)
  }

  if (branchFilter) {
    params.push(branchFilter)
    where.push(`branch = $${params.length}`)
  }

  if (statusFilter) {
    params.push(statusFilter)
    where.push(`LOWER(status) = $${params.length}`)
  }

  if (treatmentFilter) {
    params.push(treatmentFilter)
    where.push(`treatment = $${params.length}`)
  }

  const result = await query(
    `SELECT *
       FROM bookings
      WHERE ${where.join(' AND ')}
      ORDER BY appointment_date ASC, time_slot ASC, created_at ASC`,
    params,
  )

  return jsonResponse(200, { ok: true, bookings: result.rows.map(mapBookingRow) })
}

const handleAdminPatients = async (payload) => {
  const session = await requireSession(payload.token)
  const branchFilter = getBranchFilter(session, payload.branch)
  const params = []
  const where = ['phone <> \'\'']

  if (branchFilter) {
    params.push(branchFilter)
    where.push(`last_branch = $${params.length}`)
  }

  const result = await query(
    `SELECT *
       FROM patients
      WHERE ${where.join(' AND ')}
      ORDER BY last_visit_date DESC NULLS LAST, updated_at DESC`,
    params,
  )

  return jsonResponse(200, { ok: true, patients: result.rows.map(mapPatientRow) })
}

const handleAdminHistory = async (payload) => {
  const session = await requireSession(payload.token)
  const branchFilter = getBranchFilter(session, payload.branch)
  const params = []
  const where = ['1=1']

  if (branchFilter) {
    params.push(branchFilter)
    where.push(`branch = $${params.length}`)
  }

  const result = await query(
    `SELECT *
       FROM treatment_history
      WHERE ${where.join(' AND ')}
      ORDER BY completed_at DESC`,
    params,
  )

  return jsonResponse(200, { ok: true, history: result.rows.map(mapHistoryRow) })
}

const handleAdminUpdateBooking = async (payload) => {
  const session = await requireSession(payload.token)
  const bookingId = String(payload.bookingId || '').trim()
  const status = normalizeStatus(payload.status)

  if (!bookingId || !status) {
    return jsonError(400, 'Booking ID and status are required.')
  }

  const existingResult = await query('SELECT * FROM bookings WHERE booking_id = $1', [bookingId])
  const existing = existingResult.rows[0]

  if (!existing) {
    return jsonError(404, 'Booking not found.')
  }

  if (session.role !== 'super' && existing.branch !== session.branch) {
    return jsonError(403, 'This booking belongs to another branch.')
  }

  const paymentMethod = String(payload.paymentMethod || existing.payment_method || '').trim()
  const paymentStatus = String(payload.paymentStatus || existing.payment_status || '').trim()
  const paymentAmount = payload.paymentAmount || existing.payment_amount
  const notes = String(payload.notes || existing.concern || '').trim()

  await query(
    `UPDATE bookings
        SET status = $1,
            concern = $2,
            payment_method = $3,
            payment_status = $4,
            payment_amount = $5,
            updated_at = NOW()
      WHERE booking_id = $6`,
    [status, notes, paymentMethod, paymentStatus, Number(paymentAmount || 0), bookingId],
  )

  const booking = mapBookingRow({
    ...existing,
    status,
    concern: notes,
    payment_method: paymentMethod,
    payment_status: paymentStatus,
    payment_amount: paymentAmount,
  })

  await upsertPatient({
    ...booking,
    date: booking.date,
    patientName: booking.patientName,
    timeSlot: booking.timeSlot,
    notes,
    persisted: true,
  })

  if (status === COMPLETED_STATUS) {
    await archiveCompletedTreatment({
      ...booking,
      notes,
    })
  }

  return jsonResponse(200, { ok: true })
}

const handleSupportCreateChat = async (payload) => {
  const branch = String(payload.branch || '').trim()
  const name = String(payload.name || '').trim()
  const phone = normalizePhone(payload.phone)
  const email = String(payload.email || '').trim()
  const message = String(payload.message || '').trim()

  if (!branch || !name || !phone || !message) {
    return jsonError(400, 'Name, phone, branch, and message are required.')
  }

  const chatId = createId('CHAT')
  const messageId = createId('MSG')

  await query(
    `INSERT INTO support_chats (chat_id, branch, name, phone, email, status)
     VALUES ($1,$2,$3,$4,$5,'Open')`,
    [chatId, branch, name, phone, email],
  )
  await query(
    `INSERT INTO support_messages (message_id, chat_id, sender, message)
     VALUES ($1,$2,'patient',$3)`,
    [messageId, chatId, message],
  )

  return jsonResponse(200, { ok: true, chatId, branch })
}

const handleSupportSendMessage = async (payload) => {
  const chatId = String(payload.chatId || '').trim()
  const sender = String(payload.sender || 'patient').trim() === 'staff' ? 'staff' : 'patient'
  const message = String(payload.message || '').trim()

  if (!chatId || !message) {
    return jsonError(400, 'Chat ID and message are required.')
  }

  const chatResult = await query('SELECT chat_id FROM support_chats WHERE chat_id = $1', [chatId])

  if (!chatResult.rows.length) {
    return jsonError(404, 'Support chat was not found.')
  }

  await query(
    `INSERT INTO support_messages (message_id, chat_id, sender, message)
     VALUES ($1,$2,$3,$4)`,
    [createId('MSG'), chatId, sender, message],
  )
  await query('UPDATE support_chats SET updated_at = NOW() WHERE chat_id = $1', [chatId])

  return jsonResponse(200, { ok: true })
}

const handleSupportGetChat = async (payload) => {
  const chatId = String(payload.chatId || '').trim()

  if (!chatId) {
    return jsonError(400, 'Chat ID is required.')
  }

  const chatResult = await query('SELECT * FROM support_chats WHERE chat_id = $1', [chatId])
  const chat = chatResult.rows[0]

  if (!chat) {
    return jsonError(404, 'Support chat was not found.')
  }

  const messagesResult = await query(
    `SELECT *
       FROM support_messages
      WHERE chat_id = $1
      ORDER BY created_at ASC`,
    [chatId],
  )

  return jsonResponse(200, {
    ok: true,
    chat: mapSupportChatRow(chat),
    messages: messagesResult.rows.map(mapSupportMessageRow),
  })
}

const handleAdminSupportChats = async (payload) => {
  const session = await requireSession(payload.token)
  const branchFilter = getBranchFilter(session, payload.branch)
  const params = []
  const where = ['1=1']

  if (branchFilter) {
    params.push(branchFilter)
    where.push(`branch = $${params.length}`)
  }

  const chatsResult = await query(
    `SELECT *
       FROM support_chats
      WHERE ${where.join(' AND ')}
      ORDER BY updated_at DESC`,
    params,
  )
  const chatIds = chatsResult.rows.map((chat) => chat.chat_id)

  if (!chatIds.length) {
    return jsonResponse(200, { ok: true, chats: [] })
  }

  const messagesResult = await query(
    `SELECT *
       FROM support_messages
      WHERE chat_id = ANY($1::text[])
      ORDER BY created_at ASC`,
    [chatIds],
  )
  const messagesByChat = new Map()

  messagesResult.rows.forEach((row) => {
    const messages = messagesByChat.get(row.chat_id) || []
    messages.push(mapSupportMessageRow(row))
    messagesByChat.set(row.chat_id, messages)
  })

  return jsonResponse(200, {
    ok: true,
    chats: chatsResult.rows.map((chat) => mapSupportChatRow(chat, messagesByChat.get(chat.chat_id) || [])),
  })
}

const handleAdminSupportSendMessage = async (payload) => {
  const session = await requireSession(payload.token)
  const chatId = String(payload.chatId || '').trim()
  const message = String(payload.message || '').trim()

  if (!chatId || !message) {
    return jsonError(400, 'Chat ID and message are required.')
  }

  const chatResult = await query('SELECT * FROM support_chats WHERE chat_id = $1', [chatId])
  const chat = chatResult.rows[0]

  if (!chat || (session.role !== 'super' && chat.branch !== session.branch)) {
    return jsonError(403, 'This support chat is not assigned to this branch.')
  }

  await query(
    `INSERT INTO support_messages (message_id, chat_id, sender, message)
     VALUES ($1,$2,'staff',$3)`,
    [createId('MSG'), chatId, message],
  )
  await query('UPDATE support_chats SET updated_at = NOW() WHERE chat_id = $1', [chatId])

  return jsonResponse(200, { ok: true })
}

const routePostAction = async (payload) => {
  switch (payload.action) {
    case 'admin-login':
      return handleAdminLogin(payload)
    case 'admin-bookings':
      return handleAdminBookings(payload)
    case 'admin-patients':
      return handleAdminPatients(payload)
    case 'admin-history':
      return handleAdminHistory(payload)
    case 'admin-update-booking':
      return handleAdminUpdateBooking(payload)
    case 'create-booking': {
      const booking = await createBooking(payload)
      return jsonResponse(200, { ok: true, ...booking })
    }
    case 'support-create-chat':
      return handleSupportCreateChat(payload)
    case 'support-send-message':
      return handleSupportSendMessage(payload)
    case 'support-get-chat':
      return handleSupportGetChat(payload)
    case 'admin-support-chats':
      return handleAdminSupportChats(payload)
    case 'admin-support-send-message':
      return handleAdminSupportSendMessage(payload)
    default:
      return jsonError(400, 'Unsupported booking action.')
  }
}

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(204, {})
  }

  if (!['GET', 'POST'].includes(event.httpMethod)) {
    return jsonError(405, 'Method not allowed.')
  }

  const payload = getPayload(event)

  if (!payload) {
    return jsonError(400, 'Invalid request body.')
  }

  try {
    await ensureSchema()

    if (event.httpMethod === 'GET' && payload.action === 'availability') {
      return handleAvailability(payload)
    }

    if (event.httpMethod === 'GET' && payload.action === 'availability-range') {
      return handleAvailabilityRange(payload)
    }

    if (event.httpMethod === 'POST') {
      return routePostAction(payload)
    }

    return jsonError(400, 'Unsupported booking request.')
  } catch (error) {
    return jsonError(500, error.message || 'Unable to reach the booking system.')
  }
}

