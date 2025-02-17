import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return <>{children}</>

  // <div className='min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min'>
  {
    /* </div> */
  }
  // <div className="m-auto flex w-full h-full">{children}</div>
}
