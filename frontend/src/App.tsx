import { FlaskConical, Info, ScanLine } from 'lucide-react'

import { AnalyzeProgress } from './components/AnalyzeProgress'
import { AppHeader } from './components/AppHeader'
import { ErrorNotice } from './components/ErrorNotice'
import { ReceiptResults } from './components/ReceiptResults'
import { ReceiptUploader } from './components/ReceiptUploader'
import { getErrorMessage, getUi } from './i18n/ui'
import { useLanguage } from './hooks/useLanguage'
import { useReceiptAnalysis } from './hooks/useReceiptAnalysis'
import type { LanguageCode } from './types'

export default function App() {
  const { language, setLanguage, meta } = useLanguage()
  const analysis = useReceiptAnalysis()
  const t = getUi(language)

  const handleLanguageChange = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage)
    if (
      analysis.file &&
      (analysis.response !== null || analysis.status === 'analyzing')
    ) {
      void analysis.analyze(nextLanguage)
    }
  }

  const errorMessage = analysis.error
    ? getErrorMessage(analysis.error.code, t)
    : ''

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 start-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent-soft/50 blur-3xl" />
        <div className="absolute -bottom-40 end-0 h-[26rem] w-[26rem] translate-x-1/4 rounded-full bg-warn-soft/40 blur-3xl" />
      </div>

      <AppHeader
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        {analysis.response ? (
          <ReceiptResults
            response={analysis.response}
            language={language}
            locale={meta.locale}
            t={t}
            isRefreshing={analysis.status === 'analyzing'}
            error={analysis.error}
            onRetry={() => void analysis.analyze(language)}
            onNewReceipt={analysis.reset}
          />
        ) : (
          <section className="mx-auto max-w-3xl pt-10 sm:pt-16">
            <header className="text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent-soft/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                <FlaskConical className="size-3" aria-hidden="true" />
                {t.mockBadge}
              </span>
              <h1 className="mx-auto mt-5 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
                {t.tagline}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base">
                {t.heroSubtitle}
              </p>
            </header>

            <div className="mt-8">
              <ReceiptUploader
                file={analysis.file}
                locale={meta.locale}
                t={t}
                disabled={analysis.status === 'analyzing'}
                onSelect={analysis.selectFile}
                onRemove={analysis.clearFile}
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <p className="flex max-w-md items-start gap-2 text-xs leading-relaxed text-muted">
                <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                {t.mockHint}
              </p>
              {analysis.file && analysis.status !== 'analyzing' ? (
                <button
                  type="button"
                  onClick={() => void analysis.analyze(language)}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-card shadow-card transition hover:bg-accent-strong"
                >
                  <ScanLine className="size-4" aria-hidden="true" />
                  {t.analyze}
                </button>
              ) : null}
            </div>

            {analysis.status === 'analyzing' ? (
              <AnalyzeProgress t={t} onCancel={analysis.cancel} />
            ) : null}

            {analysis.status === 'error' && analysis.error ? (
              <ErrorNotice
                className="mt-4"
                title={t.errorTitle}
                message={errorMessage}
                retryLabel={analysis.file ? t.tryAgain : undefined}
                onRetry={
                  analysis.file
                    ? () => void analysis.analyze(language)
                    : undefined
                }
              />
            ) : null}
          </section>
        )}
      </main>

      <footer className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 border-t border-line/70 py-5 text-center text-[11px] text-muted sm:flex-row sm:text-start">
          <p className="font-medium">
            Receipt Reader <span className="mx-1 text-line">·</span>{' '}
            {t.mockBadge}
          </p>
          <p className="max-w-xl text-muted/80">{t.mockNote}</p>
        </div>
      </footer>
    </div>
  )
}
