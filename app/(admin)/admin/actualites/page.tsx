import AjouterActualite from '@/components/main/AjouterActualite'
import ListerActualites from '@/components/main/ListerActualites'
import prisma from '@/lib/db'
import React from 'react'
import type { Actualite } from '@prisma/client'

const Page = async () => {
  const actualites = await prisma.actualite.findMany()
  return (
    <>
      <ListerActualites actualites={actualites} />
      <AjouterActualite />
    </>
  )
}

export default Page
