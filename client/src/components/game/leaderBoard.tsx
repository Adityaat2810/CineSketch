import axios from "axios";
import { features } from "process";
import { useEffect, useState } from "react";

interface User{
    id:string ,

}

export const LeaderBoard = ({roomId}:{
    roomId:string
})=>{
    const [users, setUser] = useState<User[]>([]);

    useEffect(()=>{
        const fetchPlayers=async()=>{
            const response = await axios.post('/api/v1/player',{
                roomId
            })

        }
        fetchPlayers()
    },[])

    return(
        <div className="mr-5">
            LeaderBoard
        </div>
    )
}