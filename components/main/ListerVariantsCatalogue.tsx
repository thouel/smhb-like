import { columns } from '@/app/(admin)/admin/boutique/variants/columns'
import { DataTable } from '@/app/(admin)/admin/boutique/variants/data-table'
import EditerVariantCatalogueModal from './EditerVariantCatalogueModal'
import {
  ArticleReferenceWithFullTree,
  ArticleVariantWithStockAndRef,
} from '@/types'

const ListerVariantsCatalogue = ({
  reference,
}: {
  reference: ArticleReferenceWithFullTree
}) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-2xl font-semibold'>Variants</h1>
        <DataTable
          columns={columns}
          data={reference?.variants as ArticleVariantWithStockAndRef[]}
        />
        <EditerVariantCatalogueModal refId={reference?.id} />
      </div>
    </>
  )
}

export default ListerVariantsCatalogue
