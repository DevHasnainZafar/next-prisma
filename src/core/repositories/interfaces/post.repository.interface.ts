import {
  PaginationParams,
  PaginationResult,
  PostWithAuthor,
} from "@/shared/types";
import { Post } from "@prisma/client";

export interface IPostRepository {
  findById(id: string): Promise<PostWithAuthor | null>;
  findBySlug(slug: string): Promise<Post | null>;
  findAll(
    params: PaginationParams & { search?: string }
  ): Promise<PaginationResult<PostWithAuthor>>;
  create(
    data: Omit<Post, "id" | "createdAt" | "updatedAt">
  ): Promise<PostWithAuthor>;
  update(id: string, data: Partial<Post>): Promise<PostWithAuthor>;
  delete(id: string): Promise<void>;
  findByAuthor(authorId: string): Promise<PostWithAuthor[]>;
}
