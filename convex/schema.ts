import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const User = {
  email: v.string(),
  name: v.string(),
  imageUrl: v.string(),
};

export default defineSchema({
  users: defineTable(User),
});
