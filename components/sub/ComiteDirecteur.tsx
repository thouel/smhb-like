import Image from 'next/image'

export type MembreComite = {
  nom: string
  role?: string
  photo: string
}

const comiteDirecteur: MembreComite[] = [
  {
    nom: 'Eric LE CARROUR',
    role: 'PRESIDENT',
    photo: '/organigramme/Eric-LE-CARROUR-Président-2.png',
  },
  {
    nom: 'Stephen VACHER',
    role: 'VICE-PRESIDENT',
    photo: '/organigramme/Steven-VACHER-Vice-président-1.png',
  },
  {
    nom: 'Thomas SAINT-GIRONS',
    role: 'TRESORIER',
    photo: '/organigramme/Thomas-SAINT-GIRONS-Trésorier-1.png',
  },
  {
    nom: 'Louise VAN BOXSOM',
    role: 'SECRETAIRE',
    photo: '/organigramme/Louise-VAN-BOXSOM-Secrétaire.png',
  },
  {
    nom: 'Stéphanie FERRARI',
    role: 'SECRETAIRE ADJOINTE',
    photo: '/organigramme/Stéphanie-FERRARI-Secrétaire-Adjointe.png',
  },
  {
    nom: 'Timothée ARCE',
    role: 'MEMBRE ELU',
    photo: '/organigramme/Timothé-ARCE-Membre-élu-1.png',
  },
  {
    nom: 'Cédric ALBERT',
    photo: '/organigramme/Cédric_Albert_SMHB-removebg-preview.png',
  },
  {
    nom: 'Colette SARAZIN',
    photo: '/organigramme/Colette_SARAZIN-removebg-preview.png',
  },
  {
    nom: 'Danielle JOST',
    photo: '/organigramme/Anonyme.jpg',
  },
  {
    nom: 'David GUEYLARD',
    photo: '/organigramme/David-GUEYLARD.png',
  },
  {
    nom: 'Géraldine ALBERT',
    photo: '/organigramme/Géraldine-ALBERT.png',
  },
  {
    nom: 'Yohann MENU',
    photo: '/organigramme/Yohann_MENU-removebg-preview-1.png',
  },
]

const ComiteDirecteur = () => {
  return (
    <>
      <h1 className='pt-20 pb-10 text-3xl font-semibold text-center'>
        {'Le comité directeur'}
      </h1>
      <div className='grid grid-cols-3 gap-y-24 gap-x-10'>
        {comiteDirecteur.map((membre, idx) => (
          <div key={`m${idx}`} className='flex flex-row gap-5'>
            <Image
              src={membre.photo}
              alt={membre.nom}
              height={140}
              width={140}
            />
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-semibold'>{membre.nom}</span>
              {membre.role && (
                <span className='font-light tracking-[0.3rem] text-gray-400 uppercase'>
                  {membre.role}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ComiteDirecteur
