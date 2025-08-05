import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const userId = await ctx.db.insert("users", {
        ...args,
      });

      return userId;
    } catch (error) {
      console.log("error in createUser", error);
    }
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    try {
      let user = await ctx.db
        .query("users")
        .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
        .unique();

      if (user !== null) {
        await ctx.db.delete(user._id);
      } else {
        console.warn(
          `Can't delete user, there is none for Clerk user ID: ${clerkId}`
        );
      }
    } catch (error) {
      console.log("error in deleteUser", error);
    }
  },
});
