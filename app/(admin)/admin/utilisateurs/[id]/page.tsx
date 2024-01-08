import EditerUtilisateur from '@/components/main/EditerUtilisateur'
import prisma from '@/lib/db'

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: params.id },
  })

  return (
    <>
      <EditerUtilisateur user={user} />
    </>
  )
}

export default Page
