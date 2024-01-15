'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { TbPlayHandball } from 'react-icons/tb'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '../ui/button'
import Image from 'next/image'

type Props = {}

const actualites: { title: string; href: string; description: string }[] = [
  {
    title: 'Actualités',
    href: '/actualites',
    description: 'Retrouvez toutes les actualités du club',
  },
  {
    title: 'Evènements',
    href: '/evenements',
    description: 'Retrouvez tous les évènements passés et à venir',
  },
]

const leClub: { title: string; href: string; description: string }[] = [
  {
    title: 'Le club',
    href: '/club',
    description: 'Les grandes étapes depuis sa création',
  },
  {
    title: "L'organigramme",
    href: '/club/organigramme',
    description: 'Notre organisation pour répondre à nos missions',
  },
  {
    title: 'Notre palmarès',
    href: '/club/palmares',
    description: 'Les hauts faits de nos équipes',
  },
]
const seniors: { title: string; href: string; description: string }[] = [
  {
    title: 'Seniors Feminine',
    href: '/seniors-feminine',
    description: '',
  },
  {
    title: 'Seniors Masculine',
    href: '/seniors-masculine',
    description: '',
  },
]
const jeunes: { title: string; href: string; description: string }[] = [
  {
    title: 'U18 Feminine',
    href: '/u18-feminine',
    description: '',
  },
  {
    title: 'U18 Masculine',
    href: '/u18-masculine',
    description: '',
  },
  {
    title: 'U15 Feminine',
    href: '/u15-feminine',
    description: '',
  },
  {
    title: 'U15 Masculine',
    href: '/u15-masculine',
    description: '',
  },
  {
    title: 'U13 Feminine',
    href: '/u13-feminine',
    description: '',
  },
  {
    title: 'U13 Masculine',
    href: '/u13-masculine',
    description: '',
  },
  {
    title: 'U11 Feminine',
    href: '/u11-feminine',
    description: '',
  },
  {
    title: 'U11 Masculine',
    href: '/u11-masculine',
    description: '',
  },
]
const ressources: { title: string; href: string; description: string }[] = [
  {
    title: 'Galerie photos',
    href: '/galerie',
    description: '',
  },
  {
    title: 'Documents utiles',
    href: '/documents-utiles',
    description: '',
  },
  {
    title: 'Nous contacter',
    href: '/contact',
    description: '',
  },
]

const Navbar = (props: Props) => {
  return (
    <div className='flex flex-row justify-between w-full px-5'>
      <Link href={'/'} className='hover:bg-gray-100 hover:rounded-lg'>
        <Image
          src={'/LOGO-2023.webp'}
          height={100}
          width={100}
          alt='Logo SMHB 2023'
          priority
        />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Actualit&eacute;s</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-2'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md'
                      href='/actualites'
                    >
                      <TbPlayHandball className='w-6 h-6' />
                      <div className='mt-4 mb-2 text-lg font-medium'>
                        Les nouvelles
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Pour savoir tout ce qu&apos;il se passe au club
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {actualites.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Club</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                <li className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <a
                      className='flex flex-col justify-end w-full h-full p-6 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md'
                      href='/club'
                    >
                      <TbPlayHandball className='w-6 h-6' />
                      <div className='mt-4 mb-2 text-lg font-medium'>
                        Le SMHB
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        L&apos;histoire et l&apos;organisation du Saint Médard
                        En Jalles HandBall
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {leClub.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>Nos équipes</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                {seniors.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
                {jeunes.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/ecole-arbitrage' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Ecole d&apos;arbitrage
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Ressources</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                {ressources.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/devenir-partenaire' legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Partenaires
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href='/boutique' legacyBehavior passHref>
              <NavigationMenuLink>
                <Button variant='default'>Boutique</Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='text-sm leading-snug line-clamp-3 text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export default Navbar
