import AfficherActionsAdminVariant from '@/components/main/AfficherActionsAdminVariant'
import EditerStock from '@/components/main/EditerStock'
import EditerVariantCatalogue from '@/components/main/EditerVariantCatalogue'
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
  const variant = await prisma.articleVariant.findUnique({
    where: { id },
  })

  if (!variant) {
    return {
      title: 'Variant non trouvé',
    }
  }

  return {
    title: 'Editer ' + variant.id,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const variant = await prisma.articleVariant.findUnique({
    where: { id: params.id },
    include: {
      reference: true,
      stock: true,
    },
  })

  if (!variant) {
    notFound()
  }

  return (
    <>
      <div className=''>
        <div className='flex flex-row justify-end'>
          <AfficherActionsAdminVariant variant={variant} />
        </div>
        <EditerVariantCatalogue variant={variant} />
        <EditerStock variant={variant} />
      </div>
    </>
  )
}

export default Page
