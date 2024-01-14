import React from 'react'

import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import AfficherUtilisateur from '@/components/main/AfficherUtilisateur'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const user = await prisma.user.findUniqueOrThrow({
    where: { id },
  })

  if (!user) {
    return {
      title: 'Utilisateur non trouvé',
    }
  }

  return {
    title: user.email,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.id },
  })

  if (!user) {
    notFound()
  }

  return (
    <>
      <AfficherUtilisateur user={user} />
    </>
  )
}

export default Page
