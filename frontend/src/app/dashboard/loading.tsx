import Spinner from '@/components/spinner/Spinner'
import React from 'react'

function Loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
    </div>
  )
}

export default Loading