import { format } from 'date-fns'
import { resume } from '@/data/personal'
import { env } from '@/env'
import type { Command } from '@/lib/terminal-commands'

export const sysinfoCommand: Command = () => {
  return (
    <table className="w-full table-auto [&>tr]:align-top">
      <tr>
        <td>Host Name:</td>
        <td>FLAMENATE</td>
      </tr>
      <tr>
        <td>OS Name:</td>
        <td>FlameOS</td>
      </tr>
      <tr>
        <td>OS Version</td>
        <td>{env.VITE_APP_VERSION}</td>
      </tr>
      <tr>
        <td>OS Manufacturer:</td>
        <td>{resume.name}</td>
      </tr>
      <tr>
        <td>Domain:</td>
        <td>
          <a href={env.VITE_DOMAIN} className="underline">
            {env.VITE_DOMAIN}
          </a>
        </td>
      </tr>
      <tr>
        <td>Last Update:</td>
        <td>{format(env.VITE_LAST_UPDATE, 'PPpp')}</td>
      </tr>
      <tr>
        <td>PC Manufacturer:</td>
        <td>LENOVO</td>
      </tr>
      <tr>
        <td>PC Type:</td>
        <td>Legion 5</td>
      </tr>
      <tr>
        <td>BIOS Version:</td>
        <td>LENOVO GKCN65WW, 16/1/2024</td>
      </tr>
      <tr>
        <td>Processor(s):</td>
        <td>[01]: AMD Ryzen™ 7 5800H @ 3.2GHz</td>
      </tr>
      <tr>
        <td>Total Physical Memory:</td>
        <td>15,212 MB</td>
      </tr>
      <tr>
        <td>Storage Capacity</td>
        <td>951,904 MB</td>
      </tr>
      <tr>
        <td>GPU(s):</td>
        <td>
          [01]: AMD Radeon™ Graphics <br /> [02]: NVIDIA GeForce RTX 3070 @ 140W
        </td>
      </tr>
      <tr>
        <td>Virtualization:</td>
        <td>Enabled</td>
      </tr>
    </table>
  )
}
