'use server'
import { log } from '@logtail/next'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { del, put } from '@vercel/blob'
import prisma from '@/lib/db'
import { validateImage } from '@/lib/utils'
import bcrypt from 'bcrypt'

const UtilisateurFormSchema = z.object({
  id: z.string().nullable(),
  name: z
    .string()
    .min(3, { message: 'Le nom doit contenir au moins 3 caractères' }),
  email: z.string().email("L'email doit être valide"),
  password: z.string().nullable(),
  isAdmin: z.preprocess((value) => value === 'on', z.boolean()),
})

export async function editerUtilisateur(prevState: any, formData: FormData) {
  const validatedFields = UtilisateurFormSchema.safeParse({
    id: formData.get('id') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    isAdmin: formData.get('isAdmin') as string,
  })
  const removeCurrentImage: string = formData.get(
    'removeCurrentImage',
  ) as string
  const prevImage: string = formData.get('prevImage') as string
  const image: File | null = formData.get('image') as unknown as File

  if (!validatedFields.success) {
    log.error('validation error', {
      result: validatedFields.error.flatten().fieldErrors,
    })
    return {
      success: false,
      errors: { ...validatedFields.error.flatten().fieldErrors, image: [] },
      message: '',
    }
  }

  // Validate image
  if (image.size) {
    try {
      const valid = validateImage(image)
    } catch (e: any) {
      return {
        success: false,
        errors: {
          image: [e.message],
          name: [],
          email: [],
          password: [],
          isAdmin: [],
        },
        message: '',
      }
    }
  }

  const { id, name, email, password, isAdmin } = validatedFields.data

  log.info('got those values', {
    id,
    name,
    email,
    isAdmin,
    image,
    prevImage,
    removeCurrentImage,
  })

  const isNewUser = id === ''

  if (isNewUser) {
    let url = null
    if (image.size) {
      const r = await put(`smhb/utilisateurs/${image.name}`, image, {
        access: 'public',
      })
      url = r.url
    }

    const hashedPassword = await bcrypt.hash(password!, 10)

    // Make the actual insertion
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        image: url,
        role: isAdmin ? 0 : 1,
      },
    })
    log.info('created utilisateur', { user })
  } else {
    // If a new image is posted, remove the old image if necessary
    // then post new image
    let url = null
    // If the user asked explicitly to remove the image
    // or if he posted a new one
    if (
      prevImage != null &&
      prevImage != '' &&
      (removeCurrentImage || image.size)
    ) {
      await del(prevImage)
    }

    if (image.size) {
      const r = await put(`smhb/utilisateurs/${image.name}`, image, {
        access: 'public',
      })
      url = r.url
    }

    if (!url) {
      url = prevImage
    }

    // Make the actual update
    const user = await prisma.user.update({
      where: { id: id === null ? undefined : id },
      data: {
        name: name,
        email: email,
        image: url,
        role: isAdmin ? 0 : 1,
      },
    })
    log.info('updated utilisateur', { user })
  }

  revalidatePath('/admin/utilisateurs')
  revalidatePath('/utilisateurs')
  return {
    success: true,
    message: `Utilisateur '${name}' enregistré`,
    errors: null,
  }
}
