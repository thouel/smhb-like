import ListerMessages from '@/components/main/ListerMessages'
import prisma from '@/lib/db'
import { MESSAGE_TYPE } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Messages reçus',
}

const Page = async () => {
  const messages = await prisma.message.findMany({
    where: {
      parent: null,
    },
    include: {
      answer: true,
    },
  })

  return (
    <>
      <ListerMessages messages={messages} />
    </>
  )
}

export default Page
