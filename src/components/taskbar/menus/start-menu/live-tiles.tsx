import { BriefcaseRegular } from '@fluentui/react-icons/headless/svg/briefcase'
import { CertificateRegular } from '@fluentui/react-icons/headless/svg/certificate'
import { CodeRegular } from '@fluentui/react-icons/headless/svg/code'
import { PauseRegular } from '@fluentui/react-icons/headless/svg/pause'
import { PeopleCommunityRegular } from '@fluentui/react-icons/headless/svg/people-community'
import { SportSoccerRegular } from '@fluentui/react-icons/headless/svg/sport-soccer'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { projects, resume, skills } from '@/data/personal'
import useLocalize from '@/hooks/useLocalize'
import { localizeOrKeep } from '@/lib/localize'
import { cn } from '@/lib/utils'
import useThemeStore from '@/stores/theme.store'

// Advances through `length` faces every `intervalMs`, unless paused.
// Manual advances restart the countdown because the timeout depends on `index`.
function useCycle(length: number, intervalMs: number, paused: boolean) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()
  const advance = () => setIndex((current) => (current + 1) % length)
  useEffect(() => {
    if (paused || reducedMotion || length < 2) return
    const id = setTimeout(
      () => setIndex((current) => (current + 1) % length),
      intervalMs,
    )
    return () => clearTimeout(id)
  }, [index, length, intervalMs, paused, reducedMotion])
  return [index, length > 1 ? advance : undefined] as const
}

function Tile({
  title,
  icon,
  className,
  faceKey,
  paused,
  onHoverChange,
  onAdvance,
  children,
}: {
  title: string
  icon: React.ReactNode
  className: string
  faceKey?: React.Key
  paused?: boolean
  onHoverChange?: (hovered: boolean) => void
  onAdvance?: () => void
  children: React.ReactNode
}) {
  const localize = useLocalize()
  return (
    <article
      className={cn(
        'relative flex flex-col overflow-hidden rounded-md bg-linear-to-br p-3 text-(--white) shadow-sm',
        className,
      )}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => onHoverChange?.(false)}
    >
      <div className="relative min-h-0 grow overflow-hidden" aria-live="off">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={faceKey ?? 'static'}
            className="absolute inset-0"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className="flex items-center gap-1.5 pt-1 text-xs opacity-90">
        {icon}
        {title}
        {/* Reduced motion never cycles, so there is nothing to pause. */}
        <PauseRegular
          aria-hidden
          className={cn(
            'ml-auto size-3.5 transition-opacity motion-reduce:hidden',
            paused ? 'opacity-100' : 'opacity-0',
          )}
        />
      </footer>
      {onAdvance && (
        <button
          type="button"
          className="absolute inset-0 z-10 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-(--white) focus-visible:ring-inset"
          aria-label={`${title}: ${localize('start_menu_show_next')}`}
          onClick={onAdvance}
        />
      )}
    </article>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-sm bg-white/20 px-1.5 py-0.5 text-[11px] leading-tight"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function ProjectsTile() {
  const localize = useLocalize()
  const locale = useThemeStore((state) => state.locale)
  const [hovered, setHovered] = useState(false)
  const [index, advance] = useCycle(projects.length, 5000, hovered)
  const project = projects[index]
  const tech = [
    ...new Set([
      ...project.tech.frontend,
      ...project.tech.backend,
      ...project.tech.databases,
    ]),
  ].slice(0, 4)
  return (
    <Tile
      title={localize('start_menu_projects')}
      icon={<BriefcaseRegular className="size-3.5" />}
      className="from-sky-600/85 to-indigo-700/85"
      faceKey={project.title}
      paused={hovered}
      onHoverChange={setHovered}
      onAdvance={advance}
    >
      <div className="flex h-full flex-col gap-1">
        <p className="flex items-baseline justify-between gap-2">
          <span className="truncate font-semibold">
            {localize(project.title)}
          </span>
          <span className="shrink-0 text-xs opacity-80">
            {project.period.start.getFullYear()}
          </span>
        </p>
        <p className="line-clamp-2 text-xs opacity-90">
          {localizeOrKeep(project.summary, locale)}
        </p>
        <div className="mt-auto">
          <Chips items={tech} />
        </div>
      </div>
    </Tile>
  )
}

const skillCategories = ['frontend', 'backend', 'databases', 'soft'] as const

function SkillsTile() {
  const localize = useLocalize()
  const [hovered, setHovered] = useState(false)
  const [index, advance] = useCycle(skillCategories.length, 6500, hovered)
  const category = skillCategories[index]
  const items =
    category === 'soft'
      ? skills.soft.map((key) => localize(key))
      : skills[category]
  return (
    <Tile
      title={localize('start_menu_skills')}
      icon={<CodeRegular className="size-3.5" />}
      className="from-slate-500/85 to-slate-700/85"
      faceKey={category}
      paused={hovered}
      onHoverChange={setHovered}
      onAdvance={advance}
    >
      <div className="flex h-full flex-col gap-1">
        <p className="text-[11px] font-semibold tracking-wider uppercase opacity-80">
          {localize(`start_menu_${category}`)}
        </p>
        <Chips items={items} />
      </div>
    </Tile>
  )
}

function CertificatesTile() {
  const localize = useLocalize()
  const [hovered, setHovered] = useState(false)
  const [index, advance] = useCycle(resume.certificates.length, 5500, hovered)
  const certificate = resume.certificates[index]
  return (
    <Tile
      title={localize('start_menu_certificates')}
      icon={<CertificateRegular className="size-3.5" />}
      className="from-emerald-600/85 to-teal-700/85 p-2"
      faceKey={certificate.name}
      paused={hovered}
      onHoverChange={setHovered}
      onAdvance={advance}
    >
      <p className="line-clamp-2 text-xs leading-tight font-semibold">
        {certificate.name}
      </p>
      <p className="truncate text-[11px] leading-tight opacity-80">
        {[certificate.issuer, certificate.date.getFullYear()]
          .filter(Boolean)
          .join(' · ')}
      </p>
    </Tile>
  )
}

function AssociationsTile() {
  const localize = useLocalize()
  const [hovered, setHovered] = useState(false)
  const [index, advance] = useCycle(
    resume.extracurricular.length,
    6000,
    hovered,
  )
  const association = resume.extracurricular[index]
  return (
    <Tile
      title={localize('start_menu_associations')}
      icon={<PeopleCommunityRegular className="size-3.5" />}
      className="from-cyan-600/85 to-blue-700/85 p-2"
      faceKey={association.organization}
      paused={hovered}
      onHoverChange={setHovered}
      onAdvance={advance}
    >
      <p className="line-clamp-2 text-xs leading-tight font-semibold">
        {association.organization}
      </p>
      <p className="truncate text-[11px] leading-tight opacity-80">
        {localize(association.role)}
      </p>
    </Tile>
  )
}

function FavoriteTeamTile() {
  const localize = useLocalize()
  return (
    <Tile
      title={localize('start_menu_favorite_team')}
      icon={<SportSoccerRegular className="size-3.5" />}
      className="from-[#004d98] to-[#a50044] p-2"
    >
      <p className="text-sm leading-tight font-semibold">FC Barcelona</p>
      <p className="text-[11px] leading-tight italic opacity-80">
        Més que un club
      </p>
    </Tile>
  )
}

// Projects and skills fill the wide left column; the small tiles stack on the right.
export function LiveTiles() {
  return (
    <div className="grid h-66 shrink-0 grid-cols-3 gap-2">
      <div className="col-span-2 grid grid-rows-2 gap-2">
        <ProjectsTile />
        <SkillsTile />
      </div>
      <div className="grid grid-rows-3 gap-2">
        <CertificatesTile />
        <AssociationsTile />
        <FavoriteTeamTile />
      </div>
    </div>
  )
}
