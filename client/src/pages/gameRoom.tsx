import Board from "@/components/Board";
import { ColorPicker } from "@/components/game/color-picker";
import { SizePicker } from "@/components/game/size-picker";
import { Eraser } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function GameRoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#aabbcc");
  const [size, setSize] = useState(5);

  // Function to clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      if(canvas)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
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
        ctx.strokeStyle = color; // Use the selected color
        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
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

    return () => {
      if (canvas) {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", endDrawing);
        canvas.removeEventListener("mouseout", endDrawing);
      }
    };
  }, [color, size]);

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="mt-10 border-1">
        <Board canvasRef={canvasRef} />
      </div>

      <div className="flex justify-center p-2">
        <div className="px-4">
          <button onClick={clearCanvas} className="h-9 w-9 text-zinc-500">
            <Eraser className="h-9 w-9"/>
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
}

export default GameRoom;
