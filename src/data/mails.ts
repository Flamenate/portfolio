export type MailFolder = 'inbox' | 'junk' | 'drafts' | 'sent_items' | 'archive'

export const mailFolders: MailFolder[] = [
  'inbox',
  'junk',
  'drafts',
  'sent_items',
  'archive',
]

export type Mail = {
  id: string
  folder: MailFolder
  sender: string
  senderEmail: string
  subject: string
  date: Date
  body: string[]
}

export const mails: Mail[] = [
  {
    id: 'inbox-recruiter',
    folder: 'inbox',
    sender: 'Sarah Mitchell',
    senderEmail: 'sarah.mitchell@talentbridge.io',
    subject: 'Full-stack role: loved your portfolio',
    date: new Date('2026-11-14T09:12:00'),
    body: [
      'Hi Haythem, I came across your portfolio and the desktop-style UI genuinely made me stop scrolling.',
      "We're hiring a full-stack developer (React + Node.js) for a remote-first product team. Your experience leading the Dink USA project lines up really well with what we need.",
      'Would you be open to a quick 20-minute call next week?',
      'Best,\nSarah',
    ],
  },
  {
    id: 'inbox-feedback',
    folder: 'inbox',
    sender: 'Youssef Ben Ali',
    senderEmail: 'youssef.benali@gmail.com',
    subject: 'The terminal app is wild',
    date: new Date('2026-11-12T21:47:00'),
    body: [
      'Bro, I spent way too long typing commands into your terminal. The fortune command got me.',
      'Small bug though: I tried to close the terminal from inside the terminal and it actually worked. Feature or bug?',
      'Either way, great work.',
    ],
  },
  {
    id: 'inbox-mtc',
    folder: 'inbox',
    sender: 'Microsoft Tech Club',
    senderEmail: 'contact@mtc-enis.tn',
    subject: 'Workshop speakers needed for December',
    date: new Date('2026-11-10T14:05:00'),
    body: [
      "Hello Haythem, we're putting together the December workshop series and would love for you to run a session on TanStack Start.",
      'Around 40 students signed up last time, so expect a full room. Let us know which dates work for you.',
    ],
  },
  {
    id: 'inbox-enib',
    folder: 'inbox',
    sender: 'ENIB Admissions',
    senderEmail: 'admissions@enib.fr',
    subject: 'Welcome to ENIB: practical information',
    date: new Date('2026-08-28T10:30:00'),
    body: [
      'Dear student, welcome to the École Nationale d’Ingénieurs de Brest.',
      'Please find attached your schedule for the first week, your student card instructions, and a map of the campus. Remember to bring a raincoat. This is Brest.',
    ],
  },
  {
    id: 'junk-prince',
    folder: 'junk',
    sender: 'Prince Adebayo',
    senderEmail: 'prince.adebayo@royal-funds.biz',
    subject: 'URGENT: $45,000,000 inheritance awaiting you',
    date: new Date('2026-11-13T03:14:00'),
    body: [
      'DEAREST BELOVED FRIEND, I am contacting you with utmost confidence regarding a large sum of money left by my late uncle.',
      'All I require is your bank details, your mother’s maiden name, and a small processing fee of $499. God bless.',
    ],
  },
  {
    id: 'junk-seo',
    folder: 'junk',
    sender: 'SEO Wizards',
    senderEmail: 'growth@seo-wizards-247.net',
    subject: 'Your website is NOT ranking on Google!!!',
    date: new Date('2026-11-11T08:00:00'),
    body: [
      'Hi Webmaster, we noticed your website is not on the first page of Google for "best portfolio in the universe".',
      'For only $9.99/month we will fix this with 100% guaranteed white-hat techniques (we promise).',
    ],
  },
  {
    id: 'junk-crypto',
    folder: 'junk',
    sender: 'CryptoMoon Daily',
    senderEmail: 'alerts@cryptomoon.xyz',
    subject: '🚀 This coin will 1000x by Friday',
    date: new Date('2026-11-09T19:20:00'),
    body: [
      'Insiders are buying $DOGEPEPE before it lists on every exchange. Do not miss your chance to retire next week.',
      'Not financial advice. Definitely financial advice.',
    ],
  },
  {
    id: 'drafts-center-div',
    folder: 'drafts',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Re: Can you center this div?',
    date: new Date('2026-11-14T23:58:00'),
    body: [
      'Hi, yes I can center the div. I have been centering divs for years. I just need to know: horizontally, vertically, or emotionally?',
      '(unfinished)',
    ],
  },
  {
    id: 'drafts-blog',
    folder: 'drafts',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Blog post idea: building a fake OS in React',
    date: new Date('2026-11-08T17:42:00'),
    body: [
      'Outline: window manager with zustand, lazy-loaded apps, container queries so every app is responsive inside its own window...',
      'TODO: write the actual post. TODO: stop adding features to the portfolio first.',
    ],
  },
  {
    id: 'drafts-thanks',
    folder: 'drafts',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Thank you',
    date: new Date('2026-10-30T12:00:00'),
    body: ['Dear'],
  },
  {
    id: 'sent-recruiter',
    folder: 'sent_items',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Re: Full-stack role: loved your portfolio',
    date: new Date('2026-11-14T11:03:00'),
    body: [
      'Hi Sarah, thank you, that means a lot! I’d be happy to chat.',
      'I’m available Tuesday or Thursday afternoon (CET). Feel free to send an invite whenever works for you.',
      'Best,\nHaythem',
    ],
  },
  {
    id: 'sent-youssef',
    folder: 'sent_items',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Re: The terminal app is wild',
    date: new Date('2026-11-13T09:15:00'),
    body: [
      'Feature. Definitely a feature. I meant to do that.',
      'Glad you liked fortune, there are a few more hidden in there.',
    ],
  },
  {
    id: 'sent-mtc',
    folder: 'sent_items',
    sender: 'Haythem Frikha',
    senderEmail: 'haythem.frikha@outlook.com',
    subject: 'Re: Workshop speakers needed for December',
    date: new Date('2026-11-10T18:22:00'),
    body: [
      'Count me in! December 12th or 19th both work. I’ll prepare a hands-on session where everyone builds a small full-stack app with server functions.',
    ],
  },
  {
    id: 'archive-dink',
    folder: 'archive',
    sender: 'Dink USA',
    senderEmail: 'team@dinkusa.com',
    subject: 'Thank you for everything',
    date: new Date('2025-05-02T16:00:00'),
    body: [
      'Haythem, thanks for leading the engineering work over the past months. The Shopify integration and the new storefront made a real difference.',
      'Wishing you the best for what comes next.',
    ],
  },
  {
    id: 'archive-efset',
    folder: 'archive',
    sender: 'EF SET',
    senderEmail: 'no-reply@efset.org',
    subject: 'Your EF SET certificate is ready',
    date: new Date('2022-08-15T08:30:00'),
    body: [
      'Congratulations! Your EF SET English Certificate is now available.',
      'You can share it on LinkedIn or download it as a PDF from your account.',
    ],
  },
  {
    id: 'archive-azure',
    folder: 'archive',
    sender: 'Microsoft Learn',
    senderEmail: 'learn@microsoft.com',
    subject: 'You earned Azure AI Fundamentals (AI-900)',
    date: new Date('2024-10-05T12:45:00'),
    body: [
      'Congratulations on earning your Microsoft Certified: Azure AI Fundamentals certification.',
      'Your badge is now available in your Microsoft Learn profile.',
    ],
  },
]

export function getMails(folder: MailFolder, extra: Mail[] = []) {
  return [...mails, ...extra]
    .filter((mail) => mail.folder === folder)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
}
