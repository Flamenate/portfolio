import { format } from 'date-fns'
import { resume } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'
import { datefnsLocales } from '@/stores/theme.store'
import localize from '@/utils/localize'

export const Experience: Command = ({ args, snapshot }) => {
  const yearInput = parseInt(args[0])
  const year =
    isNaN(yearInput) || yearInput < 2020 || yearInput > new Date().getFullYear()
      ? null
      : yearInput
  const experience = resume.experience
  const filteredExperience = year
    ? experience.filter(
        (project) =>
          project.start.getFullYear() <= year &&
          (project.end ? project.end.getFullYear() >= year : true),
      )
    : experience

  if (filteredExperience.length === 0) {
    return <p>{localize('terminal_no_experience_found', snapshot.locale)}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="mt-1 caption-bottom">
        <span className="border p-0.5">
          {localize('terminal_experience_learn_more', snapshot.locale)}
        </span>
      </caption>
      <thead>
        <tr>
          <th className="px-2">
            {localize('terminal_project_date', snapshot.locale)}
          </th>
          <th className="px-2">
            {localize('terminal_project_title', snapshot.locale)}
          </th>{' '}
          <th className="px-2">
            {localize('terminal_project_tech_stack', snapshot.locale)}
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredExperience.map((exp) => (
          <tr key={exp.role} className="align-top">
            <td className="px-2 py-2">
              {format(exp.start, 'MMM yyyy', {
                locale:
                  datefnsLocales[
                    snapshot.locale as keyof typeof datefnsLocales
                  ],
              })}{' '}
              -{' '}
              {exp.end
                ? format(exp.end, 'MMM yyyy', {
                    locale:
                      datefnsLocales[
                        snapshot.locale as keyof typeof datefnsLocales
                      ],
                  })
                : localize('present', snapshot.locale)}
            </td>
            <td className="px-2 py-2">{exp.role}</td>
            <td className="px-2 py-2">
              {[
                ...exp.technologies.frontend,
                ...exp.technologies.backend,
                ...exp.technologies.databases,
              ].join(', ')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
