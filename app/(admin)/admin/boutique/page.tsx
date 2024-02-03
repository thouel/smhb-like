import ListerReferencesCatalogue from '@/components/main/ListerReferencesCatalogue'
import prisma from '@/lib/db'
import { ArticleReferenceWithIllustrations } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Références du catalogue',
}

const Page = async () => {
  const references: ArticleReferenceWithIllustrations[] =
    await prisma.articleReference.findMany({
      include: { illustrations: true },
    })

  return (
    <>
      <ListerReferencesCatalogue references={references} />
    </>
  )
}

export default Page
