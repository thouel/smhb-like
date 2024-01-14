import React from 'react'

import { Metadata, ResolvingMetadata } from 'next'
import prisma from '@/lib/db'
import AfficherActualite from '@/components/main/AfficherActualite'
import ActualitesMiniatures from '@/components/main/ActualitesMiniatures'
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
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id },
  })

  if (!actualite) {
    return {
      title: 'Actualité non trouvée',
    }
  }

  return {
    title: actualite.title,
  }
}

const Page = async ({ params }: { params: { id: string; titre: string } }) => {
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id: params.id },
  })

  if (!actualite) {
    notFound()
  }

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
