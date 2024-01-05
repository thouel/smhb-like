import Image from 'next/image'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Fragment } from 'react'

type CallToAction = {
  libelle: string
  url: string
}

type MembreCommission = {
  nom: string
  photo: string
}

type Commission = {
  titre: string
  callToAction?: CallToAction
  membres: MembreCommission[]
}

const commissions: Commission[] = [
  {
    titre: 'Animation',
    callToAction: {
      libelle: 'Les évènements',
      url: 'evenements',
    },
    membres: [
      {
        nom: 'Colette SARAZIN',
        photo: '/organigramme/Colette_SARAZIN-removebg-preview.png',
      },
      {
        nom: 'Géraldine ALBERT',
        photo: '/organigramme/Géraldine-ALBERT.png',
      },
      {
        nom: 'Julien LOLAUM',
        photo: '/organigramme/Anonyme.jpg',
      },
      {
        nom: 'Laurent SARRAZIN',
        photo: '/organigramme/Anonyme.jpg',
      },
      {
        nom: 'Stéphanie MAUFFREY',
        photo: '/organigramme/Anonyme.jpg',
      },
      {
        nom: 'Véronique MAFFRE',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Arbitrage',
    membres: [
      {
        nom: 'Timothé ARCE',
        photo: '/organigramme/Timothé-ARCE-Membre-élu-1.png',
      },
      {
        nom: 'Cédric COUTURIER',
        photo: '/organigramme/Anonyme.jpg',
      },
      {
        nom: 'Dylan SOULEPETIT',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Boutique',
    callToAction: {
      libelle: 'LA BOUTIQUE',
      url: 'shop',
    },
    membres: [
      {
        nom: 'Danielle JOST',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Communication',
    membres: [
      {
        nom: 'David GUEYLARD',
        photo: '/organigramme/David-GUEYLARD.png',
      },
      {
        nom: 'Stéphanie FERRARI',
        photo: '/organigramme/Stéphanie-FERRARI-Secrétaire-Adjointe.png',
      },
    ],
  },
  {
    titre: 'Développement Durable',
    membres: [
      {
        nom: 'Louise VAN BOXSOM',
        photo: '/organigramme/Louise-VAN-BOXSOM-Secrétaire.png',
      },
      {
        nom: 'Steven VACHER',
        photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
      },
      {
        nom: 'Thomas SAINT-GIRONS',
        photo: '/organigramme/Thomas-SAINT-GIRONS-Trésorier-1.png',
      },
    ],
  },
  {
    titre: 'Discipline',
    membres: [
      {
        nom: 'Eric LE CARROUR',
        photo: '/organigramme/Eric-LE-CARROUR-Président-2.png',
      },
      {
        nom: 'Jean-Claude SAINT-MARC',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Ethique',
    membres: [
      {
        nom: 'Eric LE CARROUR',
        photo: '/organigramme/Eric-LE-CARROUR-Président-2.png',
      },
    ],
  },
  {
    titre: 'Juridique',
    membres: [
      {
        nom: 'Steven VACHER',
        photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
      },
      {
        nom: 'Thomas SAINT-GIRONS',
        photo: '/organigramme/Thomas-SAINT-GIRONS-Trésorier-1.png',
      },
    ],
  },
  {
    titre: 'Matériel',
    membres: [
      {
        nom: 'Eric LE CARROUR',
        photo: '/organigramme/Eric-LE-CARROUR-Président-2.png',
      },
      {
        nom: 'Steven VACHER',
        photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
      },
    ],
  },
  {
    titre: 'Nouvelles pratiques',
    membres: [
      {
        nom: 'Yohann MENU',
        photo: '/organigramme/Yohann_MENU-removebg-preview-1.png',
      },
      {
        nom: 'Julien LOLAUME',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Partenariats',
    callToAction: {
      libelle: 'Devenir Partenaire',
      url: 'devenir-partenaire',
    },
    membres: [
      {
        nom: 'Steven VACHER',
        photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
      },
      {
        nom: 'David GUEYLARD',
        photo: '/organigramme/David-GUEYLARD.png',
      },
      {
        nom: 'Christophe PREVOST',
        photo: '/organigramme/Anonyme.jpg',
      },
      {
        nom: 'Didier BALARD',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Qualification',
    membres: [
      {
        nom: 'Colette SARAZIN',
        photo: '/organigramme/Colette_SARAZIN-removebg-preview.png',
      },
    ],
  },
  {
    titre: 'Santé',
    membres: [
      {
        nom: 'Jean-Claude SAINT-MARC',
        photo: '/organigramme/Anonyme.jpg',
      },
    ],
  },
  {
    titre: 'Sportive',
    membres: [
      {
        nom: 'Cédric ALBERT',
        photo: '/organigramme/Cédric_Albert_SMHB-removebg-preview.png',
      },
      {
        nom: 'Christophe AMBROISE',
        photo: '/organigramme/Christopher-AMBROISE-Directeur-Sportif-1.webp',
      },
    ],
  },
  {
    titre: 'Technique',
    membres: [
      {
        nom: 'Steven VACHER',
        photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
      },
    ],
  },
]

const Commissions = () => {
  return (
    <Fragment>
      <h1 className='pb-10 text-3xl font-semibold text-center pt-36'>
        {'Les commissions'}
      </h1>
      {commissions.map((c, idx) => (
        <Fragment key={`c${idx}`}>
          <div className='flex flex-row justify-between pt-24 pb-12'>
            <h2 className='text-2xl font-semibold'>{c.titre}</h2>
            {c.callToAction && (
              <Button className='tracking-widest uppercase'>
                <Link href={`/${c.callToAction.url}`}>
                  {c.callToAction.libelle}
                </Link>
              </Button>
            )}
          </div>
          <div className='grid grid-cols-3 gap-y-16 gap-x-10'>
            {c.membres.map((membre, idx2) => (
              <div key={`c${idx}.m${idx2}`} className='flex flex-row gap-5'>
                <Image
                  src={membre.photo}
                  alt={membre.nom}
                  height={140}
                  width={140}
                />
                <span className='text-2xl font-semibold'>{membre.nom}</span>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  )
}

export default Commissions
