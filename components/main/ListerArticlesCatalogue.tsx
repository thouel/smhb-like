import React from 'react'
import type { Article } from '@prisma/client'
import { DataTable } from '@/app/(admin)/admin/boutique/data-table'
import { columns } from '@/app/(admin)/admin/boutique/columns'
import EditerArticleCatalogueModal from './EditerArticleCatalogueModal'

const ListerArticlesCatalogue = ({ articles }: { articles: Article[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-xl'>Articles du catalogue</h1>
        <DataTable columns={columns} data={articles} />
        <EditerArticleCatalogueModal />
      </div>
    </>
  )
}

export default ListerArticlesCatalogue
