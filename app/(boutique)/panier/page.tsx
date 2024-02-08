'use client'

import envoyerCommande from '@/actions/envoyerCommande'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatPriceInEuros } from '@/constants/constants'
import { useCartStore } from '@/store/cart/useCartStore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

type Props = {}

const Page = (props: Props) => {
  const { data: session } = useSession({ required: true })
  const { cart, setQuantity, remove } = useCartStore()

  const passerCommande = async () => {
    if (!cart || cart.length <= 0) {
      return
    }

    let formData = new FormData()
    cart.map((item, idx) => {
      formData.append(`id[${idx}]`, item.id)
      formData.append(`quantite[${idx}]`, `${item.quantite}`)
    })

    await envoyerCommande(formData)
  }

  return (
    <>
      <div className='text-4xl font-semibold text-center'>Panier</div>

      <div className='flex flex-row justify-between gap-10 my-5'>
        <div className='flex flex-col gap-5'>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className='flex flex-row gap-5'>
                <div className='w-full max-w-lg'>
                  <Link
                    href={`/boutique/${item.reference.id}`}
                    className='text-blue-600 truncate hover:underline'
                  >
                    {item.reference.displayName}
                  </Link>
                  <div className='flex flex-row justify-start gap-2'>
                    <p className='text-sm'>Taille: {item.size}</p>
                    <p
                      className='text-sm text-yellow-600 cursor-pointer hover:underline'
                      onClick={() => remove(item.id)}
                    >
                      Enlever du panier
                    </p>
                  </div>
                </div>
                <div>
                  <Select
                    name='quantite'
                    value={`${item.quantite}`}
                    onValueChange={(value) => setQuantity(item, value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='1' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Quantité</SelectLabel>
                        {item &&
                          Array(item.stock?.available)
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
                <div>
                  {formatPriceInEuros.format(
                    item.unitPriceInEuros * item.quantite,
                  )}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className='text-xl font-semibold text-center'>
                Panier vide !
              </div>
            </>
          )}
        </div>
        <div className='p-5 bg-gray-100 rounded-lg'>
          <Button
            variant={'default'}
            onClick={() => passerCommande()}
            disabled={!cart || cart.length === 0}
            aria-disabled={!cart || cart.length === 0}
          >
            Passer la commande
          </Button>
        </div>
      </div>
    </>
  )
}

export default Page
