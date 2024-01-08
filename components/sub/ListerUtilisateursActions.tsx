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
import type { User } from '@prisma/client'
import Link from 'next/link'
import { supprimerActualite } from '@/actions/supprimerActualite'
import { normalizeUrlPart } from '@/lib/utils'
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
import { supprimerUtilisateur } from '@/actions/supprimerUtilisateur'

const ListerUtilisateursActions = ({ user }: { user: User }) => {
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
          onClick={() => navigator.clipboard.writeText(user.id)}
        >
          Copier id utilisateur
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/utilisateurs/${user.id}`}>Voir utilisateur</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='px-5 py-2 hover:bg-gray-100'>
          <Link href={`/admin/utilisateurs/${user.id}`}>
            &Eacute;diter utilisateur
          </Link>
        </DropdownMenuItem>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className='px-5 py-2 text-red-600 cursor-pointer hover:bg-gray-100 hover:text-red-600'
              onSelect={(e) => e.preventDefault()}
            >
              Supprimer utilisateur
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{"Supprimer l'utilisateur ?"}</AlertDialogTitle>
              <AlertDialogDescription>
                {'Cette action est irréversible. Mieux vaut être sûr !'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction
                variant={'destructive'}
                onClick={() => supprimerUtilisateur(user)}
              >
                {"Oui, supprimer l'utilisateur"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListerUtilisateursActions
