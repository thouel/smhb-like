import React from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import Link from 'next/link'

type Props = {}

const AfficherBoutiqueVide = (props: Props) => {
  return (
    <>
      <div className='flex flex-row items-center justify-center gap-10 py-40 align-middle'>
        <h1 className='font-semibold text-[10rem]'>Hmmm</h1>
        <div className='flex flex-col gap-2'>
          <h2 className='text-5xl font-semibold'>Oups.</h2>
          <h3 className='text-xl font-semibold'>La boutique est vide.</h3>
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

export default AfficherBoutiqueVide
