import Image from 'next/image'
import ComiteDirecteur from './ComiteDirecteur'
import Commissions from './Commissions'

type Props = {}

const OrganigrammeHero = (props: Props) => {
  return (
    <>
      <ComiteDirecteur />
      <Commissions />
    </>
  )
}

export default OrganigrammeHero
