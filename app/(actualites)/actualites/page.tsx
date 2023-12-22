import React from 'react'

import { Metadata } from 'next'
import prisma from '@/lib/db'
import Image from 'next/image'
import { formatDate } from '@/constants/constants'
import ActualitesMiniatures from '@/components/main/ActualitesMiniatures'

export const metadata: Metadata = {
  title: 'Actualités - Saint-Médard Handball',
}
type Props = {}

const page = async (props: Props) => {
  const actualites = await prisma.actualite.findMany()

  return (
    <>
      <ActualitesMiniatures actualites={actualites} />
    </>
  )
}

export default page
