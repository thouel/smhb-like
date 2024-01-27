'use client'
import { ArticleWithStockAndIllustrations } from '@/types'
import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

type Props = { article: ArticleWithStockAndIllustrations; className?: string }

const AcheterArticleCatalogue = (props: Props) => {
  const [quantite, setQuantite] = useState<string>('1')
  const { className, article } = props
  const available = article?.stock?.available

  if (
    !article ||
    !article.unitPriceInEuros ||
    available === undefined ||
    available == 0
  ) {
    return <></>
  }

  return (
    <div className={className}>
      <form className='flex flex-col gap-2'>
        <Select name='quantite' onValueChange={(v) => setQuantite(v)}>
          <SelectTrigger className=''>
            <SelectValue placeholder='Quantité' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Quantité</SelectLabel>
              {Array(available)
                .fill(1)
                .map((x, i) => (
                  <SelectItem key={i} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {article?.unitPriceInEuros && (
          <p className='text-base'>{`Unité ${article?.unitPriceInEuros}€`}</p>
        )}
        <span>
          Total
          <span className='text-lg font-semibold'>
            {` ${article?.unitPriceInEuros * Number.parseInt(quantite)}€`}
          </span>
        </span>
        <Button type='submit'>Commander</Button>

        {article?.stock?.available && article?.stock?.available < 10 && (
          <p className='text-sm'>
            <span>{`Plus que ${article?.stock?.available} pièces disponibles`}</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default AcheterArticleCatalogue
