'use client'
import type { User } from '@prisma/client'
import Image from 'next/image'
import { formatDateOnly } from '@/constants/constants'

const AfficherUtilisateur = ({ user }: { user: User }) => {
  return (
    <>
      <div className='flex flex-col items-center w-full gap-5'>
        <h1 className='flex flex-col w-full py-5 text-center bg-gray-100 rounded-lg'>
          <span className='text-5xl font-semibold'>{user.name}</span>
          <span className=''>{formatDateOnly.format(user.updatedAt)}</span>
        </h1>
        <div className='flex flex-row justify-start w-full gap-10'>
          {user.image && (
            <Image
              src={user.image}
              width='400'
              height='200'
              alt={user.email != null ? user.email : 'photo de profil'}
              priority
            />
          )}
          <div className='flex flex-col justify-between gap-10'>
            {user.email && <p className='text-xl'>{user.email}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default AfficherUtilisateur
