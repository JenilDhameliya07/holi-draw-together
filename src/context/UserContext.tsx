
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Id } from "../../convex/_generated/dataModel";

interface UserContextType {
  userId: string | null;
  userName: string | null;
  roomId: string | null;
  isRoomOwner: boolean;
  setUser: (userId: string, userName: string) => void;
  setRoom: (roomId: string, isOwner: boolean) => void;
  clearUser: () => void;
  clearRoom: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRoomOwner, setIsRoomOwner] = useState<boolean>(false);

  // On component mount, check for stored session
  useEffect(() => {
    const storedUserId = localStorage.getItem("rangUserId");
    const storedUserName = localStorage.getItem("rangUserName");
    const storedRoomId = localStorage.getItem("rangRoomId");
    const storedIsRoomOwner = localStorage.getItem("rangIsRoomOwner") === "true";

    if (storedUserId && storedUserName) {
      setUserId(storedUserId);
      setUserName(storedUserName);
    }

    if (storedRoomId) {
      setRoomId(storedRoomId);
      setIsRoomOwner(storedIsRoomOwner);
    }
  }, []);

  const setUser = (userId: string, userName: string) => {
    setUserId(userId);
    setUserName(userName);
    localStorage.setItem("rangUserId", userId);
    localStorage.setItem("rangUserName", userName);
  };

  const setRoom = (roomId: string, isOwner: boolean) => {
    setRoomId(roomId);
    setIsRoomOwner(isOwner);
    localStorage.setItem("rangRoomId", roomId);
    localStorage.setItem("rangIsRoomOwner", isOwner.toString());
  };

  const clearUser = () => {
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("rangUserId");
    localStorage.removeItem("rangUserName");
  };

  const clearRoom = () => {
    setRoomId(null);
    setIsRoomOwner(false);
    localStorage.removeItem("rangRoomId");
    localStorage.removeItem("rangIsRoomOwner");
  };

  return (
    <UserContext.Provider
      value={{
        userId,
        userName,
        roomId,
        isRoomOwner,
        setUser,
        setRoom,
        clearUser,
        clearRoom,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
