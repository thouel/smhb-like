'use client'

import type { Article } from '@prisma/client'
import { useFormState, useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { editerArticleCatalogue } from '@/actions/editerArticleCatalogue'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TAILLES, TYPES } from '@/constants/constants'

type Props = {
  article?: Article
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerArticleCatalogue = (props: Props) => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editerArticleCatalogue, initialState)
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
          <input type='hidden' name='id' id='id' value={article?.id} />
          <p className='flex flex-col gap-2 grow'>
            <Select name='type' defaultValue={article?.type}>
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
              state.errors?.type &&
              state.errors?.type?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2'>
            <Label htmlFor='title'>Titre</Label>
            <Input
              type='text'
              id='title'
              name='title'
              required
              defaultValue={article?.title}
            />
            {!state.success &&
              state.errors?.title &&
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
                article?.description != null ? article?.description : ''
              }
              className='grow'
            />
            {!state.success &&
              state.errors?.description &&
              state.errors?.description?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2 grow'>
            <Select name='size' defaultValue={article?.size}>
              <SelectTrigger className=''>
                <SelectValue placeholder='Tailles' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tailles</SelectLabel>
                  {TAILLES.map((t, _) => (
                    <SelectItem key={_} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {!state.success &&
              state.errors?.size &&
              state.errors?.size?.map((e, i) => (
                <span key={i} className='text-xs text-red-600'>
                  {e}
                </span>
              ))}
          </p>
          <p className='flex flex-col gap-2'>
            <Label htmlFor='unitPriceInEuros'>{'Prix unitaire (€)'}</Label>
            <Input
              type='text'
              id='unitPriceInEuros'
              name='unitPriceInEuros'
              required
              defaultValue={article?.unitPriceInEuros}
            />
            {!state.success &&
              state.errors?.unitPriceInEuros &&
              state.errors?.unitPriceInEuros?.map((e, i) => (
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
              {article
                ? 'Mettre à jour article du catalogue'
                : 'Enregistrer article du catalogue'}
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

export default EditerArticleCatalogue
