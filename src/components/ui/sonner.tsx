import { CheckmarkCircleRegular } from '@fluentui/react-icons/headless/svg/checkmark-circle'
import { ErrorCircleRegular } from '@fluentui/react-icons/headless/svg/error-circle'
import { InfoRegular } from '@fluentui/react-icons/headless/svg/info'
import { SpinnerIos20Regular } from '@fluentui/react-icons/headless/svg/spinner-ios'
import { WarningRegular } from '@fluentui/react-icons/headless/svg/warning'
import { Toaster as Sonner } from 'sonner'
import type { ToasterProps } from 'sonner'
import useThemeStore from '@/stores/theme.store'

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useThemeStore((state) => state.palette)

  return (
    <Sonner
      theme={theme}
      icons={{
        success: <CheckmarkCircleRegular className="size-4" />,
        info: <InfoRegular className="size-4" />,
        warning: <WarningRegular className="size-4" />,
        error: <ErrorCircleRegular className="size-4" />,
        loading: <SpinnerIos20Regular className="size-4 animate-spin" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
