import options from '@/app/api/(auth)/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const socials: { title: string; href: string }[] = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/SaintMedardHandball',
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/saint_medard_handball_33?igshid=MzRlODBiNWFlZA==',
  },
]

const Footer = async (props: Props) => {
  const session = await getServerSession(options)
  return (
    <>
      <div
        className='relative w-full min-h-[50px] bg-cover bg-center flex flex-row gap-5 py-24 justify-between pr-40 text-white'
        style={{ backgroundImage: `url('/09.webp')` }}
      >
        <Image
          width={200}
          height={200}
          src={'/LOGO-2023.webp'}
          alt={'Logo 2023'}
        />
        <div className='flex flex-col gap-1'>
          <h3 className='mb-5 text-lg font-bold'>Suivez-nous</h3>
          {socials.map((element) => (
            <p key={element.title} className='hover:text-black'>
              <a href={element.href}>{element.title}</a>
            </p>
          ))}
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='mb-5 text-lg font-bold'>
            Informations l&eacute;gales
          </h3>
          <p className='hover:text-black'>
            <Link href={'/mentions-legales'}>Mentions l&eacute;gales</Link>
          </p>
          <p className='hover:text-black'>
            <Link href={'/politique-de-confidentialite'}>
              Politique de confidentialit&eacute;
            </Link>
          </p>
          <p className='hover:text-black'>
            <Link href={'/plan-du-site'}>Plan du site</Link>
          </p>
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='mb-5 text-lg font-bold'>Contact</h3>
          <div className='hover:text-black'>
            <p>Salle Ariane - Allée du Preuilha</p>
            <p>33160 Saint Médard en Jalles</p>
          </div>
          <p className='hover:text-black'>
            <a
              href='tel:+33679961708'
              target='_blank'
              rel='noopener noreferrer'
            >
              Tel : +(0)33 6 79 96 17 08
            </a>
          </p>
          <p className='hover:text-black'>
            <a
              href='mailto:contact@smhb.fr'
              target='_blank'
              rel='noopener noreferrer'
            >
              contact@smhb.fr
            </a>
          </p>
          <p className='font-semibold hover:text-black'>
            <Link href={'/contact'}>Contactez-nous</Link>
          </p>
        </div>
      </div>
      <div className='flex justify-between px-10 py-10'>
        <div className='flex flex-row gap-5 text-sm text-[#D6B91D] font-semibold'>
          <p className='hover:text-black'>
            <Link href={'/'}>Accueil</Link>
          </p>
          <p className='hover:text-black'>
            <Link href={'/actualites'}>Actualit&eacute;s</Link>
          </p>
          <p className='hover:text-black'>
            <Link href={'/shop'}>Boutique</Link>
          </p>
          {!session?.user ? (
            <p className='hover:text-black'>
              <Link href={'/api/auth/signin?callbackUrl=/'}>Sign in</Link>
            </p>
          ) : (
            <>
              <p className='hover:text-black'>
                <Link href={'/api/auth/signout?callbackUrl=/'}>Sign out</Link>
              </p>
              <p className='hover:text-black'>
                <Link href={'/admin'}>Administration</Link>
              </p>
            </>
          )}
        </div>
        <p>Copyright © 2024 smhb.fr - R&eacute;alis&eacute; par ob.it</p>
      </div>
    </>
  )
}

export default Footer
