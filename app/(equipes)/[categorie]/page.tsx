import React from 'react'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos équipes - Saint-Médard Handball',
}

const page = ({ params }: { params: { categorie: string } }) => {
  return <div>&Eacute;quipe {params.categorie}</div>
}

export default page
