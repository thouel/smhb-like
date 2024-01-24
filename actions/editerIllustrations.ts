'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'

const IllustrationsFormSchema = z.object({
  idArticle: z.string(),
})

export async function editerIllustrations(formData: FormData) {
  const validatedFields = IllustrationsFormSchema.safeParse({
    idArticle: formData.get('idArticle') as string,
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

  const { idArticle } = validatedFields.data

  const newImages: File[] = []
  formData.getAll('newImages').forEach((fd, i) => {
    newImages[i] = fd as File
  })

  log.info('got those values', {
    idArticle,
    newImages,
  })

  // const isNewStock = id === ''

  // if (isNewStock) {
  //   // Make the actual insertion
  //   const stock = await prisma.stock.create({
  //     data: {
  //       available,
  //       alertWhenBelow,
  //       article: {
  //         connect: {
  //           id: idArticle,
  //         },
  //       },
  //     },
  //   })
  //   log.info('created stock', { stock })
  // } else {
  //   // Make the actual update
  //   const stock = await prisma.stock.update({
  //     where: { id: id! },
  //     data: { available, alertWhenBelow },
  //   })
  //   log.info('updated stock', { stock })
  // }

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Illustration de l\'article '${idArticle}' enregistrée`,
    errors: null,
  }
}
