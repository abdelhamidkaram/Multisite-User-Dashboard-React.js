import { Suspense } from 'react'
import FallbackLoader from '../fallbackLoader'

const RouteSuspended = (children) => {
  return (
    <>
      <Suspense fallback={<FallbackLoader />}>{children}</Suspense>
    </>
  )
}

export default RouteSuspended
