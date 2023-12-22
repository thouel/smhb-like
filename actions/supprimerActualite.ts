'use server'

import prisma from '@/lib/db'
import type { Actualite } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function supprimerActualite(actualite: Actualite) {
  await prisma.actualite.delete({ where: { id: actualite.id } })
  revalidatePath('/admin/actualites')
  revalidatePath('/actualites')
}
