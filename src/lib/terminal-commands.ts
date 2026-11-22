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
import { permissionDeniedCommand } from '@/components/apps/terminal/permission-denied'
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
import type { TranslationKey } from '@/lib/localize'
import type { Locale } from '@/stores/theme.store'

interface CommandDefinition {
  run: Command
  aliases?: string[]
  usage?: string
  description: TranslationKey
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
    description: 'terminal_description_whoami',
  },
  contact: {
    run: contactCommand,
    aliases: ['email', 'info', 'socials'],
    description: 'terminal_description_contact',
  },
  uptime: {
    run: uptimeCommand,
    description: 'terminal_description_uptime',
  },
  clear: {
    run: clearCommand,
    aliases: ['cls'],
    description: 'terminal_description_clear',
  },
  exit: {
    run: exitCommand,
    aliases: ['logout'],
    description: 'terminal_description_exit',
  },
  taskmanager: {
    run: taskmanagerCommand,
    aliases: ['ps', 'top'],
    description: 'terminal_description_taskmanager',
  },
  open: {
    run: openCommand,
    aliases: ['start'],
    description: 'terminal_description_open',
    usage: 'open [application]',
  },
  close: {
    run: closeCommand,
    aliases: ['kill'],
    description: 'terminal_description_close',
    usage: 'close [application]',
  },
  pin: {
    run: pinCommand,
    description: 'terminal_description_pin',
    usage: 'pin [application]',
  },
  unpin: {
    run: unpinCommand,
    description: 'terminal_description_unpin',
    usage: 'unpin [application]',
  },
  help: {
    run: helpCommand,
    aliases: ['?'],
    description: 'terminal_description_help',
    usage: 'help; help [command]',
  },
  sysinfo: {
    run: sysinfoCommand,
    aliases: ['systeminfo'],
    description: 'terminal_description_sysinfo',
  },
  soundtest: {
    run: soundtestCommand,
    description: 'terminal_description_soundtest',
    usage: 'soundtest [0<=volume<=100]',
  },
  skills: {
    run: skillsCommand,
    description: 'terminal_description_skills',
    usage: 'skills; skills [type: frontend|backend|database|soft]',
  },
  projects: {
    run: projectsCommand,
    description: 'terminal_description_projects',
    usage: 'projects; projects [year>=2020]',
  },
  education: {
    run: educationCommand,
    description: 'terminal_description_education',
  },
  experience: {
    run: experienceCommand,
    description: 'terminal_description_experience',
    usage: 'experience; experience [year>=2020]',
  },
  fortune: {
    run: fortuneCommand,
    description: 'terminal_description_fortune',
  },
  logs: {
    run: logsCommand,
    description: 'terminal_description_logs',
  },
  theme: {
    run: themeCommand,
    description: 'terminal_description_theme',
    usage: 'theme; theme set [light|dark|system]',
  },
  locale: {
    run: localeCommand,
    description: 'terminal_description_locale',
    usage: 'locale; locale set [eng|fr|es]',
  },
  cd: {
    run: permissionDeniedCommand,
    description: 'terminal_description_cd',
    usage: 'cd [directory]',
  },
  rm: {
    run: permissionDeniedCommand,
    description: 'terminal_description_rm',
    usage: 'rm [file]',
  },
  ls: {
    run: permissionDeniedCommand,
    description: 'terminal_description_ls',
    usage: 'ls [directory]',
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
