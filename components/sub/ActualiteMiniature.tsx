import React from 'react'
import type { Actualite } from '@prisma/client'
import { formatDateAndTime } from '@/constants/constants'
import Image from 'next/image'
import { normalizeUrlPart } from '@/lib/utils'
import Link from 'next/link'

const ActualiteMiniature = ({ actualite }: { actualite: Actualite }) => {
  return (
    <>
      <div className='flex flex-col max-w-[15rem] gap-5'>
        {actualite.image && (
          <Link
            href={`/actualites/${actualite.id}/${normalizeUrlPart(
              actualite.title,
            )}`}
          >
            <div className='overflow-hidden max-w-60 max-h-40 min-h-40'>
              <Image
                src={actualite.image}
                width={240}
                height={160}
                alt={'image'}
              />
            </div>
          </Link>
        )}
        <div className='my-5'>
          <p className='text-lg font-semibold text-yellow-500 truncate'>
            <Link
              href={`/actualites/${actualite.id}/${normalizeUrlPart(
                actualite.title,
              )}`}
            >
              {actualite.title}
            </Link>
          </p>
          {actualite.description && (
            <p className='justify-center text-sm break-words line-clamp-1'>
              {actualite.description}
            </p>
          )}
        </div>
        {actualite.updatedAt && (
          <p className='pt-2 text-xs border-t'>
            {formatDateAndTime.format(actualite.updatedAt)}
          </p>
        )}
        <p className='text-xs font-semibold text-yellow-500'>
          <Link
            href={`/actualites/${actualite.id}/${normalizeUrlPart(
              actualite.title,
            )}`}
          >
            &gt;&gt; Lire la suite
          </Link>
        </p>
      </div>
    </>
  )
}

export default ActualiteMiniature
