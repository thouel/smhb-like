'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const StockFormSchema = z.object({
  id: z.string().nullable(),
  refArticle: z.string(),
  available: z.number().positive(),
  alertWhenBelow: z.number().positive(),
})

export async function editerStock(prevState: any, formData: FormData) {
  const validatedFields = StockFormSchema.safeParse({
    id: formData.get('id') as string,
    refArticle: formData.get('refArticle') as string,
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

  const { id, refArticle, available, alertWhenBelow } = validatedFields.data

  log.info('got those values', {
    id,
    refArticle,
    available,
    alertWhenBelow,
  })

  const isNewStock = id === ''

  if (isNewStock) {
    // Make the actual insertion
    const stock = await prisma.stock.create({
      data: {
        article: {
          connect: {
            reference: refArticle,
          },
        },
        available,
        alertWhenBelow,
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

  revalidatePath('/admin/boutique/stock')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Stock de l\'article '${refArticle}' enregistré`,
    errors: null,
  }
}
