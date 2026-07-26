import crypto from 'node:crypto'
import { getDatabase } from '@netlify/database'

export const ACTIVE_STATUSES = new Set(['booked', 'visited', 'in treatment'])
export const COMPLETED_STATUS = 'Treatment Complete'
export const ADMIN_SESSION_DURATION_MS = 8 * 60 * 60 * 1000
export const CONSULTATION_FEE_AMOUNT = 350
export const ONLINE_CONSULTATION_FEE_AMOUNT = 300
export const BENGALURU_CONSULTATION_FEE_AMOUNT = 500
export const BENGALURU_ONLINE_CONSULTATION_FEE_AMOUNT = 450

export const isBengaluruBranch = (branch = '') => {
  const branchName = String(branch).toLowerCase()

  return branchName.includes('bengaluru') || branchName.includes('bangalore')
}

export const getConsultationFeesForBranch = (branch) => {
  if (isBengaluruBranch(branch)) {
    return {
      payAtClinic: BENGALURU_CONSULTATION_FEE_AMOUNT,
      online: BENGALURU_ONLINE_CONSULTATION_FEE_AMOUNT,
    }
  }

  return {
    payAtClinic: CONSULTATION_FEE_AMOUNT,
    online: ONLINE_CONSULTATION_FEE_AMOUNT,
  }
}

let schemaReadyPromise

export const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

export const parseJsonBody = (event) => {
  try {
    return event.body ? JSON.parse(event.body) : {}
  } catch {
    return null
  }
}

export const normalizePhone = (phone) => String(phone || '').replace(/\D/g, '').slice(-10)

export const toDateValue = (value) => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value.slice(0, 10)
  }

  return new Date(value).toISOString().slice(0, 10)
}

export const toTimestampValue = (value) => {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

export const getPool = () => getDatabase().pool

export const query = async (sql, params = []) => {
  const pool = getPool()
  const result = await pool.query(sql, params)

  await pool.end()

  return result
}

export const ensureSchema = async () => {
  if (schemaReadyPromise) {
    return schemaReadyPromise
  }

  schemaReadyPromise = (async () => {
    await query(`
      CREATE TABLE IF NOT EXISTS admin_sessions (
        token TEXT PRIMARY KEY,
        branch TEXT NOT NULL DEFAULT '',
        role TEXT NOT NULL DEFAULT 'branch',
        expires_at TIMESTAMPTZ NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS patients (
        patient_id TEXT PRIMARY KEY,
        patient_name TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL DEFAULT '',
        first_visit_date DATE,
        last_visit_date DATE,
        total_visits INTEGER NOT NULL DEFAULT 0,
        active_treatment TEXT NOT NULL DEFAULT '',
        current_status TEXT NOT NULL DEFAULT 'Booked',
        last_branch TEXT NOT NULL DEFAULT '',
        notes TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS bookings (
        booking_id TEXT PRIMARY KEY,
        patient_id TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        source TEXT NOT NULL DEFAULT 'Apple International Dental website',
        branch TEXT NOT NULL,
        appointment_date DATE NOT NULL,
        time_slot TEXT NOT NULL,
        treatment TEXT NOT NULL DEFAULT '',
        patient_name TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        referred_by TEXT NOT NULL DEFAULT '',
        concern TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'Booked',
        payment_method TEXT NOT NULL DEFAULT '',
        payment_status TEXT NOT NULL DEFAULT '',
        payment_amount NUMERIC(10,2),
        payment_id TEXT NOT NULL DEFAULT '',
        payment_order_id TEXT NOT NULL DEFAULT '',
        payment_signature TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS bookings_branch_date_idx
        ON bookings (branch, appointment_date);
      CREATE INDEX IF NOT EXISTS bookings_phone_idx
        ON bookings (phone);

      CREATE TABLE IF NOT EXISTS treatment_history (
        history_id TEXT PRIMARY KEY,
        patient_id TEXT NOT NULL DEFAULT '',
        booking_id TEXT NOT NULL UNIQUE,
        patient_name TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        treatment TEXT NOT NULL DEFAULT '',
        branch TEXT NOT NULL DEFAULT '',
        appointment_date DATE,
        time_slot TEXT NOT NULL DEFAULT '',
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        source TEXT NOT NULL DEFAULT '',
        final_notes TEXT NOT NULL DEFAULT ''
      );

      CREATE TABLE IF NOT EXISTS support_chats (
        chat_id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        branch TEXT NOT NULL,
        name TEXT NOT NULL DEFAULT '',
        phone TEXT NOT NULL DEFAULT '',
        email TEXT NOT NULL DEFAULT '',
        status TEXT NOT NULL DEFAULT 'Open'
      );

      CREATE TABLE IF NOT EXISTS support_messages (
        message_id TEXT PRIMARY KEY,
        chat_id TEXT NOT NULL REFERENCES support_chats(chat_id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        sender TEXT NOT NULL,
        message TEXT NOT NULL DEFAULT ''
      );

      CREATE INDEX IF NOT EXISTS support_messages_chat_idx
        ON support_messages (chat_id, created_at);
    `)
  })()

  return schemaReadyPromise
}

export const createId = (prefix) => `${prefix}-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`

export const mapBookingRow = (row) => ({
  timestamp: toTimestampValue(row.created_at),
  source: row.source || '',
  branch: row.branch || '',
  date: toDateValue(row.appointment_date),
  timeSlot: row.time_slot || '',
  treatment: row.treatment || '',
  patientName: row.patient_name || '',
  phone: row.phone || '',
  email: row.email || '',
  referredBy: row.referred_by || '',
  concern: row.concern || '',
  status: row.status || 'Booked',
  bookingId: row.booking_id || '',
  patientId: row.patient_id || '',
  paymentMethod: row.payment_method || '',
  paymentStatus: row.payment_status || '',
  paymentAmount: row.payment_amount == null ? '' : String(Number(row.payment_amount)),
  paymentId: row.payment_id || '',
  paymentOrderId: row.payment_order_id || '',
})

export const mapPatientRow = (row) => ({
  patientId: row.patient_id || '',
  patientName: row.patient_name || '',
  phone: row.phone || '',
  email: row.email || '',
  firstVisitDate: toDateValue(row.first_visit_date),
  lastVisitDate: toDateValue(row.last_visit_date),
  totalVisits: Number(row.total_visits || 0),
  activeTreatment: row.active_treatment || '',
  currentStatus: row.current_status || '',
  lastBranch: row.last_branch || '',
  notes: row.notes || '',
})

export const mapHistoryRow = (row) => ({
  historyId: row.history_id || '',
  patientId: row.patient_id || '',
  bookingId: row.booking_id || '',
  patientName: row.patient_name || '',
  phone: row.phone || '',
  treatment: row.treatment || '',
  branch: row.branch || '',
  date: toDateValue(row.appointment_date),
  timeSlot: row.time_slot || '',
  completedDate: toTimestampValue(row.completed_at),
  source: row.source || '',
  finalNotes: row.final_notes || '',
})

export const mapSupportChatRow = (row, messages = []) => ({
  chatId: row.chat_id || '',
  createdAt: toTimestampValue(row.created_at),
  updatedAt: toTimestampValue(row.updated_at),
  branch: row.branch || '',
  name: row.name || '',
  phone: row.phone || '',
  email: row.email || '',
  status: row.status || 'Open',
  messages,
})

export const mapSupportMessageRow = (row) => ({
  messageId: row.message_id || '',
  chatId: row.chat_id || '',
  createdAt: toTimestampValue(row.created_at),
  sender: row.sender || '',
  message: row.message || '',
})

export const getSession = async (token) => {
  if (!token) {
    return null
  }

  const result = await query(
    `SELECT token, branch, role, expires_at
       FROM admin_sessions
      WHERE token = $1 AND expires_at > NOW()`,
    [token],
  )

  return result.rows[0] || null
}

export const getBranchFilter = (session, requestedBranch = '') =>
  session?.role === 'super' ? String(requestedBranch || '').trim() : session?.branch || ''

export const requireSession = async (token) => {
  const session = await getSession(token)

  if (!session) {
    throw new Error('Admin session expired. Please log in again.')
  }

  return session
}

export const upsertPatient = async (booking) => {
  const phone = normalizePhone(booking.phone)

  if (!phone) {
    return booking.patientId || ''
  }

  const existingResult = await query('SELECT * FROM patients WHERE phone = $1', [phone])
  const existing = existingResult.rows[0]
  const patientId = booking.patientId || existing?.patient_id || createId('PAT')
  const visitsResult = await query('SELECT COUNT(*)::int AS total FROM bookings WHERE phone = $1', [phone])
  const existingVisits = Number(visitsResult.rows[0]?.total || 0)
  const totalVisits = Math.max(1, existingVisits + (booking.bookingId && !booking.persisted ? 1 : 0))
  const status = booking.status || 'Booked'

  await query(
    `INSERT INTO patients (
      patient_id, patient_name, phone, email, first_visit_date, last_visit_date, total_visits,
      active_treatment, current_status, last_branch, notes, updated_at
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,NOW())
    ON CONFLICT (phone) DO UPDATE SET
      patient_name = COALESCE(NULLIF(EXCLUDED.patient_name, ''), patients.patient_name),
      email = COALESCE(NULLIF(EXCLUDED.email, ''), patients.email),
      first_visit_date = COALESCE(patients.first_visit_date, EXCLUDED.first_visit_date),
      last_visit_date = EXCLUDED.last_visit_date,
      total_visits = EXCLUDED.total_visits,
      active_treatment = EXCLUDED.active_treatment,
      current_status = EXCLUDED.current_status,
      last_branch = EXCLUDED.last_branch,
      notes = COALESCE(NULLIF(EXCLUDED.notes, ''), patients.notes),
      updated_at = NOW()`,
    [
      patientId,
      booking.patientName || '',
      phone,
      booking.email || '',
      booking.date || null,
      booking.date || null,
      totalVisits,
      status === COMPLETED_STATUS ? '' : booking.treatment || '',
      status,
      booking.branch || '',
      booking.notes || booking.concern || '',
    ],
  )

  return patientId
}

export const archiveCompletedTreatment = async (booking) => {
  if (!booking.bookingId) {
    return
  }

  await query(
    `INSERT INTO treatment_history (
      history_id, patient_id, booking_id, patient_name, phone, treatment, branch,
      appointment_date, time_slot, completed_at, source, final_notes
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW(),$10,$11)
    ON CONFLICT (booking_id) DO NOTHING`,
    [
      createId('HIS'),
      booking.patientId || '',
      booking.bookingId,
      booking.patientName || '',
      normalizePhone(booking.phone),
      booking.treatment || '',
      booking.branch || '',
      booking.date || null,
      booking.timeSlot || '',
      booking.source || '',
      booking.concern || booking.notes || '',
    ],
  )
}
