import { BranchForkRegular } from '@fluentui/react-icons/headless/svg/branch-fork'
import { useQuery } from '@tanstack/react-query'
import { useLayoutEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { WindowLoading } from '@/components/ui/window-loading'
import useLocalize from '@/hooks/useLocalize'
import useLocalStorage from '@/hooks/useLocalStorage'
import { GITHUB_USER } from '@/lib/github/repos'
import type { Repo } from '@/lib/github/repos'
import { reposQuery } from '@/lib/github/repos-query'
import useAppStore from '@/stores/app.store'

// TODO: switch to 'portfolio' once it's public
const DEFAULT_REPO = 'loup-garou-bot'

function pickRepo(repos: Repo[], saved: string) {
  if (repos.some((repo) => repo.name === saved)) return saved
  if (repos.some((repo) => repo.name === DEFAULT_REPO)) return DEFAULT_REPO
  return repos[0]?.name ?? DEFAULT_REPO
}

export function VSCope() {
  const localize = useLocalize()
  const setAppTitle = useAppStore((state) => state.setAppTitle)
  const { data: repos, isError } = useQuery(reposQuery)
  const [savedRepo, setSavedRepo] = useLocalStorage('vscopeRepo', DEFAULT_REPO)
  const [loadedRepo, setLoadedRepo] = useState<string | null>(null)

  let repo = savedRepo
  if (repos) repo = pickRepo(repos, savedRepo)
  else if (isError) repo = DEFAULT_REPO

  const options = repos ?? [{ name: repo, fork: false }]
  const title = localize('vscope')

  useLayoutEffect(() => {
    setAppTitle('vscope', `${repo} - ${title}`)
  }, [repo, title, setAppTitle])

  function selectRepo(name: string) {
    setLoadedRepo(null)
    setSavedRepo(name)
  }

  return (
    <section className="flex h-full flex-col">
      <header className="flex h-11 shrink-0 items-center border-b border-muted-foreground/50 px-2">
        <Select value={repo} onValueChange={selectRepo} disabled={!repos}>
          <SelectTrigger
            size="sm"
            aria-label={localize('vscope_select_project')}
            className="min-w-48"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" align="start">
            {options.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                {option.fork && <BranchForkRegular />}
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>
      <div className="relative min-h-0 grow">
        <iframe
          key={repo}
          src={`https://github1s.com/${GITHUB_USER}/${repo}`}
          className="h-full w-full border-0"
          title={title}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
          allow="clipboard-read; clipboard-write"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setLoadedRepo(repo)}
        />
        {loadedRepo !== repo && (
          <WindowLoading className="absolute inset-0 bg-background" />
        )}
      </div>
    </section>
  )
}
