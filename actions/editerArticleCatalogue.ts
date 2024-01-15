'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const ArticleCatalogueFormSchema = z.object({
  id: z.string().nullable(),
  type: z.string(),
  title: z.string().min(5),
  description: z.string().optional(),
  reference: z.string(),
  size: z.string(),
  unitPriceInEuros: z.number().positive(),
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
    reference: formData.get('reference') as string,
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

  const { id, type, title, description, reference, size, unitPriceInEuros } =
    validatedFields.data

  log.info('got those values', {
    id,
    type,
    title,
    description,
    reference,
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
        reference,
        size,
        unitPriceInEuros,
      },
    })
    log.info('created article', { article })
  } else {
    // Make the actual update
    const article = await prisma.article.update({
      where: { id: id! },
      data: { type, title, description, reference, size, unitPriceInEuros },
    })
    log.info('updated article', { article })
  }

  revalidatePath('/admin/boutique/article')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Article '${title}' enregistré`,
    errors: null,
  }
}
