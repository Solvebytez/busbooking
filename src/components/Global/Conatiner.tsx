import { cn } from '@/lib/utils'
import React from 'react'

const Conatiner = ({children,className}:{children:React.ReactNode;className?:string}) => {
  return (
    <div className={cn('h-full mx-auto w-full max-w-screen-2xl px-2.5 md:px-32',className)}>{children}</div>
  )
}

export default Conatiner