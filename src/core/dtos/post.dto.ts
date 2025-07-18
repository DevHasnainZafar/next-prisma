import z from "zod";

export const CreatePostDto = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  published: z.boolean().optional().default(false),
});

export const UpdatePostDto = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  published: z.boolean().optional(),
});

export type CreatePostRequest = z.infer<typeof CreatePostDto>;
export type UpdatePostRequest = z.infer<typeof UpdatePostDto>;

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  slug: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
  };
}
