import { skills } from '@/lib/personal'
import type { Command } from '@/lib/terminal-commands'
import localize from '@/utils/localize'

export const Skills: Command = ({ args, snapshot }) => {
  const skillType = args[0]?.toLowerCase()
  const frontendSkills = Array.from(skills.frontend)
  const backendSkills = Array.from(skills.backend)
  const databaseSkills = Array.from(skills.databases)
  if (!skillType) {
    return (
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Frontend</th>
            <th className="text-left">Backend</th>
            <th className="text-left">Database</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(
              frontendSkills.length,
              backendSkills.length,
              databaseSkills.length,
            ),
          }).map((_, i) => (
            <tr key={i}>
              <td>{frontendSkills[i] || ''}</td>
              <td>{backendSkills[i] || ''}</td>
              <td>{databaseSkills[i] || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else if (!['frontend', 'backend', 'database'].includes(skillType)) {
    return <p>{localize('terminal_invalid_skilltype', snapshot.locale)}</p>
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="text-left capitalize">{skillType}</th>
        </tr>
      </thead>
      <tbody>
        {(skillType === 'frontend'
          ? frontendSkills
          : skillType === 'backend'
            ? backendSkills
            : databaseSkills
        ).map((skill) => (
          <tr key={skill}>
            <td>{skill}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
