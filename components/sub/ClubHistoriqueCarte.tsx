import { Card, CardContent } from '../ui/card'
import { TranchesHistoire } from './ClubHistorique'

type Props = { tranchesHistoire: TranchesHistoire }

const ClubHistoriqueCarte = (props: Props) => {
  const { tranchesHistoire } = props

  return (
    <>
      <Card className='bg-[#D6B91D]'>
        <CardContent className='flex flex-col p-10 text-white'>
          <h1 className='pb-10 text-4xl font-semibold'>
            {tranchesHistoire.titre}
          </h1>
          {tranchesHistoire.paragraphes.map((p, i) => (
            <span
              className='pt-1 text-base'
              key={tranchesHistoire.titre.concat(i.toString())}
            >
              {p.contenu}
            </span>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

export default ClubHistoriqueCarte
