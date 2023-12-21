import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités - Saint-Médard Handball',
}
type Props = {}

const Page = ({ params }: { params: { id: number; titre: string } }) => {
  return (
    <div>
      Actualit&eacute; {params.id} - {params.titre}
    </div>
  )
}

export default Page
