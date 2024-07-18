import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios for API requests
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import getProfile from "@/lib/getProfile";

const Home = () => {
  const [profile, setProfile] = useState<any>(null); // Adjust type as per your profile structure
  const [rooms, setRooms] = useState<any[]>([]); // Adjust type as per your room structure
  const [roomName, setRoomName] = useState<string>(""); // State to hold room name input

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile() // Adjust endpoint as per your API
        setProfile(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleCreateRoom = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/room//create-room", {
        ownerId: profile.id,
        name: roomName, // Pass roomName to create room endpoint
      });
      const newRoom = response.data.data;
      console.log(newRoom)
      setRooms([...rooms, newRoom]);
      setRoomName(""); // Clear input field after room creation
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value); // Update roomName state with input value
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          placeholder="Enter room name"
          value={roomName}
          onChange={handleInputChange}
        />
        <Button onClick={handleCreateRoom}>Create Room</Button>
      </div>
      <div>
        <h2>Your Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li key={room.id}>
              <Link to={`/game-room/${room.id}`}>{room.name}</Link>
              {/* Adjust link structure as per your routing */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
