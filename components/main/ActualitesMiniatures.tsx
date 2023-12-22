import React from 'react'
import ActualiteMiniature from '../sub/ActualiteMiniature'
import type { Actualite } from '@prisma/client'

type Props = {}

const ActualitesMiniatures = async ({
  actualites,
}: {
  actualites: Actualite[]
}) => {
  // const dernieresActualites = await getDernieresActualites()

  return (
    <div>
      <h1 className='text-4xl font-semibold'>Actualit&eacute;s</h1>
      <div className='flex flex-row gap-10 my-10'>
        {actualites &&
          actualites.map((a) => (
            <ActualiteMiniature key={a.id} actualite={a} />
          ))}
      </div>
    </div>
  )
}

export default ActualitesMiniatures
