
import { useState } from "react";
import { UserProvider, useUser } from "@/context/UserContext";
import WelcomeScreen from "@/components/WelcomeScreen";
import DrawingRoom from "@/components/DrawingRoom";

const AppContent = () => {
  const { userId, roomId } = useUser();
  const [showWelcome, setShowWelcome] = useState(!userId || !roomId);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleExitRoom = () => {
    setShowWelcome(true);
  };

  return (
    <>
      {showWelcome ? (
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      ) : (
        <DrawingRoom onExit={handleExitRoom} />
      )}
    </>
  );
};

const Index = () => {
  return (
    <UserProvider>
      <div className="bg-gradient-to-br from-white to-gray-100 min-h-screen">
        <AppContent />
      </div>
    </UserProvider>
  );
};

export default Index;
