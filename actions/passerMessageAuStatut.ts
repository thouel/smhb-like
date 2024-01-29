'use server'

import prisma from '@/lib/db'
import { MESSAGE_STATUS } from '@/types'
import type { Message } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function passerMessageAuStatut(
  message: Message,
  status: MESSAGE_STATUS,
) {
  if (!message) {
    return
  }

  const messageMisAJour = await prisma.message.update({
    where: { id: message.id },
    data: {
      status: status,
    },
  })

  revalidatePath('/admin/messages')
}
