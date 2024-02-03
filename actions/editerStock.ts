'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const StockFormSchema = z.object({
  id: z.string().nullable(),
  variantId: z.string(),
  available: z.coerce.number().nonnegative(),
  alertWhenBelow: z.coerce.number().nonnegative(),
})

export async function editerStock(prevState: any, formData: FormData) {
  const validatedFields = StockFormSchema.safeParse({
    id: formData.get('id') as string,
    variantId: formData.get('variantId') as string,
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

  const { id, variantId, available, alertWhenBelow } = validatedFields.data

  log.info('got those values', {
    id,
    variantId,
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
        variant: {
          connect: {
            id: variantId,
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
    message: `Stock du variant '${variantId}' enregistré`,
    errors: null,
  }
}
