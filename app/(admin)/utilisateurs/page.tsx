'use client'
import { createUser } from '@/actions/createUser'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' aria-disabled={pending}>
      Cr&eacute;er nouvel utilisateur
    </Button>
  )
}

const Page = () => {
  const [state, formAction] = useFormState(createUser, initialState)

  return (
    <>
      <form action={formAction} className='flex flex-col max-w-sm gap-5'>
        <p className='flex flex-col gap-2'>
          <Label htmlFor='username'>Nom d&apos;utilisateur</Label>
          <Input
            type='text'
            id='username'
            name='username'
            placeholder='Votre login'
          />
        </p>
        <p className='flex flex-col gap-2'>
          <Label htmlFor='password'>Mot de passe</Label>
          <Input type='password' id='password' name='password' />
        </p>
        <p className='self-end'>
          <SubmitButton />
        </p>
        <p aria-live='polite' className='sr-only' role='status'>
          {state?.message}
        </p>
      </form>
    </>
  )
}

export default Page
