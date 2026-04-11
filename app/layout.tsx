import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider }    from '@/lib/theme-context'
import { ToastProvider }    from '@/components/ui/Toast'
import { AuthProvider }     from '@/lib/auth-context'
import AnalyticsProvider    from '@/components/ui/AnalyticsProvider'

export const metadata: Metadata = {
  title: { default: 'DesignForge Studio — Premium Visual Design Services', template: '%s | DesignForge Studio' },
  description: 'Custom premium visual design solutions — posters, invitations, branding, social media, menus and more.',
  keywords: ['design studio','custom design','poster design','branding','invitations','logo design','social media'],
  authors: [{ name: 'DesignForge Studio' }],
  openGraph: {
    type: 'website', siteName: 'DesignForge Studio',
    title: 'DesignForge Studio — Premium Visual Design Services',
    description: 'Custom premium visual design solutions for every brand.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&family=Rubik:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* ── Google Analytics GA4 — replace G-XXXXXXXXXX with your real measurement ID ── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX',{send_page_view:false});`
        }} />
      </head>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] antialiased">
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>
              <AnalyticsProvider>
                {children}
              </AnalyticsProvider>
            </ToastProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
