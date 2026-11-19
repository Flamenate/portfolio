import { format } from 'date-fns'
import { resume } from '@/data/personal'
import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import { datefnsLocales } from '@/stores/theme.store'

export const educationCommand: Command = ({ locale }) => {
  const education = resume.education
  return (
    <table>
      <caption className="mt-1 caption-bottom">
        <span className="border p-1">
          {localize('terminal_education_caption', locale)}
        </span>
      </caption>
      <thead>
        <tr className="[&>th]:px-2">
          <th>{localize('terminal_education_institution', locale)}</th>
          <th>{localize('terminal_project_date', locale)}</th>
          <th>{localize('terminal_education_notes', locale)}</th>
          <th>{localize('terminal_education_degree', locale)}</th>
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
              {format(entry.start, 'MMM yyyy', {
                locale: datefnsLocales[locale],
              })}{' '}
              -{' '}
              {format(entry.end, 'MMM yyyy', {
                locale: datefnsLocales[locale],
              })}
            </td>
            <td>{entry.notes && localize(entry.notes, locale)}</td>
            <td>{localize(entry.degree, locale)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
