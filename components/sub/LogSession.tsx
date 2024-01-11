'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import { log } from '@logtail/next'

const LogSession = () => {
  const { data: session } = useSession({ required: true })
  return (
    <>
      <a
        className='cursor-pointer'
        onClick={() => {
          log.info('user', { user: session?.user })
        }}
      >
        Log session
      </a>
    </>
  )
}

export default LogSession
