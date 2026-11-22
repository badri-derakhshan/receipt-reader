import { AlertTriangle, RotateCcw } from 'lucide-react'

interface ErrorNoticeProps {
  title: string
  message: string
  retryLabel?: string
  onRetry?: () => void
  className?: string
}

export function ErrorNotice({
  title,
  message,
  retryLabel,
  onRetry,
  className = '',
}: ErrorNoticeProps) {
  return (
    <div
      role="alert"
      className={`flex flex-col gap-3 rounded-2xl border border-danger/20 bg-danger-soft p-4 sm:flex-row sm:items-center ${className}`}
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-danger/10 text-danger">
        <AlertTriangle className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-danger">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-danger/80">{message}</p>
      </div>
      {onRetry && retryLabel ? (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-danger px-3.5 py-2 text-xs font-medium text-card transition hover:bg-danger/90 sm:self-auto"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" />
          {retryLabel}
        </button>
      ) : null}
    </div>
  )
}
