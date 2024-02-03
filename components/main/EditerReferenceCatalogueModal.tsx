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
import EditerReferenceCatalogue from './EditerReferenceCatalogue'

const EditerReferenceCatalogueModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <LuNewspaper className='inline w-6 h-6 pr-2' />
            {'Ajouter une référence au catalogue'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {'Créer une nouvelle référence dans le catalogue'}
            </DialogTitle>
            <DialogDescription className='text-wrap'>
              <p>
                {'Pour ajouter une nouvelle référence au catalogue du club. '}
              </p>
              <p>
                {
                  'Une fois créée, éditer la référence afin de mettre à jour le stock et les illustrations'
                }
              </p>
            </DialogDescription>
          </DialogHeader>
          <EditerReferenceCatalogue setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerReferenceCatalogueModal
