import axios from "axios";
import { features } from "process";
import { useEffect, useState } from "react";

interface User {
    id: string,
    userName: string,
    user: any

}

export const LeaderBoard = ({ roomId }: {
    roomId: string
}) => {
    const [users, setUser] = useState<User[]>([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await axios.post('http://localhost:3000/api/v1/player/get', {
                roomId
            })

            setUser(response.data.data)
        }
        fetchPlayers()
    }, [])

    return (
        <div className="mr-5">
            <div>
                LeaderBoard

                <div >
                    {users.map((user) => (
                        <div className="border border-zinc-500 px-5
                    py-3 ">
                             

                            <div className="flex">
                            <div className="pr-10">
                                    Rank( 1 )
                                </div>
                                {user.user.username}

                                <div className="pl-10">
                                    Score( 10 )
                                </div>

                                
                            </div>
                        </div>



                    ))}

                </div>

            </div>
        </div>
    )
}