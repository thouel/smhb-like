'use server'

import prisma from '@/lib/db'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'

export async function createUser(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString()
  const password = formData.get('password')?.toString()

  log.info('user rcvd', { username, password })

  if (!username) {
    return { message: `Aucun utilisateur créé` }
  }

  // Make the actual insertion
  //@ts-ignore
  await prisma.user.create({ data: { name: username, password: password } })

  revalidatePath('/utilisateurs')
  return { message: `Utilisateur ${username} créé` }
}
