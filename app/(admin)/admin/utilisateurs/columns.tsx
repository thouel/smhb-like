'use client'

import { Button } from '@/components/ui/button'
import { formatDateOnly } from '@/constants/constants'
import { normalizeUrlPart } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { GoDownload } from 'react-icons/go'
import Link from 'next/link'

import type { User } from '@prisma/client'
import { Input } from '@/components/ui/input'
import ListerUtilisateursActions from '@/components/sub/ListerUtilisateursActions'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nom
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const user = row.original
      return <Link href={`/utilisateurs/${user.id}`}>{user.name}</Link>
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const user = row.original
      return <span>{user.email}</span>
    },
  },
  {
    accessorKey: 'emailVerified',
    header: 'Email vérifié ?',
    cell: ({ row }) => {
      const user = row.original
      return <Input type='checkbox' checked={!!user.emailVerified} />
    },
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => {
      return row.original.image ? (
        <a href={row.original.image} target='_blank'>
          <GoDownload className='inline w-4 h-4' />
        </a>
      ) : (
        "Pas d'image"
      )
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (originalRow: User, index: number) => {
      return formatDateOnly.format(originalRow.createdAt)
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
      const user = row.original

      return <ListerUtilisateursActions user={user} />
    },
  },
]
