import React from 'react'

import { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { categorie: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { categorie } = params
  return { title: 'Equipe ' + categorie }
}

const page = ({ params }: { params: { categorie: string } }) => {
  return <div>&Eacute;quipe {params.categorie}</div>
}

export default page
