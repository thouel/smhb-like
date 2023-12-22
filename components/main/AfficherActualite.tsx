import React from 'react'
import type { Actualite } from '@prisma/client'
import Image from 'next/image'
import SocialShare from '../sub/SocialShare'
import { formatDateOnly } from '@/constants/constants'

const AfficherActualite = ({ actualite }: { actualite: Actualite }) => {
  return (
    <>
      <div className='flex flex-col items-center w-full gap-5'>
        <h1 className='flex flex-col w-full py-5 text-center bg-gray-100 rounded-lg'>
          <span className='text-5xl font-semibold'>{actualite.title}</span>
          <span className=''>{formatDateOnly.format(actualite.updatedAt)}</span>
        </h1>
        <div className='flex flex-row justify-start w-full gap-10'>
          {actualite.image && (
            <Image
              src={actualite.image}
              width={300}
              height={300}
              alt={actualite.title}
              priority
            />
          )}
          <div className='flex flex-col justify-between gap-10'>
            {actualite.description && (
              <p className='text-xl'>{actualite.description}</p>
            )}
            <SocialShare />
          </div>
        </div>
      </div>
    </>
  )
}

export default AfficherActualite
