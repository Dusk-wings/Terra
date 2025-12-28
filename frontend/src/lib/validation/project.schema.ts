import { z } from "zod";

export const THEMES = [
  "Standard",
  "Minimal",
  "Astro",
  "Sydney",
  "Ocean",
  "Forest",
  "Retro",
  "Cyberpunk",
  "ReImaged",
] as const;

export type ThemeType = (typeof THEMES)[number];

export const createProjectSchema = z.object({
  project_name: z
    .string()
    .min(3, "Project name must be at least 3 characters long")
    .max(50, "Project name must be at most 50 characters long")
    .trim(),
  project_description: z
    .string()
    .max(200, "Description must be at most 200 characters long")
    .trim(),
  is_public: z.boolean(),
  theme: z.enum(THEMES),
  slug: z
    .string()
    .min(3)
    .max(50)
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Slug can only contain letters, numbers, hyphens (-), and underscores (_)"
    )
    .trim(),
});

export type CreateProjectDataType = z.infer<typeof createProjectSchema>;
