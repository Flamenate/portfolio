import { Clear } from '@/components/apps/terminal/clear'
import { Close } from '@/components/apps/terminal/close'
import { Contact } from '@/components/apps/terminal/contact'
import { Exit } from '@/components/apps/terminal/exit'
import { Fortune } from '@/components/apps/terminal/fortune'
import { Help } from '@/components/apps/terminal/help'
import { Locale } from '@/components/apps/terminal/locale'
import { Logs } from '@/components/apps/terminal/logs'
import { Open } from '@/components/apps/terminal/open'
import { Pin } from '@/components/apps/terminal/pin'
import { Soundtest } from '@/components/apps/terminal/soundtest'
import { Sysinfo } from '@/components/apps/terminal/sysinfo'
import { TaskManager } from '@/components/apps/terminal/taskmanager'
import { Theme } from '@/components/apps/terminal/theme'
import { Unpin } from '@/components/apps/terminal/unpin'
import { Uptime } from '@/components/apps/terminal/uptime'
import { WhoAmI } from '@/components/apps/terminal/whoami'

interface CommandMetadata {
  aliases?: string[]
  usage?: string
  description: string
}

export interface CommandSnapshot {
  locale: string
  random: number
  volume: number
}

export interface CommandProps {
  args: string[]
  snapshot: CommandSnapshot
  clearHistory: () => void
}

export type Command = (props: CommandProps) => React.ReactNode

// TODO: commands to add: achievements (unlocked, locked)
export const commandComponents = {
  whoami: WhoAmI,
  contact: Contact,
  uptime: Uptime,
  clear: Clear,
  exit: Exit,
  taskmanager: TaskManager,
  open: Open,
  close: Close,
  pin: Pin,
  unpin: Unpin,
  help: Help,
  sysinfo: Sysinfo,
  soundtest: Soundtest,
  skills: (await import('@/components/apps/terminal/skills')).Skills,
  projects: (await import('@/components/apps/terminal/projects')).Projects,
  education: (await import('@/components/apps/terminal/education')).Education,
  experience: (await import('@/components/apps/terminal/experience'))
    .Experience,
  fortune: Fortune,
  logs: Logs,
  theme: Theme,
  locale: Locale,
} as const

export const commandMetadata: Record<
  keyof typeof commandComponents,
  CommandMetadata
> = {
  whoami: {
    description: 'Display current user information',
  },
  contact: {
    aliases: ['email', 'info', 'socials'],
    description: 'Show contact information',
  },
  uptime: {
    description: 'Show system uptime',
  },
  clear: {
    aliases: ['cls'],
    description: 'Clear the terminal screen',
  },
  exit: {
    aliases: ['logout'],
    description: 'Close the terminal',
  },
  taskmanager: {
    aliases: ['ps', 'top'],
    description: 'List running processes',
  },
  open: {
    aliases: ['start'],
    description: 'Open an application',
    usage: 'open [application]',
  },
  close: {
    aliases: ['kill'],
    description: 'Close an application',
    usage: 'close [application]',
  },
  pin: {
    description: 'Pin an application to the taskbar',
    usage: 'pin [application]',
  },
  unpin: {
    description: 'Unpin an application from the taskbar',
    usage: 'unpin [application]',
  },
  help: {
    aliases: ['?'],
    description: 'Display help information about commands',
    usage: 'help; help [command]',
  },
  sysinfo: {
    aliases: ['systeminfo'],
    description: 'Display system information',
  },
  soundtest: {
    description: 'Play a sound test',
    usage: 'soundtest [0<=volume<=100]',
  },
  skills: {
    description: 'Display my skills',
    usage: 'skills; skills [type: frontend|backend|database]',
  },
  projects: {
    description: 'List my projects',
    usage: 'projects; projects [year>=2020]',
  },
  education: {
    description: 'Show my educational background',
  },
  experience: {
    description: 'List my work experience',
    usage: 'experience; experience [year>=2020]',
  },
  fortune: {
    description: 'Display a random fortune cookie message',
  },
  logs: {
    description: 'Display your last 10 actions on the website',
  },
  theme: {
    description: 'Get or set the terminal theme',
    usage: 'theme; theme set [light|dark|system]',
  },
  locale: {
    description: 'Get or set the terminal locale',
    usage: 'locale; locale set [en|fr|es]',
  },
} as const

export const commandLookup: Record<string, Command | undefined> = {}
for (const [name, entry] of Object.entries(commandMetadata)) {
  commandLookup[name] =
    commandComponents[name as keyof typeof commandComponents]
  for (const alias of entry.aliases ?? []) {
    commandLookup[alias] =
      commandComponents[name as keyof typeof commandComponents]
  }
}
