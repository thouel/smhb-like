import EditerActualite from '@/components/main/EditerActualite'
import prisma from '@/lib/db'

const Page = async ({ params }: { params: { id: string } }) => {
  const actualite = await prisma.actualite.findUniqueOrThrow({
    where: { id: params.id },
  })

  return (
    <>
      <EditerActualite actualite={actualite} />
    </>
  )
}

export default Page
