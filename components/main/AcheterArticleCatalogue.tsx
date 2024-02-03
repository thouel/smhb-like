'use client'
import {
  ArticleReferenceWithVariantsAndIllustrations,
  ArticleVariantWithStock,
} from '@/types'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { cn, hasStockAvailable } from '@/lib/utils'
import { log } from '@logtail/next'
import { Separator } from '../ui/separator'
import { Label } from '../ui/label'

type Props = {
  reference: ArticleReferenceWithVariantsAndIllustrations
  className?: string
}

const AcheterArticleCatalogue = (props: Props) => {
  const { className, reference } = props
  const [quantite, setQuantite] = useState<string>('1')
  const [variant, setVariant] = useState<ArticleVariantWithStock>(
    reference!.variants[0],
  )

  useEffect(() => {
    setQuantite('1')
  }, [variant])

  if (
    !reference ||
    !reference.variants ||
    !hasStockAvailable(reference.variants)
  ) {
    log.error(
      'Reference is either null or has no variants or has no stock available',
    )
    return <></>
  }

  return (
    <div className={cn(className, '')}>
      <span className='my-2 text-3xl'>{reference.displayName}</span>
      <form className='flex flex-col gap-2'>
        {variant && (
          <p className='text-lg font-semibold'>{`${variant.unitPriceInEuros}€`}</p>
        )}
        <div className='grid grid-flow-row grid-cols-4 gap-2 cursor-pointer'>
          {reference.variants.map((v) => (
            <span
              key={v.id}
              className={`p-2 text-center bg-white border rounded-none hover:bg-black hover:text-white ${
                variant?.id === v.id && 'bg-black text-white'
              }`}
              onClick={() => setVariant(v)}
            >
              {v.size}
            </span>
          ))}
        </div>
        <div>
          <Label htmlFor='quantite'>Quantité</Label>
          <Select
            name='quantite'
            value={quantite}
            onValueChange={(v) => setQuantite(v)}
          >
            <SelectTrigger className=''>
              <SelectValue placeholder='Quantité' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Quantité</SelectLabel>
                {variant &&
                  Array(variant.stock?.available)
                    .fill(1)
                    .map((x, i) => (
                      <SelectItem key={i} value={`${i + 1}`}>
                        {i + 1}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {variant && (
          <>
            <Separator />
            <span>
              Total
              <span className='text-lg font-semibold'>
                {` ${variant.unitPriceInEuros * Number.parseInt(quantite)}€`}
              </span>
            </span>
            <Button type='submit'>Commander</Button>
          </>
        )}

        {variant?.stock?.available && variant?.stock?.available < 20 && (
          <p className='text-sm'>
            <span>{`Plus que ${variant?.stock?.available} pièces disponibles`}</span>
          </p>
        )}
      </form>
    </div>
  )
}

export default AcheterArticleCatalogue
