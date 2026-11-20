import { ArrowDownloadRegular } from '@fluentui/react-icons/headless/svg/arrow-download'
import { CopyRegular } from '@fluentui/react-icons/headless/svg/copy'
import { DocumentPdfRegular } from '@fluentui/react-icons/headless/svg/document-pdf'
import { MailEditRegular } from '@fluentui/react-icons/headless/svg/mail-edit'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { resume } from '@/data/personal'
import useLocalize from '@/hooks/useLocalize'
import { fileLabel, getFolder } from '@/lib/directories'
import type { FolderPath } from '@/lib/directories'
import { pdfId, pdfsIn } from '@/lib/pdfs'
import { cn } from '@/lib/utils'
import { useMailStore } from '@/stores/mail.store'
import { useNotificationStore } from '@/stores/notification.store'
import { usePdfStore } from '@/stores/pdf.store'
import useThemeStore from '@/stores/theme.store'
import type { Locale } from '@/stores/theme.store'
import { StartMenuSection } from './section'

const documentsPath: FolderPath = ['documents']

// There is no Spanish résumé, so Spanish falls back to English.
function resumeFile(locale: Locale) {
  const documents = getFolder(documentsPath)
  if (!documents) return undefined
  const name = locale === 'fr' ? 'Haythem_FRIKHA_FR' : 'Haythem_FRIKHA_ENG'
  return pdfsIn(documents, documentsPath).find((file) => file.name === name)
}

const actionClassName =
  'flex items-center gap-2 rounded-sm border bg-popover/40 hover-shade px-3 py-2 text-sm'

export function QuickActions({ onAction }: { onAction: () => void }) {
  const localize = useLocalize()
  const locale = useThemeStore((state) => state.locale)
  const file = resumeFile(locale)

  const viewResume = () => {
    if (!file) return
    usePdfStore.getState().openPdf({
      ...file,
      id: pdfId(file),
      openedAt: null,
      size: null,
    })
    onAction()
  }
  const contact = () => {
    useMailStore.getState().requestCompose()
    onAction()
  }
  const copyEmail = async () => {
    const { addSystemNotification } = useNotificationStore.getState()
    try {
      await navigator.clipboard.writeText(resume.contact.email)
      addSystemNotification({
        content: 'email_copied',
        subcontent: 'email_copied_description',
      })
    } catch {
      addSystemNotification({
        content: 'something_went_wrong',
        subcontent: 'something_went_wrong_description',
      })
    }
  }

  return (
    <StartMenuSection title={localize('start_menu_quick_actions')}>
      <div className="flex flex-wrap gap-2">
        {file && (
          <div className="flex">
            <button
              type="button"
              className={cn(actionClassName, 'rounded-r-none')}
              onClick={viewResume}
            >
              <DocumentPdfRegular className="size-4.5" />
              {localize('start_menu_view_resume')}
            </button>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <a
                  href={file.src}
                  download={fileLabel(file)}
                  aria-label={localize('start_menu_download_resume')}
                  className={cn(actionClassName, 'rounded-l-none border-l-0')}
                >
                  <ArrowDownloadRegular className="size-4.5" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                {localize('start_menu_download_resume')}
              </TooltipContent>
            </Tooltip>
          </div>
        )}
        <button type="button" className={actionClassName} onClick={contact}>
          <MailEditRegular className="size-4.5" />
          {localize('start_menu_contact_me')}
        </button>
        <button type="button" className={actionClassName} onClick={copyEmail}>
          <CopyRegular className="size-4.5" />
          {localize('start_menu_copy_email')}
        </button>
      </div>
    </StartMenuSection>
  )
}
