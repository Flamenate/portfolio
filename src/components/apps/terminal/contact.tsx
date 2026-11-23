import { resume } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'

function shortUrl(url: string) {
  return url.replace(/^https?:\/\/(?:www\.)?/, '')
}

export const contactCommand: Command = () => {
  const { name, contact } = resume
  return (
    <p className="[&>a]:underline">
      &gt; Full Name: {name}
      <br />
      &gt; Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
      <br />
      &gt; Phone/Whatsapp: <a href={`tel:${contact.phone}`}>{contact.phone}</a>
      <br />
      {Object.entries(contact.links).map(([key, link]) => (
        <span key={key}>
          &gt; {link.label}: <a href={link.url}>{shortUrl(link.url)}</a>
          <br />
        </span>
      ))}
    </p>
  )
}
