import React from 'react'
import type { Actualite } from '@prisma/client'
import { DataTable } from '@/app/(admin)/admin/actualites/data-table'
import { columns } from '@/app/(admin)/admin/actualites/columns'

const ListerActualites = ({ actualites }: { actualites: Actualite[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5'>
        <h1 className='text-lg'>Actualit&eacute;s en base</h1>
        <DataTable columns={columns} data={actualites} />
      </div>
    </>
  )
}

export default ListerActualites
