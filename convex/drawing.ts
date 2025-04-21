
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Add a new drawing stroke
export const addStroke = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("strokes", {
      roomId: args.roomId,
      userId: args.userId,
      userName: args.userName,
      points: args.points,
      color: args.color,
      size: args.size,
      tool: args.tool,
      timestamp: Date.now(),
    });
  },
});

// Get all strokes for a room
export const getStrokesInRoom = query({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("strokes")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .order("asc")
      .collect();
  },
});

// Clear all strokes in a room (room owner only)
export const clearCanvas = mutation({
  args: { 
    roomId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // First check if user is room owner
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.roomId))
      .first();
    
    if (!room || room.createdBy !== args.userId) {
      return { success: false, message: "Only room owner can clear canvas" };
    }
    
    // Get all strokes in the room
    const strokes = await ctx.db
      .query("strokes")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .collect();
    
    // Delete each stroke
    for (const stroke of strokes) {
      await ctx.db.delete(stroke._id);
    }
    
    return { success: true };
  },
});
