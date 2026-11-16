import { MailRegular } from '@fluentui/react-icons/headless/svg/mail'
import { Image } from '@unpic/react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { GitHub, LinkedIn, Twitter } from '@/components/SVGs/social-media'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useLocalize from '@/hooks/useLocalize'
import WindowsShortcut from '../windowsShortcut'

function SocialMediaButton({
  platform,
  icon,
  url,
  username,
  setDisplayedName,
}: {
  platform: string
  icon: React.ReactNode
  url: string
  username?: string
  setDisplayedName: (name: string) => void
}) {
  const changeName = () => {
    if (username) setDisplayedName(username)
  }
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover-shade rounded-sm p-3"
          onPointerEnter={changeName}
          onPointerLeave={() => setDisplayedName('Haythem Frikha')}
        >
          {icon}
          <span className="sr-only">{platform}</span>
        </a>
      </TooltipTrigger>
      <TooltipContent>{platform}</TooltipContent>
    </Tooltip>
  )
}

const socialMedia = [
  {
    platform: 'GitHub',
    icon: <GitHub />,
    url: 'https://github.com/Flamenate',
    username: '@flamenate',
  },
  {
    platform: 'Twitter',
    icon: <Twitter />,
    url: 'https://twitter.com/@0xflamenate',
    username: '@0xflamenate',
  },
  {
    platform: 'LinkedIn',
    icon: <LinkedIn />,
    url: 'https://linkedin.com/haythem-frikha',
  },
  {
    platform: 'Email',
    icon: <MailRegular className="size-6" />,
    url: 'mailto:haythem.frikha@outlook.com',
    username: 'haythem.frikha@outlook.com',
  },
]

export function StartMenu() {
  const localize = useLocalize()
  const [displayedName, setDisplayedName] = useState('Haythem Frikha')
  const [displayedNameKey, setDisplayedNameKey] = useState(0)

  const setName = (name: string) => {
    if (displayedName === name) return
    setDisplayedName(name)
    setDisplayedNameKey((lastValue) => lastValue + 1)
  }
  const toggleName = () => {
    if (displayedName === 'Haythem Frikha') {
      setName('Flamenate')
    } else {
      setName('Haythem Frikha')
    }
  }
  return (
    <Popover>
      <Tooltip>
        <PopoverTrigger asChild>
          <TooltipTrigger asChild>
            <WindowsShortcut aria-label={localize('start')} />
          </TooltipTrigger>
        </PopoverTrigger>
        <TooltipContent>{localize('start')}</TooltipContent>
      </Tooltip>
      <PopoverContent>
        <section className="flex h-130 w-120 flex-col rounded-sm">
          <div className="grow"></div>
          <footer className="flex h-15 items-center justify-around rounded-b-sm bg-popover/30 select-none">
            <button
              className="hover-shade flex w-46 items-center gap-3 rounded-sm px-3 py-1.5"
              onPointerEnter={toggleName}
              onPointerLeave={() => setName('Haythem Frikha')}
              onClick={toggleName}
              type="button"
            >
              <Image
                src="/images/pictures/ena.jpg"
                width={40}
                height={40}
                className="rounded-full"
              />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  layout
                  key={displayedNameKey}
                  className="grow text-sm break-all"
                  initial={{ y: '-100%', opacity: 0, scale: 0.95, x: '2%' }}
                  animate={{ y: '0%', opacity: 1, scale: 1, x: '0%' }}
                  exit={{ y: '100%', opacity: 0, scale: 0.95, x: '2%' }}
                >
                  {displayedName}
                </motion.p>
              </AnimatePresence>
            </button>
            <div className="flex items-center">
              {socialMedia.map((social) => (
                <SocialMediaButton
                  key={social.platform}
                  platform={social.platform}
                  icon={social.icon}
                  url={social.url}
                  username={social.username}
                  setDisplayedName={setName}
                />
              ))}
            </div>
          </footer>
        </section>
      </PopoverContent>
    </Popover>
  )
}
