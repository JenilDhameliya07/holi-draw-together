
import React from "react";

interface User {
  id: string;
  name: string;
  isDrawing?: boolean;
}

interface UserListProps {
  users: User[];
  currentUserId: string;
  roomOwner?: string;
}

const UserList: React.FC<UserListProps> = ({ users, currentUserId, roomOwner }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold text-holi-purple mb-3">Room Participants</h2>
      
      <div className="space-y-1 max-h-72 overflow-y-auto pr-2">
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm italic">No users connected</p>
        ) : (
          users.map((user) => (
            <div 
              key={user.id}
              className="flex items-center justify-between py-2 px-3 rounded-md bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-holi-purple to-holi-pink flex items-center justify-center text-white font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2 flex flex-col">
                  <span className="text-sm font-medium">
                    {user.name}
                    {user.id === currentUserId && " (You)"}
                    {user.id === roomOwner && (
                      <span className="ml-1 text-xs text-holi-orange font-normal">
                        (Owner)
                      </span>
                    )}
                  </span>
                </div>
              </div>
              
              {user.isDrawing && (
                <span className="text-xs py-1 px-2 bg-holi-purple/20 text-holi-purple rounded-full animate-pulse">
                  🖌️ Drawing...
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;
