import ListerArticlesCatalogue from '@/components/main/ListerArticlesCatalogue'
import prisma from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles du catalogue',
}

const Page = async () => {
  const articles = await prisma.article.findMany()

  return (
    <>
      <ListerArticlesCatalogue articles={articles} />
    </>
  )
}

export default Page
