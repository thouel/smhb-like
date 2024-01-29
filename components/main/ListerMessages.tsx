import { columns } from '@/app/(admin)/admin/messages/columns'
import { DataTable } from '@/app/(admin)/admin/messages/data-table'
import { MessageWithAnswer } from '@/types'

const ListerMessages = ({ messages }: { messages: MessageWithAnswer[] }) => {
  return (
    <>
      <div className='p-5 border-[1px] rounded-lg my-5 flex flex-col gap-5'>
        <h1 className='text-xl'>Messages à traiter</h1>
        <DataTable columns={columns} data={messages} />
      </div>
    </>
  )
}

export default ListerMessages
