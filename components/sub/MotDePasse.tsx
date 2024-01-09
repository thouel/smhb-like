'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { log } from '@logtail/next'
import { cn } from '@/lib/utils'

type Props = { className?: string; children?: ReactNode; resetSignal: boolean }

const MotDePasse = (props: Props) => {
  const { className, children, resetSignal } = props
  const [password, setPassword] = useState('')
  const [progress, setProgress] = useState('')
  const [message, setMessage] = useState('')
  const [hidePassword, setHidePassword] = useState(true)

  useEffect(() => {
    handlePassword('')
  }, [resetSignal])

  const handlePassword = (newPassword: string) => {
    // has one lowercase letter
    // has one uppercase letter
    // has one digit
    // has one special character
    // has no forbidden character
    // is at least 5 long

    const AT_LEAST_X_LONG = 5
    const checks = {
      oneLowercase: false,
      oneUppercase: false,
      oneDigit: false,
      oneSpecialCharacter: false,
      atLeastXLong: false,
    }
    const NB_CHECKS = Object.values(checks).length

    checks.oneLowercase = /[a-z]/.test(newPassword)
    checks.oneUppercase = /[A-Z]/.test(newPassword)
    checks.oneDigit = /[0-9]/.test(newPassword)
    checks.oneSpecialCharacter =
      /[,\;:!§\.\?µ%\*ù$=\)àç_è\-('"é&\]}@\|\[{#]/.test(newPassword)
    checks.atLeastXLong = newPassword.length >= AT_LEAST_X_LONG

    const passedChecks = Object.values(checks).filter((value) => value)

    const strength =
      passedChecks.length == 5
        ? 'Fort'
        : passedChecks.length >= 2
        ? 'Moyen'
        : 'Faible'

    setPassword(newPassword)
    setProgress(`${(passedChecks.length / NB_CHECKS) * 100}%`)
    setMessage(strength)
    log.info('end', {
      password: newPassword,
      progress: `${(passedChecks.length / NB_CHECKS) * 100}%`,
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
  )
}

export default MotDePasse
