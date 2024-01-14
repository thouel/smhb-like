import EditerActualite from '@/components/main/EditerActualite'
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
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id },
  })

  if (!actualite) {
    return {
      title: 'Actualité non trouvée',
    }
  }

  return {
    title: 'Editer ' + actualite.title,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id: params.id },
  })

  if (!actualite) {
    notFound()
  }

  return (
    <>
      <EditerActualite actualite={actualite} />
    </>
  )
}

export default Page
