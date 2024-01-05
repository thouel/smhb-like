import React from 'react'

import { Metadata } from 'next'
import ClubHero from '@/components/sub/ClubHero'
import ClubHistorique from '@/components/sub/ClubHistorique'

export const metadata: Metadata = {
  title: 'Notre club - Saint-Médard Handball',
}

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <div
        className='w-full min-h-[50px] bg-cover bg-center flex flex-row justify-center gap-5 py-24 text-white'
        style={{
          backgroundImage: `url('/11.webp')`,
          backgroundColor: `#907C13`,
        }}
      >
        <h1 className='font-semibold text-7xl'>Le club</h1>
      </div>
      <ClubHero />
      <ClubHistorique />
    </>
  )
}

export default page
