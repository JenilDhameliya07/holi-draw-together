
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get a user by their ID
export const getUser = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();
  },
});

// Create a new user with the given name
export const createUser = mutation({
  args: { name: v.string(), roomId: v.string() },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      roomId: args.roomId,
      lastActive: Date.now(),
      isActive: true,
      isDrawing: false,
    });

    // Update the room's active user count
    const room = await ctx.db
      .query("rooms")
      .filter((q) => q.eq(q.field("_id"), args.roomId))
      .first();
    
    if (room) {
      await ctx.db.patch(room._id, {
        activeUsers: room.activeUsers + 1,
      });
    }

    return userId;
  },
});

// Update a user's active status and timestamp
export const updateUserStatus = mutation({
  args: { 
    userId: v.string(), 
    isActive: v.boolean(),
    isDrawing: v.boolean().optional(), 
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .first();
    
    if (!user) return null;

    const updateData: Record<string, any> = {
      lastActive: Date.now(),
      isActive: args.isActive,
    };

    if (args.isDrawing !== undefined) {
      updateData.isDrawing = args.isDrawing;
    }
    
    return await ctx.db.patch(user._id, updateData);
  },
});

// Get all active users in a room
export const getUsersInRoom = query({
  args: { roomId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("roomId"), args.roomId))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();
  },
});
