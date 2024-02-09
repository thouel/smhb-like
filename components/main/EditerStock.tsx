'use client'

import { editerStock } from '@/actions/editerStock'
import type { ArticleVariantWithStockAndRef } from '@/types'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
  variant?: ArticleVariantWithStockAndRef
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerStock = (props: Props) => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editerStock, initialState)
  const { variant } = props

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
          <input
            type='hidden'
            name='id'
            id='id'
            defaultValue={variant?.stock?.id}
          />
          <input
            type='hidden'
            name='variantId'
            id='variantId'
            defaultValue={variant?.id}
          />

          <p className='flex flex-col gap-2'>
            <Label htmlFor='available'>En stock</Label>
            <Input
              type='text'
              id='available'
              name='available'
              required
              defaultValue={variant?.stock?.available}
            />
            {!state.success &&
              state.errors?.available?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2'>
            <Label htmlFor='alertWhenBelow'>
              Envoyer une alerte quand le stock passe sous
            </Label>
            <Input
              type='text'
              id='alertWhenBelow'
              name='alertWhenBelow'
              required
              defaultValue={
                variant?.stock?.alertWhenBelow
                  ? variant?.stock?.alertWhenBelow
                  : ''
              }
            />
            {!state.success &&
              state.errors?.alertWhenBelow &&
              state.errors?.alertWhenBelow?.map((e, i) => (
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
              {variant ? 'Mettre à jour le stock' : 'Enregistrer le stock'}
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

export default EditerStock
