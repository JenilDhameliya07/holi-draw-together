
import { useRef, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

interface CanvasProps {
  activeColor: string;
  activeTool: string;
  brushSize: number;
  onDrawingStart?: () => void;
  onDrawingEnd?: () => void;
}

interface Point {
  x: number;
  y: number;
}

const Canvas = ({ 
  activeColor, 
  activeTool, 
  brushSize,
  onDrawingStart,
  onDrawingEnd
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { userId, userName, roomId, isRoomOwner } = useUser();
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Point[]>([]);
  
  // Initialize canvas when component mounts
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  
  // Drawing event handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    setIsDrawing(true);
    if (onDrawingStart) onDrawingStart();
    
    const point = getPointerPosition(e);
    setCurrentStroke([point]);
    
    // Start new path
    context.beginPath();
    context.moveTo(point.x, point.y);
    
    // Set drawing styles
    context.strokeStyle = activeColor;
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.lineJoin = "round";
    
    if (activeTool === "eraser") {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over";
    }
  };
  
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    const point = getPointerPosition(e);
    
    // Add point to current stroke
    setCurrentStroke(prev => [...prev, point]);
    
    // Draw line to new point
    context.lineTo(point.x, point.y);
    context.stroke();
  };
  
  const endDrawing = () => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    context.closePath();
    context.globalCompositeOperation = "source-over";
    
    setIsDrawing(false);
    if (onDrawingEnd) onDrawingEnd();
    
    setCurrentStroke([]);
  };
  
  // Get pointer position from mouse or touch event
  const getPointerPosition = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      // Mouse event
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };
  
  // Clear the canvas
  const clearCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  // Download canvas as PNG
  const downloadCanvas = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    
    link.download = `rang-drawing-${new Date().toISOString()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  
  return (
    <div className="relative w-full h-full overflow-hidden bg-white rounded-lg shadow-md">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      <div className="absolute top-4 right-4 flex space-x-2">
        {isRoomOwner && (
          <button
            onClick={clearCanvas}
            className="p-2 text-white bg-holi-red rounded-full shadow-md hover:shadow-lg transition-shadow"
            title="Clear Canvas"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
        )}
        <button
          onClick={downloadCanvas}
          className="p-2 text-white bg-holi-blue rounded-full shadow-md hover:shadow-lg transition-shadow"
          title="Download Drawing"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Canvas;
