import * as z from 'zod'

export const mailSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: 'mail_name_required' })
    .max(100, { error: 'mail_name_required' }),
  email: z.email({ error: 'mail_email_invalid' }),
  subject: z
    .string()
    .trim()
    .min(1, { error: 'mail_subject_required' })
    .max(200, { error: 'mail_subject_required' }),
  content: z
    .string()
    .trim()
    .min(1, { error: 'mail_content_required' })
    .max(5000, { error: 'mail_content_required' }),
  website: z.string().max(0),
})

export type SendMailInput = z.infer<typeof mailSchema>
