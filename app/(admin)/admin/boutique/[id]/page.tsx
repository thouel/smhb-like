import EditerArticleCatalogue from '@/components/main/EditerArticleCatalogue'
import AjouterIllustrations from '@/components/main/AjouterIllustrations'
import EditerStock from '@/components/main/EditerStock'
import prisma from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import EditerIllustrations from '@/components/main/EditerIllustrations'

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

      <div className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow my-5'>
        <h1 className='text-2xl font-semibold'>Illustrations</h1>
        <EditerIllustrations article={article} />
        <AjouterIllustrations article={article} />
      </div>
    </>
  )
}

export default Page
