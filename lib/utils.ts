import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
