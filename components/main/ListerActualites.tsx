import React from 'react'
import type { Actualite } from '@prisma/client'
import { Button } from '../ui/button'
import { DataTable } from '@/app/(admin)/admin/actualites/data-table'
import { columns } from '@/app/(admin)/admin/actualites/columns'

const ListerActualites = ({ actualites }: { actualites: Actualite[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5'>
        <h1 className='text-lg'>Actualit&eacute;s en base</h1>
        <DataTable columns={columns} data={actualites} />
        {/* <ul className='text-sm'> */}
        {/* {actualites.map((a) => (
            <li
              key={a.id}
              className='flex flex-row justify-between my-2 pb-2 border-b items-center'
            >
              <p className='inline'>
                #{a.id} - <span className='font-semibold'>{a.title}</span>,
                cr&eacute;&eacute; le {a.createdAt.toString()}
              </p>
              <Button variant='destructive'>Supprimer</Button>
            </li>
          ))} */}
        {/* </ul> */}
      </div>
    </>
  )
}

export default ListerActualites
