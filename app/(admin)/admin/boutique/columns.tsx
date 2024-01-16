'use client'

import { Button } from '@/components/ui/button'
import { formatDateOnly, formatPriceInEuros } from '@/constants/constants'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { GoDownload } from 'react-icons/go'
import Link from 'next/link'
import type { Article } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import ListerArticleCatalogueActions from '@/components/sub/ListerArticlesCatalogueActions'

export const columns: ColumnDef<Article>[] = [
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
      const article = row.original
      return <Link href={`/boutique/${article.id}`}>{article.title}</Link>
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
      const article = row.original
      return <span>{article.type}</span>
    },
  },
  {
    accessorKey: 'size',
    header: 'Taille',
    cell: ({ row }) => {
      const article = row.original
      return <span>{article.size}</span>
    },
  },
  {
    accessorKey: 'unitPriceInEuros',
    header: 'Prix unitaire (€)',
    cell: ({ row }) => {
      const article = row.original
      return <span>{formatPriceInEuros.format(article.unitPriceInEuros)}</span>
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (originalRow: Article, index: number) => {
      return formatDateOnly.format(originalRow.createdAt)
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
      const article = row.original
      return <ListerArticleCatalogueActions article={article} />
    },
  },
]
