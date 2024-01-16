'use client'

import type { ArticleWithStock } from '@/types'
import { useFormState, useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { editerStock } from '@/actions/editerStock'

type Props = {
  article?: ArticleWithStock
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
  const { article } = props

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
          <input type='hidden' name='id' id='id' value={article?.stock?.id} />
          <input
            type='hidden'
            name='idArticle'
            id='idArticle'
            value={article?.id}
          />

          <p className='flex flex-col gap-2'>
            <Label htmlFor='available'>En stock</Label>
            <Input
              type='text'
              id='available'
              name='available'
              required
              defaultValue={article?.stock?.available}
            />
            {!state.success &&
              state.errors?.available &&
              state.errors?.available?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2'>
            <Label htmlFor='alertWhenBelow'>Envoyer une alerte sous</Label>
            <Input
              type='text'
              id='alertWhenBelow'
              name='alertWhenBelow'
              required
              defaultValue={
                article?.stock?.alertWhenBelow
                  ? article?.stock?.alertWhenBelow
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
              {article ? 'Mettre à jour le stock' : 'Enregistrer le stock'}
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
