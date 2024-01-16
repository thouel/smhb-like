'use client'
import type { Article } from '@prisma/client'
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

type Props = { article?: Article }

const EditerArticleCatalogueModal = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { article } = props

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
            <DialogDescription>
              {'Pour ajouter une nouvelle référence au catalogue du club'}
            </DialogDescription>
          </DialogHeader>
          <EditerArticleCatalogue article={article} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerArticleCatalogueModal
