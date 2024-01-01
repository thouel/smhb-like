'use server'

import prisma from '@/lib/db'
import { log } from '@logtail/next'
import type { Actualite } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function supprimerActualite(actualite: Actualite) {
  const actualiteSupprimee: Actualite = await prisma.actualite.delete({
    where: { id: actualite.id },
  })
  if (actualiteSupprimee.image) {
    await del(actualiteSupprimee.image)
  }
  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
}
