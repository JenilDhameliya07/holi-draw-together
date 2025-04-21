
import React, { useState } from "react";
import { Brush, Eraser, RotateCcw, RotateCw } from "lucide-react";

interface ToolPanelProps {
  onColorChange: (color: string) => void;
  onToolChange: (tool: string) => void;
  onSizeChange: (size: number) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClear?: () => void;
  isRoomOwner?: boolean;
}

const ToolPanel: React.FC<ToolPanelProps> = ({
  onColorChange,
  onToolChange,
  onSizeChange,
  onUndo,
  onRedo,
  onClear,
  isRoomOwner = false,
}) => {
  const [activeTool, setActiveTool] = useState<string>("brush");
  const [activeColor, setActiveColor] = useState<string>("#9b87f5"); // Default purple
  const [brushSize, setBrushSize] = useState<number>(5);

  // Array of color options (Holi festival colors)
  const colors = [
    { value: "#9b87f5", name: "Purple" },
    { value: "#ff3f8e", name: "Pink" },
    { value: "#33C3F0", name: "Blue" },
    { value: "#59e6a3", name: "Green" },
    { value: "#ffd965", name: "Yellow" },
    { value: "#F97316", name: "Orange" },
    { value: "#ea384c", name: "Red" },
    { value: "#000000", name: "Black" },
  ];

  // Brush size options
  const sizeOptions = [2, 5, 10, 15, 20];

  const handleToolChange = (tool: string) => {
    setActiveTool(tool);
    onToolChange(tool);
  };

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    onColorChange(color);
  };

  const handleSizeChange = (size: number) => {
    setBrushSize(size);
    onSizeChange(size);
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center space-x-2 animate-scale-in">
        {/* Drawing Tools */}
        <div className="flex space-x-2 px-3 border-r border-gray-200">
          <button
            onClick={() => handleToolChange("brush")}
            className={`p-2 rounded-full ${
              activeTool === "brush"
                ? "bg-holi-purple text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Brush"
          >
            <Brush size={20} />
          </button>
          <button
            onClick={() => handleToolChange("eraser")}
            className={`p-2 rounded-full ${
              activeTool === "eraser"
                ? "bg-holi-purple text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>
        </div>

        {/* Colors */}
        <div className="flex space-x-2 px-3 border-r border-gray-200">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => handleColorChange(color.value)}
              className={`w-8 h-8 rounded-full ${
                activeColor === color.value ? "ring-2 ring-offset-2 ring-black" : ""
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>

        {/* Brush Sizes */}
        <div className="flex space-x-2 px-3 border-r border-gray-200">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className={`rounded-full flex items-center justify-center ${
                brushSize === size
                  ? "bg-holi-purple text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              style={{ width: size + 20, height: size + 20 }}
              title={`${size}px`}
            >
              <div
                className="rounded-full bg-current"
                style={{ width: size, height: size }}
              />
            </button>
          ))}
        </div>

        {/* Undo/Redo */}
        <div className="flex space-x-2 px-3">
          <button
            onClick={onUndo}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            title="Undo"
            disabled={!onUndo}
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={onRedo}
            className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            title="Redo"
            disabled={!onRedo}
          >
            <RotateCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolPanel;
