import { resume } from '@/data/personal'
import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'
import {
  formatPeriod,
  joinTechStack,
  overlapsYear,
  parseYearArg,
} from './timeline'

export const experienceCommand: Command = ({ args, locale }) => {
  const year = parseYearArg(args[0])
  const filteredExperience = year
    ? resume.experience.filter((exp) => overlapsYear(exp.period, year))
    : resume.experience

  if (filteredExperience.length === 0) {
    return <p>{localize('terminal_no_experience_found', locale)}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="mt-1 caption-bottom">
        <span className="border p-0.5">
          {localize('terminal_experience_learn_more', locale)}
        </span>
      </caption>
      <thead>
        <tr>
          <th className="px-2">{localize('terminal_project_date', locale)}</th>
          <th className="px-2">{localize('terminal_project_title', locale)}</th>
          <th className="px-2">
            {localize('terminal_project_tech_stack', locale)}
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredExperience.map((exp) => (
          <tr key={exp.role} className="align-top">
            <td className="px-2 py-2">{formatPeriod(exp.period, locale)}</td>
            <td className="px-2 py-2">{exp.role}</td>
            <td className="px-2 py-2">{joinTechStack(exp.tech)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
