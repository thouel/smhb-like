'use client'

import ListerActualitesActions from '@/components/sub/ListerActualitesActions'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/constants/constants'
import { normalizeUrlPart } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EyeIcon, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// This type is used to define the shape of our data.
// We can use a Zod schema here if we want
// export type Actualite = {
//   id: string
//   createdAt: Date
//   updatedAt: Date
//   title: string
//   description: string | null
//   image: string | null
// }

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
          <ArrowUpDown className='ml-2 h-4 w-4' />
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
          <EyeIcon className='w-4 h-4 inline' />
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
          <ArrowUpDown className='ml-2 h-4 w-4' />
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
