'use client'
import type { User } from '@prisma/client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { FiUserPlus } from 'react-icons/fi'

import { useState } from 'react'
import EditerUtilisateur from './EditerUtilisateur'

type Props = { user?: User }

const EditerUtilisateurModal = (props: Props) => {
  const [open, setOpen] = useState(false)
  const { user } = props

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <FiUserPlus className='inline w-6 h-6 pr-2' />
            {'Créer utilisateur'}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{'Créer un nouvel utilisateur'}</DialogTitle>
            <DialogDescription>
              {'Pensez à lui demander de vérifier ses mails'}
            </DialogDescription>
          </DialogHeader>
          <EditerUtilisateur user={user} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditerUtilisateurModal
