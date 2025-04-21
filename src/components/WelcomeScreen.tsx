
import { useState } from "react";
import { useUser } from "@/context/UserContext";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const { setUser, setRoom } = useUser();
  const [nickname, setNickname] = useState("");
  const [roomName, setRoomName] = useState("");
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim()) {
      setError("Please enter a nickname");
      return;
    }
    
    if (!roomName.trim()) {
      setError("Please enter a room name");
      return;
    }
    
    // For demo, we're using simple strings as IDs
    const userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const roomId = isCreatingRoom 
      ? `room_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      : roomName;
    
    // Set user and room in context
    setUser(userId, nickname);
    setRoom(roomId, isCreatingRoom);
    
    onComplete();
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-holi-blue/20 via-holi-pink/10 to-holi-purple/20">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden animate-fade-in">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-holi-purple mb-2">Welcome to Rang</h1>
            <p className="text-gray-600">
              A collaborative drawing space inspired by the colorful spirit of Holi
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Nickname
                </label>
                <input
                  type="text"
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-holi-purple focus:border-transparent"
                  maxLength={20}
                  required
                />
              </div>
              
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setIsCreatingRoom(true)}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    isCreatingRoom 
                      ? "bg-holi-purple text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Create Room
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreatingRoom(false)}
                  className={`flex-1 py-2 rounded-md transition-colors ${
                    !isCreatingRoom 
                      ? "bg-holi-purple text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Join Room
                </button>
              </div>
              
              <div>
                <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                  {isCreatingRoom ? "Room Name" : "Enter Room Name"}
                </label>
                <input
                  type="text"
                  id="roomName"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder={isCreatingRoom ? "Create a room name" : "Enter existing room name"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-holi-purple focus:border-transparent"
                  maxLength={30}
                  required
                />
              </div>
              
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-holi-purple to-holi-pink text-white rounded-md hover:opacity-95 transition-opacity shadow-md"
              >
                {isCreatingRoom ? "Create & Join" : "Join Room"}
              </button>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-500">Made with ❤️ for Holi Festival</div>
          <div className="text-sm font-medium text-holi-purple">Rang 1.0</div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
