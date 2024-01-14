import ListerActualites from '@/components/main/ListerActualites'
import prisma from '@/lib/db'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Actualités',
}

const Page = async () => {
  const actualites = await prisma.actualite.findMany()
  return (
    <>
      <ListerActualites actualites={actualites} />
    </>
  )
}

export default Page
