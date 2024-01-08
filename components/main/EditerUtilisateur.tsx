'use client'

import type { User } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { editerUtilisateur } from '@/actions/editerUtilisateur'
import MotDePasse from '../sub/MotDePasse'

type Props = {
  user?: User
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerUtilisateur = (props: Props) => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editerUtilisateur, initialState)
  const { user } = props

  useEffect(() => {
    if (state.success) {
      if (props.setOpen) {
        props.setOpen(false)
      }
    }
  }, [state.success, props])

  return (
    <>
      <div className='flex flex-row justify-between gap-5'>
        <form
          action={formAction}
          className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow'
        >
          <div className='flex flex-col gap-5 grow'>
            <input type='hidden' name='id' id='id' value={user?.id} />
            <p className='flex flex-col gap-2'>
              <Label htmlFor='name'>Nom</Label>
              <Input
                type='text'
                id='name'
                name='name'
                required
                defaultValue={user?.name}
              />
              {!state.success &&
                state.errors?.name &&
                state.errors?.name?.map((e, i) => (
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                ))}
            </p>
            <p className='flex flex-col gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                type='email'
                id='email'
                name='email'
                defaultValue={user?.email != null ? user?.email : ''}
                required
              />
              {!state.success &&
                state.errors?.email &&
                state.errors?.email?.map((e, i) => (
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                ))}
            </p>
            <MotDePasse />
            <p className='flex flex-col gap-2'>
              <div className='flex flex-row justify-between'>
                <Label htmlFor='image'>Image</Label>
                {user?.image && (
                  <>
                    <div className='flex space-x-2'>
                      <Checkbox
                        name='removeCurrentImage'
                        id='removeCurrentImage'
                      />
                      <Label htmlFor='removeCurrentImage'>
                        {'Supprimer la photo actuelle ?'}
                      </Label>
                    </div>
                    <Input
                      type='hidden'
                      name='prevImage'
                      id='prevImage'
                      value={user?.image != null ? user?.image : ''}
                    />
                  </>
                )}
              </div>
              <Input type='file' name='image' id='image' />
              {!state.success &&
                state.errors?.image &&
                state.errors?.image?.map((e, i) => (
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                ))}
            </p>
          </div>
          <p className='flex flex-row self-end gap-5'>
            <Button type='reset' variant='ghost'>
              {'Réinitialiser'}
            </Button>
            <Button type='submit' aria-disabled={pending}>
              {user ? 'Mettre à jour utilisateur' : 'Enregistrer utilisateur'}
            </Button>
          </p>
          {state.success && (
            <p aria-live='polite' className='sr-only' role='status'>
              {state.message}
            </p>
          )}
        </form>
        {user?.image && (
          <>
            <div className='flex flex-col gap-2 p-5'>
              <>
                <Label>Image actuelle:</Label>
                <Image
                  src={user.image}
                  width={400}
                  height={200}
                  alt={'image'}
                />
              </>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EditerUtilisateur
