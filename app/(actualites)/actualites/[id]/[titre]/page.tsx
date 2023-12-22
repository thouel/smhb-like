import React from 'react'

import { Metadata } from 'next'
import prisma from '@/lib/db'
import AfficherActualite from '@/components/main/AfficherActualite'
import ActualitesMiniatures from '@/components/main/ActualitesMiniatures'

export const metadata: Metadata = {
  title: 'Actualités - Saint-Médard Handball',
}

const Page = async ({ params }: { params: { id: string; titre: string } }) => {
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id: params.id },
  })
  const actualitesSimilaires = await prisma.actualite.findMany({
    where: { NOT: { id: actualite.id } },
  })
  return (
    <>
      <AfficherActualite actualite={actualite} />
      <div className='py-5 my-10 border-t-2'>
        <ActualitesMiniatures actualites={actualitesSimilaires} />
      </div>
    </>
  )
}

export default Page
