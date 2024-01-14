import React from 'react'

import { Metadata } from 'next'
import prisma from '@/lib/db'
import ActualitesMiniatures from '@/components/main/ActualitesMiniatures'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Actualités',
}

const page = async () => {
  const actualites = await prisma.actualite.findMany()

  if (!actualites || actualites.length === 0) {
    notFound()
  }

  return (
    <>
      <ActualitesMiniatures actualites={actualites} />
    </>
  )
}

export default page
