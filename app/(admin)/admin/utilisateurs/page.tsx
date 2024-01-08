import ListerUtilisateurs from '@/components/main/ListerUtilisateurs'
import prisma from '@/lib/db'

const Page = async () => {
  const utilisateurs = await prisma.user.findMany()

  return (
    <>
      <ListerUtilisateurs utilisateurs={utilisateurs} />
    </>
  )
}

export default Page
