import Board from "@/components/Board";
import { ColorPicker } from "@/components/game/color-picker";
import React, { useEffect, useRef, useState } from "react";

function GameRoom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState("#aabbcc");

  // to draw 
  useEffect(() => {
    // Variables to store drawing state
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
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
      }
    };

    const endDrawing = () => {
      isDrawing = false;
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }

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
  }, [color]); // Re-run effect when color changes

  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="mt-10 border-1">
        <Board canvasRef={canvasRef} />
      </div>
      
      <div>
        <ColorPicker color={color} setColor={setColor} />
      </div>
    </div>
  );
}

export default GameRoom;
