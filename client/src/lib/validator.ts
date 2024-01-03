import * as z from "zod";

export const playerFormSchema = z.object({
  name: z.string().min(3, "Title must be at least 3 characters"),
  image: z.string(),
  club: z
    .string()
    .min(3, "Club name must be at least 3 characters")
    .max(50, "Club name must be less than 50 characters"),
  position: z
    .string()
    .min(3, "Position must be at least 3 characters")
    .max(50, "Position must be less than 50 characters"),
  goals: z.number().min(0, { message: "Goals cannot be negative" }),
  isCaptain: z.boolean(),
  meta_data: z.string().optional(),
  nation_id: z.string(),
});
