'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { put } from '@vercel/blob'
import prisma from '@/lib/db'

const ActualiteFormSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
})

export async function creerActualite(prevState: any, formData: FormData) {
  const validatedFields = ActualiteFormSchema.safeParse({
    title: formData.get('title')?.toString(),
    description: formData.get('description')?.toString(),
  })
  const image: File | null = formData.get('image') as unknown as File

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    }
  }

  const { title, description } = validatedFields.data

  let url = null
  if (image) {
    const r = await put(`smhb/actualites/${image.name}`, image, {
      access: 'public',
    })
    url = r.url
  }

  // Make the actual insertion
  await prisma.actualite.create({
    data: { title: title, description: description, image: url },
  })

  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
  return {
    success: true,
    message: `Actualité '${title}' enregistrée`,
    errors: null,
  }
}
