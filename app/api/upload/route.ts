import { NextRequest, NextResponse } from 'next/server'

import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { put } from '@vercel/blob'

const ActualiteFormSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
})

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  log.info('image', { image: formData.has('image') })

  const validatedFields = ActualiteFormSchema.safeParse({
    title: formData.get('title')?.toString(),
    description: formData.get('description')?.toString(),
  })
  const image: File | null = formData.get('image') as unknown as File

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return NextResponse.json({
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    })
  }

  const { title, description } = validatedFields.data

  log.info('form data', { title, description, image })

  const { url } = await put(`smhb/actualites/${image.name}`, image, {
    access: 'public',
  })

  // Make the actual insertion
  //@ts-ignore
  await prisma.actualite.create({
    data: { title: title, description: description, image: url },
  })

  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
  return NextResponse.json({
    success: true,
    message: `Actualité '${title}' enregistrée`,
    errors: null,
  })
}
