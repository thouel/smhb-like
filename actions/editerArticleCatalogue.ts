'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const ArticleCatalogueFormSchema = z.object({
  id: z.string().nullable(),
  type: z.string(),
  title: z.string().min(3),
  description: z.string().optional(),
  size: z.string(),
  unitPriceInEuros: z.coerce.number().positive(),
})

export async function editerArticleCatalogue(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = ArticleCatalogueFormSchema.safeParse({
    id: formData.get('id') as string,
    type: formData.get('type') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    size: formData.get('size') as string,
    unitPriceInEuros: formData.get('unitPriceInEuros') as string,
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

  const { id, type, title, description, size, unitPriceInEuros } =
    validatedFields.data

  log.info('got those values', {
    id,
    type,
    title,
    description,
    size,
    unitPriceInEuros,
  })

  const isNewArticle = id === ''

  if (isNewArticle) {
    // Make the actual insertion
    const article = await prisma.article.create({
      data: {
        type,
        title,
        description: description ? description : '',
        size,
        unitPriceInEuros,
      },
    })
    log.info('created article', { article })
  } else {
    // Make the actual update
    const article = await prisma.article.update({
      where: { id: id! },
      data: { type, title, description, size, unitPriceInEuros },
    })
    log.info('updated article', { article })
  }

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Article '${title}' enregistré`,
    errors: null,
  }
}
