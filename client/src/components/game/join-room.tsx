import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

function JoinRoom() {
  return (
    <div className='border border-zinc-500 rounded-sm 
    p-4'>
        <p className='mb-3'>Enter room code </p>
        <Input />
        <Button className='w-full mt-6'>Join Room</Button>
    </div>
  )
}

export default JoinRoom