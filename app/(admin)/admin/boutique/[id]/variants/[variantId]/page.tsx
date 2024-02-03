import AfficherActionsAdminVariant from '@/components/main/AfficherActionsAdminVariant'
import EditerStock from '@/components/main/EditerStock'
import EditerVariantCatalogue from '@/components/main/EditerVariantCatalogue'
import prisma from '@/lib/db'
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string; variantId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { id, variantId } = params

  // fetch data
  const variant = await prisma.articleVariant.findUnique({
    where: { id: variantId },
  })

  if (!variant) {
    return {
      title: 'Variant non trouvé',
    }
  }

  return {
    title: 'Editer le variant ' + variant.id,
  }
}

const Page = async ({ params }: { params: { variantId: string } }) => {
  const variant = await prisma.articleVariant.findUnique({
    where: { id: params.variantId },
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
        <AfficherActionsAdminVariant variant={variant} />
        <EditerVariantCatalogue variant={variant} />
        <EditerStock variant={variant} />
      </div>
    </>
  )
}

export default Page
