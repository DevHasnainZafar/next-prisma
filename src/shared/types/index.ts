import { Post, User } from "@prisma/client";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
export interface JWTPayload {
  userId: string;
  email: string;
}
export interface PaginationParams {
  page: number;
  limit: number;
}
export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
export type UserWithoutPassword = Omit<User, "password">;
export type PostWithAuthor = Post & { author: UserWithoutPassword };
