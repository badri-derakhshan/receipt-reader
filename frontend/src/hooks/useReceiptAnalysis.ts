import { useCallback, useEffect, useRef, useState } from 'react'

import { analyzeReceipt, ReceiptApiError } from '../api/client'
import { validateFile } from '../lib/files'
import type { AnalyzeResponse, AppError, LanguageCode } from '../types'

export type AnalysisStatus = 'idle' | 'ready' | 'analyzing' | 'success' | 'error'

export function useReceiptAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [response, setResponse] = useState<AnalyzeResponse | null>(null)
  const [status, setStatus] = useState<AnalysisStatus>('idle')
  const [error, setError] = useState<AppError | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
    }
  }, [])

  const selectFile = useCallback((nextFile: File) => {
    abortRef.current?.abort()
    abortRef.current = null

    const validationCode = validateFile(nextFile)
    if (validationCode) {
      setFile(null)
      setResponse(null)
      setStatus('error')
      setError({ code: validationCode })
      return
    }

    setFile(nextFile)
    setResponse(null)
    setStatus('ready')
    setError(null)
  }, [])

  const clearFile = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setFile(null)
    setResponse(null)
    setStatus('idle')
    setError(null)
  }, [])

  const analyze = useCallback(
    async (language: LanguageCode) => {
      if (!file) {
        return
      }

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setStatus('analyzing')
      setError(null)

      try {
        const nextResponse = await analyzeReceipt(file, language, controller.signal)
        if (abortRef.current !== controller) {
          return
        }
        setResponse(nextResponse)
        setStatus('success')
      } catch (caught) {
        if (controller.signal.aborted || abortRef.current !== controller) {
          return
        }
        setError({
          code: caught instanceof ReceiptApiError ? caught.code : 'analysis_failed',
        })
        setStatus('error')
      }
    },
    [file],
  )

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setStatus(response ? 'success' : 'ready')
    setError(null)
  }, [response])

  const reset = useCallback(() => {
    clearFile()
  }, [clearFile])

  return {
    file,
    response,
    status,
    error,
    selectFile,
    clearFile,
    analyze,
    cancel,
    reset,
  }
}
