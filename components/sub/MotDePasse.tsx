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
import { Button } from '../ui/button'
import { getRandomPassword } from '@/lib/password-generator'
import { EyeIcon } from 'lucide-react'

type Props = {
  className?: string
  children?: ReactNode
  resetSignal: boolean
  defaultValue?: string
}

const MotDePasse = (props: Props) => {
  const { className, children, resetSignal, defaultValue } = props
  const [password, setPassword] = useState('')
  const [progress, setProgress] = useState('')
  const [message, setMessage] = useState('')
  const [hidePassword, setHidePassword] = useState(true)
  const [verifications, setVerifications] = useState<Verifications | null>(null)

  useEffect(() => {
    handlePassword(defaultValue !== undefined ? defaultValue : '')
  }, [resetSignal, defaultValue])

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

  const generatePassword = () => {
    handlePassword(getRandomPassword())
    setHidePassword(false)
  }

  return (
    <>
      <div className={cn(className)}>
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
          <EyeIcon
            className='w-6 h-6 mt-2'
            onClick={() => setHidePassword(!hidePassword)}
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
      </div>
      <div className='flex flex-col items-center gap-2 p-2 text-xs text-gray-500 border rounded-lg'>
        <div>
          <Button
            className='text-xs'
            variant='secondary'
            type='button'
            onClick={() => generatePassword()}
          >
            {'Générer le mot de passe'}
          </Button>
        </div>
        <h3 className='text-lg font-semibold text-center'>Ou</h3>
        <div>
          <h4 className='text-xs'>{'Créer le mot de passe manuellement :'}</h4>
          <ul className='m-2'>
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
        </div>
      </div>
    </>
  )
}

export default MotDePasse
