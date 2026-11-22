import { resume } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'

export const educationCommand: Command = ({ locale }) => {
  const education = resume.education
  return (
    <table>
      <caption className="mt-1 caption-bottom">
        <span className="border p-1">
          {locale.text('terminal_education_caption')}
        </span>
      </caption>
      <thead>
        <tr className="[&>th]:px-2">
          <th>{locale.text('terminal_education_institution')}</th>
          <th>{locale.text('terminal_project_date')}</th>
          <th>{locale.text('terminal_education_notes')}</th>
          <th>{locale.text('terminal_education_degree')}</th>
        </tr>
      </thead>
      <tbody>
        {education.map((entry) => (
          <tr
            key={entry.degree + entry.institution}
            className="align-top [&>td]:px-2 [&>td]:py-1"
          >
            <td>{entry.institution}</td>
            <td>
              {locale.date(entry.start, 'MMM yyyy')} -{' '}
              {locale.date(entry.end, 'MMM yyyy')}
            </td>
            <td>{entry.notes && locale.text(entry.notes)}</td>
            <td>{locale.text(entry.degree)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
