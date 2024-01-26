'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'
import cloudinary from '@/lib/cloudinary'
import { getBoutiqueTagName } from '@/lib/utils'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

const IllustrationsFormSchema = z.object({
  idArticle: z.string(),
})

export async function ajouterIllustrations(formData: FormData) {
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

  // Upload images to image host provider
  const uploadApiResponses: UploadApiResponse[] = []
  const uploadApiErrorResponses: UploadApiErrorResponse[] = []

  await Promise.all(
    newImages.map(async (f, idx) => {
      const arrayBuffer = await f.arrayBuffer()
      const buffer = new Uint8Array(arrayBuffer)

      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { tags: [getBoutiqueTagName()], use_filename: false },
            (err, result) => {
              if (err) {
                reject(err)
                return
              }
              resolve(result)
            },
          )
          .end(buffer)
      })
        .then((result) => {
          uploadApiResponses[uploadApiResponses.length] =
            result as UploadApiResponse
          log.info('result from cloudinary', { result })
        })
        .catch((err) => {
          uploadApiErrorResponses[uploadApiErrorResponses.length] =
            err as UploadApiErrorResponse
          log.error('upload error', { err })
        })
    }),
  )

  const data: any[] = []
  uploadApiResponses.forEach((res, idx) => {
    data[idx] = {
      title: res.original_filename ? res.original_filename : '',
      url: res.secure_url,
      public_id: res.public_id,
      articleId: idArticle,
    }
  })

  // create illustrations in db
  log.info('insert data in mongodb', { data })
  const illustrations = await prisma.illustration.createMany({
    data: data,
  })

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
  return {
    success: true,
    message: `Article '${idArticle}' enregistré`,
    errors: uploadApiErrorResponses,
  }
}
