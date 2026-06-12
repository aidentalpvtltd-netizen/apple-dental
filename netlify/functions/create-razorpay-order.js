/* global process */

import { Buffer } from 'node:buffer'

const CONSULTATION_FEE_SUBUNITS = 30000

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

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    return jsonResponse(500, { ok: false, message: 'Razorpay keys are not configured.' })
  }

  const payload = parseBody(event)

  if (!payload) {
    return jsonResponse(400, { ok: false, message: 'Invalid payment request.' })
  }

  const amount = Number(payload.amount || CONSULTATION_FEE_SUBUNITS)

  if (amount !== CONSULTATION_FEE_SUBUNITS) {
    return jsonResponse(400, { ok: false, message: 'Invalid consultation fee amount.' })
  }

  const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64')
  const receipt = `AID-CONSULT-${Date.now()}`

  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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
    })

    const result = await response.json().catch(() => null)

    if (!response.ok) {
      return jsonResponse(response.status, {
        ok: false,
        message: result?.error?.description || 'Unable to create payment order.',
      })
    }

    return jsonResponse(200, {
      ok: true,
      keyId,
      orderId: result.id,
      amount: result.amount,
      currency: result.currency,
    })
  } catch {
    return jsonResponse(502, { ok: false, message: 'Unable to reach Razorpay right now.' })
  }
}
