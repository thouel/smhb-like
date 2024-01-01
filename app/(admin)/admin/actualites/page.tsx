import ListerActualites from '@/components/main/ListerActualites'
import prisma from '@/lib/db'
import React from 'react'

const Page = async () => {
  const actualites = await prisma.actualite.findMany()
  return (
    <>
      <ListerActualites actualites={actualites} />
    </>
  )
}

export default Page
