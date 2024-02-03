'use client'
import { supprimerIllustrations } from '@/actions/supprimerIllustrations'
import { ArticleReferenceWithIllustrations } from '@/types'
import { log } from '@logtail/next'
import type { Illustration } from '@prisma/client'
import { useFormStatus } from 'react-dom'
import { HiXMark } from 'react-icons/hi2'
import CldImage from '../sub/CldImage'
import { Button } from '../ui/button'

type Props = {
  reference?: ArticleReferenceWithIllustrations
}

const EditerIllustrations = (props: Props) => {
  const { reference } = props
  const illustrations = reference?.illustrations
  const { pending } = useFormStatus()

  const remove = (illustration: Illustration) => {
    if (!reference) {
      return
    }
    const res = supprimerIllustrations(reference?.id, [illustration])
    log.info('supprimerIllustration', { res })
  }

  const removeAll = () => {
    if (!reference || !illustrations) {
      return
    }
    const res = supprimerIllustrations(reference?.id, illustrations)
    log.info('supprimerIllustrations', { res })
  }

  if (!reference || !illustrations || illustrations.length == 0) {
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
            <li key={i.id} className='relative rounded-md shadow-lg h-60'>
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
