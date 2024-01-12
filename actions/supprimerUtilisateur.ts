'use server'
import prisma from '@/lib/db'
import type { User } from '@prisma/client'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

export async function supprimerUtilisateur(user: User) {
  const userSupprime = await prisma.user.delete({ where: { id: user.id } })
  if (userSupprime.image) {
    await del(userSupprime.image)
  }
  revalidatePath('/admin/utilisateurs')
  revalidatePath('/utilisateurs')
}
