'use client'
import { ArticleWithStockAndIllustrations } from '@/types'
import AcheterArticleCatalogue from './AcheterArticleCatalogue'
import CldImage from '../sub/CldImage'

const AfficherArticleCatalogue = ({
  article,
}: {
  article: ArticleWithStockAndIllustrations
}) => {
  return (
    <>
      <div className='flex flex-col w-full gap-5'>
        <h1 className='items-center w-full py-5 text-center rounded-lg'>
          <span className='text-5xl font-semibold'>{article?.title}</span>
        </h1>
        <div className='flex flex-row gap-10'>
          <div className='grid grid-cols-2 gap-1 grid-flow-rows'>
            {article?.illustrations &&
              article?.illustrations.map((i) => (
                <div
                  key={i.public_id}
                  className='p-0 rounded-lg bg-gray-50 grow'
                >
                  <CldImage
                    sizes={
                      '(max-width: 1280px) 33vw, (max-width: 768px) 50vw, 75vw'
                    }
                    src={i.url}
                    alt={i.title}
                    width={800}
                    height={800}
                    className='rounded-lg'
                  />
                </div>
              ))}
            <div className='flex flex-col col-span-2 gap-2'>
              <h1 className='mt-5 text-2xl'>
                {article!.type} - {article!.title} - {article!.size}
              </h1>
              {article?.description && (
                <p className='text-sm'>{article?.description}</p>
              )}
            </div>
          </div>
          <AcheterArticleCatalogue
            className='flex flex-col p-5 bg-gray-100 rounded-lg'
            article={article}
          />
        </div>
      </div>
    </>
  )
}

export default AfficherArticleCatalogue
