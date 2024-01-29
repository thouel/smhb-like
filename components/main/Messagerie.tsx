import { MessageWithAnswer } from '@/types'
import type { User } from '@prisma/client'
import ActionsPrincipalesMessage from '../sub/ActionsPrincipalesMessage'
import AfficherMessage from '../sub/AfficherMessage'
import TiroirUtilisateur from '../sub/TiroirUtilisateur'
type Props = { message: MessageWithAnswer; user: User | null }

const Messagerie = (props: Props) => {
  const { message, user } = props

  if (!message) {
    return <></>
  }

  return (
    <>
      <div className='flex flex-row justify-between gap-5 my-5'>
        <div className='flex flex-col gap-5 grow'>
          <AfficherMessage message={message} />
          {message?.answer && (
            <>
              <AfficherMessage
                message={message.answer}
                estReponse={true}
                className='ml-5'
              />
            </>
          )}
          <ActionsPrincipalesMessage message={message} />
        </div>
        <TiroirUtilisateur message={message} user={user} />
      </div>
    </>
  )
}

export default Messagerie
