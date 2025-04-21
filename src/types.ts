
export interface User {
  id: string;
  name: string;
  isDrawing?: boolean;
  lastActive?: number;
}

export interface Room {
  id: string;
  name: string;
  createdBy: string;
  activeUsers: number;
  createdAt: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  points: Point[];
  color: string;
  size: number;
  tool: string;
  timestamp: number;
}
