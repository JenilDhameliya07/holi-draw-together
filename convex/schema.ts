
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table stores the temporary user information
  users: defineTable({
    name: v.string(),
    roomId: v.string(),
    lastActive: v.number(),
    isActive: v.boolean(),
    isDrawing: v.optional(v.boolean()),
  }),
  
  // Rooms table stores information about drawing rooms
  rooms: defineTable({
    name: v.string(),
    createdBy: v.string(),
    createdAt: v.number(),
    activeUsers: v.number(),
  }),
  
  // Strokes table stores the drawing data
  strokes: defineTable({
    roomId: v.string(),
    userId: v.string(),
    userName: v.string(),
    points: v.array(v.object({
      x: v.number(),
      y: v.number(),
    })),
    color: v.string(),
    size: v.number(),
    tool: v.string(),
    timestamp: v.number(),
  }),
});
