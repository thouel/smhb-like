'use server'
import prisma from '@/lib/db'
import { REFERENCE_STATUS } from '@/types'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const VariantCatalogueFormSchema = z.object({
  id: z.string().nullable(),
  refId: z.string(),
  size: z.string(),
  unitPriceInEuros: z.coerce.number().positive(),
})

export async function editerVariantCatalogue(
  prevState: any,
  formData: FormData,
) {
  log.info('refId found:', { res: formData.get('refId') })
  const validatedFields = VariantCatalogueFormSchema.safeParse({
    id: formData.get('id') as string,
    refId: formData.get('refId') as string,
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

  const { id, refId, size, unitPriceInEuros } = validatedFields.data

  log.info('got those values', {
    id,
    refId,
    size,
    unitPriceInEuros,
  })

  const isNew = id === ''

  if (isNew) {
    // Make the actual insertion
    const variant = await prisma.articleVariant.create({
      data: {
        refId,
        size,
        unitPriceInEuros,
      },
    })
    log.info('created variant', { variant })
  } else {
    // Make the actual update
    const variant = await prisma.articleVariant.update({
      where: { id: id! },
      data: {
        size,
        unitPriceInEuros,
      },
    })
    log.info('updated variant', { variant })
  }

  revalidatePath('/admin/boutique/variants')
  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Variant '${id}' enregistré`,
    errors: null,
  }
}
