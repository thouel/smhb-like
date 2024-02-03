'use client'
import { ArticleReferenceWithVariantsAndIllustrations } from '@/types'
import CldImage from '../sub/CldImage'
import AcheterArticleCatalogue from './AcheterArticleCatalogue'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IoMdArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'

const AfficherArticleCatalogue = ({
  article,
}: {
  article: ArticleReferenceWithVariantsAndIllustrations
}) => {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-row justify-between'>
        <Button variant={'secondary'} onClick={() => router.back()}>
          <IoMdArrowBack className='inline w-6 h-6 mr-2' />
          Revenir à la page précédente
        </Button>
      </div>
      <div className='flex flex-col w-full gap-5'>
        <h1 className='items-center w-full py-5 text-center rounded-lg'>
          <span className='text-5xl font-semibold'>{article?.displayName}</span>
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
                {article!.type} - {article!.displayName}
              </h1>
              {article?.description && (
                <p className='text-sm'>{article?.description}</p>
              )}
            </div>
          </div>
          <AcheterArticleCatalogue
            className='flex flex-col w-full p-5 bg-gray-100 rounded-lg max-w-96'
            reference={article}
          />
        </div>
      </div>
    </>
  )
}

export default AfficherArticleCatalogue
