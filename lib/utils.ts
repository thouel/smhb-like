import { type ClassValue, clsx } from 'clsx'
import { Session } from 'next-auth'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAdmin(session: Session): boolean {
  return session?.user?.role === 0
}

export function isUser(session: Session): boolean {
  return session?.user?.role === 1
}

export function normalizeUrlPart(input: string): string {
  // Remove leading and trailing whitespaces
  let normalizedInput = input.trim()

  // Replace spaces with hyphens
  normalizedInput = normalizedInput.replace(/\s+/g, '-')

  // Remove special characters, leaving only alphanumeric, hyphen, and underscore
  normalizedInput = normalizedInput.replace(/[^a-zA-Z0-9-_]/g, '')

  // Convert to lowercase
  normalizedInput = normalizedInput.toLowerCase()

  return normalizedInput
}

export function extractFilename(input: string): string | undefined {
  return input?.split('\\')?.pop()?.split('/').pop()
}

export function isPdf(input: string): boolean {
  return !!extractFilename(input)?.endsWith('.pdf')
}

export function validateImage(image: File): boolean {
  // Array of allowed files
  const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif', 'webp', 'pdf']
  const array_of_allowed_file_types = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
    'application/pdf',
  ]

  // Allowed file size in mb
  const allowed_file_size = 4

  // Get the extension of the uploaded file
  const file_extension = image.name.slice(
    ((image.name.lastIndexOf('.') - 1) >>> 0) + 2,
  )

  // Check if the uploaded file is allowed
  if (
    !array_of_allowed_files.includes(file_extension) ||
    !array_of_allowed_file_types.includes(image.type)
  ) {
    throw Error('Fichier invalide')
  }

  if (image.size / (1024 * 1024) > allowed_file_size) {
    throw Error('Fichier trop volumineux')
  }

  return true
}

export function capitalize(input: string) {
  return input[0].toUpperCase() + input.slice(1).toLowerCase()
}
