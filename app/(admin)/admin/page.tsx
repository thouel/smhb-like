import { LuNewspaper } from 'react-icons/lu'
import { LuUsers2 } from 'react-icons/lu'
import { LuShoppingBasket } from 'react-icons/lu'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <div className='flex flex-row gap-5 p-5 my-5 rounded-lg'>
        <Link href={'/admin/actualites'}>
          <div className='flex flex-col gap-2 p-5 items-center border-[6px] border-yellow-400 hover:bg-yellow-400 rounded-lg'>
            <LuNewspaper className='w-20 h-20' />
            <h1 className='text-xl font-bold'>Actualit&eacute;s</h1>
          </div>
        </Link>
        <Link href={'/admin/utilisateurs'}>
          <div className='flex flex-col gap-2 p-5 items-center border-[6px] border-yellow-400 hover:bg-yellow-400 rounded-lg'>
            <LuUsers2 className='w-20 h-20' />
            <h1 className='text-xl font-bold'>Utilisateurs</h1>
          </div>
        </Link>
        <Link href={'/admin/boutique'}>
          <div className='flex flex-col gap-2 p-5 items-center border-[6px] border-yellow-400 hover:bg-yellow-400 rounded-lg'>
            <LuShoppingBasket className='w-20 h-20' />
            <h1 className='text-xl font-bold'>Boutique</h1>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Page
