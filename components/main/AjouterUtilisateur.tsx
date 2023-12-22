'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { creerUtilisateur } from '@/actions/creerUtilisateur'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

const initialState = {
  success: false,
  message: '',
  errors: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' aria-disabled={pending}>
      Cr&eacute;er nouvel utilisateur
    </Button>
  )
}

const AjouterUtilisateur = () => {
  const [state, formAction] = useFormState(creerUtilisateur, initialState)

  return (
    <>
      <form
        action={formAction}
        className='flex flex-col max-w-sm gap-5 rounded-lg border-[1px] p-5'
      >
        <p className='flex flex-col gap-2'>
          <Label htmlFor='username'>Nom d&apos;utilisateur</Label>
          <Input
            type='text'
            id='username'
            name='username'
            placeholder='Votre login'
            required
          />
          {!state.success &&
            state.errors?.username &&
            state.errors?.username?.map((e, i) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))}
        </p>
        <p className='flex flex-col gap-2'>
          <Label htmlFor='password'>Mot de passe</Label>
          <Input type='password' id='password' name='password' required />
          {!state.success &&
            state.errors?.password &&
            state.errors?.password?.map((e, i) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))}
        </p>
        <p className='self-end'>
          <SubmitButton />
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

export default AjouterUtilisateur
