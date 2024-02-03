'use client'

import { useState } from 'react'
import { LuNewspaper } from 'react-icons/lu'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import EditerVariantCatalogue from './EditerVariantCatalogue'

type Props = {
  refId: string | undefined
}

const EditerVariantCatalogueModal = (props: Props) => {
  const { refId } = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <LuNewspaper className='inline w-6 h-6 pr-2' />
            {'Ajouter un variant à la référence'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {'Créer un nouveau variant à cette référence'}
            </DialogTitle>
            <DialogDescription className='text-wrap'>
              <p>{'Pour ajouter un nouveau variant à la référence. '}</p>
              <p>
                {
                  'Une fois créé, éditer le variant pour continuer la mise à jour'
                }
              </p>
            </DialogDescription>
          </DialogHeader>
          <EditerVariantCatalogue refId={refId} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerVariantCatalogueModal
