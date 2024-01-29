import type { Message } from '@prisma/client'
import { formatDateAndTime } from '@/constants/constants'
import { MESSAGE_STATUS, MessageWithAnswer, getMessageStatus } from '@/types'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
type Props = {
  message: Message | MessageWithAnswer
  className?: string
  estReponse?: boolean
}

const AfficherMessage = (props: Props) => {
  const { message, className, estReponse } = props

  if (!message) {
    return <></>
  }

  return (
    <>
      <div className={cn(className, '')}>
        <h1 className='flex flex-row gap-5 my-2 text-base'>
          <span>
            <Badge
              variant={
                message.status === MESSAGE_STATUS.TODO ||
                message.status === MESSAGE_STATUS.WIP
                  ? 'default'
                  : 'outline'
              }
            >
              {getMessageStatus(message.status)}
            </Badge>
          </span>
          <span>
            {estReponse ? 'A' : 'De'}: {message.name}{' '}
            <span className='italic'>({message.email})</span>
          </span>
          <span>Le {formatDateAndTime.format(message.createdAt)}</span>
        </h1>
        <p className='p-5 border-l'>{message.message}</p>
      </div>
    </>
  )
}

export default AfficherMessage
