import { date, z, enum as enum_ } from "zod";

export const friendRequestValidation = z.object({
  requesterEmail: z
    .string({ required_error: "requesterEmail" })
    .min(1, "Requester Email is required")
    .default("youssef@admin.com"),
  recipientEmail: z
    .string({ required_error: "Recipient Email is required" })
    .min(1, "Recipient Email is required"),
  status: enum_(["pending", "accepted", "rejected"]).default("pending"),
  // createdAt: date().optional().default(),
});
export type FriendRequestSchema = z.infer<typeof friendRequestValidation>;
