import { v } from "convex/values";
import { internalMutation, query, QueryCtx } from "./_generated/server";

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

export const getUserByClerkId = async ({
  ctx,
  clerkId,
}: {
  ctx: QueryCtx;
  clerkId: string;
}) => {
  const user = await ctx.db
    .query("users")
    .withIndex("byClerkId", (q) => q.eq("clerkId", clerkId))
    .unique();

  return user;
};

export const getAuthenticatedUser = async (ctx: QueryCtx) => {
  try {
    const identity = await ctx.auth.getUserIdentity();

    if (identity === null) return null;
    let user = await getUserByClerkId({ ctx, clerkId: identity.subject });

    return user;
  } catch (error) {
    console.log("🚀 ~ getAuthenticatedUser ~ error:", error);
  }
};

export const getAuthenticatedUserProfile = query({
  handler: async (ctx) => {
    const user = await getAuthenticatedUser(ctx);
    return user;
  },
});
