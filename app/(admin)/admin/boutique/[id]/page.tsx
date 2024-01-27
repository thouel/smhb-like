import AfficherActionsAdminArticle from '@/components/main/AfficherActionsAdminArticle'
import AjouterIllustrations from '@/components/main/AjouterIllustrations'
import EditerArticleCatalogue from '@/components/main/EditerArticleCatalogue'
import EditerIllustrations from '@/components/main/EditerIllustrations'
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
      <div className=''>
        <div className='flex flex-row justify-end'>
          <AfficherActionsAdminArticle article={article} />
        </div>
        <EditerArticleCatalogue article={article} />
        <EditerStock article={article} />

        <div className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow my-5'>
          <h1 className='text-2xl font-semibold'>Illustrations</h1>
          <EditerIllustrations article={article} />
          <AjouterIllustrations article={article} />
        </div>
      </div>
    </>
  )
}

export default Page
