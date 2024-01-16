'use client'
import type { Article } from '@prisma/client'
import { formatDateOnly } from '@/constants/constants'

const AfficherArticleCatalogue = ({ article }: { article: Article }) => {
  return (
    <>
      <div className='flex flex-col items-center w-full gap-5'>
        <h1 className='flex flex-col w-full py-5 text-center bg-gray-100 rounded-lg'>
          <span className='text-5xl font-semibold'>{article.title}</span>
          <span className=''>{formatDateOnly.format(article.updatedAt)}</span>
        </h1>
        <div className='flex flex-row justify-start w-full gap-10'>
          <div className='flex flex-col justify-between gap-10'>
            {article.type && <p className='text-base'>Type: {article.type}</p>}
            {article.size && (
              <p className='text-base'>Taille: {article.size}</p>
            )}
            {article.unitPriceInEuros && (
              <p className='text-base'>
                Prix unitaire (€): {article.unitPriceInEuros}
              </p>
            )}
            {article.description && (
              <p className='text-base'>Description: {article.description}</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AfficherArticleCatalogue
