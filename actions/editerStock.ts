'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const StockFormSchema = z.object({
  id: z.string().nullable(),
  idArticle: z.string(),
  available: z.coerce.number().positive(),
  alertWhenBelow: z.coerce.number().positive(),
})

export async function editerStock(prevState: any, formData: FormData) {
  const validatedFields = StockFormSchema.safeParse({
    id: formData.get('id') as string,
    idArticle: formData.get('idArticle') as string,
    available: formData.get('available') as string,
    alertWhenBelow: formData.get('alertWhenBelow') as string,
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

  const { id, idArticle, available, alertWhenBelow } = validatedFields.data

  log.info('got those values', {
    id,
    idArticle,
    available,
    alertWhenBelow,
  })

  const isNewStock = id === ''

  if (isNewStock) {
    // Make the actual insertion
    const stock = await prisma.stock.create({
      data: {
        available,
        alertWhenBelow,
        article: {
          connect: {
            id: idArticle,
          },
        },
      },
    })
    log.info('created stock', { stock })
  } else {
    // Make the actual update
    const stock = await prisma.stock.update({
      where: { id: id! },
      data: { available, alertWhenBelow },
    })
    log.info('updated stock', { stock })
  }

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Stock de l\'article '${idArticle}' enregistré`,
    errors: null,
  }
}
