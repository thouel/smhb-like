import { cn } from '@/lib/utils'
import { ArticleReferenceWithVariantsAndIllustrations } from '@/types'
import { AfficherArticleBoutique } from './AfficherArticleBoutique'

type Props = {
  references: ArticleReferenceWithVariantsAndIllustrations[]
  className?: string
}

const AfficherBoutique = (props: Props) => {
  const { references, className } = props

  return (
    <>
      <div className={cn(className, '')}>
        <h1 className='text-4xl font-semibold'>Boutique du SMHB</h1>
        <div className='grid grid-cols-5 grid-rows-2 gap-1 my-5'>
          {references.map((a) => (
            <AfficherArticleBoutique key={a!.id} reference={a} className='' />
          ))}
        </div>
      </div>
    </>
  )
}

export default AfficherBoutique
