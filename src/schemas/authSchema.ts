import { z } from "zod";

export const retrieveUserSchema = z.object({
  username: z.string(),
});

export const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
});
