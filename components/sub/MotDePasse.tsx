'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { log } from '@logtail/next'
import { cn } from '@/lib/utils'
import {
  Verifications,
  VerifierMotDePasse,
  verifierMotDePasse,
} from '@/actions/verifierMotDePasse'
import { MOTDEPASSE_LONGUEUR_MINIMALE } from '@/constants/constants'

type Props = { className?: string; children?: ReactNode; resetSignal: boolean }

const MotDePasse = (props: Props) => {
  const { className, children, resetSignal } = props
  const [password, setPassword] = useState('')
  const [progress, setProgress] = useState('')
  const [message, setMessage] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [verifications, setVerifications] = useState<Verifications | null>(null)

  useEffect(() => {
    handlePassword('')
  }, [resetSignal])

  const handlePassword = async (newPassword: string) => {
    const retour: VerifierMotDePasse = await verifierMotDePasse(newPassword)
    const { nbOk, nbTotal, verifications: verif } = retour
    log.info('rcvd', { retour })
    const strength =
      nbOk == nbTotal
        ? 'Fort'
        : nbOk >= Math.ceil(nbTotal / 2)
        ? 'Moyen'
        : 'Faible'

    setVerifications(verif)
    setPassword(newPassword)
    setProgress(`${(nbOk / nbTotal) * 100}%`)
    setMessage(strength)
    log.info('end', {
      password: newPassword,
      progress: `${(nbOk / nbTotal) * 100}%`,
      message: strength,
    })
  }

  const getActiveColor = (type: string) => {
    return type === 'Fort'
      ? '#8BC926'
      : type === 'Moyen'
      ? '#FEBD01'
      : '#FF0054'
  }

  return (
    <>
      <p className={cn(className)}>
        <Label htmlFor='password'>Mot de passe</Label>
        <span className='flex flex-row gap-2'>
          <Input
            type={hidePassword ? 'password' : 'text'}
            id='password'
            name='password'
            required
            value={password}
            onChange={({ target }) => handlePassword(target.value)}
          />
        </span>

        <span className='relative border-white h-1 border-t-0 border-b-[1px] border-l-0 border-r-0'>
          <span
            className='absolute w-0 h-1 align-middle transition-all ease-in-out border-t-0 border-b-2 border-l-0 border-r-0'
            style={{
              width: progress,
              backgroundColor: getActiveColor(message),
            }}
          ></span>
        </span>

        <span
          className='self-end text-xs'
          style={{ color: getActiveColor(message) }}
        >
          {message}
        </span>

        {children}
      </p>
      <p className='text-xs text-gray-500'>
        <ul>
          <li
            className={
              verifications?.uneLettreMinuscule
                ? 'text-gray-500 line-through'
                : 'text-red-500'
            }
          >
            Au moins 1 caractère minuscule
          </li>
          <li
            className={
              verifications?.uneLettreMajuscule
                ? 'text-gray-500 line-through'
                : 'text-red-500'
            }
          >
            Au moins 1 caractère majuscule
          </li>
          <li
            className={
              verifications?.unChiffre
                ? 'text-gray-500 line-through'
                : 'text-red-500'
            }
          >
            Au moins 1 chiffre
          </li>
          <li
            className={
              verifications?.unCaractereSpecial
                ? 'text-gray-500 line-through'
                : 'text-red-500'
            }
          >
            Au moins 1 caractère spécial
          </li>
          <li
            className={
              verifications?.auMoinsXCaracteresDeLong
                ? 'text-gray-500 line-through'
                : 'text-red-500'
            }
          >
            Au moins {MOTDEPASSE_LONGUEUR_MINIMALE} caractères de long
          </li>
        </ul>
      </p>
    </>
  )
}

export default MotDePasse
