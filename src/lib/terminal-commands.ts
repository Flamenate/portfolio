import { Clear } from '@/components/apps/terminal/clear'
import { Close } from '@/components/apps/terminal/close'
import { Contact } from '@/components/apps/terminal/contact'
import { Education } from '@/components/apps/terminal/education'
import { Exit } from '@/components/apps/terminal/exit'
import { Experience } from '@/components/apps/terminal/experience'
import { Fortune } from '@/components/apps/terminal/fortune'
import { Help } from '@/components/apps/terminal/help'
import { Locale as LocaleCommand } from '@/components/apps/terminal/locale'
import { Logs } from '@/components/apps/terminal/logs'
import { Open } from '@/components/apps/terminal/open'
import { Pin } from '@/components/apps/terminal/pin'
import { Projects } from '@/components/apps/terminal/projects'
import { Skills } from '@/components/apps/terminal/skills'
import { Soundtest } from '@/components/apps/terminal/soundtest'
import { Sysinfo } from '@/components/apps/terminal/sysinfo'
import { TaskManager } from '@/components/apps/terminal/taskmanager'
import { Theme } from '@/components/apps/terminal/theme'
import { Unpin } from '@/components/apps/terminal/unpin'
import { Uptime } from '@/components/apps/terminal/uptime'
import { WhoAmI } from '@/components/apps/terminal/whoami'
import type { Locale } from '@/stores/theme.store'

interface CommandDefinition {
  component: Command
  aliases?: string[]
  usage?: string
  description: string
}

export interface CommandSnapshot {
  locale: Locale
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
const commands = {
  whoami: {
    component: WhoAmI,
    description: 'Display current user information',
  },
  contact: {
    component: Contact,
    aliases: ['email', 'info', 'socials'],
    description: 'Show contact information',
  },
  uptime: {
    component: Uptime,
    description: 'Show system uptime',
  },
  clear: {
    component: Clear,
    aliases: ['cls'],
    description: 'Clear the terminal screen',
  },
  exit: {
    component: Exit,
    aliases: ['logout'],
    description: 'Close the terminal',
  },
  taskmanager: {
    component: TaskManager,
    aliases: ['ps', 'top'],
    description: 'List running processes',
  },
  open: {
    component: Open,
    aliases: ['start'],
    description: 'Open an application',
    usage: 'open [application]',
  },
  close: {
    component: Close,
    aliases: ['kill'],
    description: 'Close an application',
    usage: 'close [application]',
  },
  pin: {
    component: Pin,
    description: 'Pin an application to the taskbar',
    usage: 'pin [application]',
  },
  unpin: {
    component: Unpin,
    description: 'Unpin an application from the taskbar',
    usage: 'unpin [application]',
  },
  help: {
    component: Help,
    aliases: ['?'],
    description: 'Display help information about commands',
    usage: 'help; help [command]',
  },
  sysinfo: {
    component: Sysinfo,
    aliases: ['systeminfo'],
    description: 'Display system information',
  },
  soundtest: {
    component: Soundtest,
    description: 'Play a sound test',
    usage: 'soundtest [0<=volume<=100]',
  },
  skills: {
    component: Skills,
    description: 'Display my skills',
    usage: 'skills; skills [type: frontend|backend|database]',
  },
  projects: {
    component: Projects,
    description: 'List my projects',
    usage: 'projects; projects [year>=2020]',
  },
  education: {
    component: Education,
    description: 'Show my educational background',
  },
  experience: {
    component: Experience,
    description: 'List my work experience',
    usage: 'experience; experience [year>=2020]',
  },
  fortune: {
    component: Fortune,
    description: 'Display a random fortune cookie message',
  },
  logs: {
    component: Logs,
    description: 'Display your last 10 actions on the website',
  },
  theme: {
    component: Theme,
    description: 'Get or set the terminal theme',
    usage: 'theme; theme set [light|dark|system]',
  },
  locale: {
    component: LocaleCommand,
    description: 'Get or set the terminal locale',
    usage: 'locale; locale set [eng|fr|es]',
  },
} satisfies Record<string, CommandDefinition>

export const commandNames = Object.keys(commands).sort()

const commandLookup = new Map<string, CommandDefinition>()
for (const [name, definition] of Object.entries<CommandDefinition>(commands)) {
  for (const token of [name, ...(definition.aliases ?? [])]) {
    if (commandLookup.has(token))
      throw new Error(`Duplicate terminal command: ${token}`)
    commandLookup.set(token, definition)
  }
}

export function findCommand(name: string) {
  return commandLookup.get(name)
}
