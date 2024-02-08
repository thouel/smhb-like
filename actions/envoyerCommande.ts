'use server'

import prisma from '@/lib/db'
import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/types'
import { log } from '@logtail/next'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

type Panier = {
  id: string
  quantite: string
}

export default async function envoyerCommande(formData: FormData) {
  const session = await getServerSession()

  if (!session || !session.user) {
    log.error('User not logged in')
    return
  }

  let idx = 0
  const panier: Panier[] = []
  formData.forEach((value: FormDataEntryValue, key) => {
    if (key.startsWith('id')) {
      panier[idx] = { ...panier[idx], id: value.toString() }
    }
    if (key.startsWith('quantite')) {
      panier[idx] = { ...panier[idx], quantite: value.toString() }
      idx++
    }
  })

  let message = ''
  panier.map((item) => (message = `${message};${item.id}:${item.quantite}`))

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    log.error('User not found')
    return
  }

  const messageInDb = await prisma.message.create({
    data: {
      name: user.name,
      email: user.email === null ? '' : user.email,
      message: `${message}`,
      status: MESSAGE_STATUS.TODO,
      type: MESSAGE_TYPE.ORDER,
    },
  })

  log.info('Message enregistré', { messageInDb })

  revalidatePath('/admin/messages')

  return {
    success: true,
    message: 'Votre message a bien été reçu',
    errors: null,
  }
}
