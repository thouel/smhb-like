'use server'

import type { Message } from '@prisma/client'
import prisma from '@/lib/db'
import { log } from '@logtail/next'
import { z } from 'zod'
import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/types'
import { revalidatePath } from 'next/cache'

const ReponseContactFormSchema = z.object({
  parentMessageId: z.string(),
  message: z
    .string()
    .min(10, {
      message: 'Le message doit contenir au moins 10 caractères',
    })
    .max(1000, {
      message: 'Le message doit contenir au maximum 1000 caractères',
    }),
})

export async function envoyerReponseContact(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = ReponseContactFormSchema.safeParse({
    parentMessageId: formData.get('parentMessageId') as string,
    message: formData.get('message') as string,
  })

  log.info('envoyerReponseContact', { formData })

  if (!validatedFields.success) {
    log.error('validation error', {
      errors: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      message: '',
      errors: { ...validatedFields.error.flatten().fieldErrors },
    }
  }

  const { parentMessageId, message } = validatedFields.data

  log.info('received', { message })

  // Get parent message in db
  const parentMessage = await prisma.message.findUnique({
    where: { id: parentMessageId },
  })

  if (!parentMessage) {
    return {
      success: false,
      message: '',
      errors: null,
    }
  }

  // Save in db
  const messageEnregistre = await prisma.message.create({
    data: {
      email: parentMessage.email,
      name: parentMessage.name,
      status: MESSAGE_STATUS.DONE,
      type: MESSAGE_TYPE.CONTACT,
      parent: { connect: { id: parentMessage.id } },
      message: message,
    },
  })

  const parentMessageEnregistre = await prisma.message.update({
    where: { id: parentMessage.id },
    data: {
      status: MESSAGE_STATUS.DONE,
    },
  })

  log.info('saved', { messageEnregistre })

  //TODO: actually send mail

  formData.delete('message')

  revalidatePath('/admin/messages')

  return {
    success: true,
    message: 'La réponse a bien été envoyée',
    errors: null,
  }
}
