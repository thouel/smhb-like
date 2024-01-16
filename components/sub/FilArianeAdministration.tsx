'use client'
import { capitalize } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const FilArianeAdministration = (props: Props) => {
  const pathname = usePathname()
  const pathParts = pathname.split('/')
  return (
    <h1 className='text-2xl'>
      <Link href={'/admin'} className='hover:text-yellow-500'>
        Administration
      </Link>
      {pathParts.length > 2 && (
        <>
          <span> &gt; </span>
          <Link
            href={`/admin${
              pathParts[2] === 'utilisateurs'
                ? '/utilisateurs'
                : pathParts[2] === 'actualites'
                ? '/actualites'
                : pathParts[2] === 'boutique'
                ? '/boutique'
                : ''
            }`}
            className='hover:text-yellow-500'
          >
            {capitalize(pathParts[2])}
          </Link>
        </>
      )}
    </h1>
  )
}

export default FilArianeAdministration
