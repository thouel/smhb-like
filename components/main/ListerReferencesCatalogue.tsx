import { columns } from '@/app/(admin)/admin/boutique/columns'
import { DataTable } from '@/app/(admin)/admin/boutique/data-table'
import { ArticleReferenceWithIllustrations } from '@/types'
import EditerReferenceCatalogueModal from './EditerReferenceCatalogueModal'

const ListerReferencesCatalogue = ({
  references,
}: {
  references: ArticleReferenceWithIllustrations[]
}) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-xl'>Références du catalogue</h1>
        <DataTable columns={columns} data={references} />
        <EditerReferenceCatalogueModal />
      </div>
    </>
  )
}

export default ListerReferencesCatalogue
