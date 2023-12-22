import ActualitesMiniatures from '@/components/main/ActualitesMiniatures'
import Image from 'next/image'
import React from 'react'

import { Metadata } from 'next'
import EvenementsMiniatures from '@/components/main/EvenementsMiniatures'
import AlbumsMiniatures from '@/components/main/AlbumsMiniatures'
import PartenairesBandeau from '@/components/main/PartenairesBandeau'

export const metadata: Metadata = {
  title: 'Site Officiel - Saint-Médard Handball',
}

const page = async () => {
  return (
    <>
      <div className='flex flex-col gap-5'>
        <Image
          src={'/Bienvenue-SMHB-1.webp'}
          width={1152}
          height={400}
          alt={'Bievenue sur le nouveau site du SMHB'}
        />
        <div className='flex flex-col gap-5 my-10 md:flex-row'>
          <iframe
            id='64e86afb19921e08d7df5593'
            height='500'
            src='https://v1.scorenco.com/widget/64e86afb19921e08d7df5593/'
            style={{
              display: 'block',
              width: '100%',
              overflow: 'auto',
              margin: 'auto',
              borderWidth: '0px',
            }}
          />
          <iframe
            id='64e869b419921e08d9c52522'
            height='500'
            src='https://v1.scorenco.com/widget/64e869b419921e08d9c52522/'
            style={{
              display: 'block',
              width: '100%',
              overflow: 'auto',
              margin: 'auto',
              borderWidth: '0px',
            }}
          />
        </div>
        {/* <ActualitesMiniatures /> */}
        {/* //TODO: comment inclure la page /actualites ici ? (via layout?) */}
        <EvenementsMiniatures />
        <AlbumsMiniatures />
        <PartenairesBandeau />
      </div>
    </>
  )
}

export default page
