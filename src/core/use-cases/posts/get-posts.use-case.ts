import { PostResponse } from "@/core/dtos/post.dto";
import { IPostRepository } from "@/core/repositories/interfaces/post.repository.interface";
import { PaginationParams, PaginationResult } from "@/shared/types";

export class GetPostsUseCase {
  constructor(private postRepository: IPostRepository) {}

  async execute(
    params: PaginationParams & { search?: string }
  ): Promise<PaginationResult<PostResponse>> {
    const result = await this.postRepository.findAll(params);

    return {
      data: result.data.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        slug: post.slug,
        published: post.published,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          id: post.author.id,
          username: post.author.username,
          firstName: post.author.firstName || undefined,
          lastName: post.author.lastName || undefined,
        },
      })),
      pagination: result.pagination,
    };
  }
}
