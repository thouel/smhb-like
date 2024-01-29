'use client'

import ListerMessagesActions from '@/components/sub/ListerMessagesActions'
import { Button } from '@/components/ui/button'
import { formatDateOnly } from '@/constants/constants'
import { MessageWithAnswer, getMessageStatus, getMessageType } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export const columns: ColumnDef<MessageWithAnswer>[] = [
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
      const message = row.original
      return (
        <Link href={`/admin/messages/${message?.id}`}>{message?.name}</Link>
      )
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          De
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const message = row.original
      return <span>{message?.email}</span>
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => {
      const message = row.original
      return <span>{message && getMessageType(message.type)}</span>
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Statut
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const message = row.original
      return <span>{message && getMessageStatus(message.status)}</span>
    },
  },
  {
    accessorKey: 'updatedAt',
    accessorFn: (originalRow: MessageWithAnswer, index: number) => {
      return formatDateOnly.format(originalRow?.createdAt)
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
      const message = row.original
      return <ListerMessagesActions message={message} />
    },
  },
]
