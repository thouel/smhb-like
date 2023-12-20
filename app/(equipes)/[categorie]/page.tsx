import React from 'react'

const page = ({ params }: { params: { categorie: string } }) => {
  return <div>&Eacute;quipe {params.categorie}</div>
}

export default page
