'use client'

import { supprimerVariantCatalogue } from '@/actions/supprimerVariantCatalogue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ArticleVariantWithStockAndRef } from '@/types'
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

const ListerVariantsCatalogueActions = ({
  variant,
}: {
  variant: ArticleVariantWithStockAndRef
}) => {
  if (!variant) {
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
          onClick={() => navigator.clipboard.writeText(variant.id)}
        >
          Copier id variant
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/boutique/${variant!.reference.id}`}>
            {"Voir l'article dans le catalogue"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/admin/boutique/variants/${variant.id}`}>
            &Eacute;diter le variant
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className='px-5 py-2 text-red-600 cursor-pointer hover:bg-gray-100 hover:text-red-600'
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer le variant
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{'Supprimer le variant ?'}</AlertDialogTitle>
              <AlertDialogDescription>
                <p>
                  {
                    'Cette action supprimera toutes les données associées au variant (stock).'
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
                onClick={() => supprimerVariantCatalogue(variant)}
              >
                {'Oui, supprimer le variant'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListerVariantsCatalogueActions
