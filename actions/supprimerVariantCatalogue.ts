'use server'
import prisma from '@/lib/db'
import { ArticleVariantWithStockAndRef } from '@/types'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'

export async function supprimerVariantCatalogue(
  variant: ArticleVariantWithStockAndRef,
) {
  if (!variant) {
    log.error('Variant is null or undefined')
    return
  }

  const variantSupprime = await prisma.articleVariant.delete({
    where: { id: variant.id },
  })

  revalidatePath('/admin/boutique/variants')
  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
}
