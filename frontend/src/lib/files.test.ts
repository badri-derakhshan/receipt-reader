import { describe, expect, it } from 'vitest'

import { MAX_UPLOAD_BYTES, validateFile } from './files'

function fakeFile(name: string, type: string, size = 128): File {
  return { name, type, size } as File
}

describe('validateFile', () => {
  it('accepts supported image and PDF types', () => {
    expect(validateFile(fakeFile('receipt.jpg', 'image/jpeg'))).toBeNull()
    expect(validateFile(fakeFile('receipt.png', 'image/png'))).toBeNull()
    expect(validateFile(fakeFile('receipt.webp', 'image/webp'))).toBeNull()
    expect(validateFile(fakeFile('receipt.pdf', 'application/pdf'))).toBeNull()
  })

  it('falls back to the extension when the browser omits the MIME type', () => {
    expect(validateFile(fakeFile('receipt.PDF', ''))).toBeNull()
    expect(validateFile(fakeFile('receipt.JPEG', ''))).toBeNull()
  })

  it('rejects unsupported types', () => {
    expect(validateFile(fakeFile('receipt.gif', 'image/gif'))).toBe('unsupportedFile')
    expect(validateFile(fakeFile('receipt.heic', 'image/heic'))).toBe('unsupportedFile')
    expect(validateFile(fakeFile('notes.txt', 'text/plain'))).toBe('unsupportedFile')
  })

  it('rejects empty files', () => {
    expect(validateFile(fakeFile('receipt.jpg', 'image/jpeg', 0))).toBe('invalidFile')
  })

  it('rejects files over 15 MB', () => {
    expect(
      validateFile(fakeFile('receipt.jpg', 'image/jpeg', MAX_UPLOAD_BYTES + 1)),
    ).toBe('tooLarge')
  })
})
