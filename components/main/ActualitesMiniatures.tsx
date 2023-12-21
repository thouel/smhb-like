import React from 'react'
import ActualiteMiniature from '../sub/ActualiteMiniature'

type Props = {}

const ActualitesMiniatures = async (props: Props) => {
  // const dernieresActualites = await getDernieresActualites()

  return (
    <div>
      <h1 className='text-4xl font-semibold'>Actualit&eacute;s</h1>
      <div className='flex flex-row gap-5 my-5'>
        <ActualiteMiniature
          image={'COCKTAIL-DE-NOEL.webp'}
          date='1 décembre 2023'
          description=''
          link='/actualites/1/Cocktail-de-Noel'
          title='Cocktail de Noël'
        />
      </div>
    </div>
  )
}

export default ActualitesMiniatures
