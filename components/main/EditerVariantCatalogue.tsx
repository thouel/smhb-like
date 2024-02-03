'use client'
import { editerVariantCatalogue } from '@/actions/editerVariantCatalogue'
import { ArticleVariantWithStockAndRef } from '@/types'
import { useFormState, useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { TAILLES } from '@/constants/constants'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Dispatch, SetStateAction, useEffect } from 'react'

type Props = {
  variant?: ArticleVariantWithStockAndRef
  refId?: string
  setOpen?: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const EditerVariantCatalogue = (props: Props) => {
  const { variant, refId } = props
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(editerVariantCatalogue, initialState)

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
          <h1 className='text-2xl font-semibold'>Articles</h1>
          <input type='hidden' name='id' id='id' value={variant?.id} />
          <input
            type='hidden'
            name='refId'
            id='refId'
            value={variant ? variant?.reference.id : refId}
          />
          <p className='flex flex-col gap-2 grow'>
            <Select name='size' defaultValue={variant?.size}>
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
              defaultValue={variant?.unitPriceInEuros}
            />
            {!state.success &&
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
              {variant ? 'Mettre à jour variant' : 'Enregistrer variant'}
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

export default EditerVariantCatalogue
