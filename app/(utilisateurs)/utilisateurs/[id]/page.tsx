import React from 'react'

import { Metadata } from 'next'
import prisma from '@/lib/db'
import AfficherUtilisateur from '@/components/main/AfficherUtilisateur'

export const metadata: Metadata = {
  title: 'Utilisateurs - Saint-Médard Handball',
}

const Page = async ({ params }: { params: { id: string; titre: string } }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.id },
  })
  return (
    <>
      <AfficherUtilisateur user={user} />
    </>
  )
}

export default Page
