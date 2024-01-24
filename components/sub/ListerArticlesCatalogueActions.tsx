'use client'
import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '../ui/button'
import { MoreHorizontal } from 'lucide-react'
import type { Article } from '@prisma/client'
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
import { supprimerArticleCatalogue } from '@/actions/supprimerArticleCatalogue'

const ListerArticleCatalogueActions = ({ article }: { article: Article }) => {
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
          onClick={() => navigator.clipboard.writeText(article.id)}
        >
          Copier id actualit&eacute;
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/boutique/${article.id}`}>
            Voir article du catalogue
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/admin/boutique/${article.id}`}>
            &Eacute;diter article du catalogue
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className='px-5 py-2 text-red-600 cursor-pointer hover:bg-gray-100 hover:text-red-600'
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer article du catalogue
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {"Supprimer l'article du catalogue ?"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {'Cette action est irréversible. Mieux vaut être sûr !'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                variant={'destructive'}
                onClick={() => supprimerArticleCatalogue(article)}
              >
                {"Oui, supprimer l'actualité"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListerArticleCatalogueActions
