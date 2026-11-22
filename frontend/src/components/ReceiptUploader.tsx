import { FileText, RefreshCw, Trash2, UploadCloud } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState, type DragEvent } from 'react'

import type { UIStrings } from '../i18n/ui'
import { cn } from '../lib/cn'
import { FILE_ACCEPT, getExtension, isImageFile, isPdfFile } from '../lib/files'
import { formatBytes } from '../lib/format'

interface ReceiptUploaderProps {
  file: File | null
  locale: string
  t: UIStrings
  disabled?: boolean
  onSelect: (file: File) => void
  onRemove: () => void
}

export function ReceiptUploader({
  file,
  locale,
  t,
  disabled = false,
  onSelect,
  onRemove,
}: ReceiptUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const [dragActive, setDragActive] = useState(false)

  const previewUrl = useMemo(() => {
    if (!file || !isImageFile(file)) {
      return null
    }
    return URL.createObjectURL(file)
  }, [file])

  useEffect(() => {
    if (!previewUrl) {
      return
    }
    return () => URL.revokeObjectURL(previewUrl)
  }, [previewUrl])

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleFiles = (files: FileList | null) => {
    const next = files?.[0]
    if (next) {
      onSelect(next)
    }
  }

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    setDragActive(false)
    if (!disabled) {
      handleFiles(event.dataTransfer.files)
    }
  }

  const fileKind = file
    ? isPdfFile(file)
      ? 'PDF'
      : (getExtension(file.name).toUpperCase() || 'IMAGE')
    : ''

  return (
    <div>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={FILE_ACCEPT}
        disabled={disabled}
        onChange={(event) => {
          handleFiles(event.target.files)
          event.target.value = ''
        }}
        className="sr-only"
        aria-label={t.browse}
      />

      {file ? (
        <div className="rise-in rounded-[2rem] border border-line bg-card p-4 shadow-card">
          <div className="flex items-center gap-4">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border border-line bg-paper">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={file.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="grid size-full place-items-center text-accent">
                  <FileText className="size-8" strokeWidth={1.6} aria-hidden="true" />
                </div>
              )}
              <span className="absolute bottom-1 start-1 rounded-md bg-ink/80 px-1.5 py-0.5 text-[9px] font-semibold tracking-wider text-paper">
                {fileKind}
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
              <p className="mt-1 text-xs text-muted">
                {formatBytes(file.size, locale)}
                {file.type ? ` · ${file.type}` : ''}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={openPicker}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition hover:border-accent/40 hover:bg-accent-soft/50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <RefreshCw className="size-3.5" aria-hidden="true" />
                  {t.changeFile}
                </button>
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={disabled}
                  className="inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-danger-soft hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="size-3.5" aria-hidden="true" />
                  {t.removeFile}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <label
          htmlFor={disabled ? undefined : inputId}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openPicker()
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault()
            if (!disabled) {
              setDragActive(true)
            }
          }}
          onDragOver={(event) => {
            event.preventDefault()
            if (!disabled) {
              setDragActive(true)
            }
          }}
          onDragLeave={(event) => {
            event.preventDefault()
            setDragActive(false)
          }}
          onDrop={handleDrop}
          className={cn(
            'group relative flex min-h-72 cursor-pointer flex-col items-center justify-center gap-5 rounded-[2rem] border-2 border-dashed px-6 py-10 text-center transition duration-200',
            dragActive
              ? 'scale-[1.01] border-accent bg-accent-soft/60 shadow-card'
              : 'border-line bg-card/70 hover:border-accent/40 hover:bg-card',
            disabled && 'pointer-events-none opacity-60',
          )}
        >
          <span
            className={cn(
              'grid size-20 place-items-center rounded-3xl transition',
              dragActive
                ? 'bg-accent text-card'
                : 'bg-accent-soft text-accent group-hover:scale-105',
            )}
          >
            <UploadCloud className="size-9" strokeWidth={1.7} aria-hidden="true" />
          </span>

          <span className="max-w-sm">
            <span className="block text-lg font-semibold text-ink">
              {dragActive ? t.dropActive : t.uploadTitle}
            </span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">
              {t.uploadHint}
            </span>
          </span>

          <span className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition group-hover:bg-accent-strong">
            {t.browse}
          </span>

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
            {t.supportedFormats}
          </span>
        </label>
      )}
    </div>
  )
}
