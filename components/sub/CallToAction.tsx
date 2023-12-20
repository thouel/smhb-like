import React from 'react'
import { Button } from '../ui/button'

type Props = {
  className: string,
  children: React.ReactNode
}

const CallToAction = (props: Props) => {
  return (
    <>
      <Button className={props.className} variant='default'>
        {props.children}
      </Button>
    </>
  )
}

export default CallToAction