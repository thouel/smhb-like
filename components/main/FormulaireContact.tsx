'use client'

import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useFormState, useFormStatus } from 'react-dom'
import { envoyerMessageContact } from '@/actions/envoyerMessageContact'
import { useEffect, useRef, useState } from 'react'

type Props = { className?: string }

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const COUNTER_START = 10

const FormulaireContact = (props: Props) => {
  const { className } = props
  const formRef = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(envoyerMessageContact, initialState)
  const [counter, setCounter] = useState(COUNTER_START)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
      setCounter(COUNTER_START)
    }
  }, [state.success])

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000)
    }
  }, [counter])

  return (
    <>
      <div className={cn(className, 'flex flex-col gap-5')}>
        {state.success && counter > 0 && (
          <>
            <div className='p-5 text-green-600 bg-green-100 rounded-lg'>
              {
                'Votre message a bien été reçu. Nous reviendrons vers vous rapidement. A bientôt !'
              }
            </div>
          </>
        )}
        <div className='text-3xl font-semibold'>Contactez-nous</div>
        <form
          ref={formRef}
          action={formAction}
          className='flex flex-col w-full gap-5 p-5 border rounded-lg grow'
        >
          <div>
            <Label htmlFor='name'>Nom</Label>
            <Input type='text' id='name' name='name' />
            {!state.success &&
              state.errors?.name?.map((e, i) => (
                <>
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                </>
              ))}
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input type='email' id='email' name='email' />
            {!state.success &&
              state.errors?.email?.map((e, i) => (
                <>
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                </>
              ))}
          </div>
          <div className='flex flex-col gap-1 grow'>
            <Label htmlFor='message'>Message</Label>
            <Textarea
              id='message'
              name='message'
              className='grow'
              maxLength={1000}
            />
            {!state.success &&
              state.errors?.message?.map((e, i) => (
                <>
                  <span key={i} className='text-xs text-red-600'>
                    {e}
                  </span>
                </>
              ))}
          </div>
          <div className='flex flex-row justify-end gap-5'>
            <Button type='reset' variant='secondary'>
              Réinitialiser
            </Button>
            <Button
              disabled={pending || counter > 0}
              aria-disabled={pending || counter > 0}
              type='submit'
              className='bg-[#D6B91D] hover:bg-[#e6c928]'
            >
              {counter > 0
                ? `Envoyer le message (${counter})`
                : 'Envoyer le message'}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FormulaireContact
