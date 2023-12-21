import React from 'react'
import { Separator } from '../ui/separator'
import Link from 'next/link'

type Props = {
  image: string
  link: string
  title: string
  description: string
  date: string
}

const ActualiteMiniature = (props: Props) => {
  return (
    <div className='flex flex-col w-full max-w-xs gap-3'>
      <p>Image</p>
      <p>
        <Link href={'/actualites/1/test'}>Titre</Link>
      </p>
      <p>Description</p>
      <Separator orientation='horizontal' />
      <p className='text-sm text-gray-700'>Date</p>
    </div>
  )
}

export default ActualiteMiniature
