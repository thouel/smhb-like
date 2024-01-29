'use client'
import { passerMessageAuStatut } from '@/actions/passerMessageAuStatut'
import { MESSAGE_STATUS, MessageWithAnswer } from '@/types'
import { useState } from 'react'
import { GoReply } from 'react-icons/go'
import { LuUndo } from 'react-icons/lu'
import { MdOutlineDone } from 'react-icons/md'
import { Button } from '../ui/button'
import ComposerMessage from './ComposerMessage'

type Props = { message: MessageWithAnswer }

const ActionsPrincipalesMessage = (props: Props) => {
  const { message } = props
  const [reponseEnCours, setReponseEnCours] = useState<boolean>(false)

  if (!message) {
    return <></>
  }

  return (
    <>
      {reponseEnCours ? (
        <ComposerMessage
          message={message}
          setReponseEnCours={setReponseEnCours}
        />
      ) : (
        <div className='flex flex-row justify-start gap-2'>
          <Button
            variant='secondary'
            title='Répondre'
            disabled={
              message.status === MESSAGE_STATUS.DONE || !!message.answer
            }
            onClick={() => setReponseEnCours(true)}
          >
            <GoReply className='w-6 h-6 mr-2' />
            Répondre
          </Button>
          {(message.status === MESSAGE_STATUS.TODO ||
            message.status === MESSAGE_STATUS.WIP) && (
            <Button
              variant='secondary'
              title='Marquer comme résolu'
              disabled={!!message.answer}
              onClick={() =>
                passerMessageAuStatut(message, MESSAGE_STATUS.DONE)
              }
            >
              <MdOutlineDone className='w-6 h-6 mr-2' />
              Marquer comme résolu
            </Button>
          )}
          {message.status === MESSAGE_STATUS.DONE && (
            <Button
              variant='secondary'
              title='Réouvrir la discussion'
              disabled={!!message.answer}
              onClick={() =>
                passerMessageAuStatut(message, MESSAGE_STATUS.TODO)
              }
            >
              <LuUndo className='w-6 h-6 mr-2' />
              Réouvrir la discussion
            </Button>
          )}
        </div>
      )}
    </>
  )
}

export default ActionsPrincipalesMessage
