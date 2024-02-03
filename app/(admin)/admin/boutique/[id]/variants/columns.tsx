'use client'

import ListerVariantsCatalogueActions from '@/components/sub/ListerVariantsCatalogueActions'
import { Button } from '@/components/ui/button'
import { formatDateOnly } from '@/constants/constants'
import { ArticleVariantWithStockAndRef } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EyeIcon } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<ArticleVariantWithStockAndRef>[] = [
  {
    accessorKey: 'Id',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Id
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const variant = row.original
      return (
        <Link
          href={`/admin/boutique/${variant!.reference.id}/variants/${
            variant!.id
          }`}
        >
          {variant!.id}
        </Link>
      )
    },
  },
  {
    accessorKey: 'Voir',
    cell: ({ row }) => {
      const variant = row.original
      return (
        <Link
          href={`/boutique/${variant!.reference.id}`}
          title="Aller à l'article dans la boutique"
        >
          <EyeIcon className='w-6 h-6' />
        </Link>
      )
    },
  },
  {
    accessorKey: 'Taille',
    cell: ({ row }) => {
      const variant = row.original
      return <span>{variant!.size}</span>
    },
  },
  {
    accessorKey: 'Prix',
    cell: ({ row }) => {
      const variant = row.original
      return <span>{variant!.unitPriceInEuros}</span>
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (originalRow: ArticleVariantWithStockAndRef, index: number) => {
      return formatDateOnly.format(originalRow!.updatedAt)
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'desc')}
        >
          Mis &agrave; jour le
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const variant = row.original
      return <ListerVariantsCatalogueActions variant={variant} />
    },
  },
]
