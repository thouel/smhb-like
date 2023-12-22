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
import type { Actualite } from '@prisma/client'
import Link from 'next/link'
import { supprimerActualite } from '@/actions/supprimerActualite'
import { normalizeUrlPart } from '@/lib/utils'

const ListerActualitesActions = ({ actualite }: { actualite: Actualite }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='flex flex-col gap-2 bg-white py-3 border rounded-lg shadow-xl'
      >
        <DropdownMenuLabel className='text-sm font-semibold px-5 py-1'>
          Actions
        </DropdownMenuLabel>
        <DropdownMenuSeparator className=' border border-gray-100' />
        <DropdownMenuItem
          className='hover:bg-gray-100 px-5 py-2 cursor-pointer'
          onClick={() => navigator.clipboard.writeText(actualite.id)}
        >
          Copier id actualit&eacute;
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:bg-gray-100 px-5 py-2'>
          <Link
            href={`/actualites/${actualite.id}/${normalizeUrlPart(
              actualite.title,
            )}`}
          >
            Voir actualit&eacute;
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className='hover:bg-gray-100 px-5 py-2'>
          Modifier actualit&eacute;
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:bg-gray-100 px-5 py-2 text-red-600'
          onClick={() => supprimerActualite(actualite)}
        >
          Supprimer actualit&eacute;
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ListerActualitesActions
