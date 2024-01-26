'use server'

import prisma from '@/lib/db'
import type { Illustration } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/lib/cloudinary'
import { log } from '@logtail/next'

export const supprimerIllustrations = async (
  articleId: string,
  illustrations: Illustration[],
) => {
  const [upload, db] = await Promise.all([
    cloudinary.api.delete_resources(illustrations.map((i) => i.public_id)),
    internal_supprimerIllustrations(articleId, illustrations),
  ])

  log.info('upload', { upload })
  log.info('db', { db })

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')

  return {
    success: true,
    message: 'Illustration supprimée',
  }
}

const internal_supprimerIllustrations = (
  articleId: string,
  illustrations: Illustration[],
): Promise<any> => {
  if (illustrations.length > 1) {
    return prisma.illustration.deleteMany({
      where: {
        articleId: articleId,
      },
    })
  } else {
    return prisma.illustration.delete({
      where: {
        id: illustrations[0].id,
      },
    })
  }
}
