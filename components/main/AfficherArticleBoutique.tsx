import { cn, findLowestPricedVariant, sumAllVariantStock } from '@/lib/utils'
import Link from 'next/link'
import CldImage from '../sub/CldImage'
import { ArticleReferenceWithVariantsAndIllustrations } from '@/types'

type Props = {
  reference: ArticleReferenceWithVariantsAndIllustrations
  className?: string
}
export const AfficherArticleBoutique = (props: Props) => {
  const { className, reference } = props

  if (!reference) {
    return <p>{"Erreur avec l'article"}</p>
  }

  const url =
    (reference.illustrations &&
      reference.illustrations.at(0) &&
      reference.illustrations.at(0)!.url) ||
    '/article-sans-illustration.png'

  const lowestPrice = findLowestPricedVariant(
    reference.variants,
  )?.unitPriceInEuros

  let sumAllStock = sumAllVariantStock(reference.variants)

  return (
    <>
      <Link
        href={`/boutique/${reference.id}`}
        className={cn(
          className,
          'p-1 rounded-none cursor-pointer h-full hover:border hover:p-2 transition-all flex flex-col justify-start',
        )}
      >
        <CldImage
          src={url}
          alt={reference.displayName}
          width={250}
          height={250}
        />
        <p className='my-2 text-sm font-light text-black text-wrap grow'>
          {reference.displayName}
        </p>

        {/* {article.stock && (*/}
        <p className='flex flex-col gap-0 text-sm font-medium text-end'>
          <span>A partir de {lowestPrice}€</span>
          {sumAllStock < 20 && <span>{`${sumAllStock} en stock`}</span>}
        </p>
        {/* )} */}
      </Link>
    </>
  )
}
