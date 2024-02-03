'use client'
import { ArticleReferenceWithVariantsAndIllustrations } from '@/types'
import CldImage from '../sub/CldImage'
import AcheterArticleCatalogue from './AcheterArticleCatalogue'
import { Button } from '../ui/button'
import Link from 'next/link'
import { IoMdArrowBack } from 'react-icons/io'
import { useRouter } from 'next/navigation'

const AfficherArticleCatalogue = ({
  reference,
}: {
  reference: ArticleReferenceWithVariantsAndIllustrations
}) => {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-row justify-between my-5'>
        <Button
          variant={'outline'}
          onClick={() => router.back()}
          className='rounded-full'
        >
          <IoMdArrowBack className='inline w-6 h-6 ' />
        </Button>
        <span className='my-2 text-3xl'>{reference!.displayName}</span>
      </div>
      <div className='flex flex-col w-full gap-5'>
        <div className='flex flex-row gap-10'>
          <div className='grid grid-cols-2 gap-1 grid-flow-rows'>
            {reference?.illustrations &&
              reference?.illustrations.map((i) => (
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
                {reference!.type} - {reference!.displayName}
              </h1>
              {reference?.description && (
                <p className='text-sm'>{reference?.description}</p>
              )}
            </div>
          </div>
          <AcheterArticleCatalogue
            className='flex flex-col w-full p-5 bg-gray-100 rounded-lg max-w-96'
            reference={reference}
          />
        </div>
      </div>
    </>
  )
}

export default AfficherArticleCatalogue
