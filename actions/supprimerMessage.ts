'use server'
import type { Message } from '@prisma/client'
import prisma from '@/lib/db'
import type { MessageWithAnswer } from '@/types'
import { revalidatePath } from 'next/cache'
import { log } from '@logtail/next'

export async function supprimerMessage(message: MessageWithAnswer) {
  if (!message) {
    return null
  }

  log.info('message reçu', { message })

  if (!!message.answer) {
    const deleteAnswer = prisma.message.delete({
      where: { id: message.answer.id },
    })

    const deleteMessage = prisma.message.delete({
      where: { id: message.id },
    })

    const tx = await prisma.$transaction([deleteAnswer, deleteMessage])
    log.info('2 messages supprimés')
  } else {
    const deleteMessage = await prisma.message.delete({
      where: { id: message.id },
    })
    log.info('1 message supprimé')
  }

  revalidatePath('/admin/messages')
}
