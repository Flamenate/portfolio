import { useState } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { games } from '@/data/games'
import { cn } from '@/lib/utils'
import { GameList } from './game-list'
import { GamePage } from './game-page'
import { TopBar } from './top-bar'
import type { VaporTab } from './top-bar'

const initialGame = games[0]?.name

export function Vapor() {
  const [tab, setTab] = useState<VaporTab>('library')
  const [selected, setSelected] = useState(initialGame)
  const [search, setSearch] = useState('')
  const [browsing, setBrowsing] = useState(false)
  const game = games.find((item) => item.name === selected)

  const selectGame = (name: string) => {
    setSelected(name)
    setBrowsing(true)
  }

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as VaporTab)}
      className="h-full gap-0 bg-[#171a21] text-sm text-[#dcdedf] select-none"
    >
      <TopBar />
      <TabsContent
        value="library"
        className="flex min-h-0 flex-col @md:flex-row"
      >
        <GameList
          search={search}
          onSearch={setSearch}
          selected={selected}
          onSelect={selectGame}
          className={cn(browsing && 'hidden @md:flex')}
        />
        <section
          aria-label={game?.name}
          className={cn(
            'relative min-h-0 min-w-0 grow',
            browsing ? 'flex' : 'hidden @md:flex',
          )}
        >
          {game && <GamePage game={game} onBack={() => setBrowsing(false)} />}
        </section>
      </TabsContent>
    </Tabs>
  )
}
