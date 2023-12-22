'use server'

import prisma from '@/lib/db'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const UserFormSchema = z.object({
  // ^(?=.{6,20}$)(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9._-]+(?<![-_.])$
  //  └─────┬────┘└───┬───┘└──────┬─────┘└─────┬──────┘ └───┬────┘
  //        │         │           │            │           no - _ or . at the end
  //        │         │           │            │
  //        │         │           │            allowed characters
  //        │         │           │
  //        │         │           no -_ _- -- __ or _. or ._ or .. inside
  //        │         │
  //        │         no - _ or . at the beginning
  //        │
  //        username is 6-20 characters long
  username: z
    .string()
    .regex(
      /^(?=.{6,20}$)(?![-_.])(?!.*[-_.]{2})[a-zA-Z0-9._-]+(?<![-_.])$/,
      "Le nom d'utilisateur est mal formé",
    ),
  password: z
    .string()
    .regex(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/,
      'Le mot de passe est mal formé',
    ),
})

export async function creerUtilisateur(prevState: any, formData: FormData) {
  const validatedFields = UserFormSchema.safeParse({
    username: formData.get('username')?.toString(),
    password: formData.get('password')?.toString(),
  })

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: '',
    }
  }

  const { username, password } = validatedFields.data

  // Make the actual insertion
  await prisma.user.create({ data: { name: username, password: password } })

  revalidatePath('/utilisateurs')
  return {
    success: true,
    message: `Utilisateur ${username} créé`,
    errors: null,
  }
}
