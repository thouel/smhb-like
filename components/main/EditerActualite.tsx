'use client'

import { editerActualite } from '@/actions/editerActualite'
import { isPdf } from '@/lib/utils'
import type { Actualite } from '@prisma/client'
import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import AfficherPremierePagePDF from '../sub/AfficherPremierePagePDF'
import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type Props = {
  actualite?: Actualite
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerActualite = (props: Props) => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editerActualite, initialState)
  const { actualite } = props

  useEffect(() => {
    if (state.success) {
      if (props.setOpen) {
        props.setOpen(false)
      }
    }
  }, [state.success, props])

  return (
    <>
      <div className='flex flex-row justify-between gap-5 my-5'>
        <form
          action={formAction}
          className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow'
        >
          <input type='hidden' name='id' id='id' value={actualite?.id} />
          <p className='flex flex-col gap-2'>
            <Label htmlFor='title'>Titre</Label>
            <Input
              type='text'
              id='title'
              name='title'
              required
              defaultValue={actualite?.title}
            />
            {!state.success &&
              state.errors?.title?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2 grow'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              defaultValue={
                actualite?.description != null ? actualite?.description : ''
              }
              className='grow'
            />
            {!state.success &&
              state.errors?.description?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between'>
              <Label htmlFor='image'>Image</Label>
              {actualite?.image && (
                <>
                  <div className='flex space-x-2'>
                    <Checkbox
                      name='removeCurrentImage'
                      id='removeCurrentImage'
                    />
                    <Label htmlFor='removeCurrentImage'>
                      {"Supprimer l'image actuelle ?"}
                    </Label>
                  </div>
                  <Input
                    type='hidden'
                    name='prevImage'
                    id='prevImage'
                    value={actualite?.image != null ? actualite?.image : ''}
                  />
                </>
              )}
            </div>
            <Input type='file' name='image' id='image' />
            {!state.success &&
              state.errors?.image?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </div>

          <p className='flex self-end gap-5'>
            <Button type='reset' variant='ghost'>
              {'Réinitialiser'}
            </Button>
            <Button type='submit' aria-disabled={pending}>
              {actualite ? 'Mettre à jour actualité' : 'Enregistrer actualité'}
            </Button>
          </p>
          {state.success && (
            <p aria-live='polite' className='sr-only' role='status'>
              {state.message}
            </p>
          )}
        </form>
        {actualite?.image && (
          <>
            <div className='flex flex-col gap-2 p-5'>
              {isPdf(actualite.image) ? (
                <>
                  <Label>Fichier actuel:</Label>
                  <AfficherPremierePagePDF
                    fichier={actualite.image}
                    width={400}
                  />
                </>
              ) : (
                <>
                  <Label>Image actuelle:</Label>
                  <Image
                    src={actualite.image}
                    width={400}
                    height={200}
                    alt={'image'}
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default EditerActualite
