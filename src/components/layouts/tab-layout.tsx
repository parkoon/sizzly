import { MAX_MOBILE_SCREEN_WIDTH } from '@/config/app'

export const TabLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      style={{ maxWidth: MAX_MOBILE_SCREEN_WIDTH }}
      className="min-h-screen mx-auto flex flex-col items-stretch"
    >
      {children}
    </div>
  )
}
