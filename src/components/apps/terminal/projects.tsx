import { projects } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'
import { joinTechStack, overlapsYear, parseYearArg } from './timeline'

export const projectsCommand: Command = ({ args, locale }) => {
  const year = parseYearArg(args[0])
  const filteredProjects = year
    ? projects.filter((project) => overlapsYear(project.period, year))
    : projects

  if (filteredProjects.length === 0) {
    return <p>{locale.text('terminal_no_projects_found')}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="caption-bottom">
        <span className="border p-0.5">
          {locale.text('terminal_projects_learn_more')}
        </span>
      </caption>
      <thead>
        <tr>
          <th className="px-2">{locale.text('terminal_project_date')}</th>
          <th className="px-2">{locale.text('terminal_project_title')}</th>
          <th className="px-2">{locale.text('terminal_project_tech_stack')}</th>
          <th className="px-2">{locale.text('terminal_project_link')}</th>
        </tr>
      </thead>
      <tbody>
        {filteredProjects.map((project) => (
          <tr key={project.title} className="align-top">
            <td className="px-2 py-2">{locale.period(project.period)}</td>
            <td className="px-2 py-2">{locale.text(project.title)}</td>
            <td className="px-2 py-2">{joinTechStack(project.tech)}</td>
            <td className="px-2 py-2">
              {project.links?.[0].url ?? locale.text('private')}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
