'use server'
import prisma from '@/lib/db'
import { ArticleReferenceWithIllustrations } from '@/types'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { supprimerIllustrations } from './supprimerIllustrations'

export async function supprimerReferenceCatalogue(
  reference: ArticleReferenceWithIllustrations,
) {
  if (!reference) {
    log.error('Reference is null or undefined')
    return
  }

  await supprimerIllustrations(reference.id, reference?.illustrations)

  const referenceSupprime = await prisma.articleReference.delete({
    where: { id: reference.id },
  })

  revalidatePath('/admin/boutique')
  revalidatePath('/boutique')
}
