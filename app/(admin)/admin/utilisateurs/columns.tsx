'use client'

import { Button } from '@/components/ui/button'
import { formatDateOnly } from '@/constants/constants'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, EyeIcon } from 'lucide-react'
import { GoDownload } from 'react-icons/go'
import Link from 'next/link'
import type { User } from '@prisma/client'
import ListerUtilisateursActions from '@/components/sub/ListerUtilisateursActions'
import { Checkbox } from '@/components/ui/checkbox'

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
      return <Link href={`/admin/utilisateurs/${user.id}`}>{user.name}</Link>
    },
  },
  {
    accessorKey: 'Voir',
    cell: ({ row }) => {
      const user = row.original
      return (
        <Link href={`/utilisateurs/${user.id}`} title="Aller à l'utilisateur">
          <EyeIcon className='w-6 h-6' />
        </Link>
      )
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
      return <Checkbox checked={!!user.emailVerified} disabled />
    },
  },
  {
    accessorKey: 'image',
    header: 'Photo de profil',
    cell: ({ row }) => {
      return row.original.image ? (
        <a href={row.original.image} target='_blank'>
          <GoDownload className='inline w-4 h-4' />
        </a>
      ) : (
        'Pas de photo'
      )
    },
  },
  {
    accessorKey: 'isAdmin',
    header: 'Est Admin ?',
    cell: ({ row }) => {
      const user = row.original
      return <Checkbox checked={!user.role} disabled />
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
      const user = row.original

      return <ListerUtilisateursActions user={user} />
    },
  },
]
