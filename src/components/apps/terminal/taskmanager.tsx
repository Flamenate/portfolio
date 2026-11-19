import type { Command } from '@/lib/terminal-commands'
import useAppStore from '@/stores/app.store'

export const taskmanagerCommand: Command = () => {
  const { openAppLabels } = useAppStore.getState()
  return (
    <table className="w-full table-auto text-left">
      <thead className="bg-green-900">
        <tr>
          <th>PID</th>
          <th>USER</th>
          <th>CPU%</th>
          <th>MEM%</th>
          <th>PROCESS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>root</td>
          <td>0.0</td>
          <td>0.1</td>
          <td>explorer.exe</td>
        </tr>
        {openAppLabels.map((label, index) => (
          <tr key={label} className="even:bg-white/10">
            <td>{500 + index}</td>
            <td>flamenate</td>
            <td>0.0</td>
            <td>?</td>
            <td>{label}.exe</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
