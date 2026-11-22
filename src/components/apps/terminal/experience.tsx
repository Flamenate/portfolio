import { resume } from '@/data/personal'
import type { Command } from '@/lib/terminal-commands'
import { joinTechStack, overlapsYear, parseYearArg } from './timeline'

export const experienceCommand: Command = ({ args, locale }) => {
  const year = parseYearArg(args[0])
  const filteredExperience = year
    ? resume.experience.filter((exp) => overlapsYear(exp.period, year))
    : resume.experience

  if (filteredExperience.length === 0) {
    return <p>{locale.text('terminal_no_experience_found')}</p>
  }
  return (
    <table className="w-full table-auto border-collapse">
      <caption className="mt-1 caption-bottom">
        <span className="border p-0.5">
          {locale.text('terminal_experience_learn_more')}
        </span>
      </caption>
      <thead>
        <tr>
          <th className="px-2">{locale.text('terminal_project_date')}</th>
          <th className="px-2">{locale.text('terminal_project_title')}</th>
          <th className="px-2">{locale.text('terminal_project_tech_stack')}</th>
        </tr>
      </thead>
      <tbody>
        {filteredExperience.map((exp) => (
          <tr key={exp.role} className="align-top">
            <td className="px-2 py-2">{locale.period(exp.period)}</td>
            <td className="px-2 py-2">{locale.text(exp.role)}</td>
            <td className="px-2 py-2">{joinTechStack(exp.tech)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
