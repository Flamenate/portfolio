import { Link, createFileRoute } from '@tanstack/react-router'
import { Image } from '@unpic/react'
import { useState } from 'react'
import { WindowLoading } from '@/components/ui/window-loading'
import useLocalize from '@/hooks/useLocalize'
import useLocalStorage from '@/hooks/useLocalStorage'

export const Route = createFileRoute('/')({ component: Welcome })

function Welcome() {
  const [loading, setLoading] = useState<boolean>(false)
  const [isFirstVisit, setIsFirstVisit] = useLocalStorage('isFirstVisit', true)
  const localize = useLocalize()
  return (
    <main className="relative grid h-screen grid-flow-row grid-rows-6 place-items-center overflow-hidden">
      <div
        aria-hidden
        className="absolute -inset-8 bg-slate-950 bg-[url('/images/login_bg.jpg')] bg-cover bg-center blur-lg"
      />
      <h1 className="relative z-10 text-3xl font-bold text-gray-200 drop-shadow-sm drop-shadow-black md:text-5xl">
        {localize(isFirstVisit ? 'welcome' : 'welcome_back')}
      </h1>
      <div className="relative z-10 row-start-3 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center gap-5">
          <Image
            className="aspect-square w-42 rounded-full border border-white/40 object-cover md:w-56"
            src="/images/ena.jpg"
            alt="Picture of Haythem Frikha"
            sizes="(max-width: 768px) 10.5rem, 14rem"
            width={224}
            height={224}
          />
          <h2 className="flex items-center gap-2 text-center text-2xl font-semibold text-gray-200 drop-shadow-sm drop-shadow-black md:text-3xl">
            Haythem Frikha
          </h2>
        </div>

        {!loading ? (
          <Link to="/home" preload="viewport">
            <button
              className="cursor-pointer rounded border border-white/25 bg-white/25 hover-shade px-6 py-2 text-base font-semibold text-white/85 md:text-lg"
              type="button"
              draggable="false"
              onClick={() => {
                setLoading(true)
                if (isFirstVisit) setIsFirstVisit(false)
              }}
            >
              {localize('sign_in')}
            </button>
          </Link>
        ) : (
          <WindowLoading className="h-auto w-auto [&_circle]:stroke-[#60cdff]" />
        )}
      </div>
    </main>
  )
}
