import Image from 'next/image'

const ClubHero = () => {
  return (
    <>
      <div className='flex flex-row gap-5 py-20'>
        <div className='flex flex-col gap-5 text-gray-800'>
          <span>
            {
              "Créé le 20 novembre 1976, suite à l'inauguration de la salle omnisports du COSEC, le club de Handball se lançait dans la compétition au sein de l'ASSM (Association Sportive de Saint Médard en Jalles)."
            }
          </span>
          <span>
            {
              "C'est sous la férule d'une bande de copains : Jean-Marie VERDERY, Jacques GAUNARD, Philippe SEGUIN et François DENOST, que la section Handball prenait vie."
            }
          </span>
          <span>
            {
              'A 27 ans, cette section est devenue majeure. Nous sommes passés de 7 à 313 licenciés ce qui nous met au 1er rang en effectif des clubs de Handball de la Région Aquitaine !'
            }
          </span>
          <span>
            {'Tout naturellement, la section demande son indépendance.'}
          </span>
          <span>
            {
              'Sous la présidence de Jean-Claude SAINT-MARC, ce sera chose faite en assemblée générale le 28 février 2003. La saison 2003-2004 est ainsi la première saison de SAINT MEDARD HANDBALL club autonome.'
            }
          </span>
          <span>
            {
              'Il faut noter que nous avons quitté l\'ASSM en bons termes ce qui nous a permis de conserver nos couleurs "jaune et noir" et notre niveau de classification auprès de la Fédération Française de Handball.'
            }
          </span>
        </div>
        <div className='relative w-full max-w-sm min-h-0 h-[510px]'>
          <Image
            src={'/Historique-saint-medard-handball-683x1024.webp'}
            // width={340}
            // height={510}
            fill
            alt={'Historique Saint Médard Handball'}
          />
        </div>
      </div>
    </>
  )
}

export default ClubHero
