import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import getProfile from "@/lib/getProfile";
import { InvitePeople } from "@/components/game/invite-people";
import JoinRoom from "@/components/game/join-room";

const Home = () => {
  const [profile, setProfile] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('authentication-token');
        if (!token) {
          navigate('/signin');
          return; // Early return if no token
        }

        const response = await getProfile();

        if (!response || response.success === false) {
          navigate('/signin');
          return; // Early return if profile fetching fails
        }

        setProfile(response.data);
        if (!response.data) {
          navigate('/signin');
        }

        console.log(response);
      } catch (error) {
        console.log(error);
        console.error("Error fetching profile:", error);
        navigate('/signin'); // Navigate on error
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (profile?.id) {
      const getRooms = async () => {
        try {
          const response = await axios.get("http://localhost:3000/api/v1/room/user-room", {
            params: { userId: profile.id }, // Correctly passing userId as query parameter
          });
          console.log(response.data.data);
          setRooms(response.data.data);
        } catch (error) {
          console.error("Error fetching rooms:", error);
        }
      };

      getRooms();
    }
  }, [profile]);

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/room/create-room", {
        ownerId: profile.id,
        name: roomName,
      });
      const newRoom = response.data.data;
      console.log(newRoom);
      setRooms([...rooms, newRoom]);
      setRoomName(""); // Clear input field after room creation
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  return (
    <div className="flex justify-around">
      <div className="mt-5 p-3 items-center bg-zinc-100 dark:bg-gray-800 
      rounded-md border border-zinc-500">
        <p className="mt-3">Create a new Room</p>
        <div className="w-[300px] mt-3">
          <Input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center">
          <Button
            className="mt-10 items-center w-full"
            onClick={handleCreateRoom}
          >
            Create Room
          </Button>
        </div>
      </div>

      <div className="mt-5">
        <JoinRoom/>
      </div>

      <div className="bg-slate-100 dark:bg-gray-800 mt-5 rounded-md
      border border-zinc-500">
        <div>
          <p className="px-10 text-xl mt-3">Your Rooms</p>
          <ul className="mt-3 px-3">
            {rooms.map((room) => (
              <li key={room.id} className="flex justify-between items-center p-2">
                <Link to={`/game-room/${room.id}`} className="text-blue-500">
                  {room.name}
                </Link>
                <InvitePeople roomId={room.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
