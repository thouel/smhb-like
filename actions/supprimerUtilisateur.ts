'use server'
import prisma from '@/lib/db'
import type { User } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function supprimerUtilisateur(user: User) {
  await prisma.user.delete({ where: { id: user.id } })
  revalidatePath('/admin/utilisateurs')
  revalidatePath('/utilisateurs')
}
