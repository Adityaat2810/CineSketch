import Board from "@/components/Board";
import { ColorPicker } from "@/components/game/color-picker";
import { SizePicker } from "@/components/game/size-picker";
import { Eraser } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const GameRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#aabbcc");
  const [size, setSize] = useState(5);

  useEffect(() => {
    if (!roomId) return;

    // Join the room
    socket.emit("join-room", roomId);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e: MouseEvent) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];

        // Emit drawing data to the server
        socket.emit("canvasImage", { roomId, canvasData: canvas?.toDataURL() });
      }
    };

    const endDrawing = () => {
      isDrawing = false;
    };

    const canvas = canvasRef.current;

    if (canvas) {
      canvas.addEventListener("mousedown", startDrawing);
      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", endDrawing);
      canvas.addEventListener("mouseout", endDrawing);
    }

    // Event listener for receiving canvas data from the socket
    socket.on("canvasImage", (data) => {
      const image = new Image();
      image.src = data;

      const ctx = canvas?.getContext("2d");
      image.onload = () => {
        ctx?.drawImage(image, 0, 0);
      };
    });

    socket.on("clearCanvas", () => {
      const ctx = canvas?.getContext("2d");
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", endDrawing);
        canvas.removeEventListener("mouseout", endDrawing);
      }
      socket.off("canvasImage");
      socket.off("clearCanvas");
      socket.emit("leave-room", roomId); // Leave the room when component unmounts
    };
  }, [color, size, roomId]);

  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Emit clearCanvas event to the server
      socket.emit("clearCanvas", roomId);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="mt-10 border-1">
        <Board canvasRef={canvasRef} />
      </div>

      <div className="flex justify-center p-2">
        <div className="px-4">
          <button onClick={clearCanvas} className="h-9 w-9 text-zinc-500">
            <Eraser className="h-9 w-9 text-zinc-600 dark:text-zinc-100 hover:text-black dark:hover:text-white transition" />
          </button>
        </div>

        <div className="px-2">
          <SizePicker setSize={setSize} size={size} />
        </div>

        <div className="px-4">
          <ColorPicker color={color} setColor={setColor} />
        </div>
      </div>
    </div>
  );
};

export default GameRoom;
