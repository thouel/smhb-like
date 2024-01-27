import AfficherBoutique from '@/components/main/AfficherBoutique'
import AfficherBoutiqueVide from '@/components/sub/AfficherBoutiqueVide'
import prisma from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique',
}

type Props = {}
const page = async (props: Props) => {
  const articles = await prisma.article.findMany({
    include: {
      illustrations: true,
      stock: true,
    },
  })

  if (!articles) {
    return <AfficherBoutiqueVide />
  }

  return (
    <>
      <AfficherBoutique articles={articles} />
    </>
  )
}

export default page
