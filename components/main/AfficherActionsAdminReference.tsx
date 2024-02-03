'use client'

import { ArticleReferenceWithIllustrations } from '@/types'
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
import { supprimerReferenceCatalogue } from '@/actions/supprimerReferenceCatalogue'

type Props = { reference: ArticleReferenceWithIllustrations }

const AfficherActionsAdminReference = (props: Props) => {
  const { reference } = props
  return (
    <>
      <div className='flex flex-row gap-5'>
        <Button variant={'outline'}>
          <Link href={`/boutique/${reference!.id}`}>Aller à la boutique</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={'destructive'}
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer référence du catalogue
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {'Supprimer la référence du catalogue ?'}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  {
                    'Cette action supprimera également toutes les illustrations et variants associés à la référence (tailles, stock).'
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
                onClick={() => supprimerReferenceCatalogue(reference)}
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

export default AfficherActionsAdminReference
