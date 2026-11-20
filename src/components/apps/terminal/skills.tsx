import { skills } from '@/data/personal'
import localize from '@/lib/localize'
import type { Command } from '@/lib/terminal-commands'

const columns = [
  { arg: 'frontend', label: 'Frontend', key: 'frontend' },
  { arg: 'backend', label: 'Backend', key: 'backend' },
  { arg: 'database', label: 'Database', key: 'databases' },
  { arg: 'soft', label: 'Soft', key: 'soft' },
] as const

export const skillsCommand: Command = ({ args, locale }) => {
  const skillType = args[0]?.toLowerCase()
  const list = (key: (typeof columns)[number]['key']) =>
    key === 'soft'
      ? skills.soft.map((skill) => localize(skill, locale))
      : skills[key]

  const selected = skillType
    ? columns.filter((column) => column.arg === skillType)
    : columns
  if (selected.length === 0) {
    return <p>{localize('terminal_invalid_skilltype', locale)}</p>
  }

  const lists = selected.map((column) => list(column.key))
  const rowCount = Math.max(...lists.map((items) => items.length))
  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          {selected.map((column) => (
            <th key={column.arg} className="text-left">
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }, (_, i) => (
          <tr key={i}>
            {lists.map((items, column) => (
              <td key={selected[column].arg}>{items[i] ?? ''}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
