import { cn } from '@/lib/utils'
import { ArticleWithStockAndIllustrations } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CldImage from '../sub/CldImage'

type Props = {
  article: ArticleWithStockAndIllustrations
  className?: string
}
export const AfficherArticleBoutique = (props: Props) => {
  const { className, article } = props

  if (!article) {
    return <p>{"Erreur avec l'article"}</p>
  }

  const url =
    (article.illustrations &&
      article.illustrations.at(0) &&
      article.illustrations.at(0)!.url) ||
    '/article-sans-illustration.png'

  return (
    <>
      <Link
        href={`/boutique/${article.id}`}
        className={cn(
          className,
          'p-1 rounded-none cursor-pointer h-full hover:border hover:p-2 transition-all flex flex-col justify-start',
        )}
      >
        <CldImage src={url} alt={article.title} width={250} height={250} />
        <p className='my-2 text-sm font-light text-black text-wrap grow'>
          {article.title}
        </p>
        {article.stock && (
          <p className='text-sm font-medium text-end'>
            {`${article.stock.available} en stock`}
          </p>
        )}
      </Link>
    </>
  )
}
