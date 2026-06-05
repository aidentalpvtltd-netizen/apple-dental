/* global process */

import crypto from 'node:crypto'

const jsonResponse = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
})

const parseBody = (event) => {
  try {
    return event.body ? JSON.parse(event.body) : {}
  } catch {
    return null
  }
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, message: 'Method not allowed.' })
  }

  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keySecret) {
    return jsonResponse(500, { ok: false, message: 'Razorpay secret is not configured.' })
  }

  const payload = parseBody(event)

  if (!payload) {
    return jsonResponse(400, { ok: false, message: 'Invalid payment verification request.' })
  }

  const orderId = String(payload.orderId || '').trim()
  const paymentId = String(payload.paymentId || '').trim()
  const signature = String(payload.signature || '').trim()

  if (!orderId || !paymentId || !signature) {
    return jsonResponse(400, { ok: false, message: 'Payment verification details are missing.' })
  }

  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex')

  if (expectedSignature !== signature) {
    return jsonResponse(400, { ok: false, message: 'Payment verification failed.' })
  }

  return jsonResponse(200, { ok: true })
}
