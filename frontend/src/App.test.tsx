import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import App from './App'
import { makeResponse } from './test/fixtures'
import type { LanguageCode } from './types'

function stubSuccessfulApi() {
  const fetchMock = vi.fn((_input: RequestInfo | URL, init?: RequestInit) => {
    const form = init?.body as FormData
    const language = form.get('language') as LanguageCode
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => makeResponse(language),
    } as Response)
  })
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

function receiptFile(): File {
  return new File(['fake receipt bytes'], 'receipt.jpg', { type: 'image/jpeg' })
}

async function uploadAndAnalyze(user: ReturnType<typeof userEvent.setup>) {
  await user.upload(
    screen.getByLabelText('Choose file') as HTMLInputElement,
    receiptFile(),
  )
  await user.click(screen.getByRole('button', { name: 'Analyze receipt' }))
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('App', () => {
  it('associates the upload area with the file input', () => {
    render(<App />)

    const input = screen.getByLabelText('Choose file') as HTMLInputElement
    const label = screen.getByText('Upload your receipt').closest('label')
    expect(label).toHaveAttribute('for', input.id)
  })

  it('analyzes a receipt and re-runs the analysis when the language changes', async () => {
    const fetchMock = stubSuccessfulApi()
    const user = userEvent.setup()
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Every receipt, neatly sorted.' }),
    ).toBeInTheDocument()

    await uploadAndAnalyze(user)

    expect(await screen.findByText('K-Market (en)')).toBeInTheDocument()
    expect(screen.getByText('Milk')).toBeInTheDocument()
    expect(screen.getByText('Dairy & Eggs')).toBeInTheDocument()
    expect(screen.getByText('Low confidence')).toBeInTheDocument()
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const firstForm = fetchMock.mock.calls[0][1]?.body as FormData
    expect(firstForm.get('language')).toBe('en')
    expect(firstForm.get('file')).toBeInstanceOf(File)

    await user.selectOptions(screen.getByLabelText('Language'), 'fa')

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
    const secondForm = fetchMock.mock.calls[1][1]?.body as FormData
    expect(secondForm.get('language')).toBe('fa')

    expect(await screen.findByText('K-Market (fa)')).toBeInTheDocument()
    expect(screen.getByText('شیر')).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('fa')
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('localizes an API error when the language changes', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({ detail: { code: 'analysis_failed' } }),
      } as Response),
    )
    vi.stubGlobal('fetch', fetchMock)
    const user = userEvent.setup()
    render(<App />)

    await uploadAndAnalyze(user)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('The receipt could not be analyzed.')

    await user.selectOptions(screen.getByLabelText('Language'), 'fa')

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'پردازش رسید ناموفق بود. دوباره تلاش کنید.',
      ),
    )
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(document.documentElement.dir).toBe('rtl')
  })
})
