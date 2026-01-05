import { z } from "zod";

export const searchSchema = z.object({
  search_string: z
    .string()
    .trim()
    .nonempty("Please state what to search for")
    .max(50, "Search query must be at most 50 characters long")
    .toLowerCase(),
});

export type SearchSchemaType = z.infer<typeof searchSchema>;
