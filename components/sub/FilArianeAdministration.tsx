'use client'
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
            href={`/admin/${
              pathParts[2] === 'utilisateurs' ? 'utilisateurs' : 'actualites'
            }`}
            className='hover:text-yellow-500'
          >
            {pathParts[2]}
          </Link>
        </>
      )}
    </h1>
  )
}

export default FilArianeAdministration
