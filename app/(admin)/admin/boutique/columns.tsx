'use client'

import ListerReferencesCatalogueActions from '@/components/sub/ListerReferencesCatalogueActions'
import { Button } from '@/components/ui/button'
import { formatDateOnly } from '@/constants/constants'
import { ArticleReferenceWithIllustrations, getReferenceStatus } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EyeIcon } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<ArticleReferenceWithIllustrations>[] = [
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
      const reference = row.original
      return (
        <Link href={`/admin/boutique/${reference!.id}`}>
          {reference!.displayName}
        </Link>
      )
    },
  },
  {
    accessorKey: 'Voir',
    cell: ({ row }) => {
      const reference = row.original
      return (
        <Link
          href={`/boutique/${reference!.id}`}
          title="Aller à l'article dans la boutique"
        >
          <EyeIcon className='w-6 h-6' />
        </Link>
      )
    },
  },
  {
    accessorKey: 'Statut',
    cell: ({ row }) => {
      const reference = row.original
      return <span>{getReferenceStatus(reference!.status)}</span>
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Type
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const reference = row.original
      return <span>{reference!.type}</span>
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (
      originalRow: ArticleReferenceWithIllustrations,
      index: number,
    ) => {
      return formatDateOnly.format(originalRow!.updatedAt)
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'desc')}
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
      const reference = row.original
      return <ListerReferencesCatalogueActions reference={reference} />
    },
  },
]
