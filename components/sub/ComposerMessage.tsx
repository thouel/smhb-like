'use client'
import { envoyerReponseContact } from '@/actions/envoyerReponseContact'
import type { Message } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

type Props = {
  message: Message
  setReponseEnCours: Dispatch<SetStateAction<boolean>>
}

const initialState = {
  success: false,
  message: '',
  errors: null,
}

const ComposerMessage = (props: Props) => {
  const { message, setReponseEnCours } = props
  const { pending } = useFormStatus()
  const [state, formAction] = useFormState(envoyerReponseContact, initialState)

  useEffect(() => {
    if (state.success) {
      setReponseEnCours(false)
    }
  })

  return (
    <>
      <div className='p-5 border-l shadow-lg bg-gray-50 border-l-gray-300'>
        <h1 className='font-light'>&Agrave;: {message.email}</h1>
        <form action={formAction} className='flex flex-col gap-2 my-2'>
          <input
            type='hidden'
            name='parentMessageId'
            id='parentMessageId'
            value={message.id}
          />
          <Textarea name='message' id='message' />
          {!state.success &&
            state.errors?.message?.map((e: any, i: any) => (
              <span key={i} className='text-xs text-red-600'>
                {e}
              </span>
            ))}
          <div className='flex flex-row justify-between gap-2'>
            <div className=''>
              <Button variant={'default'}>Envoyer</Button>
            </div>
            <Button
              variant={'outline'}
              onClick={(e) => {
                e.preventDefault()
                setReponseEnCours(false)
              }}
            >
              <RiDeleteBin6Line className='w-6 h-6' />
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ComposerMessage
