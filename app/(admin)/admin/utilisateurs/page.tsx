import ListerUtilisateurs from '@/components/main/ListerUtilisateurs'
import prisma from '@/lib/db'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilisateurs',
}

const Page = async () => {
  const utilisateurs = await prisma.user.findMany()

  return (
    <>
      <ListerUtilisateurs utilisateurs={utilisateurs} />
    </>
  )
}

export default Page
