'use client'
import { cn, hasStockAvailable } from '@/lib/utils'
import { useCartStore } from '@/store/cart/useCartStore'
import {
  ArticleReferenceWithFullTree,
  ArticleReferenceWithVariantsAndIllustrations,
  ArticleVariantWithStockAndRef,
} from '@/types'
import { log } from '@logtail/next'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Separator } from '../ui/separator'

type Props = {
  reference: ArticleReferenceWithFullTree
  className?: string
}

const AjouterAuPanier = (props: Props) => {
  const { className, reference } = props
  const [quantite, setQuantite] = useState<string>('1')
  const [variant, setVariant] = useState<ArticleVariantWithStockAndRef>(
    reference!.variants[0],
  )
  const { add: handleAddToCart } = useCartStore()

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
              className={`p-2 text-center border rounded-none hover:bg-black hover:text-white ${
                variant?.id === v.id ? 'bg-black text-white' : 'bg-white'
              }`}
              onClick={() => setVariant(v)}
            >
              {v.size}
            </span>
          ))}
        </div>
        {variant && (
          <>
            <Separator />
            <Button
              type='submit'
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart(variant as ArticleVariantWithStockAndRef)
              }}
            >
              Commander
            </Button>
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

export default AjouterAuPanier
