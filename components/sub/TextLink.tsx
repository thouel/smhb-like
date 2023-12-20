import React from 'react'
import { Button } from '../ui/button'

type Props = {
  className: string,
  children: React.ReactNode
}

const TextLink = (props: Props) => {
  return (
    <>
      <Button variant='link' className={props.className}>
        {props.children}
      </Button>
    </>
  )
}

export default TextLink