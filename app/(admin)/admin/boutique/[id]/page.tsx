import EditerArticleCatalogue from '@/components/main/EditerArticleCatalogue'
import EditerStock from '@/components/main/EditerStock'
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
  const article = await prisma.article.findUnique({
    where: { id },
  })

  if (!article) {
    return {
      title: 'Article non trouvé',
    }
  }

  return {
    title: 'Editer ' + article.title,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const article = await prisma.article.findUnique({
    where: { id: params.id },
    include: {
      stock: true,
      illustrations: true,
    },
  })

  if (!article) {
    notFound()
  }

  return (
    <>
      <EditerArticleCatalogue article={article} />
      <EditerStock article={article} />
    </>
  )
}

export default Page
