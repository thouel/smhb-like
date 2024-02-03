'use client'

import { ArticleVariantWithStockAndRef } from '@/types'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { supprimerVariantCatalogue } from '@/actions/supprimerVariantCatalogue'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type Props = { variant: ArticleVariantWithStockAndRef }

const AfficherActionsAdminVariant = (props: Props) => {
  const { variant } = props
  const router = useRouter()
  const [goBack, setGoBack] = useState<boolean>(false)

  useEffect(() => {
    if (goBack) {
      router.push(`/admin/boutique/${variant!.refId}`)
    }
  }, [goBack, router, variant])

  return (
    <>
      <div className='flex flex-row gap-5'>
        <Button variant={'outline'}>
          <Link href={`/boutique/${variant!.reference.id}`}>
            Aller à la boutique
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'destructive'}
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer le variant
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {'Supprimer le variant du catalogue ?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  {
                    'Cette action supprimera également les données de stock associées au variant'
                  }
                </p>
                <p className='mt-5 font-semibold'>
                  {'Cette action est irréversible. Pas de retour en arrière !'}
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                variant={'destructive'}
                onClick={() => {
                  supprimerVariantCatalogue(variant)
                  setGoBack(true)
                }}
              >
                {'Oui, supprimer la référence'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default AfficherActionsAdminVariant
