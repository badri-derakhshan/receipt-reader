import type { AnalyzeResponse, LanguageCode } from '../types'

const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '')

export class ReceiptApiError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, status: number) {
    super(`Receipt analysis failed (${status})`)
    this.name = 'ReceiptApiError'
    this.code = code
    this.status = status
  }
}

export async function analyzeReceipt(
  file: File,
  language: LanguageCode,
  signal?: AbortSignal,
): Promise<AnalyzeResponse> {
  const form = new FormData()
  form.append('file', file)
  form.append('language', language)

  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: form,
    signal,
  })

  const payload = (await response.json().catch(() => null)) as
    | { detail?: { code?: string } }
    | AnalyzeResponse
    | null

  if (!response.ok) {
    const code =
      payload && 'detail' in payload && payload.detail?.code
        ? payload.detail.code
        : 'analysis_failed'
    throw new ReceiptApiError(code, response.status)
  }

  return payload as AnalyzeResponse
}
