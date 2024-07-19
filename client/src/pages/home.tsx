import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import getProfile from "@/lib/getProfile";

const Home = () => {
  const [profile, setProfile] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomName, setRoomName] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

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
    <div >
      <div className="mt-5 py-3 ">
        <div className="w-[300px]">
          <Input

            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={handleInputChange}
          />
        </div>
        
        <Button
         className="mt-3"
         onClick={handleCreateRoom}>Create Room</Button>
      </div>
      <div>
        <h2>Your Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <Link to={`/game-room/${room.id}`}>{room.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
