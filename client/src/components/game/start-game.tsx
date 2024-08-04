import React from 'react'
import { Button } from '../ui/button'

function StartGame({
    userId,gameRoomId

}:{
    userId:string,gameRoomId:string
}) {
    // if user is admin write logic to start game 
    console.log('user id of profile is',userId)
    
    return (
      <div>
        <Button>
            Start Game 
        </Button>
      </div>
    )
}

export default StartGame