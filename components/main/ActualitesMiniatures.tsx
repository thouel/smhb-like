import React from 'react'
import ActualiteMiniature from '../sub/ActualiteMiniature'
import type { Actualite } from '@prisma/client'

type Props = {}

const ActualitesMiniatures = async ({
  actualites,
}: {
  actualites: Actualite[]
}) => {
  return (
    <div>
      {actualites && actualites.length > 0 ? (
        <>
          <h1 className='text-4xl font-semibold'>Autres actualit&eacute;s</h1>
          <div className='flex flex-row gap-10 my-10'>
            {actualites &&
              actualites.map((a) => (
                <ActualiteMiniature key={a.id} actualite={a} />
              ))}
          </div>
        </>
      ) : (
        <>
          <h1 className='text-2xl font-semibold'>
            Pas d&apos;autres actualit&eacute;s pour le moment
          </h1>
        </>
      )}
    </div>
  )
}

export default ActualitesMiniatures
