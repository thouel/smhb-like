'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { del, put } from '@vercel/blob'
import prisma from '@/lib/db'
import { validateImage } from '@/lib/utils'

const ActualiteFormSchema = z.object({
  id: z.string().nullable(),
  title: z.string().min(5),
  description: z.string().nullable(),
})

export async function editerActualite(prevState: any, formData: FormData) {
  const validatedFields = ActualiteFormSchema.safeParse({
    id: formData.get('id') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  })
  const removeCurrentImage: string = formData.get(
    'removeCurrentImage',
  ) as string
  const prevImage: string = formData.get('prevImage') as string
  const image: File | null = formData.get('image') as unknown as File

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      errors: { ...validatedFields.error.flatten().fieldErrors, image: [] },
      message: '',
    }
  }

  // Validate image
  if (image.size) {
    try {
      const valid = validateImage(image)
    } catch (e: any) {
      return {
        success: false,
        errors: { image: [e.message], title: [], description: [] },
        message: '',
      }
    }
  }

  const { id, title, description } = validatedFields.data

  log.info('got those values', {
    id,
    title,
    description,
    image,
    prevImage,
    removeCurrentImage,
  })

  const isNewActualite = id === ''

  if (isNewActualite) {
    let url = null
    if (image.size) {
      const r = await put(`smhb/actualites/${image.name}`, image, {
        access: 'public',
      })
      url = r.url
    }
    // Make the actual insertion
    const actualite = await prisma.actualite.create({
      data: { title: title, description: description, image: url },
    })
    log.info('created actualite', { actualite })
  } else {
    // If a new image is posted, remove the old image if necessary
    // then post new image
    let url = null
    // If the user asked explicitly to remove the image
    // or if he posted a new one
    if (
      prevImage != null &&
      prevImage != '' &&
      (removeCurrentImage || image.size)
    ) {
      await del(prevImage)
    }

    if (image.size) {
      const r = await put(`smhb/actualites/${image.name}`, image, {
        access: 'public',
      })
      url = r.url
    }

    // Make the actual update
    const actualite = await prisma.actualite.update({
      where: { id: id === null ? undefined : id },
      data: { title: title, description: description, image: url },
    })
    log.info('updated actualite', { actualite })
  }

  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
  return {
    success: true,
    message: `Actualité '${title}' enregistrée`,
    errors: null,
  }
}
