import type { ReactNode } from 'react'
import { clearCommand } from '@/components/apps/terminal/clear'
import { closeCommand } from '@/components/apps/terminal/close'
import { contactCommand } from '@/components/apps/terminal/contact'
import { educationCommand } from '@/components/apps/terminal/education'
import { exitCommand } from '@/components/apps/terminal/exit'
import { experienceCommand } from '@/components/apps/terminal/experience'
import { fortuneCommand } from '@/components/apps/terminal/fortune'
import { helpCommand } from '@/components/apps/terminal/help'
import { localeCommand } from '@/components/apps/terminal/locale'
import { logsCommand } from '@/components/apps/terminal/logs'
import { openCommand } from '@/components/apps/terminal/open'
import { pinCommand } from '@/components/apps/terminal/pin'
import { projectsCommand } from '@/components/apps/terminal/projects'
import { skillsCommand } from '@/components/apps/terminal/skills'
import { soundtestCommand } from '@/components/apps/terminal/soundtest'
import { sysinfoCommand } from '@/components/apps/terminal/sysinfo'
import { taskmanagerCommand } from '@/components/apps/terminal/taskmanager'
import { themeCommand } from '@/components/apps/terminal/theme'
import { unpinCommand } from '@/components/apps/terminal/unpin'
import { uptimeCommand } from '@/components/apps/terminal/uptime'
import { whoamiCommand } from '@/components/apps/terminal/whoami'
import type { Locale } from '@/stores/theme.store'

interface CommandDefinition {
  run: Command
  aliases?: string[]
  usage?: string
  description: string
}

export interface CommandContext {
  args: string[]
  locale: Locale
  clearHistory: () => void
}

// Commands run once, when submitted, and return static output: anything that
// subscribes to a store would make old history entries change or re-run.
export type Command = (context: CommandContext) => ReactNode

// TODO: commands to add: achievements (unlocked, locked)
const commands = {
  whoami: {
    run: whoamiCommand,
    description: 'Display current user information',
  },
  contact: {
    run: contactCommand,
    aliases: ['email', 'info', 'socials'],
    description: 'Show contact information',
  },
  uptime: {
    run: uptimeCommand,
    description: 'Show system uptime',
  },
  clear: {
    run: clearCommand,
    aliases: ['cls'],
    description: 'Clear the terminal screen',
  },
  exit: {
    run: exitCommand,
    aliases: ['logout'],
    description: 'Close the terminal',
  },
  taskmanager: {
    run: taskmanagerCommand,
    aliases: ['ps', 'top'],
    description: 'List running processes',
  },
  open: {
    run: openCommand,
    aliases: ['start'],
    description: 'Open an application',
    usage: 'open [application]',
  },
  close: {
    run: closeCommand,
    aliases: ['kill'],
    description: 'Close an application',
    usage: 'close [application]',
  },
  pin: {
    run: pinCommand,
    description: 'Pin an application to the taskbar',
    usage: 'pin [application]',
  },
  unpin: {
    run: unpinCommand,
    description: 'Unpin an application from the taskbar',
    usage: 'unpin [application]',
  },
  help: {
    run: helpCommand,
    aliases: ['?'],
    description: 'Display help information about commands',
    usage: 'help; help [command]',
  },
  sysinfo: {
    run: sysinfoCommand,
    aliases: ['systeminfo'],
    description: 'Display system information',
  },
  soundtest: {
    run: soundtestCommand,
    description: 'Play a sound test',
    usage: 'soundtest [0<=volume<=100]',
  },
  skills: {
    run: skillsCommand,
    description: 'Display my skills',
    usage: 'skills; skills [type: frontend|backend|database|soft]',
  },
  projects: {
    run: projectsCommand,
    description: 'List my projects',
    usage: 'projects; projects [year>=2020]',
  },
  education: {
    run: educationCommand,
    description: 'Show my educational background',
  },
  experience: {
    run: experienceCommand,
    description: 'List my work experience',
    usage: 'experience; experience [year>=2020]',
  },
  fortune: {
    run: fortuneCommand,
    description: 'Display a random fortune cookie message',
  },
  logs: {
    run: logsCommand,
    description: 'Display your last 10 actions on the website',
  },
  theme: {
    run: themeCommand,
    description: 'Get or set the terminal theme',
    usage: 'theme; theme set [light|dark|system]',
  },
  locale: {
    run: localeCommand,
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
