'use client'

import { editerReferenceCatalogue } from '@/actions/editerReferenceCatalogue'
import type { ArticleReference } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TYPES } from '@/constants/constants'
import { Textarea } from '../ui/textarea'

type Props = {
  reference?: ArticleReference
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerReferenceCatalogue = (props: Props) => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(
    editerReferenceCatalogue,
    initialState,
  )
  const { reference } = props

  useEffect(() => {
    if (state.success) {
      if (props.setOpen) {
        props.setOpen(false)
      }
    }
  }, [state.success, props])

  return (
    <>
      <div className='flex flex-col justify-between gap-5 my-5'>
        <form
          action={formAction}
          className='flex flex-col gap-5 rounded-lg border-[1px] p-5 grow'
        >
          <h1 className='text-2xl font-semibold'>Référence</h1>
          <input type='hidden' name='id' id='id' value={reference?.id} />
          <p className='flex flex-col gap-2 grow'>
            <Select name='type' defaultValue={reference?.type}>
              <SelectTrigger className=''>
                <SelectValue placeholder='Types' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Types</SelectLabel>
                  {TYPES.map((t, _) => (
                    <SelectItem key={_} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!state.success &&
              state.errors?.type?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2'>
            <Label htmlFor='displayName'>Libellé</Label>
            <Input
              type='text'
              id='displayName'
              name='displayName'
              required
              defaultValue={reference?.displayName}
            />
            {!state.success &&
              state.errors?.displayName?.map((e, i) => (
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
                reference?.description != null ? reference?.description : ''
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

          <p className='flex self-end gap-5'>
            <Button type='reset' variant='ghost'>
              {'Réinitialiser'}
            </Button>
            <Button type='submit' aria-disabled={pending}>
              {reference ? 'Mettre à jour référence' : 'Enregistrer référence'}
            </Button>
          </p>
          {state.success && (
            <p aria-live='polite' className='sr-only' role='status'>
              {state.message}
            </p>
          )}
        </form>
      </div>
    </>
  )
}

export default EditerReferenceCatalogue
