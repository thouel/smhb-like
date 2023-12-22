'use client'
import type { User } from '@prisma/client'
import React from 'react'
import { Button } from '../ui/button'
import { supprimerUtilisateur } from '@/actions/supprimerUtilisateur'

const ListerUtilisateurs = ({ utilisateurs }: { utilisateurs: User[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5'>
        <h1 className='text-lg'>Utilisateurs actuels</h1>
        <ul className='text-sm'>
          {utilisateurs.map((u) => (
            <li
              key={u.id}
              className='flex flex-row justify-between my-2 pb-2 border-b items-center'
            >
              <p className='inline'>
                #{u.id} - <span className='font-semibold'>{u.name}</span>,
                cr&eacute;&eacute; le {u.createdAt.toString()}
              </p>
              <Button
                variant='destructive'
                onClick={async () => supprimerUtilisateur(u)}
              >
                Supprimer
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ListerUtilisateurs
