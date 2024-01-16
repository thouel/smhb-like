'use server'
import prisma from '@/lib/db'
import type { Article } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function supprimerArticleCatalogue(article: Article) {
  const illustrations = await prisma.illustration.findMany({
    where: {
      articleId: article.id,
    },
  })

  illustrations.map(async (i) => {
    await del(i.url)
  })

  const articleSupprime = await prisma.article.delete({
    where: { id: article.id },
  })

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
}
