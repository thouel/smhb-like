'use server'

import prisma from '@/lib/db'
import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/types'
import { log } from '@logtail/next'
import { z } from 'zod'

const MessageContactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' }),
  email: z.string().email("L'email doit être valide"),
  message: z
    .string()
    .min(10, {
      message: 'Le message doit contenir au moins 10 caractères',
    })
    .max(1000, {
      message: 'Le message doit contenir au maximum 1000 caractères',
    }),
})

export async function envoyerMessageContact(
  prevState: any,
  formData: FormData,
) {
  const validatedFields = MessageContactFormSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
  })

  log.info('envoyerMessageContact', { prevState, formData })

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

  const { name, email, message } = validatedFields.data

  log.info('received', { name, email, message })
  const messageInDb = await prisma.message.create({
    data: {
      name,
      email,
      message,
      status: MESSAGE_STATUS.TODO,
      type: MESSAGE_TYPE.CONTACT,
    },
  })

  // Reset the form
  formData.delete('nom')
  formData.delete('email')
  formData.delete('message')

  return {
    success: true,
    message: 'Votre message a bien été reçu',
    errors: null,
  }
}
