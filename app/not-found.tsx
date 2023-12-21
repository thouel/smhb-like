import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

type Props = {}

const notFound = (props: Props) => {
  return (
    <>
      <div className='flex flex-row items-center justify-center gap-10 align-middle'>
        <h1 className='font-semibold text-[10rem]'>404</h1>
        <div className='flex flex-col gap-2'>
          <h2 className='text-5xl font-semibold'>Oups.</h2>
          <h3 className='text-xl font-semibold'>Cette page est introuvable.</h3>
          <Separator orientation='horizontal' />
          <div className='flex flex-row gap-2'>
            <Button variant='default'>
              <Link href={'/'}>Retour &agrave; l&apos;accueil</Link>
            </Button>
            <Button variant='secondary'>
              <Link href={'/actualites'}>Actualit&eacute;s</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default notFound
