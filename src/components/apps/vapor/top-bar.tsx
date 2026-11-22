import { TabsList, TabsTrigger } from '@/components/ui/tabs'

export type VaporTab = 'library' | 'flamenate'

const tabs: Array<{ value: string; label: string; disabled?: boolean }> = [
  { value: 'store', label: 'Store', disabled: true },
  { value: 'library', label: 'Library' },
  { value: 'community', label: 'Community', disabled: true },
  { value: 'flamenate', label: 'Flamenate', disabled: true },
]

const triggerClassName = [
  'h-auto flex-none rounded-none bg-none! px-0 py-1 text-sm font-semibold tracking-wider uppercase pointer-coarse:min-h-8',
  'text-[#dcdedf] hover:text-white dark:text-[#dcdedf] dark:hover:text-white disabled:text-[#8b929a]!',
  'data-[state=active]:bg-transparent data-[state=active]:text-[#1a9fff] dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-[#1a9fff]',
  'focus-visible:border-transparent focus-visible:ring-[#1a9fff]/40 focus-visible:outline-[#1a9fff]',
  'after:bg-[#1a9fff] group-data-[orientation=horizontal]/tabs:after:-bottom-0.5',
].join(' ')

export function TopBar() {
  return (
    <div className="shrink-0 overflow-x-auto bg-linear-to-b from-[#171a21] to-[#1b1f27] px-4 shadow-[0_1px_0_rgb(0_0_0/0.4)] @md:px-6">
      <TabsList
        variant="line"
        aria-label="Vapor"
        className="h-12! gap-5 @md:gap-7"
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={tab.disabled}
            className={triggerClassName}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}
