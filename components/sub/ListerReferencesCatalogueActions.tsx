'use client'

import { supprimerReferenceCatalogue } from '@/actions/supprimerReferenceCatalogue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArticleReferenceWithIllustrations } from '@/types'
import { MoreHorizontal } from 'lucide-react'
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

const ListerReferencesCatalogueActions = ({
  reference,
}: {
  reference: ArticleReferenceWithIllustrations
}) => {
  if (!reference) {
    return
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='w-8 h-8 p-0'>
          <span className='sr-only'>{"Ouvrir menu d'actions"}</span>
          <MoreHorizontal className='w-4 h-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='flex flex-col gap-2 py-3 bg-white border rounded-lg shadow-xl'
      >
        <DropdownMenuLabel className='px-5 py-1 text-sm font-semibold'>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className='border border-gray-100 ' />
        <DropdownMenuItem
          className='px-5 py-2 cursor-pointer hover:bg-gray-100'
          onClick={() => navigator.clipboard.writeText(reference.id)}
        >
          Copier id référence
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/boutique/${reference.id}`}>
            {"Voir l'article dans le catalogue"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/admin/boutique/${reference.id}`}>
            &Eacute;diter la référence
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className='px-5 py-2 text-red-600 cursor-pointer hover:bg-gray-100 hover:text-red-600'
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer la référence du catalogue
            </DropdownMenuItem>
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
                {"Oui, supprimer l'article"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListerReferencesCatalogueActions
