import React from 'react'

import { Metadata } from 'next'
import Image from 'next/image'
import prisma from '@/lib/db'
import AfficherActualite from '@/components/main/AfficherActualite'

export const metadata: Metadata = {
  title: 'Actualités - Saint-Médard Handball',
}

const Page = async ({ params }: { params: { id: string; titre: string } }) => {
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id: params.id },
  })
  return (
    <>
      <AfficherActualite actualite={actualite} />
    </>
  )
}

export default Page
