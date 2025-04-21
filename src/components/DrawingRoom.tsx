
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/context/UserContext";
import Canvas from "./Canvas";
import ToolPanel from "./ToolPanel";
import UserList from "./UserList";
import { ArrowLeft } from "lucide-react";

interface DrawingRoomProps {
  onExit: () => void;
}

// Mock data for users (in a real app this would come from Convex)
const mockUsers = [
  { id: "user1", name: "Rahul", isDrawing: false },
  { id: "user2", name: "Priya", isDrawing: true },
  { id: "user3", name: "Amit", isDrawing: false },
];

const DrawingRoom: React.FC<DrawingRoomProps> = ({ onExit }) => {
  const { userId, userName, roomId, isRoomOwner, clearRoom } = useUser();
  const [activeColor, setActiveColor] = useState("#9b87f5");
  const [activeTool, setActiveTool] = useState("brush");
  const [brushSize, setBrushSize] = useState(5);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [users, setUsers] = useState(mockUsers);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // In a real app, this would subscribe to real-time updates from Convex
  useEffect(() => {
    // Simulate adding the current user to the list
    if (userId && userName) {
      setUsers(prev => {
        // Only add if not already in list
        if (!prev.some(user => user.id === userId)) {
          return [...prev, { id: userId, name: userName, isDrawing: false }];
        }
        return prev;
      });
    }
  }, [userId, userName]);
  
  const handleDrawingStart = () => {
    // Update local user state
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isDrawing: true } 
        : user
    ));
    
    // In a real app, this would update Convex
  };
  
  const handleDrawingEnd = () => {
    // Update local user state
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isDrawing: false } 
        : user
    ));
    
    // In a real app, this would update Convex
  };
  
  const handleExit = () => {
    clearRoom();
    onExit();
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-0"
      } overflow-hidden`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-holi-purple">Rang</h1>
            
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="bg-white rounded-lg shadow p-4 mb-4">
              <h2 className="text-lg font-semibold text-holi-purple mb-2">Room Info</h2>
              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-medium">Room:</span>{" "}
                  {roomId?.replace(/^room_.*_/, "") || "Unknown"}
                </p>
                <p>
                  <span className="font-medium">Your Name:</span> {userName}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {isRoomOwner ? "Room Owner" : "Participant"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex-grow overflow-hidden mb-4">
            <UserList 
              users={users} 
              currentUserId={userId || ""}
              roomOwner={isRoomOwner ? userId : undefined}
            />
          </div>
          
          <button
            onClick={handleExit}
            className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
          >
            Exit Room
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Canvas Container */}
        <div className="flex-1 relative" ref={canvasRef}>
          {!isSidebarOpen && (
            <button
              className="absolute top-4 left-4 z-10 p-2 bg-white shadow-md rounded-md hover:bg-gray-100"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
          
          <Canvas
            activeColor={activeColor}
            activeTool={activeTool}
            brushSize={brushSize}
            onDrawingStart={handleDrawingStart}
            onDrawingEnd={handleDrawingEnd}
          />
        </div>
        
        {/* Tools */}
        <ToolPanel
          onColorChange={setActiveColor}
          onToolChange={setActiveTool}
          onSizeChange={setBrushSize}
          isRoomOwner={isRoomOwner}
        />
      </div>
    </div>
  );
};

export default DrawingRoom;
