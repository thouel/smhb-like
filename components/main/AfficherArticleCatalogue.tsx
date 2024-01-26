'use client'
import { ArticleWithStockAndIllustrations } from '@/types'
import Image from 'next/image'
import AcheterArticleCatalogue from './AcheterArticleCatalogue'

const AfficherArticleCatalogue = ({
  article,
}: {
  article: ArticleWithStockAndIllustrations
}) => {
  return (
    <>
      <div className='flex flex-col w-full gap-5'>
        <h1 className='items-center w-full py-5 text-center bg-gray-100 rounded-lg'>
          <span className='text-5xl font-semibold'>{article?.title}</span>
        </h1>
        <div className='flex flex-row justify-start gap-10'>
          <div className='flex flex-col gap-5'>
            {article?.illustrations &&
              article?.illustrations.map((i) => (
                <div
                  key={i.public_id}
                  className='p-1 border rounded-none bg-gray-50'
                >
                  <Image src={i.url} alt={i.title} width={250} height={250} />
                </div>
              ))}
          </div>
          <div className='flex flex-col gap-5 grow'>
            <div className='flex flex-col justify-between gap-5'>
              {article?.type && <p className='text-base'>{article?.type}</p>}
              {article?.size && <p className='text-base'>{article.size}</p>}
              {article?.stock?.available && article?.stock?.available < 10 && (
                <p className='text-base'>
                  <span>{`Plus que ${article?.stock?.available} pièces disponibles`}</span>
                </p>
              )}
              {article?.unitPriceInEuros && (
                <p className='text-base'>
                  <span>
                    {"Prix à l'unité: "}
                    {`${article?.unitPriceInEuros}€`}
                  </span>
                </p>
              )}
              {article?.description && (
                <p className='text-base'>{article?.description}</p>
              )}
            </div>
          </div>
          <AcheterArticleCatalogue
            className='flex flex-col p-5 rounded-lg bg-yellow-400/20'
            article={article}
          />
        </div>
      </div>
    </>
  )
}

export default AfficherArticleCatalogue
