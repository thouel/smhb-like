'use client'
import type { Actualite } from '@prisma/client'
import Image from 'next/image'
import SocialShare from '../sub/SocialShare'
import { formatDateOnly } from '@/constants/constants'
import { isPdf } from '@/lib/utils'
import AfficherPDF from '../sub/AfficherPDF'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Button } from '../ui/button'
import AfficherPremierePagePDF from '../sub/AfficherPremierePagePDF'
import { useState } from 'react'

const AfficherActualite = ({ actualite }: { actualite: Actualite }) => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <>
      <div className='flex flex-col items-center w-full gap-5'>
        <h1 className='flex flex-col w-full py-5 text-center bg-gray-100 rounded-lg'>
          <span className='text-5xl font-semibold'>{actualite.title}</span>
          <span className=''>{formatDateOnly.format(actualite.updatedAt)}</span>
        </h1>
        <div className='flex flex-row justify-start w-full gap-10'>
          {actualite.image &&
            (isPdf(actualite.image) ? (
              <>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <div className='flex flex-col w-full gap-2 cursor-pointer'>
                      <AfficherPremierePagePDF
                        fichier={actualite.image}
                        width={450}
                      />
                      <Button variant='outline' className='grow'>
                        Ouvrir le PDF
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className='max-w-6xl'>
                    <DialogHeader>
                      <DialogTitle>{actualite.title}</DialogTitle>
                    </DialogHeader>
                    <AfficherPDF fichier={actualite.image} />
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Image
                src={actualite.image}
                width='400'
                height='200'
                alt={actualite.title}
                priority
              />
            ))}
          <div className='flex flex-col justify-between gap-10'>
            {actualite.description && (
              <p className='text-xl'>{actualite.description}</p>
            )}
            <SocialShare />
          </div>
        </div>
      </div>
    </>
  )
}

export default AfficherActualite
