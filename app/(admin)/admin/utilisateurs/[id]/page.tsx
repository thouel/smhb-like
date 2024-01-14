import EditerUtilisateur from '@/components/main/EditerUtilisateur'
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
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) {
    return {
      title: 'Utilisateur non trouvé',
    }
  }

  return {
    title: 'Editer ' + user.email,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  if (!user) {
    notFound()
  }

  return (
    <>
      <EditerUtilisateur user={user} />
    </>
  )
}

export default Page
