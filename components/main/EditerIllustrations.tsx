'use client'
import { ArticleWithIllustrations } from '@/types'
import Image from 'next/image'
import { HiXMark } from 'react-icons/hi2'
import { Button } from '../ui/button'
import { useFormStatus } from 'react-dom'
import type { Illustration } from '@prisma/client'
import { log } from '@logtail/next'
import { supprimerIllustrations } from '@/actions/supprimerIllustrations'
import CldImage from '../sub/CldImage'

type Props = {
  article?: ArticleWithIllustrations
}

const EditerIllustrations = (props: Props) => {
  const { article } = props
  const illustrations = article?.illustrations
  const { pending } = useFormStatus()

  const remove = (illustration: Illustration) => {
    if (!article) {
      return
    }
    const res = supprimerIllustrations(article?.id, [illustration])
    log.info('supprimerIllustration', { res })
  }

  const removeAll = () => {
    if (!article || !illustrations) {
      return
    }
    const res = supprimerIllustrations(article?.id, illustrations)
    log.info('supprimerIllustrations', { res })
  }

  if (!article || !illustrations || illustrations.length == 0) {
    return <></>
  }

  return (
    <>
      <div className='flex flex-row justify-between'>
        <h1 className='text-xl font-semibold'>Actuelles</h1>
        <Button
          variant='outline'
          onClick={() => removeAll()}
          disabled={illustrations && illustrations.length > 0 ? false : true}
        >
          Supprimer tout
        </Button>
      </div>
      <div>
        <ul className='grid grid-cols-2 gap-10 md:grid-cols-3 xl:grid-cols-4'>
          {illustrations?.map((i) => (
            <li key={i.id} className='relative rounded-md shadow-lg h-52'>
              <CldImage src={i.url} alt={i.title} fill className='rounded-md' />
              <button
                type='button'
                className='absolute flex items-center justify-center transition-colors bg-red-600 border border-red-600 rounded-full w-7 h-7 -top-3 -right-3 hover:bg-white'
                onClick={() => remove(i)}
              >
                <HiXMark className='w-6 h-6 text-center text-white hover:fill-red-600' />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default EditerIllustrations
