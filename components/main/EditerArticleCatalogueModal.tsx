'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { LuNewspaper } from 'react-icons/lu'
import EditerArticleCatalogue from './EditerArticleCatalogue'
import { useState } from 'react'

const EditerArticleCatalogueModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <LuNewspaper className='inline w-6 h-6 pr-2' />
            {'Ajouter un article au catalogue'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{'Créer un nouvel article du catalogue'}</DialogTitle>
            <DialogDescription className='text-wrap'>
              <p>
                {'Pour ajouter une nouvelle référence au catalogue du club. '}
              </p>
              <p>
                {
                  "Une fois créé, éditer l'article afin de mettre à jour le stock et les illustrations"
                }
              </p>
            </DialogDescription>
          </DialogHeader>
          <EditerArticleCatalogue setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerArticleCatalogueModal
