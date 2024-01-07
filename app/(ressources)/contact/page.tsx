import React from 'react'

import { Metadata } from 'next'
import FormulaireContact from '@/components/main/FormulaireContact'
import CarteContact from '@/components/main/CarteContact'

export const metadata: Metadata = {
  title: 'Contact - Saint-Médard Handball',
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
        <h1 className='font-semibold text-7xl'>Contact</h1>
      </div>
      <div className='flex flex-row justify-between gap-10 pt-20'>
        <FormulaireContact className='grow' />
        <CarteContact className='' />
      </div>
    </>
  )
}

export default page
