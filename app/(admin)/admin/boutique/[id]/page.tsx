import AfficherActionsAdminReference from '@/components/main/AfficherActionsAdminReference'
import AjouterIllustrations from '@/components/main/AjouterIllustrations'
import EditerIllustrations from '@/components/main/EditerIllustrations'
import EditerReferenceCatalogue from '@/components/main/EditerReferenceCatalogue'
import EditerVariantCatalogue from '@/components/main/EditerVariantCatalogue'
import ListerVariantsCatalogue from '@/components/main/ListerVariantsCatalogue'
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
    title: 'Editer ' + reference.displayName,
  }
}

const Page = async ({ params }: { params: { id: string } }) => {
  const reference = await prisma.articleReference.findUnique({
    where: { id: params.id },
    include: {
      illustrations: true,
      variants: {
        include: {
          reference: true,
          stock: true,
        },
      },
    },
  })

  if (!reference) {
    notFound()
  }

  return (
    <>
      <div className=''>
        <div className='flex flex-row justify-end'>
          <AfficherActionsAdminReference reference={reference} />
        </div>
        <EditerReferenceCatalogue reference={reference} />
        {/* <EditerStock reference={reference} /> */}
        <ListerVariantsCatalogue reference={reference} />
        <div className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow my-5'>
          <h1 className='text-2xl font-semibold'>Illustrations</h1>
          <EditerIllustrations reference={reference} />
          <AjouterIllustrations reference={reference} />
        </div>
      </div>
    </>
  )
}

export default Page
