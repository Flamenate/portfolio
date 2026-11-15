import { createHmac, timingSafeEqual } from 'node:crypto'
import { createServerFn } from '@tanstack/react-start'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { env } from '@/env'
import { mailSchema } from '@/lib/mail-schema'
import { resume } from '@/lib/personal'

export const MAIL_LIMIT = 5
const COOKIE_NAME = 'mail_count'

export type { SendMailInput } from '@/lib/mail-schema'
export type SendMailResult = { ok: true } | { ok: false; reason: 'limit' }

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('base64url')
}

function readCount(secret: string) {
  const cookie = getCookie(COOKIE_NAME)
  if (!cookie) return 0
  const [count, signature] = cookie.split('.')
  if (!count || !signature || !/^\d+$/.test(count)) return MAIL_LIMIT
  const expected = Buffer.from(sign(count, secret))
  const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual))
    return MAIL_LIMIT
  return Number(count)
}

export const sendMail = createServerFn({ method: 'POST' })
  .validator(mailSchema)
  .handler(async ({ data }): Promise<SendMailResult> => {
    const apiKey = env.RESEND_API_KEY
    const secret = env.SESSION_SECRET
    if (!apiKey || !secret || secret.length < 32) {
      console.error(
        `[sendMail] not configured: RESEND_API_KEY ${apiKey ? 'set' : 'missing'}, SESSION_SECRET ${secret ? `${secret.length} chars` : 'missing'}`,
      )
      throw new Error('Mail is not configured')
    }

    const count = readCount(secret)
    if (count >= MAIL_LIMIT) return { ok: false, reason: 'limit' }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.MAIL_FROM,
        to: resume.contact.email,
        reply_to: `${data.name} <${data.email}>`,
        subject: `[Portfolio] ${data.subject}`,
        text: `From: ${data.name} <${data.email}>\n\n${data.content}`,
      }),
    }).catch((error: unknown) => {
      console.error('[sendMail] request to Resend failed:', error)
      throw new Error('Failed to send mail')
    })
    if (!response.ok) {
      console.error(
        `[sendMail] Resend responded ${response.status}: ${await response.text()}`,
      )
      throw new Error('Failed to send mail')
    }

    const next = String(count + 1)
    setCookie(COOKIE_NAME, `${next}.${sign(next, secret)}`, {
      httpOnly: true,
      sameSite: 'lax',
      secure: env.VITE_NODE_ENV === 'production',
      path: '/',
    })
    return { ok: true }
  })
