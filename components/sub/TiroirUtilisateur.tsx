import { formatDateAndTime, formatDateOnly } from '@/constants/constants'
import prisma from '@/lib/db'
import type { Message, User } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { SlUser } from 'react-icons/sl'
import { Separator } from '../ui/separator'

type Props = { message: Message; user: User | null }

const TiroirUtilisateur = async (props: Props) => {
  const { message, user } = props

  if (!user) {
    return (
      <>
        <div className='flex flex-col gap-2 p-5 border-t border-l shadow-xl'>
          <div className='flex flex-col items-center gap-1 text-center'>
            <div className='border rounded-full shadow-lg'>
              <SlUser className='w-16 h-16 p-3' />
            </div>
            <span className='font-light'>Utilisateur inconnu</span>
            <span className='font-light'>{message.email}</span>
          </div>
        </div>
      </>
    )
  }

  const otherMessages = await prisma.message.findMany({
    where: {
      AND: [
        { email: user.email! },
        {
          NOT: {
            id: message.id,
          },
        },
      ],
    },
    take: 5,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className='flex flex-col gap-2 p-5 transition-all border-t border-l shadow-xl hover:bg-gray-50'>
      <div className='flex flex-col items-center gap-1 text-center'>
        {user.image && (
          <Image
            src={user.image}
            alt={user.name}
            width={75}
            height={75}
            className='border rounded-full shadow-lg'
          />
        )}
        <span className='font-semibold'>{user.name}</span>
        <span className='font-light'>{user.email}</span>
      </div>
      <Separator />
      <div className='flex flex-col gap-1 text-sm font-light break-words'>
        <span className='mt-2'>
          Inscrit depuis {formatDateOnly.format(user.createdAt)}
        </span>
        {otherMessages && otherMessages.length > 0 && (
          <>
            <span className='mt-2'>Autres messages échangés</span>
            {otherMessages.map((m) => (
              <Link
                className='font-medium'
                key={m.id}
                href={`/admin/messages/${m.id}`}
              >
                Le {formatDateAndTime.format(m.createdAt)}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default TiroirUtilisateur
