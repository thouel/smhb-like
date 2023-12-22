'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { log } from '@logtail/next'
import { useState } from 'react'
import { creerActualite } from '@/actions/creerActualite'

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const AjouterActualite = () => {
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(creerActualite, initialState)

  return (
    <>
      <form
        action={formAction}
        className='flex flex-col max-w-sm gap-5 rounded-lg border-[1px] p-5'
      >
        <p className='flex flex-col gap-2'>
          <Label htmlFor='title'>Titre</Label>
          <Input
            type='text'
            id='title'
            name='title'
            required
            // onChange={(e) => setTitle(e.target.value)}
          />
          {!state.success &&
            state.errors?.title &&
            state.errors?.title?.map((e, i) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))}
        </p>
        <p className='flex flex-col gap-2'>
          <Label htmlFor='description'>Description</Label>
          <Textarea
            id='description'
            name='description'
            // onChange={(e) => setDescription(e.target.value)}
          />
          {!state.success &&
            state.errors?.description &&
            state.errors?.description?.map((e, i) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))}
        </p>
        <p className='flex flex-col gap-2'>
          <Label htmlFor='image'>Image</Label>
          <Input
            type='file'
            name='image'
            id='image'
            // onChange={(e) => setImage(e.target.files?.item(0))}
          />
          {/* {!state.success &&
            state.errors?.image &&
            state.errors?.image?.map((e, i) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))} */}
        </p>

        <p className='self-end'>
          <Button type='submit' aria-disabled={pending}>
            Cr&eacute;er nouvelle actualit&eacute;
          </Button>
        </p>
        {state.success && (
          <p aria-live='polite' role='status'>
            {/* className='sr-only' */}
            {state.message}
          </p>
        )}
      </form>
    </>
  )
}

export default AjouterActualite
