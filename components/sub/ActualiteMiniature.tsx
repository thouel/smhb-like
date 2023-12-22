import React from 'react'
import type { Actualite } from '@prisma/client'
import { formatDate } from '@/constants/constants'
import Image from 'next/image'

const ActualiteMiniature = ({ actualite }: { actualite: Actualite }) => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        {actualite.image && (
          <div className='max-w-60 max-h-40 min-h-40 overflow-hidden'>
            <Image
              src={actualite.image}
              width={240}
              height={160}
              alt={'image'}
            />
          </div>
        )}
        <div className='my-5'>
          <p className='font-semibold text-lg'>{actualite.title}</p>
          {actualite.description && (
            <p className='text-sm truncate break-words text-pretty'>
              {actualite.description}
            </p>
          )}
        </div>
        {actualite.updatedAt && (
          <p className='border-t pt-2 text-xs'>
            {formatDate.format(actualite.updatedAt)}
          </p>
        )}
      </div>
    </>
  )
}

export default ActualiteMiniature
