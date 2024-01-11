'use client'
import type { User } from '@prisma/client'
import React from 'react'
import { DataTable } from '@/app/(admin)/admin/utilisateurs/data-table'
import { columns } from '@/app/(admin)/admin/utilisateurs/columns'
import EditerUtilisateurModal from './EditerUtilisateurModal'

const ListerUtilisateurs = ({ utilisateurs }: { utilisateurs: User[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-xl'>Utilisateurs disponibles</h1>
        <DataTable columns={columns} data={utilisateurs} />
        <EditerUtilisateurModal />
      </div>
    </>
  )
}

export default ListerUtilisateurs
