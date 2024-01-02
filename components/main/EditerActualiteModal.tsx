'use client'
import type { Actualite } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { LuNewspaper } from 'react-icons/lu'
import EditerActualite from './EditerActualite'
import { useState } from 'react'

type Props = { actualite?: Actualite }

const EditerActualiteModal = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { actualite } = props

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <LuNewspaper className='inline w-6 h-6 pr-2' />
            {'Créer actualité'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{'Créer une nouvelle actualité'}</DialogTitle>
            <DialogDescription>
              {'Pour donner des nouvelles aux adhérents et aux membres du club'}
            </DialogDescription>
          </DialogHeader>
          <EditerActualite actualite={actualite} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerActualiteModal
