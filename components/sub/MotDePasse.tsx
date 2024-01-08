import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

type Props = { state?: { success: boolean; errors: { password: [] } } }

const MotDePasse = (props: Props) => {
  const { state } = props
  return (
    <p className='flex flex-col gap-2'>
      <Label htmlFor='password'>Password</Label>
      <Input type='password' id='password' name='password' required />
      {/* {!state.success &&
        state.errors?.password &&
        state.errors?.password?.map((e, i) => (
          <span key={i} className='text-xs text-red-600'>
            {e}
          </span>
        ))} */}
    </p>
  )
}

export default MotDePasse
