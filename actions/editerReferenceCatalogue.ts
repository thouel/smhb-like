'use server'
import prisma from '@/lib/db'
import { REFERENCE_STATUS } from '@/types'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const ReferenceCatalogueFormSchema = z.object({
  id: z.string().nullable(),
  type: z.string(),
  displayName: z.string().min(3),
  description: z.string().optional(),
})

export async function editerReferenceCatalogue(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = ReferenceCatalogueFormSchema.safeParse({
    id: formData.get('id') as string,
    type: formData.get('type') as string,
    displayName: formData.get('displayName') as string,
    description: formData.get('description') as string,
  })

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      errors: { ...validatedFields.error.flatten().fieldErrors },
      message: '',
    }
  }

  const { id, type, displayName, description } = validatedFields.data

  log.info('got those values', {
    id,
    type,
    displayName,
    description,
  })

  const isNewArticle = id === ''

  if (isNewArticle) {
    // Make the actual insertion
    const reference = await prisma.articleReference.create({
      data: {
        type,
        displayName,
        status: REFERENCE_STATUS.DRAFT,
        description: description != null ? description : '',
      },
    })
    log.info('created reference', { reference })
  } else {
    // Make the actual update
    const reference = await prisma.articleReference.update({
      where: { id: id! },
      data: {
        type,
        displayName,
        description: description != null ? description : '',
      },
    })
    log.info('updated reference', { reference })
  }

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Reference '${displayName}' enregistrée`,
    errors: null,
  }
}
