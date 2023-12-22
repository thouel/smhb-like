'use client'

import ListerActualitesActions from '@/components/sub/ListerActualitesActions'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/constants/constants'
import { normalizeUrlPart } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EyeIcon } from 'lucide-react'
import Link from 'next/link'

import type { Actualite } from '@prisma/client'

export const columns: ColumnDef<Actualite>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Titre
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const actualite = row.original

      return (
        <Link
          href={`/actualites/${actualite.id}/${normalizeUrlPart(
            actualite.title,
          )}`}
        >
          {actualite.title}
        </Link>
      )
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return row.original.image ? (
        <a href={row.original.image} target='_blank'>
          <EyeIcon className='inline w-4 h-4' />
        </a>
      ) : (
        "Pas d'image"
      )
    },
  },
  {
    accessorKey: 'createdAt',
    accessorFn: (originalRow: Actualite, index: number) => {
      return formatDate.format(originalRow.createdAt)
    },
    header: 'Créée le',
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (originalRow: Actualite, index: number) => {
      return formatDate.format(originalRow.createdAt)
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Mise &agrave; jour le
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const actualite = row.original

      return <ListerActualitesActions actualite={actualite} />
    },
  },
]
