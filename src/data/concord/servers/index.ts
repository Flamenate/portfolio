import type { Server } from '@/lib/concord/types'
import { barcelona } from './barcelona'
import { enib } from './enib'
import { enis } from './enis'
import { est } from './est'
import { jsc } from './jsc'
import { mtc } from './mtc'
import { teia } from './teia'

export const servers: Server[] = [enis, enib, jsc, teia, mtc, barcelona, est]
