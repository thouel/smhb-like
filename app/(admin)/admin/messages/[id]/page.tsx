import EditerUtilisateur from '@/components/main/EditerUtilisateur'
import Messagerie from '@/components/main/Messagerie'
import prisma from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id

  // fetch data
  const message = await prisma.message.findUnique({
    where: { id },
  })

  if (!message) {
    return {
      title: 'Message non trouvé',
    }
  }

  return {
    title: 'Répondre à ' + message.email,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const message = await prisma.message.findUnique({
    where: { id: params.id },
    include: { answer: true },
  })

  if (!message) {
    notFound()
  }

  const user = await prisma.user.findUnique({
    where: { email: message.email },
  })

  return (
    <>
      <Messagerie message={message} user={user} />
    </>
  )
}

export default Page
