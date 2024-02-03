import AfficherArticleCatalogue from '@/components/main/AfficherArticleCatalogue'
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
  const reference = await prisma.articleReference.findUnique({
    where: { id },
  })

  if (!reference) {
    return {
      title: 'Référence non trouvée',
    }
  }

  return {
    title: `${reference.displayName} | ${reference.type}`,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const reference = await prisma.articleReference.findUnique({
    where: { id: params.id },
    include: { illustrations: true, variants: { include: { stock: true } } },
  })

  if (!reference) {
    notFound()
  }

  return (
    <>
      <AfficherArticleCatalogue reference={reference} />
    </>
  )
}

export default Page
