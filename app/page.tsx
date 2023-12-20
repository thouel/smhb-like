import Image from 'next/image'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <>
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
    </>
  )
}

export default page
