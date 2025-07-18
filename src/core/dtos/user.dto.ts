import z from "zod";

export const UpdateUserDto = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export type UpdateUserRequest = z.infer<typeof UpdateUserDto>;

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
