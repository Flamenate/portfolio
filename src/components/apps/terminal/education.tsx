import { format } from 'date-fns'
import { resume } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'
import { datefnsLocales } from '@/stores/theme.store'
import localize from '@/utils/localize'

export const Education: Command = ({ snapshot }) => {
  const education = resume.education
  return (
    <table>
      <caption className="mt-1 caption-bottom">
        <span className="border p-1">
          {/* TODO: Add this key */}
          {localize('terminal_education_caption', snapshot.locale)}
        </span>
      </caption>
      <thead>
        <tr className="[&>th]:px-2">
          <th>{localize('terminal_education_institution', snapshot.locale)}</th>
          <th>{localize('terminal_project_date', snapshot.locale)}</th>
          <th>{localize('terminal_education_notes', snapshot.locale)}</th>
          <th>{localize('terminal_education_degree', snapshot.locale)}</th>
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
                locale:
                  datefnsLocales[
                    snapshot.locale as keyof typeof datefnsLocales
                  ],
              })}{' '}
              -{' '}
              {format(entry.end, 'MMM yyyy', {
                locale:
                  datefnsLocales[
                    snapshot.locale as keyof typeof datefnsLocales
                  ],
              })}
            </td>
            <td>{entry.notes && localize(entry.notes, snapshot.locale)}</td>
            <td>{localize(entry.degree, snapshot.locale)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
