import { ArticleWithStockAndIllustrations } from '@/types'
import React from 'react'
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

type Props = { article: ArticleWithStockAndIllustrations; className?: string }

const AcheterArticleCatalogue = (props: Props) => {
  const { className, article } = props
  const available = article?.stock?.available

  if (available === undefined || available == 0) {
    return <></>
  }

  return (
    <div className={className}>
      <form className='flex flex-col gap-5'>
        <Select name='quantite' defaultValue={'0'}>
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
        <Button type='submit'>Commander</Button>
      </form>
    </div>
  )
}

export default AcheterArticleCatalogue
