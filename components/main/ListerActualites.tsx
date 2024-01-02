import React from 'react'
import type { Actualite } from '@prisma/client'
import { DataTable } from '@/app/(admin)/admin/actualites/data-table'
import { columns } from '@/app/(admin)/admin/actualites/columns'
import EditerActualiteModal from './EditerActualiteModal'

const ListerActualites = ({ actualites }: { actualites: Actualite[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-xl'>Actualit&eacute;s disponibles</h1>
        <DataTable columns={columns} data={actualites} />
        <EditerActualiteModal />
      </div>
    </>
  )
}

export default ListerActualites
