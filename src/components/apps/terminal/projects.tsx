import { projects } from '@/data/personal'
import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import {
  formatPeriod,
  joinTechStack,
  overlapsYear,
  parseYearArg,
} from './timeline'

export const projectsCommand: Command = ({ args, locale }) => {
  const year = parseYearArg(args[0])
  const filteredProjects = year
    ? projects.filter((project) => overlapsYear(project.period, year))
    : projects

  if (filteredProjects.length === 0) {
    return <p>{localize('terminal_no_projects_found', locale)}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="caption-bottom">
        <span className="border p-0.5">
          {localize('terminal_projects_learn_more', locale)}
        </span>
      </caption>
      <thead>
        <tr>
          <th className="px-2">{localize('terminal_project_date', locale)}</th>
          <th className="px-2">{localize('terminal_project_title', locale)}</th>
          <th className="px-2">
            {localize('terminal_project_tech_stack', locale)}
          </th>
          <th className="px-2">{localize('terminal_project_link', locale)}</th>
        </tr>
      </thead>
      <tbody>
        {filteredProjects.map((project) => (
          <tr key={project.title} className="align-top">
            <td className="px-2 py-2">
              {formatPeriod(project.period, locale)}
            </td>
            <td className="px-2 py-2">{localize(project.title, locale)}</td>
            <td className="px-2 py-2">{joinTechStack(project.tech)}</td>
            <td className="px-2 py-2">
              {project.links?.[0].url ?? localize('private', locale)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
