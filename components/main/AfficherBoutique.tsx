import { cn } from '@/lib/utils'
import { ArticleWithStockAndIllustrations } from '@/types'
import React from 'react'
import { AfficherArticleBoutique } from './AfficherArticleBoutique'

type Props = {
  articles: ArticleWithStockAndIllustrations[]
  className?: string
}

const AfficherBoutique = (props: Props) => {
  const { articles, className } = props

  return (
    <>
      <div className={cn(className, '')}>
        <h1 className='text-4xl font-semibold'>Boutique du SMHB</h1>
        <div className='grid grid-cols-5 grid-rows-2 gap-1 my-5'>
          {articles.map((a) => (
            <AfficherArticleBoutique key={a!.id} article={a} className='' />
          ))}
        </div>
      </div>
    </>
  )
}

export default AfficherBoutique
