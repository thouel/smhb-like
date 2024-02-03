import AfficherBoutique from '@/components/main/AfficherBoutique'
import AfficherBoutiqueVide from '@/components/sub/AfficherBoutiqueVide'
import prisma from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boutique',
}

type Props = {}
const page = async (props: Props) => {
  const references = await prisma.articleReference.findMany({
    include: {
      illustrations: true,
      variants: {
        include: {
          stock: true,
        },
      },
    },
  })

  if (!references) {
    return <AfficherBoutiqueVide />
  }

  return (
    <>
      <AfficherBoutique references={references} />
    </>
  )
}

export default page
