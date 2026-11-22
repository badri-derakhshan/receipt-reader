import type { FileErrorCode } from '../types'

export const MAX_UPLOAD_BYTES = 15 * 1024 * 1024

export const FILE_ACCEPT = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
].join(',')

const ACCEPTED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/pdf',
])

const ACCEPTED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'pdf'])

export function getExtension(filename: string): string {
  const parts = filename.toLowerCase().split('.')
  return parts.length > 1 ? parts[parts.length - 1] : ''
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp'].includes(getExtension(file.name))
}

export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || getExtension(file.name) === 'pdf'
}

export function validateFile(file: File): FileErrorCode | null {
  if (file.size === 0) {
    return 'invalidFile'
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return 'tooLarge'
  }

  const typeAccepted = file.type ? ACCEPTED_MIME_TYPES.has(file.type) : false
  const extensionAccepted = ACCEPTED_EXTENSIONS.has(getExtension(file.name))

  if (!typeAccepted && !extensionAccepted) {
    return 'unsupportedFile'
  }

  return null
}
