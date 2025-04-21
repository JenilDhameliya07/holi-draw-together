
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new room with the given name
export const createRoom = mutation({
  args: { name: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rooms", {
      name: args.name,
      createdBy: args.createdBy,
      createdAt: Date.now(),
      activeUsers: 0,
    });
  },
});

// Get a room by its ID
export const getRoom = query({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.roomId))
      .first();
  },
});

// Get all active rooms
export const getAllRooms = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("rooms")
      .filter((q) => q.gt(q.field("activeUsers"), 0))
      .collect();
  },
});

// Delete a room (only for inactive rooms)
export const deleteRoom = mutation({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.roomId))
      .first();
    
    if (!room || room.activeUsers > 0) {
      return { success: false, message: "Cannot delete active room" };
    }
    
    await ctx.db.delete(room._id);
    
    // Delete all strokes associated with this room
    const strokes = await ctx.db
      .query("strokes")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .collect();
    
    for (const stroke of strokes) {
      await ctx.db.delete(stroke._id);
    }
    
    return { success: true };
  },
});
