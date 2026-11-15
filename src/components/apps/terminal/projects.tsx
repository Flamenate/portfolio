import { format } from 'date-fns'
import { projects } from '@/lib/personal'
import type { Command } from '@/lib/terminal-commands'
import { datefnsLocales } from '@/stores/theme.store'
import localize from '@/utils/localize'

export const Projects: Command = ({ args, snapshot }) => {
  const yearInput = parseInt(args[0])
  const year =
    isNaN(yearInput) || yearInput < 2020 || yearInput > new Date().getFullYear()
      ? null
      : yearInput
  const filteredProjects = year
    ? projects.filter(
        (project) =>
          project.period.start.getFullYear() <= year &&
          (project.period.end
            ? project.period.end.getFullYear() >= year
            : true),
      )
    : projects

  if (filteredProjects.length === 0) {
    return <p>{localize('terminal_no_projects_found', snapshot.locale)}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="caption-bottom">
        <span className="border p-0.5">
          {localize('terminal_projects_learn_more', snapshot.locale)}
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
          <th className="px-2">
            {localize('terminal_project_link', snapshot.locale)}
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredProjects.map((project) => (
          <tr key={project.title} className="align-top">
            <td className="px-2 py-2">
              {format(project.period.start, 'MMM yyyy', {
                locale:
                  datefnsLocales[
                    snapshot.locale as keyof typeof datefnsLocales
                  ],
              })}{' '}
              -{' '}
              {project.period.end
                ? format(project.period.end, 'MMM yyyy', {
                    locale:
                      datefnsLocales[
                        snapshot.locale as keyof typeof datefnsLocales
                      ],
                  })
                : localize('present', snapshot.locale)}
            </td>
            <td className="px-2 py-2">{project.title}</td>
            <td className="px-2 py-2">
              {[
                ...project.tech.frontend,
                ...project.tech.backend,
                ...project.tech.databases,
              ].join(', ')}
            </td>
            <td className="px-2 py-2">
              {project.links?.[0].url ?? localize('private', snapshot.locale)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
